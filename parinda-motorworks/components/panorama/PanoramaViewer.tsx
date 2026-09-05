'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import PanoramaControls from './PanoramaControls';
import PanoramaLoader from './PanoramaLoader';
import PanoramaHotspot from './PanoramaHotspot';
import {
  PANORAMA_LOCATIONS,
  PanoramaLocation,
  Hotspot,
  getLocationById
} from '@/data/panoramas';

interface PanoramaViewerProps {
  image?: string;
  title?: string;
  locationId?: string;
  className?: string;
  onLocationChange?: (newLoc: PanoramaLocation) => void;
  showControls?: boolean;
}

// =========================================================================
// 3D SPHERE & SCENE COMPONENT (Runs inside R3F Canvas)
// =========================================================================
interface SphereSceneProps {
  imageSrc: string;
  hotspots: Hotspot[];
  onSelectHotspot: (hotspot: Hotspot) => void;
  onTextureLoaded: () => void;
  onTextureProgress: (pct: number) => void;
  yaw: number;
  pitch: number;
  fov: number;
  isAutoRotating: boolean;
  onAutoRotateTick: (delta: number) => void;
  isGyroActive: boolean;
  gyroEuler: THREE.Euler | null;
}

function SphereScene({
  imageSrc,
  hotspots,
  onSelectHotspot,
  onTextureLoaded,
  onTextureProgress,
  yaw,
  pitch,
  fov,
  isAutoRotating,
  onAutoRotateTick,
  isGyroActive,
  gyroEuler
}: SphereSceneProps) {
  const { camera } = useThree();
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const prevTextureRef = useRef<THREE.Texture | null>(null);

  // Smooth camera orientation targets
  const currentRotation = useRef({ yaw: 0, pitch: 0 });

  // Load equirectangular texture with TextureLoader & memory disposal
  useEffect(() => {
    let isCancelled = false;
    const loader = new THREE.TextureLoader();

    onTextureProgress(20);

    loader.load(
      imageSrc,
      (loadedTex) => {
        if (isCancelled) {
          loadedTex.dispose();
          return;
        }
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.generateMipmaps = true;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.magFilter = THREE.LinearFilter;
        loadedTex.anisotropy = 16;
        loadedTex.wrapS = THREE.RepeatWrapping;
        loadedTex.repeat.x = -1; // Ensures text reads naturally from inside sphere

        // Dispose previous texture to avoid WebGL memory leaks
        if (prevTextureRef.current) {
          prevTextureRef.current.dispose();
        }
        prevTextureRef.current = loadedTex;

        setTexture(loadedTex);
        if (materialRef.current) {
          materialRef.current.needsUpdate = true;
        }
        onTextureProgress(100);
        onTextureLoaded();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = (xhr.loaded / xhr.total) * 100;
          onTextureProgress(pct);
        } else {
          onTextureProgress(70);
        }
      },
      (err) => {
        console.error('Error loading panorama texture:', err);
        onTextureProgress(100);
        onTextureLoaded();
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [imageSrc, onTextureLoaded, onTextureProgress]);

  // Clean up texture on complete unmount
  useEffect(() => {
    return () => {
      if (prevTextureRef.current) {
        prevTextureRef.current.dispose();
        prevTextureRef.current = null;
      }
    };
  }, []);

  // Update Camera FOV (Zoom)
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [fov, camera]);

  // Frame Loop for Damping / Inertia & Smooth Look Around
  useFrame((_, delta) => {
    if (isGyroActive && gyroEuler) {
      // Direct orientation from mobile gyroscope
      camera.quaternion.setFromEuler(gyroEuler);
    } else {
      if (isAutoRotating) {
        onAutoRotateTick(delta);
      }

      // Smooth damping (inertia) between current and target angles
      const dampFactor = Math.min(1, delta * 8);
      currentRotation.current.yaw +=
        (yaw - currentRotation.current.yaw) * dampFactor;
      currentRotation.current.pitch +=
        (pitch - currentRotation.current.pitch) * dampFactor;

      // Convert spherical yaw/pitch to 3D Cartesian look-at vector
      const phi = THREE.MathUtils.degToRad(90 - currentRotation.current.pitch);
      const theta = THREE.MathUtils.degToRad(currentRotation.current.yaw);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.position.set(0, 0, 0); // Strictly centered inside the sphere
      camera.lookAt(targetX, targetY, targetZ);
    }
  });

  return (
    <group>
      {/* 
        CRITICAL 3D SPHERICAL PANORAMA:
        - Geometry: THREE.SphereGeometry(radius 500, widthSegments 60, heightSegments 40)
        - Material: THREE.MeshBasicMaterial
        - side: THREE.BackSide (renders panoramic image on the inside surface)
        - The camera sits inside at [0, 0, 0] looking outward onto the inner sphere walls
      */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial
          ref={materialRef}
          map={texture || undefined}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* 3D Interactive Hotspots mapped on inner spherical geometry */}
      {hotspots.map((hotspot) => (
        <PanoramaHotspot
          key={hotspot.id}
          hotspot={hotspot}
          onSelect={onSelectHotspot}
        />
      ))}
    </group>
  );
}

// =========================================================================
// MAIN PANORAMA VIEWER COMPONENT
// =========================================================================
export default function PanoramaViewer({
  image,
  title,
  locationId = 'reception',
  className = '',
  onLocationChange,
  showControls = true
}: PanoramaViewerProps) {
  // Resolve active location
  const initialLoc = getLocationById(locationId) || PANORAMA_LOCATIONS[0];
  const [currentLocation, setCurrentLocation] = useState<PanoramaLocation>(initialLoc);

  // Synchronize when external props change
  useEffect(() => {
    if (locationId) {
      const found = getLocationById(locationId);
      if (found) setCurrentLocation(found);
    }
  }, [locationId]);

  // Loading & Transition States
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(15);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Camera Rotation & Zoom States
  const [yaw, setYaw] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);
  const [fov, setFov] = useState<number>(75);

  // Interaction & Intro Auto-Rotation
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Gyroscope / Device Orientation
  const [isGyroActive, setIsGyroActive] = useState(false);
  const [gyroEuler, setGyroEuler] = useState<THREE.Euler | null>(null);

  // Drag Pointer Tracking
  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const startAngles = useRef({ yaw: 0, pitch: 0 });
  const touchDistanceStart = useRef<number | null>(null);
  const fovStart = useRef<number>(75);

  const containerRef = useRef<HTMLDivElement>(null);

  // Active image source & title (supports prop overrides)
  const activeImage = image || currentLocation.image;
  const activeTitle = title || currentLocation.title;

  // 1. Initial 2.5s gentle auto-rotation on entry
  useEffect(() => {
    setIsAutoRotating(true);
    const timer = setTimeout(() => {
      setIsAutoRotating(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [currentLocation.id]);

  const handleAutoRotateTick = useCallback((delta: number) => {
    setYaw((prev) => (prev + delta * 6) % 360);
  }, []);

  // 2. Stop auto-rotation immediately when user touches or drags
  const stopAutoRotate = useCallback(() => {
    if (!hasInteracted) setHasInteracted(true);
    setIsAutoRotating(false);
  }, [hasInteracted]);

  // 3. Location Switcher with Smooth Cross-Fade
  const handleSelectLocation = useCallback(
    (newLoc: PanoramaLocation) => {
      if (newLoc.id === currentLocation.id) return;
      setIsTransitioning(true);
      setIsLoading(true);
      setLoadProgress(15);

      // Smoothly reset camera to initial location yaw/pitch
      setYaw(newLoc.defaultYaw ? newLoc.defaultYaw * (180 / Math.PI) : 0);
      setPitch(newLoc.defaultPitch ? newLoc.defaultPitch * (180 / Math.PI) : 0);
      setFov(75);

      setCurrentLocation(newLoc);
      onLocationChange?.(newLoc);
    },
    [currentLocation.id, onLocationChange]
  );

  // 4. Hotspot Click Handler (Navigate to other panorama or focus camera)
  const handleSelectHotspot = useCallback(
    (hotspot: Hotspot) => {
      stopAutoRotate();
      if (hotspot.type === 'navigation' && hotspot.targetLocationId) {
        const target = getLocationById(hotspot.targetLocationId);
        if (target) {
          handleSelectLocation(target);
        }
      } else if (hotspot.description) {
        // Look at hotspot position smoothly
        const [x, y, z] = hotspot.position;
        const targetPitch = 90 - THREE.MathUtils.radToDeg(Math.acos(y / 500));
        const targetYaw = THREE.MathUtils.radToDeg(Math.atan2(z, x));
        setYaw(targetYaw);
        setPitch(Math.max(-80, Math.min(80, targetPitch)));
      }
    },
    [handleSelectLocation, stopAutoRotate]
  );

  // 5. Desktop Pointer Drag & Touch Handling with Pitch Clamping
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with left mouse button or touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    stopAutoRotate();
    isDragging.current = true;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    startAngles.current = { yaw, pitch };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - pointerStart.current.x;
    const deltaY = e.clientY - pointerStart.current.y;

    // Sensitivity factor based on current FOV (smoother when zoomed in)
    const factor = (fov / 75) * 0.18;

    const newYaw = (startAngles.current.yaw - deltaX * factor) % 360;
    // Strictly clamp pitch between -85 and +85 degrees to prevent flipping!
    const newPitch = Math.max(
      -85,
      Math.min(85, startAngles.current.pitch + deltaY * factor)
    );

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // 6. Mouse Wheel Zoom (FOV Clamped between 35° and 90°)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    stopAutoRotate();
    setFov((prevFov) => {
      const zoomSpeed = 0.05;
      const nextFov = prevFov + e.deltaY * zoomSpeed;
      return Math.max(35, Math.min(90, nextFov));
    });
  };

  // 7. Mobile Pinch-to-Zoom Gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoRotate();
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceStart.current = Math.hypot(dx, dy);
      fovStart.current = fov;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceStart.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = touchDistanceStart.current / dist;
      const nextFov = fovStart.current * ratio;
      setFov(Math.max(35, Math.min(90, nextFov)));
    }
  };

  const handleTouchEnd = () => {
    touchDistanceStart.current = null;
  };

  // 8. Device Orientation / Mobile Gyroscope Handler
  const toggleGyroscope = async () => {
    if (isGyroActive) {
      setIsGyroActive(false);
      return;
    }

    try {
      // Check iOS 13+ permission
      if (
        typeof (DeviceOrientationEvent as any) !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission !== 'granted') {
          alert('Gyroscope permission denied. Please allow motion sensors in browser settings.');
          return;
        }
      }
      setIsGyroActive(true);
      stopAutoRotate();
    } catch {
      setIsGyroActive(true);
      stopAutoRotate();
    }
  };

  useEffect(() => {
    if (!isGyroActive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha === null || e.beta === null || e.gamma === null) return;
      // Convert device angles to Three.js Euler angles
      const alphaRad = THREE.MathUtils.degToRad(e.alpha);
      const betaRad = THREE.MathUtils.degToRad(e.beta - 90);
      const gammaRad = THREE.MathUtils.degToRad(-e.gamma);
      setGyroEuler(new THREE.Euler(betaRad, alphaRad, gammaRad, 'YXZ'));
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isGyroActive]);

  // 9. Manual Zoom Controls (+ / -) & Recenter
  const handleZoomIn = () => {
    stopAutoRotate();
    setFov((prev) => Math.max(35, prev - 12));
  };

  const handleZoomOut = () => {
    stopAutoRotate();
    setFov((prev) => Math.min(90, prev + 12));
  };

  const handleResetCamera = () => {
    stopAutoRotate();
    setYaw(0);
    setPitch(0);
    setFov(75);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={`360 Virtual Tour: ${activeTitle}`}
    >
      {/* Three.js React Three Fiber 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 65, near: 0.1, far: 2000 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false
        }}
        className="w-full h-full"
      >
        <SphereScene
          imageSrc={activeImage}
          hotspots={currentLocation.hotspots}
          onSelectHotspot={handleSelectHotspot}
          onTextureLoaded={() => {
            setIsLoading(false);
            setTimeout(() => setIsTransitioning(false), 300);
          }}
          onTextureProgress={(pct) => setLoadProgress(pct)}
          yaw={yaw}
          pitch={pitch}
          fov={fov}
          isAutoRotating={isAutoRotating}
          onAutoRotateTick={handleAutoRotateTick}
          isGyroActive={isGyroActive}
          gyroEuler={gyroEuler}
        />
      </Canvas>

      {/* Cinematic Dark Transition & Progress Loader */}
      <PanoramaLoader
        progress={loadProgress}
        title={activeTitle}
        isTransitioning={isTransitioning}
      />

      {/* Floating HUD Controls Overlay */}
      {showControls && (
        <PanoramaControls
          currentLocation={currentLocation}
          onSelectLocation={handleSelectLocation}
          onResetCamera={handleResetCamera}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          isGyroActive={isGyroActive}
          onToggleGyro={toggleGyroscope}
          hasInteracted={hasInteracted}
        />
      )}
    </div>
  );
}
