.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 500;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.tc-modal {
  background: var(--bg-secondary);
  border: 1px solid var(--border-bright);
  border-radius: 24px;
  padding: 28px 24px;
  width: 100%;
  max-width: 420px;
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.tc-modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.tc-modal-header span { font-size: 24px; }
.tc-modal-header h2 { flex: 1; font-size: 18px; font-weight: 700; color: var(--text-primary); }
.tc-modal-header button { background: none; color: var(--text-muted); font-size: 18px; padding: 4px 8px; border-radius: 6px; }
.tc-modal-desc { font-size: 13px; color: var(--text-muted); margin-bottom: 20px; }

.tc-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.tc-field label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
.tc-field input, .tc-field textarea {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
  transition: var(--transition);
}
.tc-field input:focus, .tc-field textarea:focus { border-color: var(--border-bright); }
.tc-field textarea { resize: none; }

.tc-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  cursor: pointer;
  margin-bottom: 12px;
}
.toggle {
  width: 44px; height: 24px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border);
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s;
}
.toggle::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  background: var(--text-muted);
  border-radius: 50%;
  top: 2px; left: 2px;
  transition: all 0.2s;
}
.toggle.on { background: rgba(0,245,255,0.2); border-color: var(--accent); }
.toggle.on::after { left: 22px; background: var(--accent); }
.tc-toggle span { font-size: 13px; color: var(--text-secondary); }

.tc-actions { display: flex; gap: 12px; margin-top: 8px; }
.tc-cancel {
  flex: 1; padding: 12px;
  background: none; border: 1px solid var(--border);
  border-radius: 12px; color: var(--text-muted);
  font-family: inherit; font-size: 14px; cursor: pointer;
  transition: var(--transition);
}
.tc-cancel:hover { background: var(--bg-hover); }
.tc-send {
  flex: 2; padding: 12px;
  background: linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2));
  border: 1px solid var(--border-bright);
  border-radius: 12px; color: var(--accent);
  font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
  transition: var(--transition);
}
.tc-send:hover { opacity: 0.8; }
