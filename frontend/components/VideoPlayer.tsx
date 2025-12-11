'use client';

import { forwardRef } from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  isMirrored?: boolean;
  isLocal?: boolean;
  username?: string;
  university?: string;
  className?: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ isMirrored = false, isLocal = false, username, university, className, isMuted = false, isVideoOff = false }, ref) => {
    return (
      <div className={cn('relative rounded-2xl overflow-hidden glass-card', className)}>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={isLocal}
          className={cn(
            'w-full h-full object-cover bg-gray-200',
            isMirrored && 'scale-x-[-1]'
          )}
        />
        
        {/* User info overlay */}
        {username && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass px-4 py-2 rounded-lg inline-block">
              <div className="text-content font-semibold">{username}</div>
              {university && (
                <div className="text-sm text-muted">{university}</div>
              )}
            </div>
          </div>
        )}

        {/* Local indicator */}
        {isLocal && (
          <div className="absolute top-4 left-4">
            <div className="glass px-3 py-1 rounded-full text-sm text-content">
              You
            </div>
          </div>
        )}

        {/* Camera/Mic status indicators - shown on both local and remote */}
        {(isMuted || isVideoOff) && (
          <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">
            {isMuted && (
              <div className="glass-red px-3 py-2 rounded-full flex items-center gap-2">
                <MicOff className="w-4 h-4" />
                <span className="text-sm font-medium">Mic Off</span>
              </div>
            )}
            {isVideoOff && (
              <div className="glass-red px-3 py-2 rounded-full flex items-center gap-2">
                <VideoOff className="w-4 h-4" />
                <span className="text-sm font-medium">Camera Off</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer };
