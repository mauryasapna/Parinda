'use client';

import React, { useState } from 'react';
import { OffRoadScene } from '../../components/3d/OffRoadScene';
import { ArenaUI } from '../../components/3d/ArenaUI';
import { CameraMode } from '../../components/3d/CinematicCamera';
import { TrackState, getTrackState } from '../../components/3d/trackPath';

export default function ArenaClientPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [cameraMode, setCameraMode] = useState<CameraMode>('intro');
  const [trackState, setTrackState] = useState<TrackState | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrubTarget, setScrubTarget] = useState<number | undefined>(undefined);

  const handleStart = () => {
    setHasStarted(true);
    setCameraMode('cinematic');
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleScrub = (newProgress: number) => {
    setScrubTarget(newProgress);
    setProgress(newProgress);
    setTrackState(getTrackState(newProgress, 38));
  };

  return (
    <main className="arena-fullscreen-wrapper">
      {/* 3D WebGL Canvas Layer */}
      <OffRoadScene
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        cameraMode={cameraMode}
        scrubProgress={scrubTarget}
        onStateUpdate={setTrackState}
        onProgressUpdate={setProgress}
      />

      {/* Luxury 3D HUD & Controls Layer */}
      <ArenaUI
        hasStarted={hasStarted}
        onStart={handleStart}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        playbackSpeed={playbackSpeed}
        onSetSpeed={setPlaybackSpeed}
        cameraMode={cameraMode}
        onSetCameraMode={setCameraMode}
        trackState={trackState}
        progress={progress}
        onScrub={handleScrub}
      />
    </main>
  );
}
