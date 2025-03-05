
document.addEventListener('DOMContentLoaded', () => {
    // Load tab count and message from storage
    chrome.storage.local.get(['tabCount', 'message'], (result) => {
      document.getElementById('tabCount').textContent = result.tabCount || 0;
      document.getElementById('message').textContent = result.message || "No tabs? Impossible!";
    });
  });
  
  
  document.getElementById('message').textContent = "🐀: Fear my beans!";
  
const appName = 'judgyface';