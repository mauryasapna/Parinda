'use client';

import React, { useState } from 'react';
import { PANORAMA_LOCATIONS, PanoramaLocation } from '@/data/panoramas';
import { MapPin, ChevronRight, Sparkles, Layers, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface LocationMenuProps {
  currentLocationId: string;
  onSelectLocation: (loc: PanoramaLocation) => void;
}

export default function LocationMenu({
  currentLocationId,
  onSelectLocation
}: LocationMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative z-30 select-none">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-300 group"
        aria-label="Toggle Parinda Locations Menu"
        aria-expanded={isExpanded}
      >
        <div className="w-6 h-6 rounded-full bg-[#c47c43]/20 flex items-center justify-center text-[#e5995e] group-hover:scale-110 transition-transform">
          <Layers className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e5995e]">
            EXPLORE
          </span>
          <span className="text-xs font-medium text-neutral-200">
            Locations ({PANORAMA_LOCATIONS.length})
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180 text-[#e5995e]' : ''
          }`}
        />
      </button>

      {/* Dropdown / Floating Panel */}
      {isExpanded && (
        <>
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsExpanded(false)}
          />

          <div className="absolute bottom-full left-0 mb-3 w-80 max-h-[70vh] overflow-y-auto rounded-2xl bg-[#0c0e12]/95 border border-white/15 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#e5995e]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#e5995e]">
                  DESTINATION SPHERES
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                360° IMMERSIVE
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {PANORAMA_LOCATIONS.map((loc) => {
                const isActive = loc.id === currentLocationId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      onSelectLocation(loc);
                      setIsExpanded(false);
                    }}
                    className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all duration-200 relative group overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-[#c47c43]/25 to-[#e5995e]/10 border border-[#e5995e]/50 shadow-[0_0_15px_rgba(196,124,67,0.2)]'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e5995e]" />
                    )}

                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                      <Image
                        src={loc.thumbnail}
                        alt={loc.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white truncate">
                          {loc.title}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e5995e] animate-ping" />
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {loc.category}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 text-neutral-500 group-hover:translate-x-0.5 transition-transform ${
                        isActive ? 'text-[#e5995e]' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
