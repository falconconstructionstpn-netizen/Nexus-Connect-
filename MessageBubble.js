import React, { useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import { useStore } from '../store';
import { getSocket, getIceConfig, formatDuration } from '../utils';
import './ActiveCallScreen.css';

export default function ActiveCallScreen() {
  const { activeCall, setActiveCall, user, conversations } = useStore();
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const socket = getSocket();

  const { callId, type, remoteUser, isInitiator } = activeCall || {};
  const isVideo = type === 'video';

  useEffect(() => {
    if (!callId) return;
    initCall();

    timerRef.current = setInterval(() => setCallDuration(d => d + 1), 1000);

    const onSignal = ({ callId: cId, signal, fromUserId }) => {
      if (cId === callId && peerRef.current) peerRef.current.signal(signal);
    };
    const onIce = ({ callId: cId, candidate, fromUserId }) => {
      // handled by simple-peer trickle
    };
    const onAccepted = ({ callId: cId }) => {
      // peer will auto-connect via signals
    };

    socket?.on('callSignal', onSignal);
    socket?.on('callEnded', endCall);

    return () => {
      socket?.off('callSignal', onSignal);
      socket?.off('callEnded', endCall);
      clearInterval(timerRef.current);
    };
  }, [callId]);

  const initCall = async () => {
    try {
      const constraints = { audio: true, video: isVideo };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (localVideoRef.current && isVideo) {
        localVideoRef.current.srcObject = stream;
      }

      const peer = new SimplePeer({
        initiator: isInitiator,
        stream,
        config: getIceConfig(),
        trickle: true
      });
      peerRef.current = peer;

      peer.on('signal', (signal) => {
        socket?.emit('callSignal', {
          callId,
          signal,
          targetUserId: remoteUser._id
        });
      });

      peer.on('stream', (remoteStream) => {
        if (isVideo && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play().catch(() => {});
        } else if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play().catch(() => {});
        }
      });
    } catch (e) {
      console.error('Call init error:', e);
    }
  };

  const endCall = () => {
    peerRef.current?.destroy();
    streamRef.current?.getTracks().forEach(t => t.stop());
    socket?.emit('endCall', { callId, otherUserId: remoteUser?._id });
    setActiveCall(null);
    clearInterval(timerRef.current);
  };

  const toggleMute = () => {
    const tracks = streamRef.current?.getAudioTracks();
    if (tracks) tracks.forEach(t => t.enabled = muted);
    setMuted(!muted);
  };

  const toggleVideo = () => {
    const tracks = streamRef.current?.getVideoTracks();
    if (tracks) tracks.forEach(t => t.enabled = videoOff);
    setVideoOff(!videoOff);
  };

  return (
    <div className={`call-screen ${isVideo ? 'video-call' : 'voice-call'}`}>
      <audio ref={remoteAudioRef} autoPlay />

      {isVideo ? (
        <div className="video-area">
          <video ref={remoteVideoRef} className="remote-video" autoPlay playsInline />
          <video ref={localVideoRef} className="local-video" autoPlay playsInline muted />
        </div>
      ) : (
        <div className="voice-area">
          <div className="call-avatar">
            <div className="avatar avatar-lg call-avatar-img">
              {remoteUser?.avatar ? <img src={remoteUser.avatar} alt={remoteUser.name} /> : (remoteUser?.name || '?')[0].toUpperCase()}
            </div>
            <div className="call-pulse" />
            <div className="call-pulse delay-1" />
          </div>
          <div className="call-user-name">{remoteUser?.name}</div>
          <div className="call-timer">{formatDuration(callDuration)}</div>
        </div>
      )}

      {/* Controls */}
      <div className="call-controls">
        <button className={`call-ctrl ${muted ? 'active' : ''}`} onClick={toggleMute}>
          {muted ? '🔇' : '🎙'}
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </button>
        {isVideo && (
          <button className={`call-ctrl ${videoOff ? 'active' : ''}`} onClick={toggleVideo}>
            {videoOff ? '📵' : '📹'}
            <span>{videoOff ? 'Start Cam' : 'Stop Cam'}</span>
          </button>
        )}
        <button className={`call-ctrl ${speakerOn ? 'active' : ''}`} onClick={() => setSpeakerOn(!speakerOn)}>
          🔊
          <span>Speaker</span>
        </button>
        <button className="call-ctrl end-call-btn" onClick={endCall}>
          📵
          <span>End</span>
        </button>
      </div>
    </div>
  );
}
