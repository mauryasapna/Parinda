'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { Hotspot } from '@/data/panoramas';
import { Compass, ArrowUpRight, Info } from 'lucide-react';

interface PanoramaHotspotProps {
  hotspot: Hotspot;
  onSelect: (hotspot: Hotspot) => void;
}

export default function PanoramaHotspot({ hotspot, onSelect }: PanoramaHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={hotspot.position}>
      <Html center distanceFactor={450} zIndexRange={[100, 0]}>
        <div
          className="relative group cursor-pointer select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot);
          }}
          role="button"
          tabIndex={0}
          aria-label={`Hotspot: ${hotspot.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(hotspot);
            }
          }}
        >
          {/* Animated Pulsing Rings */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-[#e5995e]/20 animate-ping" />
            <div className="absolute inset-1 rounded-full border border-[#e5995e]/60 animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-[#101317]/90 border-2 border-[#e5995e] flex items-center justify-center text-[#e5995e] shadow-[0_0_15px_rgba(229,153,94,0.6)] group-hover:scale-110 group-hover:bg-[#e5995e] group-hover:text-black transition-all duration-300">
              {hotspot.type === 'navigation' ? (
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              ) : (
                <Info className="w-4 h-4" />
              )}
            </div>
          </div>

          {/* Hover Tooltip / Floating Card */}
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-xl bg-[#0e1116]/95 border border-[#e5995e]/40 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 pointer-events-auto ${
              isHovered
                ? 'opacity-100 translate-y-0 visible scale-100'
                : 'opacity-0 translate-y-2 invisible scale-95'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#e5995e]">
                {hotspot.subtitle || (hotspot.type === 'navigation' ? 'Location Jump' : 'Area Feature')}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-white/60 font-medium">
                {hotspot.type === 'navigation' ? 'ENTER 360°' : 'INFO'}
              </span>
            </div>

            <h4 className="text-sm font-semibold text-white tracking-wide mb-1">
              {hotspot.title}
            </h4>

            {hotspot.description && (
              <p className="text-[11px] text-neutral-300 leading-relaxed line-clamp-2 mb-2">
                {hotspot.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-[10px] text-[#e5995e] font-semibold flex items-center gap-1 group-hover:underline">
                Explore Area <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>

            {/* Triangle pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0e1116]" />
          </div>
        </div>
      </Html>
    </group>
  );
}
