'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { Socket } from 'socket.io-client';
import { cn } from '@/lib/utils';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'peer';
  timestamp: Date;
}

interface ChatSidebarProps {
  socket: Socket | null;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function ChatSidebar({ socket, isOpen, onToggle, className }: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat-message', (data: { text: string; timestamp: string }) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.text,
          sender: 'peer',
          timestamp: new Date(data.timestamp),
        },
      ]);
    });

    socket.on('peer-typing', () => {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    });

    socket.on('peer-stopped-typing', () => {
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    });

    return () => {
      socket.off('chat-message');
      socket.off('peer-typing');
      socket.off('peer-stopped-typing');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socket) return;

    const message: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'me',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    socket.emit('chat-message', { text: message.text, timestamp: message.timestamp.toISOString() });
    socket.emit('stopped-typing');
    setInputMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    
    if (socket && e.target.value.length > 0) {
      socket.emit('typing');
    } else if (socket) {
      socket.emit('stopped-typing');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Toggle button when closed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed right-4 bottom-24 p-4 rounded-full bg-gradient-primary shadow-lg hover:shadow-primary/50 transition-all duration-200 z-40"
          title="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full md:w-96 glass-card transition-transform duration-300 z-50',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Chat</h3>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'me' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2',
                      message.sender === 'me'
                        ? 'bg-gradient-primary text-white'
                        : 'glass text-white'
                    )}
                  >
                    <p className="break-words">{message.text}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      message.sender === 'me' ? 'text-white/70' : 'text-slate-400'
                    )}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                variant="primary"
                className="p-3"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
