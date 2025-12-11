'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  isMirrored?: boolean;
  isLocal?: boolean;
  username?: string;
  university?: string;
  className?: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ isMirrored = false, isLocal = false, username, university, className }, ref) => {
    return (
      <div className={cn('relative rounded-2xl overflow-hidden glass-card', className)}>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={isLocal}
          className={cn(
            'w-full h-full object-cover bg-navy-800',
            isMirrored && 'scale-x-[-1]'
          )}
        />
        
        {/* User info overlay */}
        {username && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass px-4 py-2 rounded-lg inline-block">
              <div className="text-white font-semibold">{username}</div>
              {university && (
                <div className="text-sm text-slate-300">{university}</div>
              )}
            </div>
          </div>
        )}

        {/* Local indicator */}
        {isLocal && (
          <div className="absolute top-4 left-4">
            <div className="glass px-3 py-1 rounded-full text-sm text-white">
              You
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export { VideoPlayer };
