'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UniversitySelect } from '@/components/UniversitySelect';

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false);

  const handleStartChat = () => {
    if (username.trim() && university) {
      if (!agreedToGuidelines) {
        setShowGuidelines(true);
        return;
      }
      // Store user data in sessionStorage
      sessionStorage.setItem('username', username.trim());
      sessionStorage.setItem('university', university);
      router.push('/chat');
    }
  };

  const handleAgreeGuidelines = () => {
    setAgreedToGuidelines(true);
    setShowGuidelines(false);
    // Store user data and navigate
    sessionStorage.setItem('username', username.trim());
    sessionStorage.setItem('university', university);
    router.push('/chat');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            {/* Logo/Brand - Minimalist */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Video className="w-10 h-10 text-primary" />
                <h1 className="text-4xl font-bold text-gradient">UniChat</h1>
              </div>
            </div>

            {/* Input Form - Minimalist */}
            <Card className="p-6 sm:p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-content mb-2">
                    Display Name
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
                  <label className="block text-sm font-medium text-content mb-2">
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
                  className="w-full text-lg"
                  size="lg"
                >
                  Start Chatting
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-6 border-t border-border">
        <div className="text-center text-muted">
          <p className="text-sm">Made with ❤️ by <a href="https://instagram.com/karlmendoo" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">@karlmendoo</a></p>
        </div>
      </footer>

      {/* Community Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient">Community Guidelines</h2>
              <button
                onClick={() => setShowGuidelines(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-content mb-6">
              <p className="text-lg font-semibold">Welcome to UniChat! Please read and agree to our guidelines:</p>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>Be Respectful:</strong> Treat everyone with kindness and respect, regardless of their background or university.</p>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>No Harassment:</strong> Harassment, bullying, hate speech, or discriminatory behavior of any kind will not be tolerated.</p>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>No Inappropriate Content:</strong> Do not share, display, or discuss explicit, violent, or otherwise inappropriate content.</p>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>Protect Privacy:</strong> Do not share personal information such as phone numbers, addresses, or social media accounts without consent.</p>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>Report Issues:</strong> If you encounter anyone violating these guidelines, please disconnect and report the behavior.</p>
                </div>
                
                <div className="flex gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong>Stay Safe:</strong> Remember that this is an anonymous platform. Use good judgment and prioritize your safety.</p>
                </div>
              </div>

              <p className="text-sm text-muted mt-6 p-4 bg-gray-50 rounded-lg">
                By clicking "I Agree", you confirm that you understand and will follow these community guidelines. Violations may result in being banned from the platform.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowGuidelines(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAgreeGuidelines}
                className="flex-1"
              >
                I Agree
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
