import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createMatchmaker } from './matchmaking.js';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const matchmaker = createMatchmaker(io);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user
  socket.on('register', (userData) => {
    console.log('User registered:', socket.id, userData);
    matchmaker.registerUser(socket.id, userData);
  });

  // Find match
  socket.on('find-match', (data) => {
    console.log('User searching for match:', socket.id, data);
    matchmaker.findMatch(socket.id, data.filter);
  });

  // WebRTC signaling
  socket.on('offer', (offer) => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('offer', offer);
    }
  });

  socket.on('answer', (answer) => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('answer', answer);
    }
  });

  socket.on('ice-candidate', (candidate) => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('ice-candidate', candidate);
    }
  });

  // Chat messaging
  socket.on('chat-message', (data) => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('chat-message', data);
    }
  });

  socket.on('typing', () => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('peer-typing');
    }
  });

  socket.on('stopped-typing', () => {
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('peer-stopped-typing');
    }
  });

  // Skip to next person
  socket.on('skip', () => {
    console.log('User skipping:', socket.id);
    const peer = matchmaker.getPeer(socket.id);
    matchmaker.disconnect(socket.id);
    if (peer) {
      io.to(peer).emit('peer-disconnected');
      matchmaker.disconnect(peer);
    }
  });

  // Leave chat
  socket.on('leave', () => {
    console.log('User leaving:', socket.id);
    matchmaker.disconnect(socket.id);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const peer = matchmaker.getPeer(socket.id);
    if (peer) {
      io.to(peer).emit('peer-disconnected');
    }
    matchmaker.disconnect(socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Socket.IO ready for connections`);
});
