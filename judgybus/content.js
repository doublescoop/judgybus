// Inject floating gremlin into the page
console.log('Content script loaded successfully!');

// Extensive array of gremlin texts to randomly choose from
const gremlinTexts = [
  '😠',
  '(◣_◢)',
  '(╰ ‿ ╯)??',
  'ಠ_ಠ',
  '🔥(¬▂¬)🔥',
  '(¬､¬)',
  '( ͠° ͟ʖ ͡° )',
  '(ง ͠° ͟ل͜ ͡°)ง',
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

// Function to get a random gremlin text
function getRandomGremlinText() {
  const randomIndex = Math.floor(Math.random() * gremlinTexts.length);
  return gremlinTexts[randomIndex];
}

const gremlin = document.createElement('div');
const initialText = getRandomGremlinText();
gremlin.textContent = initialText;
gremlin.style.position = 'fixed';
gremlin.style.top = '20px';
gremlin.style.right = '50px';
gremlin.style.cursor = 'pointer';
gremlin.style.fontSize = '24px'; // Default size
gremlin.style.zIndex = '9999999'; // Extremely high z-index
gremlin.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; // Bright background for visibility
gremlin.style.height = '60px';
gremlin.style.borderRadius = '50%';
gremlin.style.display = 'flex';
gremlin.style.alignItems = 'center';
gremlin.style.justifyContent = 'center';
gremlin.style.transition = 'all 0.3s ease';
gremlin.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
gremlin.style.border = '2px solid black'; // Add a border for extra visibility
gremlin.style.padding = '5px'; // Add some padding to ensure full text is visible

// Dynamically set width based on text length
function adjustGremlinWidth() {
  const tempSpan = document.createElement('span');
  tempSpan.textContent = gremlin.textContent;
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.fontSize = gremlin.style.fontSize;
  document.body.appendChild(tempSpan);
  
  const textWidth = tempSpan.offsetWidth;
  gremlin.style.width = `${Math.max(textWidth + 20, 50)}px`; // Minimum width of 50px
  
  document.body.removeChild(tempSpan);
}

// Initial width adjustment
adjustGremlinWidth();

console.log('Gremlin element created:', gremlin);

// Hover effects
gremlin.addEventListener('mouseenter', () => {
  gremlin.style.transform = 'scale(1.1)';
  gremlin.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
});

gremlin.addEventListener('mouseleave', () => {
  gremlin.style.transform = 'scale(1)';
  gremlin.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
});

// Ensure the gremlin is added to the body
try {
  document.body.appendChild(gremlin);
  console.log('Gremlin appended to document body');
} catch (error) {
  console.error('Failed to append gremlin:', error);
}

// Update gremlin size based on tab count (example: 20+ tabs → 32px)
chrome.storage.local.get(['tabCount'], (result) => {
  console.log('Tab count retrieved:', result.tabCount);
  if (result.tabCount >= 20) {
    gremlin.style.fontSize = '32px';
    adjustGremlinWidth(); // Readjust width after font size change
    
    // Ensure gremlin is visible
    if (!document.body.contains(gremlin)) {
      document.body.appendChild(gremlin);
    }
  } else {
    // Remove gremlin when tab count is less than 20
    if (document.body.contains(gremlin)) {
      document.body.removeChild(gremlin);
    }
  }
});

// Click gremlin to change text and open popup
gremlin.addEventListener('click', () => {
  // Change to a new random text when clicked
  gremlin.textContent = getRandomGremlinText();
  adjustGremlinWidth(); // Adjust width for new text
  console.log('Gremlin clicked');
  chrome.runtime.sendMessage({ action: "openPopup" });
});