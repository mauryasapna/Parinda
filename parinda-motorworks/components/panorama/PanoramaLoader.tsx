'use client';

import React from 'react';
import { Compass } from 'lucide-react';

interface PanoramaLoaderProps {
  progress?: number;
  title?: string;
  isTransitioning?: boolean;
}

export default function PanoramaLoader({
  progress = 0,
  title = 'Parinda Destination',
  isTransitioning = false
}: PanoramaLoaderProps) {
  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#07090c]/90 backdrop-blur-md transition-opacity duration-500 pointer-events-none ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading 360 virtual panorama"
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glowing concentric rings */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#c47c43]/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-[#e5995e]/30 animate-pulse" />
          <div className="w-16 h-16 rounded-full border-2 border-t-[#e5995e] border-r-[#c47c43] border-b-transparent border-l-transparent animate-spin flex items-center justify-center bg-black/60 shadow-[0_0_25px_rgba(196,124,67,0.3)]">
            <Compass className="w-7 h-7 text-[#e5995e] animate-pulse" />
          </div>
        </div>

        {/* Title and status */}
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#e5995e] uppercase mb-1">
          PARINDA 360° EXPERIENCE
        </span>
        <h3 className="text-xl font-semibold text-white tracking-wide mb-2">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 max-w-xs mb-4">
          Synthesizing equirectangular spherical environment...
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#c47c43] to-[#e5995e] transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(229,153,94,0.6)]"
            style={{ width: `${Math.max(15, progress)}%` }}
          />
        </div>
        <span className="text-[10px] text-neutral-500 font-mono mt-2 tracking-wider">
          {Math.round(progress)}% LOADED
        </span>
      </div>
    </div>
  );
}
