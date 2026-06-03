.bubble-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 2px 0;
  position: relative;
  animation: messageIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bubble-wrap.own { flex-direction: row-reverse; }

.bubble-avatar { flex-shrink: 0; margin-bottom: 4px; }
.bubble-col { display: flex; flex-direction: column; max-width: 70%; gap: 4px; }
.bubble-wrap.own .bubble-col { align-items: flex-end; }

.bubble-sender { font-size: 11px; font-weight: 600; color: var(--accent); padding: 0 12px; }

.reply-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  margin-bottom: 2px;
  max-width: 100%;
}
.reply-bar { width: 3px; height: 30px; background: var(--accent); border-radius: 2px; flex-shrink: 0; }
.reply-text { font-size: 12px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.bubble {
  padding: 10px 14px;
  border-radius: 18px;
  position: relative;
  word-break: break-word;
  transition: var(--transition);
}
.bubble-own {
  background: var(--sent-bubble);
  border: 1px solid rgba(0,245,255,0.15);
  border-bottom-right-radius: 4px;
  color: var(--text-primary);
}
.bubble-other {
  background: var(--received-bubble);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
  color: var(--text-primary);
}
.bubble-media { padding: 4px; overflow: hidden; }

.msg-text { font-size: 15px; line-height: 1.5; }
.tc-badge { font-size: 12px; }

.msg-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
  display: block;
  transition: opacity 0.2s;
}
.msg-image:hover { opacity: 0.9; }
.media-caption { font-size: 13px; padding: 6px 8px 0; color: var(--text-secondary); }

.msg-video { max-width: 100%; max-height: 300px; border-radius: 14px; }

.voice-note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
  min-width: 180px;
}
.vn-icon { font-size: 20px; }
.vn-waveform { flex: 1; display: flex; align-items: center; gap: 2px; height: 30px; }
.vn-bar {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  opacity: 0.7;
  flex-shrink: 0;
}
.vn-duration { font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); }

.location-message {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--accent);
}

.system-message {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.time-capsule-locked {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.05)) !important;
  border: 1px solid rgba(245,158,11,0.3) !important;
}
.tc-icon { font-size: 24px; }
.tc-label { font-size: 13px; font-weight: 600; color: var(--accent-3); }
.tc-date { font-size: 11px; color: rgba(245,158,11,0.7); }

.deleted-bubble { color: var(--text-muted); font-style: italic; font-size: 13px; }

.disappearing { position: relative; }
.disappearing::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(124,58,237,0.1) 100%);
  border-radius: 18px;
  pointer-events: none;
}

.bubble-footer {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 4px;
  flex-wrap: wrap;
}
.bubble-time { font-size: 10px; color: var(--text-muted); font-family: var(--font-mono); }
.edited-label { font-size: 10px; color: var(--text-muted); font-style: italic; }
.disappear-icon { font-size: 10px; }
.read-receipt { font-size: 11px; color: var(--text-muted); }
.read-receipt.read { color: var(--accent); }

/* Reactions */
.reactions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0 4px;
}
.reaction-chip {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 13px;
  cursor: default;
}
.reaction-count { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }
.reaction-revealed { font-size: 10px; margin-left: 2px; }

/* Comprehension */
.comprehension-wrap { margin-top: 4px; }
.comprehension-input {
  background: var(--bg-tertiary);
  border: 1px solid rgba(124,58,237,0.3);
  border-radius: 8px;
  padding: 6px 10px;
  color: var(--text-primary);
  font-size: 12px;
  font-family: inherit;
  width: 100%;
  max-width: 220px;
}

/* Action bar */
.action-bar {
  display: flex;
  gap: 2px;
  position: absolute;
  bottom: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 2px;
  box-shadow: var(--shadow);
  animation: fadeIn 0.1s ease;
  z-index: 10;
}
.action-bar.own { right: 0; transform: translateX(0); }
.action-bar.other { left: 48px; }
.action-bar button {
  padding: 4px 6px;
  background: none;
  font-size: 14px;
  border-radius: 7px;
  transition: var(--transition);
}
.action-bar button:hover { background: var(--bg-hover); }

/* Emoji picker */
.emoji-quick {
  position: absolute;
  bottom: 40px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 6px;
  display: flex;
  gap: 4px;
  box-shadow: var(--shadow);
  z-index: 11;
  animation: fadeIn 0.1s ease;
}
.emoji-quick.own { right: 0; }
.emoji-quick.other { left: 48px; }
.emoji-quick button { font-size: 20px; padding: 4px; border-radius: 8px; background: none; transition: var(--transition); }
.emoji-quick button:hover { background: var(--bg-hover); transform: scale(1.2); }
