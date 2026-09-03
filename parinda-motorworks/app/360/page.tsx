'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PanoramaViewer } from '@/components/panorama';
import { PANORAMA_LOCATIONS, getLocationById } from '@/data/panoramas';
import { Compass, ArrowRight, Sparkles, Volume2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function VirtualTourContent() {
  const searchParams = useSearchParams();
  const locParam = searchParams.get('loc') || 'reception';

  const [activeLocId, setActiveLocId] = useState<string>(locParam);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  useEffect(() => {
    if (locParam) {
      setActiveLocId(locParam);
    }
  }, [locParam]);

  const activeLoc = getLocationById(activeLocId) || PANORAMA_LOCATIONS[0];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* ================= 360 SPHERICAL VIEWER ================= */}
      <PanoramaViewer
        locationId={activeLoc.id}
        onLocationChange={(newLoc) => {
          setActiveLocId(newLoc.id);
          window.history.replaceState(null, '', `/360?loc=${newLoc.slug}`);
        }}
      />

      {/* ================= CINEMATIC INTRO MODAL ================= */}
      {!hasEntered && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 transition-all duration-700">
          {/* Subtle background glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#c47c43]/15 blur-[120px] pointer-events-none" />

          <div className="relative max-w-xl w-full text-center flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-[#0c0e12]/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
            {/* Eagle Mark / Badge */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c47c43]/30 to-black border border-[#e5995e]/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(196,124,67,0.35)]">
              <Compass className="w-8 h-8 text-[#e5995e] animate-pulse" />
            </div>

            {/* Intro Headings */}
            <span className="text-[11px] font-black tracking-[0.3em] uppercase text-[#e5995e] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              PARINDA ADVENTURE DESTINATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              360° EXPERIENCE
            </h1>
            <p className="text-sm text-neutral-300 max-w-md mb-8 leading-relaxed">
              Step inside our world-class adventure mobility haven. Look around in true 3D spherical space, interact with live hotspots, and navigate across all six off track spaces.
            </p>

            {/* Quick Preview pills */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-md mb-8">
              {PANORAMA_LOCATIONS.slice(0, 3).map((loc) => (
                <div
                  key={loc.id}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 text-left flex flex-col justify-between"
                >
                  <span className="text-[9px] text-[#e5995e] font-mono uppercase tracking-wider">
                    {loc.category.split(' ')[0]}
                  </span>
                  <span className="text-xs text-white font-medium truncate mt-1">
                    {loc.title.replace('Parinda ', '')}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Inside CTA Button */}
            <button
              type="button"
              onClick={() => setHasEntered(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#c47c43] via-[#e5995e] to-[#c47c43] text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(196,124,67,0.45)] hover:shadow-[0_12px_40px_rgba(229,153,94,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <span>Step Inside</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Device & Experience indicators */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#e5995e]" /> 3D Spherical Geometry
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e5995e]" /> Mobile Gyroscope Enabled
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VirtualTourPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-[#07090c] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-t-[#e5995e] border-r-[#c47c43] border-b-transparent border-l-transparent animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#e5995e] font-semibold">
              PREPARING PARINDA 360°...
            </span>
          </div>
        </div>
      }
    >
      <VirtualTourContent />
    </Suspense>
  );
}
