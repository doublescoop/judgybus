document.addEventListener('DOMContentLoaded', () => {
    // Load tab count and message from storage
    chrome.storage.local.get(['tabCount', 'message'], (result) => {
      document.getElementById('tabCount').textContent = result.tabCount || 0;
      document.getElementById('message').textContent = result.message || "No tabs? Impossible!";
    });
  });
  
  // Function to display categorized tabs
function displayCategorizedTabs(categorizedTabs) {
    const workDiv = document.getElementById('work-tabs');
    const researchDiv = document.getElementById('research-tabs');
    const entertainmentDiv = document.getElementById('entertainment-tabs');
    const distractionDiv = document.getElementById('distraction-tabs');

    // Clear existing content
    workDiv.innerHTML = '';
    researchDiv.innerHTML = '';
    entertainmentDiv.innerHTML = '';
    distractionDiv.innerHTML = '';

    // Populate the categorized tabs
    for (const [category, tabs] of Object.entries(categorizedTabs)) {
        tabs.forEach(tab => {
            const tabElement = document.createElement('div');
            tabElement.innerHTML = `<p>${tab.title} - ${summarizePage()}</p>`;
            tabElement.addEventListener('click', () => {
                chrome.tabs.remove(tab.id);
            });
            switch (category) {
                case 'work':
                    workDiv.appendChild(tabElement);
                    break;
                case 'research':
                    researchDiv.appendChild(tabElement);
                    break;
                case 'entertainment':
                    entertainmentDiv.appendChild(tabElement);
                    break;
                case 'distraction':
                    distractionDiv.appendChild(tabElement);
                    break;
            }
        });
    }
}

document.getElementById('message').textContent = "🐀: Fear my beans!";
  
const appName = 'judgyface';