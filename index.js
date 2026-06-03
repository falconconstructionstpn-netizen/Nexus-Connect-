:root {
  --bg-primary: #0A0A0F;
  --bg-secondary: #111118;
  --bg-tertiary: #1A1A24;
  --bg-hover: #1E1E2E;
  --border: rgba(255,255,255,0.06);
  --border-bright: rgba(0,245,255,0.2);
  --accent: #00F5FF;
  --accent-2: #7C3AED;
  --accent-3: #F59E0B;
  --text-primary: #F0F0FF;
  --text-secondary: rgba(240,240,255,0.6);
  --text-muted: rgba(240,240,255,0.3);
  --danger: #FF4757;
  --success: #2ED573;
  --warning: #FFA502;
  --sent-bubble: linear-gradient(135deg, #00F5FF22, #7C3AED22);
  --received-bubble: #1A1A24;
  --shadow: 0 8px 32px rgba(0,0,0,0.4);
  --radius: 16px;
  --radius-sm: 8px;
  --radius-full: 9999px;
  --font-sans: 'Sora', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --walkie-glow: 0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 10px var(--accent); } 50% { box-shadow: 0 0 30px var(--accent), 0 0 60px var(--accent); } }
@keyframes walkiePulse { 0% { box-shadow: 0 0 0 0 rgba(0,245,255,0.7); } 70% { box-shadow: 0 0 0 20px rgba(0,245,255,0); } 100% { box-shadow: 0 0 0 0 rgba(0,245,255,0); } }
@keyframes ripple { 0% { transform: scale(0); opacity: 0.5; } 100% { transform: scale(4); opacity: 0; } }
@keyframes messageIn { from { opacity: 0; transform: scale(0.8) translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes moodShift { 0%, 100% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(30deg); } }

/* Layout */
.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--bg-primary);
}

/* Input reset */
input, textarea, button { font-family: inherit; outline: none; border: none; }
button { cursor: pointer; }
a { color: var(--accent); text-decoration: none; }

/* Utils */
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.text-accent { color: var(--accent); }
.text-muted { color: var(--text-muted); }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
