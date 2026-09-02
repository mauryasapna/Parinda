'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export const PanoramaViewer = dynamic(
  () => import('./PanoramaViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#07090c] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#e5995e] border-r-[#c47c43] border-b-transparent border-l-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#e5995e] font-semibold">
            INITIALIZING 360° ENGINE...
          </span>
        </div>
      </div>
    )
  }
);

export { default as PanoramaControls } from './PanoramaControls';
export { default as PanoramaHotspot } from './PanoramaHotspot';
export { default as PanoramaLoader } from './PanoramaLoader';
export { default as LocationMenu } from './LocationMenu';
