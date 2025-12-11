'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { useWebRTC } from '@/hooks/useWebRTC';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ControlBar } from '@/components/ControlBar';
import { ChatSidebar } from '@/components/ChatSidebar';
import { universities } from '@/lib/universities';

type MatchFilter = 'same' | 'any' | string;

export default function ChatPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [peerUsername, setPeerUsername] = useState('');
  const [peerUniversity, setPeerUniversity] = useState('');
  const [matchFilter, setMatchFilter] = useState<MatchFilter>('any');
  const [isSearching, setIsSearching] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const { socket, isConnected } = useSocket();
  const {
    localStream,
    remoteStream,
    isMuted,
    isVideoOff,
    connectionState,
    initializeMedia,
    startCall,
    toggleMute,
    toggleVideo,
    closePeerConnection,
    cleanup,
  } = useWebRTC({
    socket,
    isConnected,
    localVideoRef,
    remoteVideoRef,
  });

  // Load user data from session storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedUsername = sessionStorage.getItem('username');
    const storedUniversity = sessionStorage.getItem('university');
    
    if (!storedUsername || !storedUniversity) {
      router.push('/');
      return;
    }
    
    setUsername(storedUsername);
    setUniversity(storedUniversity);
  }, [router]);

  // Initialize media on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initializeMedia();
      } catch (error) {
        console.error('Failed to initialize media:', error);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Join matchmaking queue
  useEffect(() => {
    if (!socket || !isConnected || !username || !university) return;

    // Register user with server
    socket.emit('register', { username, university });

    // Handle match found
    socket.on('match-found', (data: { peer: { username: string; university: string }; isInitiator: boolean }) => {
      console.log('Match found:', data);
      setIsSearching(false);
      setPeerUsername(data.peer.username);
      setPeerUniversity(data.peer.university);
      
      // If initiator, start the call
      if (data.isInitiator) {
        startCall();
      }
    });

    socket.on('peer-disconnected', () => {
      console.log('Peer disconnected');
      setPeerUsername('');
      setPeerUniversity('');
      setIsSearching(false);
    });

    return () => {
      socket.off('match-found');
      socket.off('peer-disconnected');
    };
  }, [socket, isConnected, username, university, startCall]);

  // Find match
  const findMatch = () => {
    if (!socket || !username || !university) return;
    
    setIsSearching(true);
    socket.emit('find-match', { filter: matchFilter });
  };

  // Skip to next person
  const skipPeer = () => {
    if (!socket) return;
    
    socket.emit('skip');
    setPeerUsername('');
    setPeerUniversity('');
    closePeerConnection(); // Only close peer connection, keep local media active
    findMatch();
  };

  // End chat and return to home
  const endChat = () => {
    if (socket) {
      socket.emit('leave');
    }
    cleanup();
    router.push('/');
  };

  const universityName = universities.find(u => u.id === university)?.name || university;
  const peerUniversityName = universities.find(u => u.id === peerUniversity)?.name || peerUniversity;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="glass-card p-3 sm:p-4 border-b border-border">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold text-gradient">UniChat</div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Match filter */}
            <select
              value={matchFilter}
              onChange={(e) => setMatchFilter(e.target.value)}
              className="glass px-2 sm:px-4 py-2 rounded-lg text-content cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
              disabled={connectionState === 'connected' || isSearching}
            >
              <option value="any">Any University</option>
              <option value="same">Same University</option>
            </select>

            {/* Connection status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  connectionState === 'connected'
                    ? 'bg-green-500 animate-pulse'
                    : connectionState === 'connecting'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-400'
                }`}
              />
              <span className="text-xs sm:text-sm text-muted hidden sm:inline">
                {connectionState === 'connected'
                  ? 'Connected'
                  : connectionState === 'connecting'
                  ? 'Connecting...'
                  : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-2 sm:p-4">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
          {/* Remote video */}
          <div className="relative">
            {peerUsername ? (
              <VideoPlayer
                ref={remoteVideoRef}
                username={peerUsername}
                university={peerUniversityName}
                className="w-full h-[300px] sm:h-[400px] lg:h-full"
              />
            ) : isSearching ? (
              <div className="glass-card w-full h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center">
                <div className="text-center px-4">
                  <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-spin mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-content">Searching for a match...</h3>
                  <p className="text-sm sm:text-base text-muted">
                    {matchFilter === 'same' ? 'Looking for students from your university' : 'Looking for students in the Philippines'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="glass-card w-full h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center">
                <div className="text-center px-4">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-content">Ready to chat?</h3>
                  <button
                    onClick={findMatch}
                    disabled={!localStream}
                    className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 glow"
                  >
                    Find a Match
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Local video */}
          <div className="relative">
            <VideoPlayer
              ref={localVideoRef}
              isMirrored
              isLocal
              username={username}
              university={universityName}
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              className="w-full h-[300px] sm:h-[400px] lg:h-full"
            />
          </div>
        </div>
      </main>

      {/* Controls */}
      <div className="container mx-auto p-2 sm:p-4">
        <ControlBar
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onSkip={skipPeer}
          onEndCall={endChat}
        />
      </div>

      {/* Chat sidebar */}
      <ChatSidebar
        socket={socket}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
