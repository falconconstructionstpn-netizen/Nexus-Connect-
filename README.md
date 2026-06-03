# ⬡ NEXUS — Next-Gen Messenger

A full-stack, PWA-installable messaging app with unique features no other chat app has.

## ✨ Features

### Core Messaging
- Real-time messaging with Socket.IO
- Voice & Video calls (WebRTC / SimplePeer) — works globally without VPN
- Group chats with invite links
- Media sharing (images, video, audio files)
- Voice notes with waveform display
- Message reactions, replies, edit, delete
- Read receipts

### 🆕 Unique Features
| Feature | Description |
|---|---|
| 📻 **Walkie-Talkie** | Push-to-Talk real-time channel. Both users must accept. Works globally. |
| 📍 **Live Location** | Mutual consent live GPS map sharing |
| 📷 **Live Camera** | Real-time camera feed sharing (mutual consent) |
| 🎨 **Mood-Sync Messaging** | Typing rhythm detects emotion → UI color shifts |
| ⏰ **Time Capsule Messages** | Lock messages until a future date/time |
| 🧠 **Collaborative Memory Board** | Shared visual pinboard per conversation |
| 🔮 **Disappearing Context** | Messages vanish only after recipient types comprehension keyword |
| 🤫 **Silent Reactions** | Anonymous reactions — names revealed at threshold |
| ⚡ **Ambient Presence** | Auto-inferred status (active/creating/resting/commuting/focused) |
| 🎙 **Voice Fingerprint Rooms** | Audio rooms locked by voice whitelist |

### 📱 PWA — Install on Phone
Users can install Nexus directly from the browser link — no App Store needed!

---

## 🚀 Deployment on Render.com (Free)

### Prerequisites
1. **MongoDB Atlas** (free): https://mongodb.com/atlas → Create M0 cluster → get connection string
2. **Cloudinary** (free): https://cloudinary.com → get Cloud Name, API Key, API Secret
3. **Metered.ca TURN** (free): https://www.metered.ca/tools/openrelay → get TURN credentials
4. **GitHub account**: Push this repo

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Nexus commit"
git remote add origin https://github.com/YOUR_USERNAME/nexus-app.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node version**: 18+

### Step 3: Set Environment Variables
In Render dashboard → Environment → Add these:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/nexus` |
| `JWT_SECRET` | Any long random string |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
| `CLIENT_URL` | Your Render URL e.g. `https://nexus-app.onrender.com` |
| `TURN_SERVER_URL` | From Metered.ca e.g. `turn:openrelay.metered.ca:80` |
| `TURN_USERNAME` | From Metered.ca |
| `TURN_CREDENTIAL` | From Metered.ca |

### Step 4: Share & Install
1. Share your Render URL with friends
2. On mobile: Open in Chrome/Safari → "Add to Home Screen" → installs as PWA
3. On iOS: Safari → Share → Add to Home Screen
4. On Android: Chrome → Menu → Install App

---

## 💻 Local Development

```bash
# Install dependencies
npm run install-all

# Create .env file from example
cp .env.example .env
# Fill in your values

# Start development (runs server + client separately)
# Terminal 1:
node server/index.js

# Terminal 2:
cd client && npm start
```

---

## 📁 Project Structure

```
nexus-app/
├── server/
│   ├── index.js              # Express + Socket.IO server
│   ├── socket/handlers.js    # All real-time socket events
│   ├── models/               # MongoDB models
│   ├── routes/               # REST API routes
│   └── middleware/           # JWT auth
├── client/
│   ├── public/
│   │   ├── manifest.json     # PWA manifest
│   │   └── service-worker.js # Offline PWA
│   └── src/
│       ├── components/       # All UI components
│       ├── pages/            # AuthPage, ChatApp
│       ├── store.js          # Zustand global state
│       └── utils/            # Socket, API, mood detection
├── render.yaml               # Render.com config
└── package.json              # Root scripts
```

---

## 🔧 Tech Stack

| Layer | Tech |
|---|---|
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB (Atlas) |
| Auth | JWT |
| Real-time | Socket.IO + WebRTC (SimplePeer) |
| File Storage | Cloudinary |
| Frontend | React 18, Zustand, Framer Motion |
| Maps | Leaflet (OpenStreetMap) |
| PWA | Service Worker, Web App Manifest |
| Deployment | Render.com |

---

## 📞 About Calls (No VPN Required)
Voice and video calls use WebRTC with:
- **STUN servers**: Google's public STUN (free, globally accessible)
- **TURN server**: Metered.ca relay (for users behind strict NAT/firewalls)

This is the same technology used by WhatsApp, Telegram, Discord — calls work globally without any VPN.
