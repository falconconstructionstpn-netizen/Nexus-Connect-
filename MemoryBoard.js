import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../store';
import { api, formatTime, AMBIENT_STATUS_CONFIG } from '../utils';
import './Sidebar.css';

const AMBIENT = AMBIENT_STATUS_CONFIG;

export default function Sidebar() {
  const { user, token, conversations, activeConversation, setActiveConversation,
          addConversation, onlineUsers, sidebarOpen, setSidebarOpen } = useStore();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState('chats'); // 'chats' | 'search' | 'profile'

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      try {
        setSearching(true);
        const data = await api.get(`/users/search?q=${encodeURIComponent(search)}`, token);
        setSearchResults(data.users);
      } catch (e) {} finally { setSearching(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [search, token]);

  const openChat = async (targetUser) => {
    try {
      const data = await api.post('/messages/conversation', { targetUserId: targetUser._id }, token);
      addConversation(data.conversation);
      setActiveConversation(data.conversation);
      setSearch('');
      setSearchResults([]);
      setView('chats');
    } catch (e) {
      toast.error('Failed to open chat');
    }
  };

  const getOtherUser = (conv) => {
    if (conv.type === 'group') return null;
    return conv.participants?.find(p => p._id !== user?._id);
  };

  const getPresence = (userId) => onlineUsers[userId] || {};

  const filtered = conversations.filter(c => {
    const other = getOtherUser(c);
    const name = c.type === 'group' ? c.name : other?.name || '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-hex">⬡</span>
            <span className="logo-word">NEXUS</span>
          </div>
          <div className="sidebar-user" onClick={() => setView('profile')}>
            <div className="avatar avatar-sm">
              {user?.avatar ? <img src={user.avatar} alt={user.name} /> : user?.name?.[0]?.toUpperCase()}
              <span className="presence-dot online" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search or start new chat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setView('search')}
          />
          {search && <button className="search-clear" onClick={() => { setSearch(''); setView('chats'); }}>✕</button>}
        </div>

        {/* Content */}
        <div className="sidebar-content">
          {view === 'search' && search ? (
            <div className="search-results">
              <p className="section-label">People</p>
              {searching && <div className="loading-spinner-sm" />}
              {searchResults.map(u => (
                <div key={u._id} className="user-item" onClick={() => openChat(u)}>
                  <div className="avatar avatar-sm">
                    {u.avatar ? <img src={u.avatar} alt={u.name} /> : u.name[0].toUpperCase()}
                    <span className={`presence-dot ${getPresence(u._id).status === 'online' ? 'online' : 'offline'}`} />
                  </div>
                  <div className="user-info">
                    <span className="user-name">{u.name}</span>
                    <span className="user-username">@{u.username}</span>
                  </div>
                  {u.ambientStatus && (
                    <span className="ambient-badge" title={AMBIENT[u.ambientStatus]?.label}>
                      {AMBIENT[u.ambientStatus]?.icon}
                    </span>
                  )}
                </div>
              ))}
              {!searching && searchResults.length === 0 && search.length > 1 && (
                <p className="empty-state">No users found</p>
              )}
            </div>
          ) : (
            <div className="convo-list">
              {filtered.length === 0 && (
                <div className="empty-state-full">
                  <div className="empty-icon">💬</div>
                  <p>No conversations yet</p>
                  <span>Search for someone to start chatting</span>
                </div>
              )}
              {filtered.map(conv => {
                const other = getOtherUser(conv);
                const presence = other ? getPresence(other._id) : {};
                const isActive = activeConversation?._id === conv._id;
                const ambient = other ? (presence.ambientStatus || other.ambientStatus) : null;

                return (
                  <div
                    key={conv._id}
                    className={`convo-item ${isActive ? 'active' : ''}`}
                    onClick={() => { setActiveConversation(conv); setSidebarOpen(false); }}
                  >
                    <div className="avatar avatar-md">
                      {conv.type === 'group' ? (
                        <span className="group-icon">👥</span>
                      ) : other?.avatar ? (
                        <img src={other.avatar} alt={other.name} />
                      ) : (
                        (other?.name || conv.name || '?')[0].toUpperCase()
                      )}
                      {other && (
                        <span className={`presence-dot ${presence.status === 'online' ? 'online' : 'offline'}`} />
                      )}
                    </div>
                    <div className="convo-info">
                      <div className="convo-top">
                        <span className="convo-name truncate">
                          {conv.type === 'group' ? conv.name : other?.name || 'Unknown'}
                        </span>
                        <span className="convo-time">{formatTime(conv.lastActivity)}</span>
                      </div>
                      <div className="convo-bottom">
                        <span className="convo-preview truncate">
                          {conv.lastMessage?.deleted ? '🚫 Message deleted' :
                           conv.lastMessage?.isLocked ? '⏰ Time capsule' :
                           conv.lastMessage?.type === 'image' ? '📷 Photo' :
                           conv.lastMessage?.type === 'voiceNote' ? '🎙 Voice message' :
                           conv.lastMessage?.content || 'No messages yet'}
                        </span>
                        {ambient && (
                          <span className="ambient-mini" title={AMBIENT[ambient]?.label}>
                            {AMBIENT[ambient]?.icon}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
