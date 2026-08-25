// Fetch and inject CSS via JavaScript (bypasses CSP)
(async function() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/testdemoqwenai2025-creator/AISupChn-preview/main/_next/static/chunks/49b4eac33064f972.css');
    const css = await response.text();
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    // Also load theme CSS
    const themeResponse = await fetch('https://raw.githubusercontent.com/testdemoqwenai2025-creator/AISupChn-preview/main/_next/static/chunks/34d933785a17edf3.css');
    const themeCss = await themeResponse.text();
    const themeStyle = document.createElement('style');
    themeStyle.textContent = themeCss;
    document.head.appendChild(themeStyle);
    
    return 'CSS injected: ' + css.length + ' + ' + themeCss.length + ' chars';
  } catch(e) {
    return 'Error: ' + e.message;
  }
})();
