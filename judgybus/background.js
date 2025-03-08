// Import Google Generative AI
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('apikey'); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or "gemini-1.5-pro"

// Track tab count
let keepAliveInterval;

async function updateTabCount() {
    try {
      const tabs = await chrome.tabs.query({});
      const tabCount = tabs.length;
      console.log(`Current tabs: ${tabCount}`); // Debugging
      chrome.storage.local.set({ tabCount });

      // Add AI-generated roast based on tab count (example)
      let message = "Bah?";
      if (tabCount >= 20) message = "20+ tabs? Oh we are going down that rabbit hole today.";
      if (tabCount >= 40) message = "40+ tabs? Are you sure if this was on the todo list?";
      chrome.storage.local.set({ message });

      // New function call to categorize tabs using AI/NLP model
      const categorizedTabs = await categorizeTabsWithAI(tabs);
      // Further processing to send categorizedTabs to popup
    } catch (error) {
      console.error("Error updating tab count:", error);
    }
}

// Function to categorize tabs using AI/NLP model
async function categorizeTabsWithAI(tabs) {
    const categories = {
        news: [],
        research: [],
        shopping: [],
        work: [],
        entertainment: [],
        reading: [],
        distraction: []
    };

    for (const tab of tabs) {
        const title = tab.title;
        const url = tab.url;

        // Call to AI/NLP API for categorization (pseudo-code)
        const category = await callAIModel(title, url);

        if (categories[category]) {
            categories[category].push(tab);
        } else {
            categories.distraction.push(tab); // Default to distraction
        }
    }

    // Store categorized data in local storage
    chrome.storage.local.set({ categorizedTabs: categories });
    return categories;
}

// Function to call Google’s Gemini API for categorization
async function callAIModel(title, url) {
    const apiKey = 'apikey'; // Replace with your actual API key
    const endpoint = 'https://api.google.com/gemini/v1/categorize'; // Replace with the actual endpoint

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ title, url })
    });

    if (!response.ok) {
        throw new Error('Error calling Gemini API: ' + response.statusText);
    }

    const data = await response.json();
    return data.category; // Adjust according to the actual response structure
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log(`Tab ${tabId} updated. URL: ${tab.url}`);
    analyzeTab(tabId, tab.url);
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  console.log(`Tab ${tab.id} created. URL: ${tab.url}`);
  if(tab.url){
    analyzeTab(tab.id, tab.url);
  }
});

async function analyzeTab(tabId, tabUrl) {
  try {
    const category = await categorizeTabContent(tabUrl, tabId);

    if (category) {
      console.log(`Tab ${tabId} categorized as: ${category}`);
      // Store the category (using chrome.storage.local)
      chrome.storage.local.get({ tabCategories: {} }, (data) => {
        const tabCategories = data.tabCategories || {};
        tabCategories[tabId] = category;
        chrome.storage.local.set({ tabCategories: tabCategories }, () => {
          console.log(`Category for tab ${tabId} saved.`);
        });
      });
    } else {
      console.log(`Could not categorize tab ${tabId}.`);
    }
  } catch (error) {
    console.error(`Error analyzing tab ${tabId}:`, error);
  }
}

async function categorizeTabContent(tabUrl, tabId) {
    // First, try to categorize based on URL patterns
    let category = categorizeByURL(tabUrl);

    if (!category) {
        // If URL-based categorization fails, extract text and analyze
        category = await extractAndAnalyzeContent(tabUrl, tabId);
    }

    return category;
}

function categorizeByURL(url) {
    if (url.includes("news")) return "📰 News";
    if (url.includes("amazon.com") || url.includes("ebay.com")) return "🛒 Shopping";
    if (url.includes("mail.google.com")) return "🏢 Work/Emails";
    if (url.includes("youtube.com") || url.includes("netflix.com")) return "🎮 Entertainment";
    if (url.includes("arxiv.org") || url.includes(".edu")) return "🎓 Research";

    return null; // Return null if no category is found
}

async function extractAndAnalyzeContent(tabUrl, tabId) {
    try {
        // Execute a script in the tab to extract the content
        const results = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: () => {
                // This function runs in the context of the web page
                const bodyText = document.body.innerText;
                const htmlStructure = document.documentElement.outerHTML; // Get the full HTML
                return { text: bodyText, html: htmlStructure }; // Return both
            }
        });

        if (results && results[0] && results[0].result) {
            const pageContent = results[0].result;
            const category = await analyzeTextContent(tabUrl, pageContent.text);
            return category;
        } else {
            console.warn("Could not extract content from tab.");
            return null;
        }
    } catch (error) {
        console.error("Error extracting content:", error);
        return null;
    }
}

async function analyzeTextContent(url, text) {
    try {
        const prompt = `Analyze the following web page content and categorize it into one of these categories: News, Research, Shopping, Work/Emails, Entertainment, Reading/Articles, Distraction Hell. Also consider the URL. Provide only the category label. If you cannot determine a category, respond with "Uncategorized".

        URL: ${url}

        Content:
        ${text}
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("Gemini API Response:", responseText);

        // Clean up the response. Gemini might add extra text.
        const category = responseText.trim();

        // Validate the category. Add more robust validation if needed.
        const validCategories = ["News", "Research", "Shopping", "Work/Emails", "Entertainment", "Reading/Articles", "Distraction Hell", "Uncategorized"];
        if (!validCategories.includes(category)) {
            console.warn("Invalid category from Gemini API:", category);
            return null; // Or a default category
        }

        return category;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;  // Or a default category
    }
}

// Keep service worker alive
function setupKeepAlive() {
    if (keepAliveInterval) clearInterval(keepAliveInterval);
    keepAliveInterval = setInterval(() => {
        console.log("Service worker keep-alive ping", new Date().toISOString());
    }, 20000); // Ping every 20 seconds
}

// Check tabs every 5 seconds (optional fallback)
chrome.alarms.create({ periodInMinutes: 0.083 }); // 5 seconds
chrome.alarms.onAlarm.addListener(updateTabCount);

// Initial setup
setupKeepAlive();
updateTabCount();

// Add unload handler to log service worker lifecycle
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});