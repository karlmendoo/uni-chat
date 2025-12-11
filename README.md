# UnivChat - Anonymous Video Chat for University Students 🎓

<div align="center">

![UnivChat Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=UnivChat+-+Connect+with+Students+Worldwide)

**Connect, chat, and make friends with university students from around the world**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.7-green)](https://socket.io/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-orange)](https://webrtc.org/)

</div>

## 🌟 Overview

UnivChat is a modern, anonymous video chat platform designed exclusively for university and college students. Connect with peers from your institution or discover students from universities worldwide - all without any login, email, or phone verification required.

## ✨ Features

### 🔒 Complete Privacy
- **No Registration Required**: Jump right in without creating an account
- **Anonymous**: Choose any username you like
- **No Data Collection**: Your conversations are peer-to-peer and private

### 🎥 High-Quality Video Chat
- **HD Video & Audio**: Crystal clear communication powered by WebRTC
- **Peer-to-Peer**: Direct connections for the best quality and lowest latency
- **Modern UI**: Beautiful glassmorphism design with smooth animations

### 🌍 Global Reach
- **100+ Universities**: Major universities from around the world
- **Smart Filtering**: Match with students from your university or explore globally
- **Instant Matching**: Advanced matchmaking algorithm finds you compatible chat partners

### 💬 Real-Time Chat
- **Text Messaging**: Chat sidebar alongside video calls
- **Typing Indicators**: See when your chat partner is typing
- **Message Timestamps**: Track conversation flow

### 🎮 Intuitive Controls
- **One-Click Skip**: Not vibing? Skip to the next person instantly
- **Mute/Unmute**: Full control over your audio
- **Camera Toggle**: Turn your camera on or off anytime
- **End Chat**: Exit gracefully whenever you want

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with Framer Motion
- **Icons**: Lucide React
- **Real-time**: Socket.io Client
- **Video**: WebRTC API

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Real-time**: Socket.io Server
- **Matchmaking**: Custom queue-based algorithm

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/1200x600/0f172a/ffffff?text=Beautiful+Landing+Page+with+Glassmorphism)

*Modern hero section with gradient backgrounds and smooth animations*

### Video Chat Interface
![Chat Interface](https://via.placeholder.com/1200x600/0f172a/ffffff?text=Split+Screen+Video+Chat+Interface)

*Split screen layout with glassmorphism UI elements*

### Chat Sidebar
![Chat Sidebar](https://via.placeholder.com/600x800/0f172a/ffffff?text=Real-time+Text+Chat)

*Collapsible chat panel with typing indicators*

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/karlmendoo/uni-chat.git
cd uni-chat
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd ../server
npm install
```

4. **Set up environment variables**

**Frontend (.env.local)**

Create a `.env.local` file in the `frontend` directory:
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Socket.io Server URL
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

**Backend (.env)**

Create a `.env` file in the `server` directory:
```bash
cd server
cp .env.example .env
```

Edit `.env`:
```env
# Server Port
PORT=3001

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

> **Important**: The server now uses the `dotenv` package to load environment variables. Make sure to create the `.env` file before starting the server, or environment variables won't be loaded!

### Running the Application

You'll need to run both the frontend and backend servers.

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

The server will start on `http://localhost:3001`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

The application will open on `http://localhost:3000`

### Building for Production

#### Frontend
```bash
cd frontend
npm run build
npm start
```

For production deployment, update your `.env.local`:
```env
NEXT_PUBLIC_SOCKET_URL=https://your-server-domain.com
```

#### Backend
```bash
cd server
npm start
```

For production deployment, update your `.env`:
```env
PORT=3001
CLIENT_URL=https://your-frontend-domain.com
```

> **Production Tips**:
> - Use environment-specific `.env` files
> - Never commit `.env` files to version control
> - Set environment variables directly in your hosting platform (Vercel, Railway, etc.)
> - Enable HTTPS for WebRTC to work properly in production

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` → `#8b5cf6` (Vibrant purple/indigo gradient)
- **Accent**: `#14b8a6` (Teal/cyan)
- **Background**: `#0f172a`, `#1e293b` (Deep navy/slate)

### Visual Effects
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Animated Gradients**: Smooth color transitions
- **Hover States**: Micro-interactions on all interactive elements
- **Glow Effects**: Subtle shadows with primary color tints

## 🏗️ Project Structure

```
uni-chat/
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── chat/
│   │   │   └── page.tsx          # Video chat room
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── VideoPlayer.tsx       # Video player component
│   │   ├── ChatSidebar.tsx       # Text chat component
│   │   ├── ControlBar.tsx        # Video controls
│   │   └── UniversitySelect.tsx  # University dropdown
│   ├── hooks/
│   │   ├── useWebRTC.ts          # WebRTC logic
│   │   └── useSocket.ts          # Socket.io connection
│   ├── lib/
│   │   ├── universities.ts       # University data
│   │   └── utils.ts              # Utility functions
│   └── package.json
├── server/
│   ├── index.js                  # Express + Socket.io server
│   ├── matchmaking.js            # Matchmaking logic
│   └── package.json
├── .env.example                  # Environment variables template
├── .gitignore
└── README.md
```

## 🔧 Configuration

### WebRTC Configuration
The application uses Google's public STUN servers for NAT traversal:
```javascript
{
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ]
}
```

For production, consider adding TURN servers for better connectivity.

### Socket.io Events

#### Client → Server
- `register`: Register user with username and university
- `find-match`: Request to find a chat partner
- `offer`, `answer`, `ice-candidate`: WebRTC signaling
- `chat-message`: Send text message
- `typing`, `stopped-typing`: Typing indicators
- `skip`: Skip to next person
- `leave`: Leave chat

#### Server → Client
- `match-found`: Match found with peer info
- `peer-disconnected`: Peer has disconnected
- `offer`, `answer`, `ice-candidate`: WebRTC signaling
- `chat-message`: Receive text message
- `peer-typing`, `peer-stopped-typing`: Typing indicators

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Note**: WebRTC requires secure context (HTTPS) in production.

## 🛣️ Roadmap

### Planned Features
- [ ] **Chat History**: Optional conversation saving
- [ ] **Interest Tags**: Match based on common interests
- [ ] **Language Filter**: Connect with speakers of specific languages
- [ ] **Report System**: Report inappropriate behavior
- [ ] **Screen Sharing**: Share your screen during calls
- [ ] **Virtual Backgrounds**: Add background effects
- [ ] **Mobile App**: Native iOS and Android apps
- [ ] **Group Chat**: Support for multi-person video calls
- [ ] **Reactions**: Send emoji reactions during calls
- [ ] **Voice-Only Mode**: Audio-only chat option

### Improvements
- [ ] Add TURN servers for better connectivity
- [ ] Implement reconnection logic
- [ ] Add end-to-end encryption
- [ ] Performance optimizations
- [ ] Add analytics (privacy-respecting)
- [ ] Improve matchmaking algorithm
- [ ] Add more universities
- [ ] Support for community colleges

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Real-time communication via [Socket.io](https://socket.io/)
- Video powered by [WebRTC](https://webrtc.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Contact

For questions, suggestions, or feedback:
- Create an issue on GitHub
- Email: support@unichat.example.com (placeholder)

---

<div align="center">

**Made with ❤️ for the student community**

[Report Bug](https://github.com/karlmendoo/uni-chat/issues) · [Request Feature](https://github.com/karlmendoo/uni-chat/issues)

</div>