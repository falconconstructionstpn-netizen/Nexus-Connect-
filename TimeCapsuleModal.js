import React, { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../store';
import { getSocket, api, detectMood } from '../utils';
import './MessageInput.css';

export default function MessageInput({ replyTo, onClearReply }) {
  const { user, token, activeConversation, setMoodColor, setUiMoodIntensity } = useStore();
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordTimerRef = useRef(null);

  // Mood-sync tracking
  const typingDataRef = useRef({ speed: 0, pauses: 0, deletions: 0, lastKey: Date.now() });
  const socket = getSocket();
  const convId = activeConversation?._id;

  // Typing detection with mood analysis
  const handleKeyDown = useCallback((e) => {
    const now = Date.now();
    const td = typingDataRef.current;
    const interval = now - td.lastKey;
    td.speed = interval < 50 ? td.speed + 2 : Math.max(0, td.speed - 1);
    if (interval > 1000) td.pauses += 1;
    if (e.key === 'Backspace') td.deletions += 1;
    td.lastKey = now;

    // Update mood every ~10 keystrokes
    if (Math.random() < 0.1) {
      const mood = detectMood(td);
      setMoodColor(mood.color);
      setUiMoodIntensity(mood.intensity);
    }

    // Typing indicator
    if (convId) {
      socket?.emit('typing', {
        conversationId: convId,
        isTyping: true,
        typingSpeed: td.speed,
        pausePattern: td.pauses
      });
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [convId, socket]);

  const sendMessage = useCallback(() => {
    if (!text.trim() || !convId) return;
    socket?.emit('sendMessage', {
      conversationId: convId,
      content: text.trim(),
      type: 'text',
      replyTo: replyTo?._id
    });
    setText('');
    onClearReply?.();
    typingDataRef.current = { speed: 0, pauses: 0, deletions: 0, lastKey: Date.now() };
    socket?.emit('typing', { conversationId: convId, isTyping: false });
    // Fade mood back to neutral
    setTimeout(() => setUiMoodIntensity(0.1), 3000);
  }, [text, convId, replyTo, socket]);

  // Send typing stop after idle
  useEffect(() => {
    if (!text) {
      socket?.emit('typing', { conversationId: convId, isTyping: false });
    }
  }, [text]);

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = e => audioChunksRef.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([blob], 'voice.webm', { type: 'audio/webm' });
        await sendVoiceNote(file);
      };

      mr.start();
      setRecording(true);
      setRecordingTime(0);
      recordTimerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } catch (e) {
      toast.error('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    clearInterval(recordTimerRef.current);
    setRecording(false);
    setRecordingTime(0);
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      audioChunksRef.current = [];
    }
    clearInterval(recordTimerRef.current);
    setRecording(false);
    setRecordingTime(0);
  };

  const sendVoiceNote = async (file) => {
    if (!convId) return;
    setUploading(true);
    try {
      const data = await api.upload(file, token);
      socket?.emit('sendMessage', {
        conversationId: convId,
        content: '',
        type: 'voiceNote',
        mediaUrl: data.url,
        isVoiceNote: true,
        duration: recordingTime
      });
    } catch (e) {
      toast.error('Failed to send voice note');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !convId) return;
    setShowAttach(false);
    setUploading(true);
    try {
      const data = await api.upload(file, token);
      const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file';
      socket?.emit('sendMessage', {
        conversationId: convId,
        content: '',
        type,
        mediaUrl: data.url
      });
    } catch (e) {
      toast.error('Failed to send file');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const sendLocation = () => {
    if (!navigator.geolocation) return toast.error('Location not supported');
    navigator.geolocation.getCurrentPosition(pos => {
      socket?.emit('sendMessage', {
        conversationId: convId,
        type: 'location',
        content: 'Shared location',
        location: { lat: pos.coords.latitude, lng: pos.coords.longitude }
      });
      setShowAttach(false);
    }, () => toast.error('Location access denied'));
  };

  if (!convId) return null;

  return (
    <div className="message-input-wrap">
      {/* Reply preview */}
      {replyTo && (
        <div className="reply-bar-preview">
          <span className="reply-accent-bar" />
          <div className="reply-info">
            <span className="reply-to-name">Replying to {replyTo.sender?.name}</span>
            <span className="reply-to-content truncate">{replyTo.content || '📎 Media'}</span>
          </div>
          <button className="reply-close" onClick={onClearReply}>✕</button>
        </div>
      )}

      <div className="message-input-row">
        {/* Attach */}
        <div className="attach-wrap">
          <button className="input-btn" onClick={() => setShowAttach(!showAttach)}>📎</button>
          {showAttach && (
            <div className="attach-menu">
              <button onClick={() => { fileInputRef.current?.click(); fileInputRef.current.accept = 'image/*,video/*'; }}>📷 Photo/Video</button>
              <button onClick={() => { fileInputRef.current?.click(); fileInputRef.current.accept = '*'; }}>📄 File</button>
              <button onClick={sendLocation}>📍 Location</button>
            </div>
          )}
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileSelect} />
        </div>

        {/* Recording UI */}
        {recording ? (
          <div className="recording-ui">
            <button className="cancel-rec" onClick={cancelRecording}>✕</button>
            <div className="rec-indicator">
              <span className="rec-dot" />
              <span className="rec-time">{Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}</span>
            </div>
            <div className="rec-waves">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rec-wave-bar" style={{ animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
            <button className="send-rec" onClick={stopRecording}>✓</button>
          </div>
        ) : (
          <>
            <textarea
              ref={inputRef}
              className="message-textarea"
              placeholder="Message..."
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              style={{ resize: 'none' }}
            />
            {uploading && <span className="upload-indicator">⏳</span>}
          </>
        )}

        {/* Send or mic */}
        {!recording && (
          text.trim() ? (
            <button className="send-btn" onClick={sendMessage}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          ) : (
            <button className="input-btn mic-btn" onMouseDown={startRecording} onTouchStart={startRecording}>🎙</button>
          )
        )}
      </div>
    </div>
  );
}
