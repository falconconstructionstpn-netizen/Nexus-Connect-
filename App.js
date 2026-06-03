import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../store';
import { getSocket } from '../utils';
import './MemoryBoard.css';

export default function MemoryBoard() {
  const { activeConversation } = useStore();
  const [addMode, setAddMode] = useState(null); // 'note' | 'link' | 'image'
  const [inputVal, setInputVal] = useState('');
  const socket = getSocket();

  const board = activeConversation?.memoryBoard || [];

  const addItem = () => {
    if (!inputVal.trim()) return;
    const item = {
      type: addMode,
      content: addMode === 'note' ? inputVal : '',
      url: addMode !== 'note' ? inputVal : '',
      title: addMode === 'link' ? inputVal : '',
      position: { x: Math.random() * 60 + 10, y: Math.random() * 60 + 10 },
      size: { w: 200, h: 150 },
      color: ['#00F5FF', '#7C3AED', '#F59E0B', '#2ED573', '#FF6B6B'][Math.floor(Math.random() * 5)]
    };
    socket?.emit('addMemoryItem', {
      conversationId: activeConversation._id,
      item
    });
    setInputVal('');
    setAddMode(null);
    toast.success('Added to memory board!');
  };

  const removeItem = (itemId) => {
    socket?.emit('removeMemoryItem', {
      conversationId: activeConversation._id,
      itemId
    });
  };

  return (
    <div className="memory-board">
      <div className="mb-header">
        <span className="mb-title">🧠 Memory Board</span>
        <div className="mb-add-btns">
          <button onClick={() => setAddMode('note')}>+ Note</button>
          <button onClick={() => setAddMode('link')}>+ Link</button>
          <button onClick={() => setAddMode('image')}>+ Image URL</button>
        </div>
      </div>

      {addMode && (
        <div className="mb-add-form">
          <input
            type="text"
            placeholder={addMode === 'note' ? 'Write a note...' : addMode === 'link' ? 'Paste URL...' : 'Image URL...'}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
            autoFocus
          />
          <button onClick={addItem}>Add</button>
          <button onClick={() => setAddMode(null)}>✕</button>
        </div>
      )}

      <div className="mb-canvas">
        {board.length === 0 && (
          <div className="mb-empty">
            <span>🧠</span>
            <p>Your Memory Board is empty</p>
            <span>Add notes, links, and images to build a shared visual space</span>
          </div>
        )}
        {board.map(item => (
          <div
            key={item._id}
            className={`mb-card mb-card-${item.type}`}
            style={{
              left: `${item.position?.x || 10}%`,
              top: `${item.position?.y || 10}%`,
              borderColor: item.color || 'var(--accent)',
              '--item-color': item.color || 'var(--accent)'
            }}
          >
            <button className="mb-remove" onClick={() => removeItem(item._id)}>✕</button>
            {item.type === 'note' && <p className="mb-note-text">{item.content}</p>}
            {item.type === 'link' && (
              <a href={item.url} target="_blank" rel="noreferrer" className="mb-link">
                🔗 {item.url?.slice(0, 30)}...
              </a>
            )}
            {item.type === 'image' && (
              <img src={item.url} alt="Memory" className="mb-img" />
            )}
            <span className="mb-date">{new Date(item.addedAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
