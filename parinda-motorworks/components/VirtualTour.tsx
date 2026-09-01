'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Panorama360 from './Panorama360';
import {
  TentTree,
  Coffee,
  Wrench,
  Waves,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export interface TourLocation {
  id: string;
  name: string;
  tagline: string;
  image: string; // 360 equirectangular image path inside /public/images/360/
  thumbnail?: string;
  icon: any;
  description: string;
  highlights: string[];
}

export const tourLocations: TourLocation[] = [
  {
    id: 'camping',
    name: 'Camping',
    tagline: 'Terraced Forest Stargazing',
    image: '/images/360/camping-360.jpg',
    thumbnail: '/images/fac-camping.jpg',
    icon: TentTree,
    description: 'Pitched alpine expedition tents nestled under tall pine trees. Step inside the 360° campground and look around the campfire circle and twilight lake backdrop.',
    highlights: ['Quiet vehicle parking outside tent', 'Central stone campfire circle', 'Direct access to 3 toilets & 3 showers']
  },
  {
    id: 'nest-cafe',
    name: 'Nest Cafe',
    tagline: 'High Hills Timber Overlook',
    image: '/images/360/nest-cafe-360.jpg',
    thumbnail: '/images/the-nest-main-render.jpg',
    icon: Coffee,
    description: 'Sloped thatched timber pavilion perched over the valley with 180° panoramic vistas of mountain ridges and lake islands. Sustainable wood & stone dining retreat.',
    highlights: ['180° Panoramic mountain lake view', '6-Item curated menu', '100% Strictly separate Veg & Non-Veg kitchens']
  },
  {
    id: 'workshop',
    name: 'Workshop',
    tagline: 'Solid Materials & Tech Stalls',
    image: '/images/360/workshop-360.jpg',
    thumbnail: '/images/thumb-workshop.jpg',
    icon: Wrench,
    description: 'Industrial heavy-duty workshop featuring heavy timber workstations, comprehensive pneumatic tool racks, and spare parts inventory for off-road machines.',
    highlights: ['Solid reinforced build', 'Dedicated multi-vehicle bays', 'Certified on-site mechanics on active duty']
  },
  {
    id: 'swimming-pool',
    name: 'Swimming Pool',
    tagline: 'Blue Water Relaxation Oasis',
    image: '/images/360/pool-360.jpg',
    thumbnail: '/images/scene-swimming-pool.jpg',
    icon: Waves,
    description: 'Crystal-clear blue water pool surrounded by tropical palm trees, shaded pavilions, and loungers for post-trail relaxation and group rejuvenation.',
    highlights: ['Pristine blue water basin', 'Sun loungers & shaded cabanas', 'Direct access to private rinse showers']
  },
  {
    id: 'offroad-track',
    name: 'Off-Road Track',
    tagline: 'Obstacle Course & Machine Staging',
    image: '/images/360/offroad-360.jpg',
    thumbnail: '/images/bike-skill-mound.jpg',
    icon: Sparkles,
    description: 'Technical off-road track area with dirt mounds, balance logs, and vehicle staging bays. Look 360° around the machine preparation stalls.',
    highlights: ['Mound climbs & obstacle courses', 'Machine staging & inspection stalls', 'Guided coaching & skill sessions']
  },
  {
    id: 'water-crossing',
    name: 'Water Crossing',
    tagline: 'Water Stream Track',
    image: '/images/360/water-crossing-360.jpg',
    thumbnail: '/images/parinda-lake-offroad-park.jpg',
    icon: Waves,
    description: 'Shallow stony stream crossing over rockbeds and gravel. 4x4 SUVs and off-road vehicles navigate dynamic water depths with standby winch support.',
    highlights: ['450mm–700mm calibrated water depth', 'Sustainable timber & wood architecture', 'Dedicated 4x4 standby recovery winch']
  }
];

export function VirtualTour() {
  const [activeLocation, setActiveLocation] = useState<TourLocation>(tourLocations[0]);

  return (
    <section className="virtual-tour-section" id="virtual-tour">
      <div className="section-head">
        <div>
          <span className="priority-pill">
            <Sparkles size={13} /> 360° VIRTUAL TOUR
          </span>
          <h2>
            EXPLORE IN 360°.<br />
            <span>STEP INSIDE. LOOK AROUND.</span>
          </h2>
        </div>
        <p className="copy narrow">
          Step inside. Look around. Experience every corner. Select any of the 6 signature sanctuary locations below to instantly step into an interactive 360° panoramic sphere.
        </p>
      </div>

      {/* 6 Location Selector Cards */}
      <div className="virtual-tour-selector-grid">
        {tourLocations.map((loc) => {
          const isActive = activeLocation.id === loc.id;
          const IconComponent = loc.icon;

          return (
            <button
              key={loc.id}
              type="button"
              className={`tour-location-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveLocation(loc)}
            >
              <div className="tour-card-icon">
                <IconComponent size={20} />
              </div>
              <div className="tour-card-text">
                <b>{loc.name}</b>
                <span>{loc.tagline}</span>
              </div>
              {isActive && <div className="tour-card-active-dot" />}
            </button>
          );
        })}
      </div>

      {/* Full-Width 360° Photo Sphere Viewer Canvas */}
      <div className="virtual-tour-viewer-wrapper">
        <Panorama360
          key={activeLocation.id}
          src={activeLocation.image}
          caption={`${activeLocation.name} — ${activeLocation.tagline}`}
          height="580px"
          defaultYaw={0}
          defaultPitch={0}
          defaultZoom={50}
        />
      </div>

      {/* Selected Location Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLocation.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="tour-info-panel"
        >
          <div className="tour-info-left">
            <span className="tour-location-badge">
              <MapPin size={13} /> {activeLocation.name.toUpperCase()} SANCTUARY
            </span>
            <h3>{activeLocation.name} — {activeLocation.tagline}</h3>
            <p className="copy" style={{ margin: '8px 0 16px', fontSize: 13 }}>
              {activeLocation.description}
            </p>
          </div>

          <div className="tour-info-right">
            <b>LOCATION HIGHLIGHTS:</b>
            <div className="tour-highlights-list">
              {activeLocation.highlights.map((h) => (
                <div key={h} className="tour-highlight-item">
                  <CheckCircle2 size={15} color="#c47c43" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
