.memory-board {
  width: 360px;
  min-width: 360px;
  border-left: 1px solid var(--border);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 900px) {
  .memory-board { position: absolute; right: 0; top: 0; bottom: 0; z-index: 50; box-shadow: -4px 0 24px rgba(0,0,0,0.3); }
}

.mb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  gap: 8px;
}
.mb-title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.mb-add-btns { display: flex; gap: 6px; }
.mb-add-btns button {
  padding: 5px 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 11px;
  font-family: inherit;
  cursor: pointer;
  transition: var(--transition);
}
.mb-add-btns button:hover { border-color: var(--accent); color: var(--accent); }

.mb-add-form {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.mb-add-form input {
  flex: 1;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  padding: 8px 10px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 13px;
}
.mb-add-form button {
  padding: 6px 12px;
  background: rgba(0,245,255,0.1);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  color: var(--accent);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.mb-canvas {
  flex: 1;
  position: relative;
  overflow: auto;
  background: var(--bg-primary);
  background-image:
    radial-gradient(circle, rgba(0,245,255,0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

.mb-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--text-muted);
}
.mb-empty span:first-child { font-size: 40px; opacity: 0.3; }
.mb-empty p { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
.mb-empty span:last-child { font-size: 12px; text-align: center; max-width: 200px; }

.mb-card {
  position: absolute;
  background: var(--bg-secondary);
  border: 1px solid;
  border-radius: 14px;
  padding: 12px;
  width: 180px;
  min-height: 100px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  cursor: move;
  animation: fadeIn 0.3s ease;
}
.mb-remove {
  position: absolute;
  top: 6px; right: 6px;
  background: rgba(255,71,87,0.1);
  border: none;
  border-radius: 6px;
  color: var(--danger);
  font-size: 10px;
  padding: 2px 6px;
  cursor: pointer;
  opacity: 0;
  transition: var(--transition);
}
.mb-card:hover .mb-remove { opacity: 1; }
.mb-note-text { font-size: 13px; color: var(--text-secondary); line-height: 1.5; padding-right: 20px; }
.mb-link { font-size: 12px; color: var(--item-color, var(--accent)); word-break: break-all; }
.mb-img { width: 100%; height: 120px; object-fit: cover; border-radius: 8px; }
.mb-date { display: block; font-size: 10px; color: var(--text-muted); margin-top: 8px; font-family: var(--font-mono); }
