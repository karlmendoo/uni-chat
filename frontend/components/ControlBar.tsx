'use client';

import { Mic, MicOff, Video, VideoOff, SkipForward, PhoneOff } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface ControlBarProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onSkip: () => void;
  onEndCall: () => void;
  className?: string;
}

export function ControlBar({
  isMuted,
  isVideoOff,
  onToggleMute,
  onToggleVideo,
  onSkip,
  onEndCall,
  className,
}: ControlBarProps) {
  return (
    <div className={cn('glass-card p-4', className)}>
      <div className="flex items-center justify-center gap-3">
        {/* Microphone */}
        <button
          onClick={onToggleMute}
          className={cn(
            'p-4 rounded-full transition-all duration-200',
            isMuted
              ? 'bg-red-500 hover:bg-red-600'
              : 'glass hover:bg-white/10'
          )}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Video */}
        <button
          onClick={onToggleVideo}
          className={cn(
            'p-4 rounded-full transition-all duration-200',
            isVideoOff
              ? 'bg-red-500 hover:bg-red-600'
              : 'glass hover:bg-white/10'
          )}
          title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
        >
          {isVideoOff ? (
            <VideoOff className="w-6 h-6 text-white" />
          ) : (
            <Video className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Skip */}
        <button
          onClick={onSkip}
          className="p-4 rounded-full glass hover:bg-white/10 transition-all duration-200"
          title="Skip to next person"
        >
          <SkipForward className="w-6 h-6 text-white" />
        </button>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200"
          title="End chat"
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
