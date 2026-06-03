.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.header-back {
  background: none;
  color: var(--text-secondary);
  font-size: 24px;
  padding: 4px 8px;
  border-radius: 8px;
  display: none;
}
@media (max-width: 768px) { .header-back { display: flex; } }

.header-user { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; cursor: pointer; }
.header-info { min-width: 0; }
.header-name { display: block; font-size: 15px; font-weight: 600; color: var(--text-primary); }
.header-status { display: block; font-size: 12px; color: var(--text-muted); }
.online-text { color: var(--success); }

.header-actions { display: flex; align-items: center; gap: 4px; }
.header-btn {
  background: none;
  font-size: 18px;
  padding: 8px;
  border-radius: 10px;
  color: var(--text-secondary);
  transition: var(--transition);
  display: flex; align-items: center; justify-content: center;
}
.header-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
.walkie-btn:hover { background: rgba(0,245,255,0.1); }

.header-menu-wrap { position: relative; }
.header-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 6px;
  min-width: 200px;
  box-shadow: var(--shadow);
  z-index: 100;
  animation: fadeIn 0.15s ease;
}
.header-dropdown button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  border-radius: 10px;
  text-align: left;
  transition: var(--transition);
}
.header-dropdown button:hover { background: var(--bg-hover); }
.header-dropdown button.danger { color: var(--danger); }
