'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  Eye,
  Car,
  Compass,
  ArrowRight,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  Gauge,
  Waves,
  Mountain,
  CheckCircle2,
  Box,
  Layers
} from 'lucide-react';
import { ParindaLogo } from '../ParindaLogo';
import { TrackState } from './trackPath';
import { CameraMode } from './CinematicCamera';

interface ArenaUIProps {
  hasStarted: boolean;
  onStart: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onSetSpeed: (speed: number) => void;
  cameraMode: CameraMode;
  onSetCameraMode: (mode: CameraMode) => void;
  trackState: TrackState | null;
  progress: number;
  onScrub: (progress: number) => void;
}

export function ArenaUI({
  hasStarted,
  onStart,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onSetSpeed,
  cameraMode,
  onSetCameraMode,
  trackState,
  progress,
  onScrub
}: ArenaUIProps) {
  const stages = [
    { name: 'ARRIVE', sub: 'Paddock Staging', range: [0, 0.18], icon: '🏁' },
    { name: 'RIDE', sub: 'Dirt Mounds & Gravel', range: [0.18, 0.38], icon: '🏍️' },
    { name: 'CROSS', sub: 'Parinda Lake Water Wading', range: [0.38, 0.62], icon: '🌊' },
    { name: 'CONQUER', sub: 'Rock Ramp & Bridge', range: [0.62, 0.82], icon: '⛰️' },
    { name: 'EXIT', sub: 'Victory Deck Straight', range: [0.82, 1.0], icon: '🏆' }
  ];

  return (
    <div className="arena-ui-container">
      {/* ================= TOP HEADER ================= */}
      <header className="arena-header">
        <a href="/" className="arena-back-btn" aria-label="Back to Parinda Home">
          <ParindaLogo size="sm" />
        </a>

        {hasStarted && (
          <div className="arena-stage-indicator">
            <span className="live-dot" />
            <b>
              STAGE 0{trackState ? trackState.stageIndex + 1 : 1}:{' '}
              {trackState ? trackState.stageName : 'ARRIVE'}
            </b>
            <span className="arena-stage-sub">
              {trackState?.isWater
                ? '🌊 Water Wading Active'
                : trackState?.isRock
                ? '⛰️ Technical Rock Articulation'
                : '🏍️ Dynamic Off-Road Trail'}
            </span>
          </div>
        )}

        {/* Camera Modes Switcher */}
        <div className="arena-cam-switcher">
          <button
            className={`cam-btn ${cameraMode === 'cinematic' ? 'active' : ''}`}
            onClick={() => onSetCameraMode('cinematic')}
            title="Director Camera"
          >
            <Video size={14} /> Director
          </button>
          <button
            className={`cam-btn ${cameraMode === 'follow-bike' ? 'active' : ''}`}
            onClick={() => onSetCameraMode('follow-bike')}
            title="Follow Motorcycle"
          >
            🏍️ Bike Cam
          </button>
          <button
            className={`cam-btn ${cameraMode === 'follow-car' ? 'active' : ''}`}
            onClick={() => onSetCameraMode('follow-car')}
            title="Follow 4x4 Rig"
          >
            <Car size={14} /> 4x4 Cam
          </button>
          <button
            className={`cam-btn ${cameraMode === 'orbit' ? 'active' : ''}`}
            onClick={() => onSetCameraMode('orbit')}
            title="360° Free Orbit Drone"
          >
            <Eye size={14} /> Free 3D
          </button>
        </div>
      </header>

      {/* ================= HERO INTRO OVERLAY ================= */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8 }}
            className="arena-intro-overlay"
          >
            <div className="arena-intro-card">
              <div style={{ marginBottom: 20 }}>
                <ParindaLogo size="hero" showSubtitle={false} />
              </div>

              <span className="arena-intro-eyebrow">
                PARINDA MOTORWORKS • 3D IMMERSIVE SIMULATION
              </span>

              <h1>
                PARINDA LAKE<br />
                <em>&amp; OFF-ROAD</em><br />
                CROSSING ARENA
              </h1>

              <p className="arena-intro-copy">
                CROSS THE TERRAIN. CONQUER THE ELEMENTS.<br />
                Watch the adventure motorcycle and 4x4 rig navigate real-time water wading, rock ramps, mud ruts and the signature wooden bridge.
              </p>

              <div className="arena-intro-story-flow">
                {stages.map((s, idx) => (
                  <div key={s.name} className="flow-step">
                    <span>0{idx + 1}</span>
                    <b>{s.name}</b>
                    <small>{s.sub.split(' ')[0]}</small>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <button className="btn primary arena-start-btn" onClick={onStart}>
                  START THE EXPERIENCE <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TELEMETRY HUD (RIGHT SIDE) ================= */}
      {hasStarted && trackState && (
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="arena-telemetry"
        >
          <div className="telemetry-header">
            <Gauge size={14} color="#c47c43" />
            <span>LIVE VEHICLE TELEMETRY</span>
          </div>

          <div className="telemetry-grid">
            <div className="telemetry-box">
              <small>SPEED</small>
              <b>{trackState.speedKmh}</b>
              <span>KM/H</span>
            </div>

            <div className="telemetry-box">
              <small>INCLINE</small>
              <b>{trackState.inclineAngle}°</b>
              <span>SLOPE</span>
            </div>

            <div className="telemetry-box highlight">
              <small>WATER DEPTH</small>
              <b>{trackState.waterDepth}</b>
              <span>MM WADING</span>
            </div>

            <div className="telemetry-box">
              <small>DRIVE MODE</small>
              <b style={{ fontSize: 13, color: '#e5995e' }}>4-LOW + DIFF</b>
              <span>OFF-ROAD PRO</span>
            </div>
          </div>

          {/* Vehicle Feature Checklist */}
          <div className="telemetry-checklist">
            <div className={`telemetry-item ${trackState.isWater ? 'active' : ''}`}>
              <Waves size={13} /> Waterproof Air Snorkel Active
            </div>
            <div className={`telemetry-item ${trackState.isRock ? 'active' : ''}`}>
              <Mountain size={13} /> Rock Crawl Suspension Flex
            </div>
            <div className="telemetry-item active">
              <CheckCircle2 size={13} /> Active Stunt Physics
            </div>
          </div>
        </motion.aside>
      )}

      {/* ================= BOTTOM STAGE TIMELINE & CONTROLS ================= */}
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="arena-bottom-bar"
        >
          {/* Controls: Play/Pause, Speed */}
          <div className="arena-playback-controls">
            <button
              className="playback-btn play-toggle"
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div className="speed-pills">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  className={`speed-btn ${playbackSpeed === s ? 'active' : ''}`}
                  onClick={() => onSetSpeed(s)}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Stage Timeline Navigation */}
          <div className="arena-timeline-track">
            {stages.map((stage, idx) => {
              const isCurrent =
                trackState?.stageName === stage.name;
              return (
                <button
                  key={stage.name}
                  className={`timeline-step ${isCurrent ? 'active' : ''}`}
                  onClick={() => onScrub(stage.range[0])}
                >
                  <div className="step-bar-fill">
                    {isCurrent && (
                      <motion.div
                        className="step-progress"
                        style={{ width: `${(trackState?.stageProgress || 0) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="step-label">
                    <span className="step-idx">0{idx + 1}</span>
                    <b>{stage.name}</b>
                    <small>{stage.sub}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
