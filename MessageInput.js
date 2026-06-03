import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '../store';
import { api, getSocket, formatTime, AMBIENT_STATUS_CONFIG, detectMood } from '../utils';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MemoryBoard from './MemoryBoard';
import LiveLocationPanel from './LiveLocationPanel';
import TimeCapsuleModal from './TimeCapsuleModal';
import './ChatArea.css';

export default function ChatArea() {
  const { user, token, activeConversation, messages, setMessages, activePanel, moodColor, uiMoodIntensity } = useStore();
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [timeCapsuleModal, setTimeCapsuleModal] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const convId = activeConversation?._id;
  const convMessages = convId ? (messages[convId] || []) : [];

  // Load messages when conversation changes
  useEffect(() => {
    if (!convId) return;
    const load = async () => {
      if (messages[convId]?.length > 0) return; // Already loaded
      setLoading(true);
      try {
        const data = await api.get(`/messages/${convId}`, token);
        setMessages(convId, data.messages);
      } catch (e) {} finally { setLoading(false); }
    };
    load();
  }, [convId, token]);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [convMessages.length]);

  // Group messages by date
  const groupedMessages = React.useMemo(() => {
    const groups = [];
    let lastDate = null;
    convMessages.forEach(msg => {
      const date = new Date(msg.createdAt).toDateString();
      if (date !== lastDate) {
        groups.push({ type: 'date', date });
        lastDate = date;
      }
      groups.push({ type: 'message', msg });
    });
    return groups;
  }, [convMessages]);

  if (!activeConversation) {
    return (
      <div className="chat-empty">
        <div className="chat-empty-inner">
          <div className="nexus-watermark">⬡</div>
          <h2>Welcome to Nexus</h2>
          <p>Select a conversation or search for someone to start messaging</p>
          <div className="feature-pills">
            <span>📻 Walkie-Talkie</span>
            <span>⏰ Time Capsules</span>
            <span>🎨 Mood Sync</span>
            <span>📍 Live Location</span>
            <span>🧠 Memory Board</span>
            <span>🔇 Silent React</span>
          </div>
        </div>
      </div>
    );
  }

  const moodStyle = uiMoodIntensity > 0.3 ? {
    '--accent': moodColor,
    '--border-bright': `${moodColor}33`,
  } : {};

  return (
    <div className="chat-area" style={moodStyle}>
      <ChatHeader onTimeCapsule={() => setTimeCapsuleModal(true)} />

      <div className="chat-body">
        {/* Main message area */}
        <div className="messages-wrap">
          {loading ? (
            <div className="messages-loading">
              <div className="loading-spinner" />
            </div>
          ) : (
            <div className="messages-list" ref={containerRef}>
              {groupedMessages.map((item, i) => {
                if (item.type === 'date') {
                  return (
                    <div key={`date-${i}`} className="date-separator">
                      <span>{new Date(item.date).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                  );
                }
                return (
                  <MessageBubble
                    key={item.msg._id}
                    message={item.msg}
                    isOwn={item.msg.sender?._id === user?._id || item.msg.sender === user?._id}
                    onReply={() => setReplyTo(item.msg)}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Side panels */}
        {activePanel === 'memoryBoard' && <MemoryBoard />}
        {activePanel === 'liveLocation' && <LiveLocationPanel />}
      </div>

      <MessageInput replyTo={replyTo} onClearReply={() => setReplyTo(null)} />

      {timeCapsuleModal && (
        <TimeCapsuleModal onClose={() => setTimeCapsuleModal(false)} />
      )}
    </div>
  );
}
