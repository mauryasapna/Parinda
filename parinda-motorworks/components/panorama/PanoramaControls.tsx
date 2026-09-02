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
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
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
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* ================= TOP HUD ================= */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        {/* Brand Lockup (Top Left) */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 rounded-full bg-[#101317]/85 hover:bg-[#1b2027] border border-white/10 hover:border-[#e5995e]/60 backdrop-blur-md text-white transition-all duration-200 group shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title="Return to Home"
            aria-label="Return to Home"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-300 group-hover:text-[#e5995e] transition-colors" />
          </Link>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm sm:text-base font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                PARINDA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e5995e] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#e5995e] uppercase hidden sm:inline-block">
                360° EXPERIENCE
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wider">
              {currentLocation.category}
            </span>
          </div>
        </div>

        {/* Top Right Utility Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Gyroscope Button */}
          <button
            type="button"
            onClick={onToggleGyro}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold backdrop-blur-md transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)] ${
              isGyroActive
                ? 'bg-[#e5995e] text-black border-[#e5995e] shadow-[0_0_15px_rgba(229,153,94,0.5)]'
                : 'bg-[#101317]/85 hover:bg-[#181d24] text-neutral-300 border-white/10 hover:border-[#e5995e]/50'
            }`}
            title="Use phone motion to look around"
            aria-label="Toggle Gyroscope"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {isGyroActive ? 'GYRO ACTIVE' : 'USE PHONE TO LOOK AROUND'}
            </span>
          </button>

          {/* Audio Ambient Mute Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title={isMuted ? 'Unmute Ambient Nature Audio' : 'Mute Audio'}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#e5995e]" />}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Button */}
          <Link
            href="/"
            className="p-2.5 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-red-500/50 backdrop-blur-md text-neutral-300 hover:text-red-400 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title="Exit 360° Viewer"
            aria-label="Exit Viewer"
          >
            <X className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ================= CENTER HINT ================= */}
      <div className="flex justify-center w-full pointer-events-none">
        {showHint && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-[#e5995e]/40 backdrop-blur-md text-neutral-200 text-xs font-medium shadow-[0_8px_30px_rgba(0,0,0,0.6)] animate-pulse">
            <Compass className="w-4 h-4 text-[#e5995e]" />
            <span>Drag to Explore 360° &bull; Scroll / Pinch to Zoom</span>
          </div>
        )}
      </div>

      {/* ================= BOTTOM HUD ================= */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 w-full pointer-events-auto">
        {/* Left: Location Name & Short Description */}
        <div className="max-w-md p-4 rounded-2xl bg-[#0c0e12]/80 border border-white/10 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5995e]">
              CURRENT LOCATION
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {currentLocation.title}
          </h2>
          <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
            {currentLocation.description}
          </p>
        </div>

        {/* Right: Floating Actions Toolbar */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Locations Selector Menu */}
          <LocationMenu
            currentLocationId={currentLocation.id}
            onSelectLocation={onSelectLocation}
          />

          {/* Reset / Recenter Camera */}
          <button
            type="button"
            onClick={onResetCamera}
            className="p-3 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group"
            title="Recenter / Reset Camera Angle"
            aria-label="Reset Camera"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={onZoomIn}
            className="p-3 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            onClick={onZoomOut}
            className="p-3 rounded-full bg-[#101317]/85 hover:bg-[#181d24] border border-white/10 hover:border-[#e5995e]/50 backdrop-blur-md text-neutral-300 hover:text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
