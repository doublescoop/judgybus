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
    } catch (error) {
      console.error("Error updating tab count:", error);
    }
}

// Listen for tab updates
chrome.tabs.onCreated.addListener(updateTabCount);
chrome.tabs.onRemoved.addListener(updateTabCount);
chrome.tabs.onUpdated.addListener(updateTabCount);

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