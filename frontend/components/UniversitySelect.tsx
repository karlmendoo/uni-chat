'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { universities, University } from '@/lib/universities';
import { cn } from '@/lib/utils';

interface UniversitySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function UniversitySelect({ value, onChange, className }: UniversitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedUniversity = universities.find(u => u.id === value);

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(search.toLowerCase()) ||
    (uni.abbreviation && uni.abbreviation.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field w-full flex items-center justify-between cursor-pointer"
      >
        <span className={selectedUniversity ? 'text-content' : 'text-muted'}>
          {selectedUniversity ? (
            <span className="flex items-center gap-2">
              {selectedUniversity.logo && <span className="text-xl">{selectedUniversity.logo}</span>}
              <span>{selectedUniversity.abbreviation || selectedUniversity.name}</span>
            </span>
          ) : (
            'Select your university'
          )}
        </span>
        <ChevronDown className={cn(
          'w-5 h-5 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 glass-card max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search universities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-content placeholder:text-muted"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-60 custom-scrollbar">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((uni) => (
                <button
                  key={uni.id}
                  type="button"
                  onClick={() => {
                    onChange(uni.id);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'w-full px-4 py-3 text-left hover:bg-hover transition-colors duration-150 flex items-center gap-3',
                    value === uni.id && 'bg-primary/20'
                  )}
                >
                  {uni.logo && <span className="text-2xl">{uni.logo}</span>}
                  <div>
                    <div className="font-medium text-content">{uni.name}</div>
                    {uni.abbreviation && (
                      <div className="text-sm text-muted">{uni.abbreviation}</div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted">
                No universities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
