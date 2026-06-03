.message-input-wrap {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  padding: 8px 12px 12px;
}

.reply-bar-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 10px;
  margin-bottom: 8px;
}
.reply-accent-bar { width: 3px; height: 32px; background: var(--accent); border-radius: 2px; flex-shrink: 0; }
.reply-info { flex: 1; min-width: 0; }
.reply-to-name { display: block; font-size: 11px; font-weight: 600; color: var(--accent); }
.reply-to-content { display: block; font-size: 12px; color: var(--text-muted); }
.reply-close { background: none; color: var(--text-muted); font-size: 14px; padding: 4px; border-radius: 6px; }
.reply-close:hover { color: var(--text-primary); }

.message-input-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 6px 6px 6px 12px;
  transition: border-color 0.2s;
}
.message-input-row:focus-within { border-color: var(--border-bright); }

.attach-wrap { position: relative; flex-shrink: 0; }
.attach-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 6px;
  min-width: 160px;
  box-shadow: var(--shadow);
  z-index: 50;
  animation: fadeIn 0.15s ease;
}
.attach-menu button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  background: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  border-radius: 10px;
  text-align: left;
  transition: var(--transition);
}
.attach-menu button:hover { background: var(--bg-hover); }

.input-btn {
  background: none;
  font-size: 20px;
  padding: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: var(--text-secondary);
}
.input-btn:hover { background: var(--bg-hover); }
.mic-btn { font-size: 18px; }

.message-textarea {
  flex: 1;
  background: none;
  color: var(--text-primary);
  font-size: 15px;
  font-family: inherit;
  line-height: 1.5;
  max-height: 120px;
  overflow-y: auto;
  word-break: break-word;
}
.message-textarea::placeholder { color: var(--text-muted); }

.upload-indicator { font-size: 16px; flex-shrink: 0; animation: pulse 1s ease-in-out infinite; }

.send-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  padding: 0;
}
.send-btn:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,245,255,0.3); }

/* Recording UI */
.recording-ui {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}
.cancel-rec {
  background: none;
  color: var(--danger);
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 8px;
}
.rec-indicator { display: flex; align-items: center; gap: 8px; }
.rec-dot {
  width: 8px; height: 8px;
  background: var(--danger);
  border-radius: 50%;
  animation: pulse 0.8s ease-in-out infinite;
}
.rec-time { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
.rec-waves { flex: 1; display: flex; align-items: center; gap: 3px; height: 28px; }
.rec-wave-bar {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: recWave 0.6s ease-in-out infinite alternate;
}
@keyframes recWave {
  from { height: 6px; opacity: 0.4; }
  to { height: 22px; opacity: 1; }
}
.send-rec {
  background: var(--success);
  color: #fff;
  border-radius: 50%;
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
