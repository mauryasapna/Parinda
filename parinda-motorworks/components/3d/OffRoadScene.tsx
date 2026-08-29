'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { MotorcycleRider } from './MotorcycleRider';
import { OffroadVehicle } from './OffroadVehicle';
import { EnvironmentWorld } from './EnvironmentWorld';
import { CinematicCamera, CameraMode } from './CinematicCamera';
import { TrackState, getTrackState } from './trackPath';

interface OffRoadSceneProps {
  isPlaying: boolean;
  playbackSpeed: number;
  cameraMode: CameraMode;
  scrubProgress?: number;
  onStateUpdate: (state: TrackState) => void;
  onProgressUpdate: (progress: number) => void;
}

export function OffRoadScene({
  isPlaying,
  playbackSpeed,
  cameraMode,
  scrubProgress,
  onStateUpdate,
  onProgressUpdate
}: OffRoadSceneProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scrubProgress !== undefined) {
      setProgress(scrubProgress);
    }
  }, [scrubProgress]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isPlaying) {
        setProgress((prev) => {
          // Base lap time ~32 seconds at 1x speed
          const increment = (delta / 32) * playbackSpeed;
          const next = (prev + increment) % 1;
          onProgressUpdate(next);
          return next;
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, playbackSpeed, onProgressUpdate]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        shadows
        camera={{ position: [35, 48, 60], fov: 50, near: 0.5, far: 500 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        {/* Background & Atmospheric Fog */}
        <color attach="background" args={['#131510']} />
        <fog attach="fog" args={['#131510', 40, 160]} />

        {/* Cinematic Daylight Lighting */}
        <ambientLight intensity={0.65} color="#fff6e0" />
        <hemisphereLight
          args={['#7fa5b5', '#332918', 0.5]}
        />
        <directionalLight
          position={[45, 65, 30]}
          intensity={2.2}
          color="#fff5dc"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={10}
          shadow-camera-far={180}
          shadow-camera-left={-70}
          shadow-camera-right={70}
          shadow-camera-top={70}
          shadow-camera-bottom={-70}
          shadow-bias={-0.0002}
        />

        {/* Secondary Warm Rim Light */}
        <directionalLight position={[-40, 30, -40]} intensity={0.6} color="#c47c43" />

        {/* 3D World Components */}
        <EnvironmentWorld progress={progress} />
        <MotorcycleRider progress={progress} onStateUpdate={onStateUpdate} />
        <OffroadVehicle progress={progress} />
        <CinematicCamera mode={cameraMode} progress={progress} />
      </Canvas>
    </div>
  );
}
