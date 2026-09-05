'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  Compass,
  ArrowLeft,
  X
} from 'lucide-react';
import LocationMenu from './LocationMenu';
import { PanoramaLocation } from '@/data/panoramas';

interface PanoramaControlsProps {
  currentLocation: PanoramaLocation;
  onSelectLocation: (loc: PanoramaLocation) => void;
  onResetCamera: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isGyroActive: boolean;
  onToggleGyro: () => void;
  hasInteracted: boolean;
}

export default function PanoramaControls({
  currentLocation,
  onSelectLocation,
  onResetCamera,
  onZoomIn,
  onZoomOut,
  isGyroActive,
  onToggleGyro,
  hasInteracted
}: PanoramaControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      if (typeof document !== 'undefined') {
        setIsFullscreen(Boolean(document.fullscreenElement));
      }
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('fullscreenchange', handleFsChange);
      return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }
  }, []);

  // Hide the initial "Drag to Explore 360°" after interaction or 6s
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => setShowHint(false), 800);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const toggleFullscreen = async () => {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* ================= TOP HUD ================= */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        {/* Active Scene Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5995e] animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-white uppercase">
            {currentLocation.title.replace('Parinda ', '')}
          </span>
        </div>

        {/* Top Right Utility Controls */}
        <div className="flex items-center gap-1.5">
          {/* Mobile Gyroscope Button */}
          <button
            type="button"
            onClick={onToggleGyro}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] font-semibold backdrop-blur-md transition-all duration-200 ${
              isGyroActive
                ? 'bg-[#e5995e] text-black border-[#e5995e] shadow-[0_0_15px_rgba(229,153,94,0.5)]'
                : 'bg-black/70 hover:bg-[#181d24] text-neutral-300 border-white/10 hover:border-[#e5995e]/50'
            }`}
            title="Use phone motion to look around"
            aria-label="Toggle Gyroscope"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden md:inline">
              {isGyroActive ? 'GYRO ON' : 'GYRO'}
            </span>
          </button>

          {/* Audio Ambient Mute Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/70 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200"
            title={isMuted ? 'Unmute Ambient Nature Audio' : 'Mute Audio'}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#e5995e]" />}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/70 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ================= CENTER HINT ================= */}
      <div className="flex justify-center w-full pointer-events-none">
        {showHint && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#e5995e]/40 backdrop-blur-md text-neutral-200 text-[11px] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.6)] animate-pulse">
            <Compass className="w-3.5 h-3.5 text-[#e5995e]" />
            <span>Drag to rotate • Scroll / Pinch to zoom</span>
          </div>
        )}
      </div>

      {/* ================= BOTTOM TOOLBAR ================= */}
      <div className="flex items-center justify-between gap-2 w-full pointer-events-auto">
        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10">
          {/* Reset / Recenter Camera */}
          <button
            type="button"
            onClick={onResetCamera}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all duration-200"
            title="Recenter Camera"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={onZoomIn}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all duration-200"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={onZoomOut}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all duration-200"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Locations Selector Menu */}
        <LocationMenu
          currentLocationId={currentLocation.id}
          onSelectLocation={onSelectLocation}
        />
      </div>
    </div>
  );
}
