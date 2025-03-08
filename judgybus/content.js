// Inject floating judgyface into the page
console.log('Content script loaded successfully!');

// Extensive array of judgyface texts to randomly choose from
const judgyfaceTexts = [
  '😠',
  '(◣_◢)',
  '(╰ ‿ ╯)??',
  'ಠ_ಠ',
  '🔥(¬▂¬)🔥',
  '(¬､¬)',
  '( ͠° ͟ʖ ͡° )',
  '(ง ͠° ͟ล͜ ͡°)ง',
  '( ͡ಠ ͜ʖ ͡ಠ )',
  '( ͡° ʖ̯ ͡° )',
  '( ͡°Ĺ̯ ͡° )',
  '( ͡ಠ ʖ̯ ͡ಠ )',
  'ʕ ͡° ʖ̯ ͡°ʔ',
  '༽◺_◿༼',
  '┐( ͡° ʖ̯ ͡°)┌',
  '(⩺_⩹)',
  '( ͡⚆ ͜ʖ ͡⚆)╭∩╮',
  '( ͡° ͜つ ͡°)╭∩╮',
  '( ° ͜ʖ͡°)╭∩╮',
  '╰༼=ಠਊಠ=༽╯',
  '╭∩╮( ͡° ل͟ ͡° )╭∩╮',
  '∩ (◣_◢) ∩',
  '┌∩┐(◣_◢)┌∩┐',
  '(╬≖_≖)',
  '┌∩┐(⦩_⦨)',
  '☄️(⦩_⦨)',
  '🔫 ༽◺_◿༼',
  '☜(`o´)',
  'ヾ(。◣∀◢。)ﾉ',
  '（ ▽д▽）',
  '┌∩┐（＞д＜）┌∩┐',
  '(⸅⸟⸄)',
  '⸨◺_◿⸩',
  '✩ ⋆ ▀ ̿ĺ̯ ▀̿ ̿',
  '┗(▀̿ĺ̯▀̿ ̿)┓',
  '(▀̿Ĺ̯▀̿ ̿)',
  '🔫(▀̿Ĺ̯▀̿ ̿)',
  '╭∩╮(▀̿ĺ̯▀̿ ̿)ᕗ',
  '╭∩╮(▀̿ĺ̯▀̿ ̿)ᕗ',
  '╭∩╮(▀̿ĺ̯▀̿ ̿)ᕗ',
  'ლ(▀̿̿Ĺ̯̿̿▀̿ლ)',
  '(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄',
  '🔪 (̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄',
  '┬━┬ノ(▀̿̿Ĺ̯̿̿▀̿ ̿ノ)',
  '━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)',
  '┬─┬ノ(ಠ_ಠノ)',
  '┴┬┴┬┤ᕦ( ▀̿ Ĺ̯ ▀̿├┴┬┴',
  '໒( . ͡° ͟ʖ ͡° . )७┌∩┐',
  'ヽ༼ ಠ益ಠ ༽ﾉ',
  'Ψ(`_´ # )↝',
  '<:::::[]=¤ (▀̿̿Ĺ̯̿̿▀̿ ̿)',
  'ლ(⋋·⋌)ლ',
  'ヽ༼ ຈل͜ຈ༼ ▀̿̿Ĺ̯̿̿▀̿ ̿༽Ɵ͆ل͜Ɵ͆ ༽ﾉ',
  '⋋_⋌',
  '( ⋋ · ⋌ ) very angry',
  '＼(｀0´)／',
  '(ง •̀_•́)ง',
  '〴⋋_⋌〵',
  '＼(〇O〇)／',
  '̿̿ ̿̿ ̿̿ ̿\'̿\'\\̵͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/\'̿\'̿ ̿ ̿̿ ̿̿ ̿̿',
  '(╯°□°）╯',
  '٩(๑ `н´๑)۶'
];

// Function to get a random judgyface text
function getRandomJudgyfaceText() {
  const randomIndex = Math.floor(Math.random() * judgyfaceTexts.length);
  return judgyfaceTexts[randomIndex];
}

// Function to summarize the page content
function summarizePage() {
    const title = document.title;
    // Simple summary logic based on title
    return `Summary for the page: ${title}`;
}

const judgyface = document.createElement('div');
const initialText = getRandomJudgyfaceText();
judgyface.textContent = initialText;
judgyface.style.position = 'fixed';
judgyface.style.top = '20px';
judgyface.style.right = '50px';
judgyface.style.cursor = 'pointer';
judgyface.style.fontSize = '24px'; // Default size
judgyface.style.zIndex = '9999999'; // Extremely high z-index
judgyface.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Bright background for visibility
judgyface.style.height = '60px';
judgyface.style.borderRadius = '50%';
judgyface.style.display = 'flex';
judgyface.style.alignItems = 'center';
judgyface.style.justifyContent = 'center';
judgyface.style.transition = 'all 0.3s ease';
judgyface.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
judgyface.style.border = '2px solid black'; // Add a border for extra visibility
judgyface.style.padding = '5px'; // Add some padding to ensure full text is visible

// Dynamically set width based on text length
function adjustJudgyfaceWidth() {
  const tempSpan = document.createElement('span');
  tempSpan.textContent = judgyface.textContent;
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.fontSize = judgyface.style.fontSize;
  document.body.appendChild(tempSpan);
  
  const textWidth = tempSpan.offsetWidth;
  judgyface.style.width = `${Math.max(textWidth + 20, 50)}px`; // Minimum width of 50px
  
  document.body.removeChild(tempSpan);
}

// Initial width adjustment
adjustJudgyfaceWidth();

console.log('Judgyface element created:', judgyface);

// Hover effects
judgyface.addEventListener('mouseenter', () => {
  judgyface.style.transform = 'scale(1.1)';
  judgyface.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
});

judgyface.addEventListener('mouseleave', () => {
  judgyface.style.transform = 'scale(1)';
  judgyface.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
});

// Ensure the judgyface is added to the body
try {
  document.body.appendChild(judgyface);
  console.log('Judgyface appended to document body');
} catch (error) {
  console.error('Failed to append judgyface:', error);
}

// Update judgyface size based on tab count (example: 20+ tabs → 32px)
chrome.storage.local.get(['tabCount'], (result) => {
  console.log('Tab count retrieved:', result.tabCount);
  if (result.tabCount >= 20) {
    judgyface.style.fontSize = '32px';
    adjustJudgyfaceWidth(); // Readjust width after font size change
    
    // Ensure judgyface is visible
    if (!document.body.contains(judgyface)) {
      document.body.appendChild(judgyface);
    }
  } else {
    // Remove judgyface when tab count is less than 20
    if (document.body.contains(judgyface)) {
      document.body.removeChild(judgyface);
    }
  }
});

// Click judgyface to change text and open popup
judgyface.addEventListener('click', () => {
  // Change to a new random text when clicked
  judgyface.textContent = getRandomJudgyfaceText();
  adjustJudgyfaceWidth(); // Adjust width for new text
  console.log('Judgyface clicked');
  chrome.runtime.sendMessage({ action: "openPopup" });
});