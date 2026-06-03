import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store';
import { initSocket, disconnectSocket, inferAmbientStatus } from './utils';
import AuthPage from './pages/AuthPage';
import ChatApp from './pages/ChatApp';
import './App.css';

function App() {
  const { token, user } = useStore();

  useEffect(() => {
    if (token && user) {
      const socket = initSocket(token);

      socket.on('connect', () => {
        // Set initial ambient status
        const status = inferAmbientStatus();
        socket.emit('ambientStatus', { status });
      });

      // Global socket events handled in ChatApp
      return () => disconnectSocket();
    }
  }, [token, user]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A1A24',
            color: '#F0F0FF',
            border: '1px solid rgba(0,245,255,0.2)',
            borderRadius: '12px',
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px'
          }
        }}
      />
      <Routes>
        <Route path="/auth" element={!token ? <AuthPage /> : <Navigate to="/" replace />} />
        <Route path="/*" element={token ? <ChatApp /> : <Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
