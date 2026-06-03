.walkie-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.walkie-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(0,245,255,0.3);
  border-radius: 28px;
  padding: 32px 28px;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 0 60px rgba(0,245,255,0.15), var(--shadow);
}

.walkie-header {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.walkie-icon { font-size: 22px; }
.walkie-title { font-family: var(--font-mono); font-size: 14px; font-weight: 700; letter-spacing: 2px; flex: 1; color: var(--accent); }
.walkie-status { font-size: 11px; font-weight: 600; }
.walkie-status.connected { color: var(--success); }
.walkie-status.connecting { color: var(--warning); animation: pulse 1s ease-in-out infinite; }

.walkie-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.walkie-avatar {
  border: 2px solid rgba(0,245,255,0.3);
  box-shadow: var(--walkie-glow);
}
.walkie-user-name { font-size: 18px; font-weight: 600; color: var(--text-primary); }
.walkie-speaking {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--success);
}
.walkie-waves { display: flex; align-items: center; gap: 3px; height: 20px; }
.walkie-wave {
  width: 3px;
  background: var(--success);
  border-radius: 2px;
  animation: recWave 0.5s ease-in-out infinite alternate;
}

/* PTT Button */
.ptt-btn {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #1A3340 0%, #0D1F2A 100%);
  border: 3px solid rgba(0,245,255,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.05);
}
.ptt-btn:hover {
  border-color: var(--accent);
  box-shadow: var(--walkie-glow), 0 8px 32px rgba(0,0,0,0.4);
}
.ptt-btn.ptt-active {
  background: radial-gradient(circle, #002233 0%, #001122 100%);
  border-color: var(--accent);
  transform: scale(0.95);
  box-shadow: var(--walkie-glow);
  animation: walkiePulse 1s ease-out infinite;
}
.ptt-icon { font-size: 36px; transition: transform 0.1s; }
.ptt-btn.ptt-active .ptt-icon { transform: scale(1.1); }
.ptt-label {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--accent);
}

.walkie-tip {
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
}

.walkie-end {
  padding: 10px 28px;
  background: rgba(255,71,87,0.12);
  border: 1px solid rgba(255,71,87,0.3);
  border-radius: 12px;
  color: var(--danger);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}
.walkie-end:hover { background: rgba(255,71,87,0.2); }
