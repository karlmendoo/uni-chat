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
    <div className={cn('glass-card p-2 sm:p-4', className)}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {/* Microphone */}
        <button
          onClick={onToggleMute}
          className={cn(
            'p-3 sm:p-4 rounded-full transition-all duration-200',
            isMuted
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'glass hover:bg-hover text-content'
          )}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        {/* Video */}
        <button
          onClick={onToggleVideo}
          className={cn(
            'p-3 sm:p-4 rounded-full transition-all duration-200',
            isVideoOff
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'glass hover:bg-hover text-content'
          )}
          title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
        >
          {isVideoOff ? (
            <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Video className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        {/* Skip */}
        <button
          onClick={onSkip}
          className="p-3 sm:p-4 rounded-full glass hover:bg-hover transition-all duration-200 text-content"
          title="Skip to next person"
        >
          <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className="p-3 sm:p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 text-white"
          title="End chat"
        >
          <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
