'use client';

import { useEffect, useRef, useState } from 'react';
import '@photo-sphere-viewer/core/index.css';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  Sparkles,
  Compass,
  AlertCircle
} from 'lucide-react';

interface Panorama360Props {
  src: string;
  caption?: string;
  height?: string;
  className?: string;
  defaultYaw?: number | string;
  defaultPitch?: number | string;
  defaultZoom?: number;
  autoRotateSpeed?: string | boolean;
}

export default function Panorama360({
  src,
  caption,
  height = '560px',
  className = '',
  defaultYaw = 0,
  defaultPitch = 0,
  defaultZoom = 50,
  autoRotateSpeed = '1rpm'
}: Panorama360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Initialize Viewer on client-side
  useEffect(() => {
    let isMounted = true;

    if (!containerRef.current) return;

    const initViewer = async () => {
      try {
        if (!isMounted || !containerRef.current) return;
        setLoading(true);
        setError(null);

        // Dynamically import Viewer from @photo-sphere-viewer/core
        const { Viewer } = await import('@photo-sphere-viewer/core');

        if (!isMounted || !containerRef.current) return;

        // If viewer instance already exists, smoothly change panorama
        if (viewerRef.current) {
          try {
            await viewerRef.current.setPanorama(src, {
              transition: 'fade-only',
              speed: 1200
            });
          } catch {
            // ignore
          }
          if (isMounted) setLoading(false);
          return;
        }

        const el = containerRef.current;
        if (!el) return;

        // Create new Photo Sphere Viewer instance
        const viewer = new Viewer({
          container: el,
          panorama: src,
          caption: caption || '',
          loadingImg: undefined,
          loadingTxt: '',
          navbar: false, // Using our custom premium dark UI controls
          defaultYaw: defaultYaw,
          defaultPitch: defaultPitch,
          defaultZoomLvl: defaultZoom,
          touchmoveTwoFingers: false,
          mousewheelCtrlKey: false,
          minFov: 30,
          maxFov: 90
        });

        if (!isMounted) {
          try { viewer.destroy(); } catch {}
          return;
        }

        viewerRef.current = viewer;

        if (viewer && typeof viewer.addEventListener === 'function') {
          viewer.addEventListener('ready', () => {
            if (isMounted) {
              setLoading(false);
            }
          });

          viewer.addEventListener('panorama-loaded', () => {
            if (isMounted) {
              setLoading(false);
            }
          });

          viewer.addEventListener('fullscreen', (e: any) => {
            if (isMounted) {
              setIsFullscreen(Boolean(e?.fullscreenEnabled || e?.enabled));
            }
          });
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error initializing 360° viewer');
          setLoading(false);
        }
      }
    };

    initViewer();

    return () => {
      isMounted = false;
    };
  }, [src, caption, defaultYaw, defaultPitch, defaultZoom]);

  // Clean up viewer on unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        viewerRef.current = null;
      }
    };
  }, []);

  // Controls
  const handleZoomIn = () => {
    if (viewerRef.current) {
      viewerRef.current.zoom(viewerRef.current.getZoomLevel() + 15);
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current) {
      viewerRef.current.zoom(viewerRef.current.getZoomLevel() - 15);
    }
  };

  const handleResetCamera = () => {
    if (viewerRef.current) {
      viewerRef.current.animate({
        yaw: defaultYaw,
        pitch: defaultPitch,
        zoom: defaultZoom,
        speed: '3rpm'
      });
    }
  };

  const handleToggleFullscreen = () => {
    if (viewerRef.current) {
      viewerRef.current.toggleFullscreen();
    }
  };

  const handleToggleAutoRotate = () => {
    if (viewerRef.current) {
      if (isRotating) {
        viewerRef.current.stopAutoRotate?.();
        setIsRotating(false);
      } else {
        viewerRef.current.startAutoRotate?.();
        setIsRotating(true);
      }
    }
  };

  return (
    <div
      className={`panorama-360-container ${className} ${isFullscreen ? 'fullscreen' : ''}`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Photo Sphere Canvas Mount Point */}
      <div ref={containerRef} className="panorama-360-viewport" />

      {/* Loading Spinner Indicator */}
      {loading && (
        <div className="panorama-loading-overlay">
          <div className="panorama-spinner">
            <RotateCw className="spin-icon" size={28} />
          </div>
          <span>Loading 360° Panorama...</span>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="panorama-error-overlay">
          <AlertCircle size={28} color="#e53e3e" />
          <span>{error}</span>
          <small>Check if image exists in /public/images/360/</small>
        </div>
      )}

      {/* Top Badge & Live Indicator */}
      <div className="panorama-hud-top">
        <div className="panorama-360-badge">
          <span className="badge-pulse" />
          <span className="badge-text">360° IMMERSIVE</span>
        </div>

        {caption && (
          <div className="panorama-caption-pill">
            <Eye size={14} color="#c47c43" />
            <span>{caption}</span>
          </div>
        )}
      </div>

      {/* Drag to Explore Indicator */}
      <div className="panorama-drag-hint">
        <Compass size={14} />
        <span>Drag to Explore in 360°</span>
      </div>

      {/* Glassmorphism Floating Controls Toolbar */}
      <div className="panorama-hud-controls" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="pano-btn"
          title="Zoom In"
          onClick={handleZoomIn}
        >
          <ZoomIn size={16} />
        </button>

        <button
          type="button"
          className="pano-btn"
          title="Zoom Out"
          onClick={handleZoomOut}
        >
          <ZoomOut size={16} />
        </button>

        <button
          type="button"
          className="pano-btn"
          title="Reset Camera Angle"
          onClick={handleResetCamera}
        >
          <RotateCw size={15} />
        </button>

        <button
          type="button"
          className="pano-btn"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          onClick={handleToggleFullscreen}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
}
