'use client';

import { useState, useRef, useEffect, useCallback, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  Eye
} from 'lucide-react';

export interface SceneHotspot {
  id: string;
  title: string;
  subtitle: string;
  yaw: number; // horizontal angle in degrees (-180 to 180)
  pitch: number; // vertical angle in degrees (-30 to 30)
  icon: string;
  tag?: string;
}

export interface PanoramicScene {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  hotspots: SceneHotspot[];
}

export const panoramicScenes: PanoramicScene[] = [
  {
    id: 'camping-360',
    number: '1',
    title: '1. Camping 360° View',
    category: '1. CAMPING 360° VIEW',
    image: '/images/scene-camping-360.jpg',
    description: 'Immersive terraced forest campground nestled beneath tall pine trees, featuring a central stone bonfire circle, quiet vehicle parking outside your tent, and a serene lake view horizon.',
    specs: [
      { label: 'View Type', value: '360° Forest & Lake Panorama' },
      { label: 'Parking', value: 'Direct In-Front Tent Bay' },
      { label: 'Rule', value: 'Zero-Honking Quiet Sanctuary' },
      { label: 'Hygiene', value: '3 Private Toilets + 3 Showers' }
    ],
    hotspots: [
      { id: 'c1', title: 'Central Stone Fire Pit', subtitle: 'Acoustic campfire storytelling & BBQ', yaw: 0, pitch: -10, icon: '🔥', tag: 'Bonfire Hub' },
      { id: 'c2', title: 'Alpine Expedition Tents', subtitle: 'Comfortable bedding & natural shade', yaw: 45, pitch: -6, icon: '🏕️', tag: 'Camp Pitch' },
      { id: 'c3', title: 'Lake Sunset Overlook', subtitle: 'Golden hour twilight horizon', yaw: -70, pitch: 8, icon: '🌅', tag: 'Lakeside View' }
    ]
  },
  {
    id: 'nest-cafe',
    number: '2',
    title: '2. Nest (Cafe) with Short High Hills View',
    category: '2. NEST (CAFE) WITH SHORT HIGH HILLS VIEW',
    image: '/images/scene-nest-cafe.jpg',
    description: 'Thatched timber open-deck pavilion perched high on the ridge with a 180° view of turquoise lake islands and surrounding mountain peaks. Features a focused 6-item menu and separate kitchens.',
    specs: [
      { label: 'Architecture', value: 'Natural Thatched Timber & Stone' },
      { label: 'Menu Focus', value: '6 Curated Signature Dishes' },
      { label: 'Kitchens', value: 'Strictly Separate Veg / Non-Veg' },
      { label: 'Panorama', value: '180° Lake & Mountain Hills' }
    ],
    hotspots: [
      { id: 'n1', title: 'Open-Air Timber Deck', subtitle: 'Rustic wooden tables & valley vista', yaw: -40, pitch: 4, icon: '☕', tag: 'Dining Deck' },
      { id: 'n2', title: 'High Hills & Lake Overlook', subtitle: 'Panoramic mountain and island views', yaw: 35, pitch: 6, icon: '⛰️', tag: '180° Panorama' },
      { id: 'n3', title: 'Single Central Order Desk', subtitle: 'Centralized ordering & brew station', yaw: -15, pitch: -8, icon: '🧾', tag: 'Billing Desk' }
    ]
  },
  {
    id: 'workshop-tools',
    number: '3',
    title: '3. Workshop - Solid Material & Tools',
    category: '3. WORKSHOP - SOLID MATERIAL & TOOLS',
    image: '/images/scene-workshop-tools.jpg',
    description: 'Constructed from solid heavy-duty materials with comprehensive mechanical tools, fabrication workbenches, pneumatic lifts, and parts inventory for off-road machines.',
    specs: [
      { label: 'Construction', value: 'Solid Heavy-Duty Build' },
      { label: 'Tooling', value: 'Full Power, Hand & Pneumatic Tools' },
      { label: 'Capacity', value: 'Multi-Machine Fabrication & Tuning' },
      { label: 'Staffing', value: 'Certified On-Site Technicians' }
    ],
    hotspots: [
      { id: 'w1', title: 'Solid Timber Workbenches', subtitle: 'Heavy tool stations & vices', yaw: -30, pitch: -6, icon: '🔨', tag: 'Workstation' },
      { id: 'w2', title: 'Comprehensive Tool Rack', subtitle: 'Complete mechanical maintenance kit', yaw: 20, pitch: 4, icon: '🔧', tag: 'Pro Tools' },
      { id: 'w3', title: 'Trail Spares Inventory', subtitle: 'Emergency replacements & hardware', yaw: -70, pitch: -4, icon: '⚙️', tag: 'Parts' }
    ]
  },
  {
    id: 'bike-mechanics',
    number: '4',
    title: '4. Bike Space & Mechanics Work',
    category: '4. BIKE SPACE & MECHANICS WORK',
    image: '/images/scene-bike-mechanics.jpg',
    description: 'Dedicated indoor and shaded motorcycle service bays with active mechanics performing chain adjustments, tire changes, diagnostics, and suspension tuning.',
    specs: [
      { label: 'Service Bays', value: 'Dedicated Machine Stalls' },
      { label: 'Mechanics', value: 'On-Site Active Duty' },
      { label: 'Maintenance', value: 'Diagnostics, Tire, Chain, Tuning' },
      { label: 'Machines', value: 'Adventure Bikes & 4x4 SUVs' }
    ],
    hotspots: [
      { id: 'b1', title: 'Mechanic Active Service Bay', subtitle: 'Professional tuning & brake inspection', yaw: 40, pitch: -8, icon: '👨‍🔧', tag: 'Active Duty' },
      { id: 'b2', title: 'Staged Trail Bikes', subtitle: 'Bikes prepped for off-road track', yaw: -35, pitch: -10, icon: '🏍️', tag: 'Staging' },
      { id: 'b3', title: 'Diagnostics & Inspection Board', subtitle: 'Pre-ride trail safety check', yaw: -5, pitch: 6, icon: '📋', tag: 'Inspection' }
    ]
  },
  {
    id: 'water-crossing',
    number: '5',
    title: '5. Water Crossing with Track',
    category: '5. WATER CROSSING WITH TRACK',
    image: '/images/scene-water-crossing.jpg',
    description: 'Shallow mountain stream crossing over pond rockbeds and gravel. 4x4 SUVs and off-road vehicles navigate water spray, pebbles, and transition into forest tracks.',
    specs: [
      { label: 'Water Depth', value: '450mm - 700mm Dynamic Wading' },
      { label: 'Pondbed Surface', value: 'Natural Stone & Gravel' },
      { label: 'Architecture', value: 'Sustainable Timber Structures' },
      { label: 'Standby Recovery', value: 'Dedicated 4x4 Winch Crew on Duty' }
    ],
    hotspots: [
      { id: 'wc1', title: '4x4 Water Wading Line', subtitle: 'Mahindra Thar water splash crossing', yaw: -15, pitch: -8, icon: '🚙', tag: 'River Track' },
      { id: 'wc2', title: 'Stony Riverbed Traction', subtitle: 'Natural stone & gravel test', yaw: 50, pitch: -12, icon: '🪨', tag: 'Riverbed' },
      { id: 'wc3', title: 'Forest Trail Incline', subtitle: 'Ascent to upper mountain ridge', yaw: -65, pitch: 8, icon: '🌲', tag: 'Ridge Trail' }
    ]
  },
  {
    id: 'natural-pond',
    number: '6',
    title: '6. In Water Pond & Swimming (Natural Water)',
    category: '6. IN WATER POND & SWIMMING (NATURAL WATER)',
    image: '/images/scene-natural-pond.jpg',
    description: 'Emerald green fresh mountain water pond with natural cascades, rock waterfalls, and granite ledges. 100% natural swimming pond fed by mountain springs.',
    specs: [
      { label: 'Water Character', value: 'Pure Natural Spring Waterfall' },
      { label: 'Environment', value: 'Granite Rocks & Jungle Canopy' },
      { label: 'Type', value: 'Natural Rock Swimming Pond' },
      { label: 'Features', value: 'Cascades, Shaded Rocks & Plunge' }
    ],
    hotspots: [
      { id: 'p1', title: 'Mountain Waterfall Cascades', subtitle: 'Fresh stream flowing from rocks', yaw: 25, pitch: 4, icon: '🌊', tag: 'Waterfall' },
      { id: 'p2', title: 'Natural Rock Swimming Lagoon', subtitle: 'Crystal clear emerald waters', yaw: -10, pitch: -10, icon: '🏊', tag: 'Natural Pond' },
      { id: 'p3', title: 'Granite Relaxation Ledges', subtitle: 'Sunbathing and resting boulders', yaw: -55, pitch: -8, icon: '⛰️', tag: 'Rest Ledge' }
    ]
  },
  {
    id: 'swimming-pool',
    number: '7',
    title: '7. Swimming Pool (Blue Water)',
    category: '7. SWIMMING POOL (BLUE WATER)',
    image: '/images/scene-swimming-pool.jpg',
    description: 'Crystal-clear blue water swimming pool surrounded by tropical palm trees, shaded pavilions, and loungers for relaxation after trail drives.',
    specs: [
      { label: 'Pool Type', value: 'Blue Water Lap & Relaxation Pool' },
      { label: 'Surroundings', value: 'Palms, Sunbeds & Shaded Cabanas' },
      { label: 'Depth', value: 'Graduated Shallow to Deep End' },
      { label: 'Amenities', value: 'Towels, Restrooms & Deck Seating' }
    ],
    hotspots: [
      { id: 'sp1', title: 'Blue Water Pool Basin', subtitle: 'Clear chlorinated freshwater pool', yaw: 0, pitch: -10, icon: '🏊', tag: 'Blue Pool' },
      { id: 'sp2', title: 'Palm Tree Perimeter', subtitle: 'Tropical landscape & sunbeds', yaw: -50, pitch: 6, icon: '🌴', tag: 'Sunbeds' },
      { id: 'sp3', title: 'Shaded Relaxation Pavilion', subtitle: 'Rest cabana & viewing pavilion', yaw: 5, pitch: 8, icon: '⛱️', tag: 'Pavilion' }
    ]
  }
];

export function InteractiveSceneViewer() {
  const [activeScene, setActiveScene] = useState<PanoramicScene>(panoramicScenes[0]);
  const [yaw, setYaw] = useState<number>(0); // -180 to 180 degrees
  const [pitch, setPitch] = useState<number>(0); // -24 to 24 degrees
  const [zoom, setZoom] = useState<number>(1.12); // 1.0 to 1.7
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<SceneHotspot | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; startYaw: number; startPitch: number }>({ x: 0, y: 0, startYaw: 0, startPitch: 0 });

  // Auto rotate loop when idle
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setYaw((prev) => {
        let next = prev + 0.14;
        if (next > 180) next -= 360;
        return next;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startYaw: yaw,
      startPitch: pitch
    };
  };

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const sensitivity = 0.3 / zoom;
    let newYaw = dragStartRef.current.startYaw - deltaX * sensitivity;
    let newPitch = dragStartRef.current.startPitch + deltaY * sensitivity;

    while (newYaw > 180) newYaw -= 360;
    while (newYaw < -180) newYaw += 360;
    newPitch = Math.max(-24, Math.min(24, newPitch));

    setYaw(newYaw);
    setPitch(newPitch);
  }, [isDragging, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        startYaw: yaw,
        startPitch: pitch
      };
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;

    const sensitivity = 0.34 / zoom;
    let newYaw = dragStartRef.current.startYaw - deltaX * sensitivity;
    let newPitch = dragStartRef.current.startPitch + deltaY * sensitivity;

    while (newYaw > 180) newYaw -= 360;
    while (newYaw < -180) newYaw += 360;
    newPitch = Math.max(-24, Math.min(24, newPitch));

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(1.0, Math.min(1.7, prev - e.deltaY * 0.001)));
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Background offset calculation based on Yaw (-180 to 180) and Pitch
  const backgroundPositionX = `${50 + (yaw / 360) * 100}%`;
  const backgroundPositionY = `${50 + (pitch / 48) * 50}%`;

  return (
    <div className="scene-viewer-wrapper" id="360-tour">
      <div className="section-head">
        <div>
          <span className="priority-pill">
            <RotateCw size={13} /> 360° PANORAMIC SCENE EXPLORER
          </span>
          <h2>
            DRAG &amp; ROTATE<br />
            <span>AROUND ALL 7 SCENES.</span>
          </h2>
        </div>
        <p className="copy narrow">
          Click and drag anywhere on the scene below (or swipe on touchscreens) to rotate 360° in all directions. Explore Camping, The Nest Café, Solid Workshop, Mechanics Bays, Water Crossing, Natural Pond, and Swimming Pool.
        </p>
      </div>

      {/* Scene Carousel Tabs for All 9 Scenes */}
      <div className="scene-selector-tabs">
        {panoramicScenes.map((scene) => (
          <button
            key={scene.id}
            className={`scene-tab-pill ${activeScene.id === scene.id ? 'active' : ''}`}
            onClick={() => {
              setActiveScene(scene);
              setYaw(0);
              setPitch(0);
              setActiveHotspot(null);
            }}
          >
            <span className="scene-idx">{scene.number}</span>
            <span className="scene-name">{scene.category}</span>
          </button>
        ))}
      </div>

      {/* Main 360 Viewer Canvas */}
      <div
        ref={containerRef}
        className={`scene-viewport-card ${isFullscreen ? 'fullscreen' : ''} ${isDragging ? 'grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Dynamic Panoramic Image Layer with Curvature & Scale */}
        <div
          className="panoramic-render-layer"
          style={{
            backgroundImage: `url(${activeScene.image})`,
            backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
            transform: `scale(${zoom}) rotateX(${pitch * 0.45}deg)`
          }}
        />

        {/* Ambient Vignette & Glare Layer */}
        <div className="panoramic-ambient-vignette" />

        {/* Interactive Hotspots calculated with 360 projection */}
        <div className="panoramic-hotspots-overlay">
          {activeScene.hotspots.map((spot) => {
            let diffYaw = spot.yaw - yaw;
            while (diffYaw > 180) diffYaw -= 360;
            while (diffYaw < -180) diffYaw += 360;

            const isVisible = Math.abs(diffYaw) < 55;
            const leftPercent = 50 + (diffYaw / 110) * 100;
            const topPercent = 50 - ((spot.pitch - pitch) / 48) * 100;

            if (!isVisible) return null;

            return (
              <motion.div
                key={spot.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`scene-hotspot-pin ${activeHotspot?.id === spot.id ? 'active' : ''}`}
                style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(spot);
                }}
              >
                <div className="hotspot-pulse-ring" />
                <div className="hotspot-icon-node">
                  <span>{spot.icon}</span>
                </div>

                <div className="hotspot-tooltip-card">
                  <span className="hotspot-tag">{spot.tag || 'Zone'}</span>
                  <b>{spot.title}</b>
                  <p>{spot.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* HUD Top Bar */}
        <div className="scene-hud-top">
          <div className="hud-scene-badge">
            <span className="hud-dot" />
            <b>{activeScene.title}</b>
          </div>

          <div className="hud-compass">
            <Compass size={15} style={{ transform: `rotate(${-yaw}deg)`, transition: 'transform 0.1s linear' }} />
            <span>{Math.round((yaw + 360) % 360)}°</span>
          </div>
        </div>

        {/* HUD Drag Helper Hint */}
        <div className="scene-drag-hint">
          <span>🖐️ Drag / Swipe to Rotate 360° • Scroll / Pinch to Zoom</span>
        </div>

        {/* HUD Controls Toolbar */}
        <div className="scene-hud-controls" onClick={(e) => e.stopPropagation()}>
          <button
            className="hud-ctrl-btn"
            title="Zoom In"
            onClick={() => setZoom((prev) => Math.min(1.7, prev + 0.12))}
          >
            <ZoomIn size={16} />
          </button>
          <button
            className="hud-ctrl-btn"
            title="Zoom Out"
            onClick={() => setZoom((prev) => Math.max(1.0, prev - 0.12))}
          >
            <ZoomOut size={16} />
          </button>
          <button
            className={`hud-ctrl-btn ${autoRotate ? 'active' : ''}`}
            title={autoRotate ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            className="hud-ctrl-btn"
            title="Reset Perspective"
            onClick={() => {
              setYaw(0);
              setPitch(0);
              setZoom(1.12);
            }}
          >
            <RotateCw size={15} />
          </button>
          <button
            className="hud-ctrl-btn"
            title="Toggle Fullscreen"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Bottom Scene Specifications & Detail Box */}
      <motion.div
        key={activeScene.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="scene-details-panel"
      >
        <div className="scene-desc-block">
          <span className="priority-pill" style={{ marginBottom: 6 }}>
            {activeScene.category}
          </span>
          <h3>{activeScene.title}</h3>
          <p className="copy" style={{ fontSize: 13, margin: '8px 0 16px' }}>
            {activeScene.description}
          </p>
        </div>

        <div className="scene-specs-grid">
          {activeScene.specs.map((spec) => (
            <div key={spec.label} className="scene-spec-card">
              <span>{spec.label}</span>
              <b>{spec.value}</b>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
