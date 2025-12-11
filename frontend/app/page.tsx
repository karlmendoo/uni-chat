'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UniversitySelect } from '@/components/UniversitySelect';

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');

  const handleStartChat = () => {
    if (username.trim() && university) {
      // Store user data in sessionStorage
      sessionStorage.setItem('username', username.trim());
      sessionStorage.setItem('university', university);
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="mb-8 animate-float">
              <div className="inline-flex items-center gap-3 glass-card px-6 py-3 glow">
                <Video className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-gradient">UniChat</h1>
              </div>
            </div>

            {/* Hero Title */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-content">
              Meet Students
              <br />
              <span className="text-gradient">Around the Philippines</span>
            </h2>

            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              Anonymous video chat platform exclusively for university students. 
              Connect, chat, and make friends with students from top universities in the Philippines.
            </p>

            {/* Input Form */}
            <Card className="max-w-xl mx-auto p-8 glow">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2 text-left">
                    Choose a Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your display name..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && username.trim() && university) {
                        handleStartChat();
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2 text-left">
                    Select Your University
                  </label>
                  <UniversitySelect
                    value={university}
                    onChange={setUniversity}
                  />
                </div>

                <Button
                  onClick={handleStartChat}
                  disabled={!username.trim() || !university}
                  className="w-full text-lg glow"
                  size="lg"
                >
                  Start Chatting
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">25+</div>
                <div className="text-muted">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">24/7</div>
                <div className="text-muted">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-muted">Anonymous</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-border">
          <div className="text-center text-muted">
            <p className="mb-2">UniChat - Connect with students in the Philippines</p>
            <p className="text-sm">Made with ❤️ for the student community</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
