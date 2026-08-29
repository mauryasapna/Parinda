'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Instagram,
  Menu,
  Mountain,
  ShieldCheck,
  Sparkles,
  TentTree,
  X,
  Youtube,
  MapPin,
  Maximize2,
  Car,
  Bike,
  Trees,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  RotateCw,
  Box,
  Layers,
  Compass as CompassIcon,
  Waves
} from 'lucide-react';
import { ParindaLogo } from '../components/ParindaLogo';
import {
  experiences,
  facilities,
  parkLocations,
  galleryImages,
  threeDScenes,
  ExperienceItem,
  ParkLocationItem,
  ThreeDScene
} from '../data/site';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<ParkLocationItem>(parkLocations[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ src: string; title: string; category: string } | null>(null);

  // 3D Off-Road & Lake Crossing Stage State
  const [activeScene, setActiveScene] = useState<ThreeDScene>(threeDScenes[0]);
  const [tilt3D, setTilt3D] = useState<{ x: number; y: number; zoom: number }>({ x: 8, y: -12, zoom: 1 });
  const [activeAnglePreset, setActiveAnglePreset] = useState<'isometric' | 'driver' | 'drone' | 'flat'>('isometric');

  const viewportRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate interactive 3D rotation angles (-15 to 15 degrees)
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;

    setTilt3D({ x: rotateX, y: rotateY, zoom: 1.03 });
  };

  const handleMouseLeave = () => {
    // Reset to current preset angle
    setPresetAngle(activeAnglePreset);
  };

  const setPresetAngle = (preset: 'isometric' | 'driver' | 'drone' | 'flat') => {
    setActiveAnglePreset(preset);
    if (preset === 'isometric') setTilt3D({ x: 10, y: -14, zoom: 1.02 });
    if (preset === 'driver') setTilt3D({ x: 2, y: 0, zoom: 1.08 });
    if (preset === 'drone') setTilt3D({ x: 22, y: -6, zoom: 1 });
    if (preset === 'flat') setTilt3D({ x: 0, y: 0, zoom: 1 });
  };

  const categories = ['all', 'Tracks & 4x4', 'Camping', 'Skill Zone', 'Architecture', 'Community', 'Family', 'Oasis'];

  const filteredGallery = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(img.category.toLowerCase()));

  return (
    <main>
      {/* NAVBAR */}
      <header className="nav">
        <a href="#" className="brand" aria-label="Parinda Motorworks Home">
          <ParindaLogo size="md" />
        </a>

        <nav className={`navlinks ${menuOpen ? 'open' : ''}`}>
          {['explore', 'about', '3d-tracks', 'experiences', 'blueprint', 'the-nest', 'facilities', 'nesling', 'gallery'].map(x => (
            <a key={x} href={`#${x}`} onClick={() => setMenuOpen(false)}>
              {x.replace('-', ' ')}
            </a>
          ))}
          <a className="navcta" href="#contact" onClick={() => setMenuOpen(false)}>
            Book Visit
          </a>
        </nav>

        <button className="menubtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="hero-eagle-badge"
          >
            <ParindaLogo size="hero" showSubtitle={false} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="eyebrow"
          >
            PARINDA MOTORWORKS • OFF-ROAD ADVENTURE ECOSYSTEM
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            ADVENTURE.<br />
            <em>COMMUNITY.</em><br />
            EXPERIENCE.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lead"
          >
            A complete adventure mobility ecosystem designed for machines, dual-sport riders, 4x4 overlanders, and outdoor enthusiasts in a breathtaking natural landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="actions"
          >
            <a className="btn primary" href="/arena">
              Launch 3D Arena Simulation <Box size={16} />
            </a>
            <a className="btn ghost" href="#blueprint">
              Master Plan Specs <MapPin size={16} />
            </a>
          </motion.div>
        </div>

        <div className="scroll">
          SCROLL TO EXPLORE <ArrowDownRight size={14} />
        </div>
      </section>

      {/* STORY & OVERVIEW */}
      <section className="story section" id="explore">
        <div className="section-grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="image-card"
          >
            <img
              src="/images/master-ecosystem-map.jpg"
              alt="Parinda Motorworks Master Ecosystem Overview"
            />
            <div className="image-caption-badge">
              <span>MASTER ECOSYSTEM PLAN</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="eyebrow">THE PARINDA PURPOSE</p>
            <h2>
              MORE THAN A TRACK.<br />
              <span>IT&apos;S A DESTINATION.</span>
            </h2>
            <p className="copy">
              Parinda Motorworks brings together technical 4x4 trails, motorbike skill zones, starry terraced camping, artisanal food, vehicle care, and vibrant community culture into one integrated natural habitat.
            </p>

            <div className="stats">
              <div>
                <b>01</b>
                <span>4x4 & ADV<br />Tracks</span>
              </div>
              <div>
                <b>02</b>
                <span>Panoramic<br />Retreat & Dining</span>
              </div>
              <div>
                <b>03</b>
                <span>Starlight<br />Camping Grounds</span>
              </div>
              <div>
                <b>04</b>
                <span>Kids Explorer<br />& Nature Zone</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT PARINDA / THE FOUNDER'S STORY ================= */}
      <section className="about-founder section" id="about">
        <div className="about-founder-grid">
          {/* Left Editorial Visual Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="about-founder-visual"
          >
            <div className="founder-image-wrapper">
              <img
                src="/images/bike-skill-mound.jpg"
                alt="Ayush - Riding and Exploring at Parinda Motorworks"
              />
              <div className="founder-overlay-gradient" />
              <div className="founder-quote-badge">
                <span>“RIDE HARD. RIDE FAR. STAY HUMBLE. RIDE FREE.”</span>
              </div>
            </div>
            <div className="founder-card-footer">
              <div>
                <b>AYUSH</b>
                <small>RIDER &amp; FOUNDER, PARINDA MOTORWORKS</small>
              </div>
              <div className="founder-handshake-icon">🤝</div>
            </div>
          </motion.div>

          {/* Right Story Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="about-founder-content"
          >
            <p className="eyebrow">ABOUT PARINDA • THE FOUNDER&apos;S STORY</p>
            <h2>
              I&apos;M AYUSH.<br />
              <span>I RIDE. I EXPLORE. I CONNECT.</span>
            </h2>

            <div className="founder-text-body">
              <p className="founder-lead-quote">
                I’m Ayush, a rider and someone who believes that riding is much more than just owning a motorcycle.
              </p>

              <p>
                After spending a huge part of my life on the road, I’ve learned that the real beauty of riding is not the bike, the gear, or the destination. It’s the people you meet, the roads you discover, and the experiences you carry back with you.
              </p>

              <p>
                For me, being a rider means stopping when someone needs help, waving back to another rider, giving people space on the road, and respecting everyone who shares the journey.
              </p>

              <div className="founder-highlight-box">
                <p>
                  It doesn&apos;t matter whether someone rides a big ADV, a 150cc motorcycle, or an old commuter. If you&apos;re out there exploring, <b>you&apos;re part of the journey.</b>
                </p>
              </div>

              <p>
                That belief is one of the reasons behind <b>Parinda Motorworks</b> — a place where adventure, machines and people come together. Here, I want to create more than just an off-road experience. I want to create a community where people can ride, learn, explore, connect and simply enjoy being on the road.
              </p>

              {/* 4 Core Mottos */}
              <div className="founder-mottos-grid">
                <div className="motto-pill">
                  <span>🏍️</span>
                  <b>Ride Hard.</b>
                </div>
                <div className="motto-pill">
                  <span>🗺️</span>
                  <b>Ride Far.</b>
                </div>
                <div className="motto-pill">
                  <span>🤝</span>
                  <b>Stay Humble.</b>
                </div>
                <div className="motto-pill">
                  <span>🦅</span>
                  <b>Ride Free.</b>
                </div>
              </div>

              <div className="founder-signature-row">
                <div className="founder-signature-text">
                  <b>— Ayush</b>
                  <span>Founder, Parinda Motorworks</span>
                </div>
                <a className="btn primary" href="#contact">
                  Join The Community <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          3D OFF-ROAD TRACKS & LAKE CROSSING INTERACTIVE ARENA
          ========================================================= */}
      <section className="threed-section section" id="3d-tracks">
        <div className="section-head">
          <div>
            <p className="eyebrow">3D INTERACTIVE OFF-ROAD ARENA</p>
            <h2>
              OFF-ROAD TRACKS &<br />
              <span>LAKE CROSSING IN 3D.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Interact with the 3D terrain below. Move your cursor to tilt the 3D perspective, explore water wading points, dirt bike lines, and technical 4x4 crawler obstacles.
          </p>
        </div>

        {/* 3D Scene Switcher Tabs */}
        <div className="threed-tabs">
          {threeDScenes.map((scene) => (
            <button
              key={scene.id}
              className={`threed-tab-btn ${activeScene.id === scene.id ? 'active' : ''}`}
              onClick={() => setActiveScene(scene)}
            >
              {scene.id === 'lake-crossing' && '🌊'}
              {scene.id === 'water-wading-pit' && '🚙'}
              {scene.id === 'convoy-trail' && '🌲'}
              {scene.id === 'bike-skill-mound' && '🏍️'}
              {scene.title.split(' ')[0]} {scene.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* 3D Stage + Technical Specs Panel */}
        <div className="threed-stage-wrapper">
          {/* 3D Interactive Viewport */}
          <div className="threed-stage">
            <div
              ref={viewportRef}
              className="threed-viewport"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt3D.x}deg) rotateY(${tilt3D.y}deg) scale3d(${tilt3D.zoom}, ${tilt3D.zoom}, ${tilt3D.zoom})`
              }}
            >
              {/* Background Image Layer */}
              <div
                className="threed-image-layer"
                style={{ backgroundImage: `url(${activeScene.image})` }}
              />

              {/* Dynamic 3D Depth Glare */}
              <div className="threed-glare-layer" />

              {/* Interactive 3D Depth Hotspots */}
              {activeScene.hotspots.map((spot, idx) => (
                <div
                  key={spot.title}
                  className="threed-hotspot"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <div className="threed-pin-dot">
                    <span>{spot.icon}</span>
                  </div>
                  <div className="threed-tooltip">
                    <b>{spot.title}</b>
                    <span>{spot.subtitle}</span>
                  </div>
                </div>
              ))}

              {/* 3D Hint Badge */}
              <div className="threed-hint-badge">
                <Box size={14} /> 3D Tilt Active • Move Mouse
              </div>

              {/* Angle Presets Toolbar */}
              <div className="threed-angle-bar">
                <button
                  className={`threed-angle-btn ${activeAnglePreset === 'isometric' ? 'active' : ''}`}
                  onClick={() => setPresetAngle('isometric')}
                >
                  Isometric 3D
                </button>
                <button
                  className={`threed-angle-btn ${activeAnglePreset === 'driver' ? 'active' : ''}`}
                  onClick={() => setPresetAngle('driver')}
                >
                  Driver POV
                </button>
                <button
                  className={`threed-angle-btn ${activeAnglePreset === 'drone' ? 'active' : ''}`}
                  onClick={() => setPresetAngle('drone')}
                >
                  Drone 3D
                </button>
                <button
                  className={`threed-angle-btn ${activeAnglePreset === 'flat' ? 'active' : ''}`}
                  onClick={() => setPresetAngle('flat')}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Panel */}
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="threed-info-panel"
          >
            <div>
              <span className="threed-vehicle-tag">
                <Car size={14} /> {activeScene.vehicle}
              </span>
              <h3>{activeScene.title}</h3>
              <p className="copy" style={{ margin: '8px 0 16px', fontSize: 13 }}>
                {activeScene.description}
              </p>

              <div className="threed-specs-grid">
                {activeScene.specs.map((spec) => (
                  <div key={spec.label} className="threed-spec-box">
                    <span>{spec.label}</span>
                    <b>{spec.value}</b>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                className="btn primary"
                style={{ width: '100%', justifyContent: 'center' }}
                href="/arena"
              >
                Launch Fullscreen 3D Simulator <ArrowRight size={16} />
              </a>
              <button
                className="btn ghost"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setActiveLightboxImage({ src: activeScene.image, title: activeScene.title, category: activeScene.vehicle })}
              >
                Inspect 4K Blueprint <Maximize2 size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE MASTER PLAN & LOCATION SPECS
          ========================================================= */}
      <section className="map-section section" id="blueprint">
        <div className="section-head">
          <div>
            <p className="eyebrow">INTERACTIVE PARK MASTER PLAN</p>
            <h2>
              EXPLORE PARK<br />
              <span>LOCATIONS & SPECS.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Select any zone below to view architectural blueprints, 3D renders, surface characteristics, and facility specifications.
          </p>
        </div>

        <div className="map-wrap">
          {/* Map Image with Clean Pin Labels */}
          <div className="map-container">
            <img
              src="/images/master-ecosystem-map.jpg"
              alt="Interactive Park Master Plan"
              className="master-map-img"
            />
            <div className="map-pins-layer">
              {parkLocations.map((loc) => {
                const isActive = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    className={`pin ${isActive ? 'active' : ''}`}
                    style={{ top: loc.pinCoords.top, left: loc.pinCoords.left }}
                    onClick={() => setSelectedLocation(loc)}
                  >
                    <i />
                    <span>{loc.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Location Details Card with Exact Specs */}
          <AnimatePresence mode="wait">
            <motion.aside
              key={selectedLocation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="map-info-card"
            >
              <div>
                <div
                  className="map-info-img-wrap"
                  onClick={() => setActiveLightboxImage({ src: selectedLocation.image, title: selectedLocation.name, category: selectedLocation.subtitle })}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={selectedLocation.image} alt={selectedLocation.name} />
                  <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
                    <Maximize2 size={12} /> Enlarge View
                  </div>
                </div>

                <p className="location-sub">{selectedLocation.subtitle}</p>
                <h3>{selectedLocation.name}</h3>
                <p className="copy" style={{ margin: '10px 0 0', fontSize: 13 }}>
                  {selectedLocation.text}
                </p>

                <div className="feature-list">
                  {selectedLocation.features.map(f => (
                    <span key={f}>
                      <CheckCircle2 size={14} color="#c47c43" /> {f}
                    </span>
                  ))}
                </div>
              </div>

              {selectedLocation.specs && (
                <div className="spec-pills">
                  {selectedLocation.specs.map(s => (
                    <div key={s.label} className="spec-pill">
                      <b>{s.label}:</b> {s.value}
                    </div>
                  ))}
                </div>
              )}
            </motion.aside>
          </AnimatePresence>
        </div>
      </section>

      {/* EXPERIENCES GRID */}
      <section className="section dark" id="experiences">
        <div className="section-head">
          <div>
            <p className="eyebrow">CURATED EXPERIENCES</p>
            <h2>
              BUILT FOR<br />
              <span>ADVENTURE.</span>
            </h2>
          </div>
          <p className="copy narrow">
            From technical rock crawling to relaxing by the bonfire with good music and good people.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((item: ExperienceItem, idx: number) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="experience"
              onClick={() => setActiveLightboxImage({ src: item.image, title: item.title, category: item.category })}
              style={{ cursor: 'pointer' }}
            >
              <div className="tile-image" style={{ backgroundImage: `url(${item.image})` }}>
                <span className="tile-category-tag">{item.category}</span>
                <span className="tile-number">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <div className="tile-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* THE NEST ARCHITECTURAL SHOWCASE */}
      <section className="nest-section section" id="the-nest">
        <div className="nest-grid">
          <div className="nest-visuals">
            <div
              className="nest-visual-main"
              onClick={() => setActiveLightboxImage({ src: '/images/the-nest-main-render.jpg', title: 'The Nest - Main 3D Overview', category: 'Architecture' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/images/the-nest-main-render.jpg" alt="The Nest 3D Timber Pavilion Render" />
              <div className="image-caption-badge">
                <span>180° PANORAMIC TIMBER RETREAT</span>
              </div>
            </div>
            <div className="nest-visual-side">
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/the-nest-evening.jpg', title: 'The Nest - Evening Sunset Atmosphere', category: 'Atmosphere' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/the-nest-evening.jpg" alt="The Nest Evening Sunset Ambiance" />
              </div>
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/the-nest-overview.jpg', title: 'The Nest - Floor Plan & Sections', category: 'Design Blueprints' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/the-nest-overview.jpg" alt="The Nest Floor Plan & Elevations" />
              </div>
            </div>
          </div>

          <div className="nest-copy">
            <p className="eyebrow">SIGNATURE RETREAT</p>
            <h2>
              THE NEST.<br />
              <span>WHERE ADVENTURE MEETS THE VIEW.</span>
            </h2>
            <p className="copy">
              The heart & soul of Parinda. A place to pause, connect, observe, share stories and create memories. Perched over the valley with sloped steel-and-wood heat/rain protection, open-deck seating, café, and central bonfire circle.
            </p>

            <div className="chips">
              <span>180° Panoramic View</span>
              <span>Sloped Natural Roof</span>
              <span>Central Bonfire Circle</span>
              <span>Café & Fresh Brews</span>
              <span>Sunset Viewpoint</span>
              <span>Board Games & Reading Nook</span>
            </div>

            <a className="btn primary" href="#contact">
              Reserve a table or bonfire <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FACILITIES GRID (8 CORE FACILITIES FROM PDF PAGE 1) */}
      <section className="section" id="facilities">
        <div className="section-head">
          <div>
            <p className="eyebrow">PARK INFRASTRUCTURE</p>
            <h2>
              EVERYTHING<br />
              <span>IN PLACE.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Engineered for seamless arrivals, vehicle maintenance, rider comfort, and safety.
          </p>
        </div>

        <div className="facility-grid">
          {facilities.map((f, i) => (
            <div
              key={f.name}
              className="facility-card"
              onClick={() => setActiveLightboxImage({ src: f.image, title: f.name, category: `Facility: ${f.tag || 'Infrastructure'}` })}
              style={{ cursor: 'pointer' }}
            >
              <div className="facility-img-wrap">
                <img src={f.image} alt={f.name} />
                {f.tag && <span className="facility-badge">{f.tag}</span>}
              </div>
              <div className="facility-content">
                <div className="facility-header-row">
                  <span className="fac-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.name}</h3>
                </div>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NESLING KIDS EXPLORER ZONE (PAGE 7 OF PDF) */}
      <section className="nesling-section section" id="nesling">
        <div className="nesling-banner">
          <div>
            <p className="eyebrow">FAMILY & KIDS ZONE</p>
            <h2>
              NESLING.<br />
              <span>EXPLORE. PLAY. GROW.</span>
            </h2>
            <p className="copy">
              A nature-inspired space for little adventurers to play, learn, create and connect with nature. Safe, engaging, and inspiring with wooden treehouses, balance log bridges, and sand sensory play.
            </p>

            <div className="chips">
              <span>Treehouse & Climbing</span>
              <span>Creative Art Corner</span>
              <span>Sand & Sensory Play</span>
              <span>Nature Walk Trail</span>
              <span>Safe Fenced Area</span>
              <span>Parent Shaded Lounge</span>
            </div>

            <a className="btn ghost" href="#contact">
              Learn about family days <ArrowRight size={16} />
            </a>
          </div>

          <div
            className="image-card"
            onClick={() => setActiveLightboxImage({ src: '/images/nesling-kids-zone-overview.jpg', title: 'Nesling Kids Zone Master Plan', category: 'Kids Zone' })}
            style={{ cursor: 'pointer' }}
          >
            <img src="/images/nesling-kids-render.jpg" alt="Nesling Kids Playground in Nature" />
            <div className="image-caption-badge">
              <span>NATURE-INSPIRED PLAYSCAPE</span>
            </div>
          </div>
        </div>
      </section>

      {/* FULL PHOTO & RENDER GALLERY WITH FILTERS & LIGHTBOX */}
      <section className="section dark" id="gallery">
        <div className="section-head">
          <div>
            <p className="eyebrow">PHOTO & BLUEPRINT ARCHIVE</p>
            <h2>
              EXPERIENCE THE<br />
              <span>VISUAL JOURNEY.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Authentic photographs and architectural visualisations from the Parinda Motorworks park blueprint.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="gallery-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`gallery-item ${item.span || 'normal'}`}
                onClick={() => setActiveLightboxImage(item)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="cat">{item.category}</span>
                  <h4>{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* COMMUNITY & EVENTS */}
      <section className="section" id="community">
        <div className="community-grid">
          <div>
            <p className="eyebrow">COMMUNITY & EVENTS</p>
            <h2>
              BUILT FOR<br />
              <span>THE COMMUNITY.</span>
            </h2>
            <p className="copy">
              Meetups, training clinics, brand launches, corporate retreats and weekend rallies — designed for pure off-road camaraderie.
            </p>
            <div style={{ marginTop: 30 }}>
              <a className="btn primary" href="#contact">
                Host An Event <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="community-cards">
            <div className="community-card">
              <Mountain size={28} />
              <div>
                <b>RIDING CLINICS</b>
                <span>Master sand, ruts, logs & hill descents</span>
              </div>
            </div>
            <div className="community-card">
              <TentTree size={28} />
              <div>
                <b>CAMPFIRE NIGHTS</b>
                <span>Acoustic sets, BBQ, and stargazing</span>
              </div>
            </div>
            <div className="community-card">
              <Compass size={28} />
              <div>
                <b>OVERLAND TRAILS</b>
                <span>Guided convoy expeditions in nature</span>
              </div>
            </div>
            <div className="community-card">
              <Flame size={28} />
              <div>
                <b>COMMUNITY MEETS</b>
                <span>Bike & 4x4 enthusiast gatherings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY & SUPPORT */}
      <section className="safety section dark">
        <p className="eyebrow">SAFETY & SUPPORT PROTOCOLS</p>
        <h2>
          ADVENTURE,<br />
          <span>WITH CONFIDENCE.</span>
        </h2>
        <div className="safety-grid">
          <div>
            <ShieldCheck size={32} />
            <h3>Safety Briefing</h3>
            <p>Mandatory track orientation, route difficulty ratings, and safety gear verification.</p>
          </div>
          <div>
            <Compass size={32} />
            <h3>Marshals & Recovery</h3>
            <p>On-track trained marshals with 4x4 winching and recovery equipment on standby.</p>
          </div>
          <div>
            <Sparkles size={32} />
            <h3>Onsite First Aid</h3>
            <p>Dedicated medical care station, emergency responders, and safety equipment.</p>
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section className="cta" id="contact">
        <div className="cta-content">
          <p className="eyebrow">PARINDA MOTORWORKS</p>
          <h2>
            READY FOR<br />
            <em>THE ADVENTURE?</em>
          </h2>
          <p>
            Come ride, explore, learn, connect and experience Parinda Motorworks. Reach out for ride day bookings, track sessions, camping reservations, and private events.
          </p>
          <div className="actions" style={{ marginTop: 30 }}>
            <a className="btn primary" href="mailto:hello@parindamotorworks.com">
              Contact Us <ArrowRight size={16} />
            </a>
            <a className="btn ghost" href="tel:+919876543210">
              Call Direct
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <ParindaLogo size="lg" />
          <p style={{ marginTop: 14 }}>Adventure. Community. Experience.<br />A complete adventure mobility ecosystem.</p>
        </div>

        <div className="footer-links">
          <a href="#explore">Explore</a>
          <a href="#3d-tracks">3D Tracks</a>
          <a href="#blueprint">Master Plan</a>
          <a href="#the-nest">The Nest</a>
          <a href="#facilities">Facilities</a>
          <a href="#nesling">Nesling Kids Zone</a>
          <a href="#gallery">Gallery</a>
          <a href="#community">Community</a>
        </div>

        <div className="social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={18} />
          </a>
        </div>

        <small>© 2026 Parinda Motorworks. All Rights Reserved. Concept off-road adventure park.</small>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setActiveLightboxImage(null)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close"
                onClick={() => setActiveLightboxImage(null)}
              >
                <X size={18} /> Close
              </button>
              <img src={activeLightboxImage.src} alt={activeLightboxImage.title} />
              <div className="lightbox-caption">
                <h3>{activeLightboxImage.title}</h3>
                <p>{activeLightboxImage.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
