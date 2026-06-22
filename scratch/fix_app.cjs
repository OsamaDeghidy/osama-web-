const fs = require('fs');
const path = require('path');

const appTsxPath = 'C:\\work\\apps\\osera web\\src\\App.tsx';
const cssPath = 'C:\\work\\apps\\osera web\\src\\index.css';
const chatTsxPath = 'C:\\work\\apps\\osera web\\src\\components\\AIAssistantChat.tsx';

let appTsx = fs.readFileSync(appTsxPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');
let chatTsx = fs.readFileSync(chatTsxPath, 'utf8');

// --- Fix App.tsx Colors ---
// Backgrounds
appTsx = appTsx.replace(/#0c0e1a/g, '#ffffff'); // Main bg
appTsx = appTsx.replace(/#131629/g, '#f8fafc'); // Cards
appTsx = appTsx.replace(/#1a1e38/g, '#f1f5f9'); // Cards hover

// Text colors
appTsx = appTsx.replace(/#e2e4f0/g, '#1e293b'); // Main text
appTsx = appTsx.replace(/#f0f2ff/g, '#0f172a'); // Headings
appTsx = appTsx.replace(/#9da3c4/g, '#475569'); // Body text
appTsx = appTsx.replace(/#6b72a0/g, '#64748b'); // Captions
appTsx = appTsx.replace(/#3d4168/g, '#94a3b8'); // Borders/muted

// Fix RTL in App.tsx return
appTsx = appTsx.replace(
  /<div style={{ minHeight: "100vh"/,
  '<div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "font-cairo" : "font-syne"} style={{ minHeight: "100vh"'
);

// Fix widths and responsive
appTsx = appTsx.replace(/width: "300px"/g, 'width: "100%", maxWidth: "350px"');

// Fix image consistency
chatTsx = chatTsx.replace(/osamaAvatarImg/g, 'osamaRealImg');
chatTsx = chatTsx.replace(/osama_avatar_1781124448446\.png/g, 'osama_realistic_avatar_1781223721581.jpg');

fs.writeFileSync(appTsxPath, appTsx);
fs.writeFileSync(chatTsxPath, chatTsx);

// --- Fix index.css Colors ---
css = css.replace(/--color-bg:\s*#0c0e1a;/g, '--color-bg: #ffffff;');
css = css.replace(/--color-card:\s*#131629;/g, '--color-card: #f8fafc;');
css = css.replace(/--color-card2:\s*#1a1e38;/g, '--color-card2: #f1f5f9;');

css = css.replace(/background: #0c0e1a;/g, 'background: #ffffff;');
css = css.replace(/color: #e2e4f0;/g, 'color: #1e293b;');
css = css.replace(/color: #f0f2ff;/g, 'color: #0f172a;');
css = css.replace(/color: #9da3c4;/g, 'color: #475569;');
css = css.replace(/color: #6b72a0;/g, 'color: #64748b;');

// Add direction support to CSS classes if needed (like margin/padding flips)
if(!css.includes('.font-cairo')) {
  css += `\n\n/* Language specific font */\n.font-cairo { font-family: var(--font-sans); }\n.font-syne { font-family: var(--font-display); }`;
}

fs.writeFileSync(cssPath, css);

console.log('Colors replaced successfully!');
