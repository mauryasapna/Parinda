'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  Compass,
  Instagram,
  Menu,
  ShieldCheck,
  TentTree,
  X,
  Youtube,
  MapPin,
  Maximize2,
  Bike,
  Trees,
  Flame,
  CheckCircle2,
  Coffee,
  Wrench,
  Waves,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Ticket,
  ChevronRight,
  Users,
  Car,
  Target,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Send,
  Check
} from 'lucide-react';
import { ParindaLogo } from '../components/ParindaLogo';
import {
  experiences,
  facilities,
  parkLocations,
  galleryImages,
  campingOptions,
  nestMenuItems,
  bookingPackages,
  initialReviews,
  ExperienceItem,
  ParkLocationItem,
  MenuItem,
  CampingOption,
  ReviewItem
} from '../data/site';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<ParkLocationItem>(parkLocations[0]);
  const [selectedCampingTab, setSelectedCampingTab] = useState<string>(campingOptions[0].id);
  const [menuFilter, setMenuFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ src: string; title: string; category: string } | null>(null);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewVehicle, setNewReviewVehicle] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('Adventure Rider');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    const newEntry: ReviewItem = {
      id: 'rev-' + Date.now(),
      name: newReviewName.trim(),
      role: newReviewRole || 'Community Guest',
      vehicle: newReviewVehicle.trim() || 'Adventure Machine',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };
    setReviewsList([newEntry, ...reviewsList]);
    setReviewSubmitSuccess(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSubmitSuccess(false);
      setNewReviewName('');
      setNewReviewVehicle('');
      setNewReviewComment('');
    }, 1500);
  };

  const categories = ['All', 'Camping', 'The Nest Café', 'Water Crossing', 'Workshop', 'Sanctuary', 'Founder', 'Overland'];

  const filteredGallery = selectedCategory.toLowerCase() === 'all'
    ? galleryImages
    : galleryImages.filter(img => 
        img.category.toLowerCase().includes(selectedCategory.toLowerCase()) || 
        selectedCategory.toLowerCase().includes(img.category.toLowerCase())
      );

  const filteredMenu = menuFilter === 'all'
    ? nestMenuItems
    : nestMenuItems.filter(item => item.type === menuFilter);

  const activeCamping = campingOptions.find(c => c.id === selectedCampingTab) || campingOptions[0];

  return (
    <main>
      {/* NAVBAR */}
      <header className="nav">
        <a href="#" className="brand" aria-label="Parinda Home">
          <ParindaLogo size="sm" showSubtitle={true} />
        </a>

        {/* Center Desktop Links */}
        <div className="nav-center-links">
          <a href="#overview">Overview</a>
          <a href="#about">Our Story</a>
          <a href="#reviews">Reviews</a>
          <a href="#gallery">Visual Documentation</a>
        </div>

        {/* Desktop Right Actions & Mobile Drawer */}
        <nav className={`navlinks ${menuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-only-links">
            <a href="#overview" onClick={() => setMenuOpen(false)}>
              <span>Overview</span>
              <ChevronRight size={14} color="var(--accent)" />
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              <span>Our Story</span>
              <ChevronRight size={14} color="var(--accent)" />
            </a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              <span>Reviews</span>
              <ChevronRight size={14} color="var(--accent)" />
            </a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              <span>Visual Documentation</span>
              <ChevronRight size={14} color="var(--accent)" />
            </a>
          </div>

          <div className="nav-actions-cluster">
            <a className="nav-mobile-contact-item" href="tel:+919934906882" onClick={() => setMenuOpen(false)}>
              <Phone size={13} color="var(--accent-light)" /> <span>+91 9934906882</span>
            </a>
            <a className="navcta" href="https://chat.whatsapp.com/Kp92NUbFsA8Cwa6ajFrpEm?s=cl&p=a&ilr=0" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              💬 Join WhatsApp Community
            </a>
          </div>
        </nav>

        <button className="menubtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            ADVENTURE MOBILITY<br />
            <em>EXPERIENCE</em> CENTER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lead"
          >
            A premium destination for off-road machines, community gatherings, brand launches, driving skill sessions, and weekend getaways nestled harmoniously in natural forest surroundings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="actions"
          >
            <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20pass%20or%20slot." target="_blank" rel="noopener noreferrer">
              Book Passes <Ticket size={16} />
            </a>
            <a className="btn ghost" href="#camp">
              Explore Camping &amp; Retreat <TentTree size={16} />
            </a>
          </motion.div>
        </div>

        <div className="scroll">
          SCROLL TO EXPLORE <ArrowDownRight size={14} />
        </div>
      </section>

      {/* =========================================================================
          PARINDA ECOSYSTEM & 6 VERTICALS (ECOSYSTEM HUB)
          ========================================================================= */}
      <section className="masterbrand-section" id="overview">
        <div className="masterbrand-head">
          <p className="eyebrow">OVERVIEW</p>
          <h2>PARINDA</h2>
          <p className="masterbrand-subtitle">ADVENTURE MOBILITY EXPERIENCE CENTRE</p>
          <p className="masterbrand-lead">
            Parinda is an adventure mobility destination where people ride, camp, learn, and experience the outdoors all in one place.
          </p>
        </div>

        {/* 6 Verticals Grid */}
        <div className="verticals-grid">
          <a href="#caravan" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <Bike size={26} />
            </div>
            <h3 className="vertical-card-title">PARINDA CARAVAN</h3>
            <p className="vertical-card-tagline">Motorcycle Expeditions &amp; Community</p>
          </a>

          <a href="#workshop" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <Wrench size={26} />
            </div>
            <h3 className="vertical-card-title">PARINDA WORKSHOP</h3>
            <p className="vertical-card-tagline">Service, Preparation &amp; Mechanical Support</p>
          </a>

          <a href="#experiences" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <Target size={26} />
            </div>
            <h3 className="vertical-card-title">OFF-ROAD TRACK</h3>
            <p className="vertical-card-tagline">Off-road, Mud &amp; Water Crossing Trails</p>
          </a>

          <a href="#camp" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <TentTree size={26} />
            </div>
            <h3 className="vertical-card-title">PARINDA BASE</h3>
            <p className="vertical-card-tagline">Camping &amp; Outdoor Living</p>
          </a>

          <a href="#reception" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <ShoppingBag size={26} />
            </div>
            <h3 className="vertical-card-title">PARINDA RECEPTION</h3>
            <p className="vertical-card-tagline">Welcome Lounge, Check-in &amp; Gear</p>
          </a>

          <a href="#events" className="vertical-card">
            <div className="vertical-icon-wrapper">
              <Sparkles size={26} />
            </div>
            <h3 className="vertical-card-title">PARINDA EVENTS</h3>
            <p className="vertical-card-tagline">Corporate &amp; Brand Gatherings</p>
          </a>
        </div>

        {/* Ecosystem Footer Banner */}
        <div className="masterbrand-footer-banner">
          <p>
            WELCOME TO <span>PARINDA</span> • ADVENTURE MOBILITY DESTINATION
          </p>
        </div>
      </section>


      {/* =========================================================================
          PARINDA VERTICAL: PARINDA BASE (CAMPING & OUTDOOR LIVING)
          ========================================================================= */}
      <section className="priority-section section" id="camp">
        {/* 50/50 Camping Showcase Grid with 3 Real Images */}
        <div className="nest-grid">
          {/* Left: 3 Real Camping Photos */}
          <div className="nest-visuals">
            <div
              className="nest-visual-main"
              onClick={() => setActiveLightboxImage({ src: '/images/camping-bikers-vantage.jpg', title: 'Night Camping & Stargazing', category: 'Camping' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/images/camping-bikers-vantage.jpg" alt="Night Camping & Stargazing" />
              <div className="image-caption-badge">
                <span>NIGHT CAMPING &amp; STARGAZING</span>
              </div>
            </div>

            <div className="nest-visual-side">
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/camping-valley-riverside.jpg', title: 'The Valley Lights & Pondside Camp', category: 'Camping' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/camping-valley-riverside.jpg" alt="The Valley Lights & Pondside Camp" />
              </div>
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/camping-tents-forest.jpg', title: 'Base Forest Pitches & The Yard Parking', category: 'Camping' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/camping-tents-forest.jpg" alt="Base Terraced Forest Pitch and Camp Setup" />
              </div>
            </div>
          </div>

          {/* Right: Camping Inclusions & Info */}
          <div className="nest-copy">
            <span className="priority-pill">PARINDA BASE</span>
            <h2>
              PARINDA BASE.<br />
              <span>CAMPING &amp; OUTDOOR LIVING.</span>
            </h2>
            <p className="copy">
              Camping at Base. Park your motorcycle directly outside your tent.
            </p>

            <div className="nest-highlights-grid">
              <div className="nest-pill">
                <Bike size={18} color="#c47c43" />
                <div>
                  <b>The Yard (In-Front Parking)</b>
                  <span>Park your motorcycle or 4x4 quietly at The Yard right outside your tent pitch.</span>
                </div>
              </div>
              <div className="nest-pill highlight">
                <Sparkles size={18} color="#e5995e" />
                <div>
                  <b>Our Toilets &amp; Our Showers</b>
                  <span>Our toilets and our showers on 24h standby.</span>
                </div>
              </div>
            </div>

            <div className="chips">
              <span>🏕️ Do-It-Yourself (DIY) Tent Pitch (₹500/night)</span>
              <span>🎒 Bring Your Own Tent (₹250/night)</span>
              <span>🌌 Night Stargazing</span>
              <span>🔥 Central Bonfire Circles</span>
              <span>🤫 Strict Zero-Honking Quiet Zone</span>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20Camping%20Pass." target="_blank" rel="noopener noreferrer">
                Book Camping Pass <ArrowRight size={16} />
              </a>
              <a className="btn ghost" href="#packages-spotlight">
                View Stay Rates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARINDA VERTICAL: THE NEST (CAFE AND ENJOY VIEW PLACE)
          ========================================================================= */}
      <section className="priority-section section dark" id="the-nest">
        <div className="nest-grid">
          {/* Visuals - 3 Real Photos */}
          <div className="nest-visuals">
            <div
              className="nest-visual-main"
              onClick={() => setActiveLightboxImage({ src: '/images/the-nest-pavilion-sunset.jpg', title: 'The Nest - Open Deck Pavilion Lounge, Central Fire Pit & Mountain View', category: 'The Nest' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/images/the-nest-pavilion-sunset.jpg" alt="The Nest Open Deck Pavilion Lounge, Central Fire Pit & Mountain Valley View" />
              <div className="image-caption-badge">
                <span>100% TIMBER &amp; STONE ARCHITECTURE</span>
              </div>
            </div>
            <div className="nest-visual-side">
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/the-nest-pavilion-dusk.jpg', title: 'The Nest - Timber Pavilion Lounge & Central Fireplace', category: 'The Nest' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/the-nest-pavilion-dusk.jpg" alt="The Nest Timber Lounge and Fireplace" />
              </div>
              <div
                onClick={() => setActiveLightboxImage({ src: '/images/the-nest-terrace-aerial.jpg', title: 'The Nest - Open Terrace & Central Fire Pit (Top View)', category: 'The Nest' })}
                style={{ cursor: 'pointer' }}
              >
                <img src="/images/the-nest-terrace-aerial.jpg" alt="The Nest Stone Terrace Aerial View" />
              </div>
            </div>
          </div>

          <div className="nest-copy">
            <span className="priority-pill">THE NEST</span>
            <h2>
              THE NEST<br />
              <span>(CAFE AND ENJOY VIEW PLACE).</span>
            </h2>
            <p className="copy">
              An open-deck sustainable timber and stone pavilion perched high above the valley. Gather around roaring central bonfires, relax in comfortable leather armchairs, observe trail tracks, and enjoy sunset views.
            </p>

            {/* Architecture Highlights */}
            <div className="nest-highlights-grid">
              <div className="nest-pill">
                <Coffee size={18} color="#c47c43" />
                <div>
                  <b>Open Timber Deck &amp; Lounge</b>
                  <span>Open-deck timber lounge seating &amp; rustic bar.</span>
                </div>
              </div>
              <div className="nest-pill highlight">
                <Flame size={18} color="#e5995e" />
                <div>
                  <b>Central Bonfire &amp; Fireplace</b>
                  <span>Gather around central fire pits and warm outdoor fireplace.</span>
                </div>
              </div>
            </div>

            <div className="chips">
              <span>Open Deck Mountain Café</span>
              <span>100% Wood &amp; Stone Architecture</span>
              <span>Open Timber Deck Lounge</span>
              <span>Central Bonfire Deck</span>
              <span>Zero Artificial Hotel Structures</span>
            </div>

            {/* THE NEST OPERATING MODEL (TIMINGS) */}
            <div style={{ marginTop: 24, background: 'rgba(196, 124, 67, 0.08)', border: '1px solid rgba(196, 124, 67, 0.3)', borderRadius: 8, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Coffee size={18} color="var(--accent-light)" />
                <h4 style={{ fontFamily: 'Barlow Condensed', fontSize: 18, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--paper)', margin: 0 }}>
                  THE NEST OPERATING MODEL
                </h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 10 }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line-light)' }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-light)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Breakfast</span>
                  <b style={{ fontSize: 13, color: '#fff' }}>8:00 AM – 10:00 AM</b>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line-light)' }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-light)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Lunch</span>
                  <b style={{ fontSize: 13, color: '#fff' }}>12:00 PM – 2:00 PM</b>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line-light)' }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-light)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Evening Snacks</span>
                  <b style={{ fontSize: 13, color: '#fff' }}>4:00 PM – 6:00 PM</b>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line-light)' }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-light)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Dinner</span>
                  <b style={{ fontSize: 13, color: '#fff' }}>7:00 PM – 9:00 PM</b>
                </div>
              </div>
              <div style={{ marginTop: 10, padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#fca5a5' }}>
                <span>🔒</span> <b>Kitchen Closed:</b> 10:00 PM – 8:00 AM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARINDA VERTICAL: PARINDA WORKSHOP (SERVICE, PREPARATION & MECHANICAL SUPPORT)
          ========================================================================= */}
      <section className="priority-section section" id="workshop">
        <div className="workshop-grid">
          <div className="workshop-copy">
            <span className="priority-pill">PARINDA WORKSHOP</span>
            <h2>
              PARINDA WORKSHOP.<br />
              <span>SERVICE, PREPARATION &amp; MECHANICAL SUPPORT.</span>
            </h2>
            <p className="copy">
              Comprehensive service bays, mechanical tools, and maintenance support for adventure motorcycles and off-road 4x4 vehicles before and after trail rides.
            </p>

            {/* Solid Materials & Machine Stalls Specs */}
            <div className="workshop-specs-list">
              <div className="workshop-spec-item">
                <Wrench size={22} color="#c47c43" />
                <div>
                  <b>Full Professional Machine Tools</b>
                  <span>Pneumatic lifts, heavy impact drivers, tire machines, torque wrenches, and digital scanners.</span>
                </div>
              </div>
              <div className="workshop-spec-item">
                <ShieldCheck size={22} color="#c47c43" />
                <div>
                  <b>Mechanics on Active Duty</b>
                  <span>Technicians on standby for engine tuning, trail repairs, and tire balancing.</span>
                </div>
              </div>
              <div className="workshop-spec-item">
                <Trees size={22} color="#c47c43" />
                <div>
                  <b>Solid Heavy-Duty Build</b>
                  <span>Engineered with industrial solid materials, high-load concrete bays, and heavy tool racks.</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20Workshop%20Session." target="_blank" rel="noopener noreferrer">
                Book Workshop <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div
            className="workshop-visual"
            onClick={() => setActiveLightboxImage({ src: '/images/parinda-workshop-real.jpg', title: 'Parinda Workshop - Mechanics & Machine Care Stalls', category: 'Workshop' })}
            style={{ cursor: 'pointer' }}
          >
            <img src="/images/parinda-workshop-real.jpg" alt="Parinda Workshop - Mechanics, Machine Stalls & Pro Tools" />
            <div className="workshop-tag-badge">
              <span>PRO TOOLS • MECHANICS ON-SITE</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARINDA VERTICAL: PARINDA EXPERIENCES (OFF-ROAD, TRACK & DRIVING EXPERIENCES)
          ========================================================================= */}
      <section className="priority-section section dark" id="experiences">
        <div className="water-crossing-grid">
          <div className="experiences-visuals-pair">
            <div
              className="experiences-visual-card"
              onClick={() => setActiveLightboxImage({ src: '/images/parinda-exp-water-splash.jpg', title: 'Parinda Experiences - 4x4 Stream Crossing & Deck View', category: 'Experiences' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/images/parinda-exp-water-splash.jpg" alt="Parinda Experiences - 4x4 SUV Stream Crossing Splash at Sunset" />
              <div className="image-caption-badge">
                <span>WATER CROSSING &amp; ROCKBED</span>
              </div>
            </div>

            <div
              className="experiences-visual-card"
              onClick={() => setActiveLightboxImage({ src: '/images/parinda-exp-lake-aerial.jpg', title: 'Parinda Experiences - Staging Arena, Buggy Fleet & Mountain Tracks', category: 'Experiences' })}
              style={{ cursor: 'pointer' }}
            >
              <img src="/images/parinda-exp-lake-aerial.jpg" alt="Parinda Experiences - Fleet Staging Grounds & Water Crossing" />
              <div className="image-caption-badge">
                <span>STAGING ARENA, BUGGY FLEET &amp; WATER TRACKS</span>
              </div>
            </div>
          </div>

          <div className="water-crossing-copy">
            <span className="priority-pill">OFF-ROAD TRACK</span>
            <h2>
              OFF-ROAD TRACK.<br />
              <span>DRIVING &amp; RIDING TRAILS.</span>
            </h2>
            <p className="copy">
              A genuine mountain stream crossing over authentic pond rock beds, natural gravel, and muddy trails. Designed specifically for dual-sport adventure machines and 4x4 vehicles — <b>completely free of artificial swimming pools or resort gimmicks</b>.
            </p>

            <div className="water-crossing-points">
              <div className="wc-point">
                <Waves size={18} color="#c47c43" />
                <div>
                  <b>Pondbed Stones &amp; Mud</b>
                  <span>Real water depth calibration (450mm–700mm) over pond gravel beds.</span>
                </div>
              </div>
              <div className="wc-point">
                <Trees size={18} color="#c47c43" />
                <div>
                  <b>Sustainable Timber Build</b>
                  <span>Decks, bridges, and perimeter markers built with sustainable timber and local wood.</span>
                </div>
              </div>
              <div className="wc-point">
                <ShieldCheck size={18} color="#c47c43" />
                <div>
                  <b>4x4 Standby Winch Recovery</b>
                  <span>Dedicated 4x4 recovery equipment on active standby for all off-road vehicles.</span>
                </div>
              </div>
            </div>

            <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20the%20Off-Road%20Track." target="_blank" rel="noopener noreferrer">
              Book Off-Road Track <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PACKAGES SPOTLIGHT SECTION (PASS PRICING & CAMPING FACILITIES)
          ========================================================================= */}
      <section className="section" id="packages-spotlight">
        <div className="section-head">
          <div>
            <p className="eyebrow">COMMUNITY PASSES &amp; BOOKINGS</p>
            <h2>
              CHOOSE YOUR<br />
              <span>EXPERIENCE PASS.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Transparent track access pass rates and camping facilities with zero hidden charges. Reserve your slot directly on WhatsApp.
          </p>
        </div>

        <div className="pricing-showcase-container">
          {/* 1. PASS PRICING & TRACK ACCESS */}
          <div>
            <div className="pricing-block-title">
              <h3>PASS PRICING &amp; TRACK ACCESS</h3>
              <span className="tag">TRACK ACCESS RATES</span>
            </div>

            <div className="pass-pricing-table-grid">
              {/* Day Pass */}
              <div className="official-pass-card">
                <div>
                  <div className="official-pass-header">
                    <div>
                      <span className="priority-pill" style={{ marginBottom: 6, fontSize: 9 }}>DAY ACCESS</span>
                      <h4>Day Pass</h4>
                    </div>
                  </div>

                  <div className="vehicle-price-rates">
                    <div className="vehicle-price-box">
                      <span className="label"><Bike size={13} color="#c47c43" /> Motorcycle</span>
                      <span className="price">₹1,000</span>
                    </div>
                    <div className="vehicle-price-box" style={{ borderLeft: '1px solid var(--line)', paddingLeft: 12 }}>
                      <span className="label"><Car size={13} color="#c47c43" /> Car / 4×4</span>
                      <span className="price">₹1,500</span>
                    </div>
                  </div>

                  <div className="track-details-box">
                    <b>Track Access &amp; Details:</b>
                    6 hours total track access (Ride anytime between 8:00 AM – 8:00 PM).
                  </div>
                </div>

                <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20Day%20Pass." target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                  Book Day Pass <ArrowRight size={14} />
                </a>
              </div>

              {/* 24-Hour Pass */}
              <div className="official-pass-card featured">
                <div>
                  <div className="official-pass-header">
                    <div>
                      <span className="priority-pill" style={{ marginBottom: 6, fontSize: 9, background: 'var(--accent)', color: '#fff' }}>
                        ★ OVERNIGHT ACCESS • MOST POPULAR
                      </span>
                      <h4>24-Hour Pass</h4>
                    </div>
                  </div>

                  <div className="vehicle-price-rates">
                    <div className="vehicle-price-box">
                      <span className="label"><Bike size={13} color="#c47c43" /> Motorcycle</span>
                      <span className="price">₹1,500</span>
                    </div>
                    <div className="vehicle-price-box" style={{ borderLeft: '1px solid var(--line)', paddingLeft: 12 }}>
                      <span className="label"><Car size={13} color="#c47c43" /> Car / 4×4</span>
                      <span className="price">₹2,500</span>
                    </div>
                  </div>

                  <div className="track-details-box">
                    <b>Track Access &amp; Details:</b>
                    8 hours total track access (6 hours regular daytime + exclusive early morning session ~5:00 AM – 8:00 AM). Includes overnight access.
                  </div>
                </div>

                <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%2024-Hour%20Pass." target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                  Book 24-Hour Pass <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* 2. CAMPING FACILITIES */}
          <div>
            <div className="pricing-block-title">
              <h3>CAMPING FACILITIES</h3>
              <span className="tag">STAY OPTIONS</span>
            </div>

            <div className="camping-facilities-grid">
              {/* Rent a Parinda Tent */}
              <div className="camping-facility-card">
                <div>
                  <div className="camping-facility-header">
                    <h4><TentTree size={18} color="#c47c43" /> Rent a Parinda Tent</h4>
                    <span className="camping-facility-price">₹500 <small style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>/ night</small></span>
                  </div>

                  <p className="camping-facility-desc">
                    Includes Tent, Bedding, Bedsheet, Blanket, and Pillow. (Capacity: Up to 2 people)
                  </p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <span className="chip" style={{ fontSize: 10 }}>Pitched Tent Setup</span>
                    <span className="chip" style={{ fontSize: 10 }}>Complete Bedding &amp; Blanket</span>
                    <span className="chip" style={{ fontSize: 10 }}>2 Person Capacity</span>
                  </div>
                </div>

                <a className="btn ghost" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20reserve%20a%20Tent%20Stay." target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                  Reserve Tent <ArrowRight size={14} />
                </a>
              </div>

              {/* Bring Your Own Tent */}
              <div className="camping-facility-card">
                <div>
                  <div className="camping-facility-header">
                    <h4><TentTree size={18} color="#c47c43" /> Bring Your Own Tent</h4>
                    <span className="camping-facility-price">₹250 <small style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 400 }}>/ night</small></span>
                  </div>

                  <p className="camping-facility-desc">
                    Guests may pitch and use their own tent in the designated camping area.
                  </p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <span className="chip" style={{ fontSize: 10 }}>Pitch Your Own Tent</span>
                    <span className="chip" style={{ fontSize: 10 }}>Designated Camp Area</span>
                    <span className="chip" style={{ fontSize: 10 }}>Full Hygiene Hub Access</span>
                  </div>
                </div>

                <a className="btn ghost" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20reserve%20a%20Bring-Your-Own-Tent%20pitch." target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center' }}>
                  Reserve BYOT <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARINDA VERTICAL: PARINDA RECEPTION (WELCOME LOUNGE, BRIEFING & GEAR STORE)
          ========================================================================= */}
      <section className="section dark" id="reception">
        <div className="reception-banner">
          <div className="reception-copy">
            <span className="priority-pill">PARINDA RECEPTION</span>
            <h2>
              PARINDA RECEPTION<br />
              <span>WELCOME LOUNGE, BRIEFING &amp; GEAR STORE.</span>
            </h2>
            <p className="copy">
              Sanctuary welcome lounge and briefing hub equipped with track safety screens and an open gear closet featuring a full-length dressing mirror in front — showcasing adventure jackets, gloves, and helmets ready for fitting and checkout.
            </p>

            <div className="gear-items-grid">
              <div className="gear-item">
                <ShoppingBag size={18} color="#c47c43" />
                <b>Adventure Jackets</b>
                <span>All-weather armored textile &amp; rally jackets.</span>
              </div>
              <div className="gear-item">
                <Sparkles size={18} color="#c47c43" />
                <b>Trail Helmets</b>
                <span>ECE/DOT certified off-road and dual-sport lids.</span>
              </div>
              <div className="gear-item">
                <ShieldCheck size={18} color="#c47c43" />
                <b>Protective Gloves</b>
                <span>Knuckle-protected breathable trail gloves.</span>
              </div>
              <div className="gear-item highlight">
                <Maximize2 size={18} color="#e5995e" />
                <b>Full Dressing Mirror</b>
                <span>Full-length mirror right in front of the gear closet.</span>
              </div>
            </div>
          </div>

          <div
            className="reception-visual"
            onClick={() => setActiveLightboxImage({ src: '/images/parinda-store-reception.jpg', title: 'Parinda Store & Reception - Panoramic Lounge, Gear Closet & Service Bay Connection', category: 'Store & Reception' })}
            style={{ cursor: 'pointer' }}
          >
            <img src="/images/parinda-store-reception.jpg" alt="Parinda Store & Reception - Welcome Lounge, Gear Display & Service Bay Connection" />
            <div className="image-caption-badge">
              <span>RECEPTION LOUNGE • GEAR CLOSET • SERVICE BAY CONNECTION</span>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          EXPLORE PARK LOCATIONS & SPECS (INTERACTIVE ECOSYSTEM ZONES)
          ========================================================================= */}
      {/* =========================================================================
          PARINDA VERTICAL: NESLING (KIDS EXPLORER ZONE)
          ========================================================================= */}
      <section className="priority-section section" id="nesling">
        <div className="water-crossing-grid">
          {/* Left: 50% Uncropped Real Image */}
          <div
            className="workshop-visual"
            onClick={() => setActiveLightboxImage({ src: '/images/nesling-kids-zone.jpg', title: 'Nesling Kids Park - Explore. Play. Grow.', category: 'Nesling Kids Park' })}
            style={{ cursor: 'pointer' }}
          >
            <img src="/images/nesling-kids-zone.jpg" alt="Nesling Kids Park - Explore. Play. Grow." />
            <div className="image-caption-badge">
              <span>SAFE • ENGAGING • 100% NATURAL TIMBER PLAY</span>
            </div>
          </div>

          {/* Right: 50% Copy & Specifications */}
          <div className="water-crossing-copy">
            <span className="priority-pill">NESLING KIDS PARK</span>
            <h2>
              NESLING.<br />
              <span>KIDS PARK.</span>
            </h2>
            <p className="copy">
              A space for little adventurers to play, learn, create and connect with nature. <b>Safe. Engaging. Inspiring.</b> Built with 100% natural timber structures, climbing towers, and open-air discovery areas.
            </p>

            <div className="water-crossing-points">
              <div className="wc-point">
                <Sparkles size={18} color="#c47c43" />
                <div>
                  <b>Explore, Create &amp; Play</b>
                  <span>Natural wooden climbing tower, log bridge, slide, and balance cycle tracks.</span>
                </div>
              </div>
              <div className="wc-point">
                <Trees size={18} color="#c47c43" />
                <div>
                  <b>Teepee Tent Camp &amp; Craft Tables</b>
                  <span>Outdoor wooden craft benches for leaf art, nature puzzles, and creative play.</span>
                </div>
              </div>
              <div className="wc-point">
                <Compass size={18} color="#c47c43" />
                <div>
                  <b>Daily Guided Adventures</b>
                  <span>Nature walks, storytelling sessions, and wilderness respect learning.</span>
                </div>
              </div>
            </div>

            <div className="chips" style={{ marginTop: 18 }}>
              <span>🌲 Explore</span>
              <span>🎨 Create</span>
              <span>⚡ Play</span>
              <span>📚 Learn</span>
              <span>🌿 Respect Nature</span>
            </div>
          </div>
        </div>
      </section>
      <section className="about-founder section dark" id="about">
        <div className="story-split-container">
          {/* Left Column: Full Uncropped Photo */}
          <div className="story-sticky-photo">
            <img
              src="/images/ayush-raj-founder.jpg"
              alt="Ayush Raj - Founder, Parinda"
            />
            <div className="story-photo-footer">
              <div>
                <b>AYUSH RAJ</b>
                <span style={{ display: 'block', marginTop: 2 }}>FOUNDER &amp; RIDER</span>
              </div>
              <span>PARINDA</span>
            </div>
          </div>

          {/* Right Column: Full Story and Founder Text */}
          <div className="story-text-column">
            {/* OUR STORY */}
            <div className="story-block">
              <h2 className="story-section-title">OUR STORY</h2>

              <p className="story-lead">
                Parinda was born from a rider’s perspective.
              </p>

              <p>
                Riding changes the way you look at distance, roads and places. What starts as simply owning a motorcycle slowly becomes something much bigger — learning how the machine works, travelling farther, exploring unfamiliar roads, getting stuck, fixing things yourself, meeting other riders and constantly wanting to go a little further.
              </p>

              <p>
                Over time, one thing became increasingly clear:
              </p>

              <p style={{ color: '#fff', fontWeight: 600 }}>
                India has an enormous community of people interested in adventure mobility, but very few places where they can actually experience it properly.
              </p>

              <p>
                A beginner may want to learn off-roading without immediately heading into difficult terrain.
              </p>

              <p>
                An experienced rider may want to test a motorcycle.
              </p>

              <p>
                A 4x4 owner may want to understand what their vehicle can actually do.
              </p>

              <p>
                Someone may simply want to spend a day around machines, trails and people who share the same interest.
              </p>

              <p>
                And brands need places where their machines can be demonstrated in a real environment rather than just on a showroom floor.
              </p>

              <p style={{ color: 'var(--accent-light)', fontWeight: 600, marginTop: 4 }}>
                Parinda was imagined to bring all of that together.
              </p>

              <p>
                The idea is simple: build a destination where adventure mobility is not something you only watch online or wait for a holiday to experience.
              </p>

              <div className="story-manifesto-lines">
                <p>You can learn it.</p>
                <p>You can test it.</p>
                <p>You can experience it.</p>
                <p>You can share it.</p>
              </div>

              <p style={{ color: '#fff', fontWeight: 600, marginTop: 2 }}>
                That is what Parinda is being built for.
              </p>
            </div>

            {/* THE FOUNDER */}
            <div className="story-block" style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
              <h2 className="story-section-title">THE FOUNDER</h2>
              <h3 className="founder-name-title">Ayush Raj</h3>

              <p>
                Parinda began with Ayush’s own experience as a motorcycle rider — from learning machines the hard way to travelling long distances and understanding what riders actually need before, during and after a journey.
              </p>

              <p>
                Rather than building another motorcycle business, I wanted to create something broader:
              </p>

              <p style={{ color: 'var(--accent-light)', fontWeight: 600, fontStyle: 'italic', paddingLeft: 12, borderLeft: '2px solid var(--accent)' }}>
                &ldquo;A place built around the complete experience of adventure mobility.&rdquo;
              </p>

              <p style={{ color: '#fff', fontWeight: 600 }}>
                Parinda is the result of that idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VISION & MISSION SECTION (STRATEGIC OUTLOOK & COMMUNITY IMPACT)
          ========================================================================= */}
      <section className="section vision-mission-section" id="vision-mission" style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg) 100%)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '70px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-head" style={{ marginBottom: 36, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="priority-pill" style={{ marginBottom: 12 }}>
              <Sparkles size={13} /> PURPOSE-DRIVEN ADVENTURE MOBILITY
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', margin: '0 0 12px' }}>
              OUR VISION &amp; <span style={{ color: 'var(--accent-light)' }}>MISSION</span>
            </h2>
            <p className="copy" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
              Building India&apos;s foremost adventure mobility destination while empowering local youth and preserving indigenous heritage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
            {/* 1. VISION CARD */}
            <div style={{
              background: 'radial-gradient(circle at top left, rgba(196, 124, 67, 0.12), transparent 70%), var(--card-bg)',
              border: '1px solid rgba(196, 124, 67, 0.35)',
              borderRadius: 16,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <span className="priority-pill" style={{ marginBottom: 14 }}>STRATEGIC OUTLOOK</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '8px 0 18px', letterSpacing: 0.5 }}>
                  OUR VISION
                </h3>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderLeft: '4px solid var(--accent)',
                  padding: '20px 22px',
                  borderRadius: '0 10px 10px 0',
                  marginBottom: 20
                }}>
                  <p style={{ fontSize: 15.5, lineHeight: 1.8, color: '#ede7dc', margin: 0, fontStyle: 'italic', fontWeight: 400 }}>
                    &ldquo;We are creating a destination where adventure-oriented customers will physically bring their motorcycles and SUVs, spend several hours, participate in activities and interact with other enthusiasts. We want one automotive brand to become the exclusive SUV partner at Parinda.&rdquo;
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, background: 'rgba(196,124,67,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(196,124,67,0.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  🏔️ Dedicated Trails &amp; Obstacles
                </span>
                <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, background: 'rgba(196,124,67,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(196,124,67,0.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  🤝 Exclusive Brand Co-Creation
                </span>
              </div>
            </div>

            {/* 2. MISSION CARD */}
            <div style={{
              background: 'radial-gradient(circle at top right, rgba(196, 124, 67, 0.12), transparent 70%), var(--card-bg)',
              border: '1px solid rgba(196, 124, 67, 0.35)',
              borderRadius: 16,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                <span className="priority-pill" style={{ marginBottom: 14 }}>COMMUNITY &amp; SUSTAINABILITY</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '8px 0 18px', letterSpacing: 0.5 }}>
                  OUR MISSION
                </h3>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderLeft: '4px solid var(--accent)',
                  padding: '20px 22px',
                  borderRadius: '0 10px 10px 0',
                  marginBottom: 20
                }}>
                  <p style={{ fontSize: 15.5, lineHeight: 1.8, color: '#ede7dc', margin: 0, fontStyle: 'italic', fontWeight: 400 }}>
                    &ldquo;We are committed to creating employment for local residents, training local youth as guides and tourism professionals, promoting local handicrafts, food, culture, and festivals, and encouraging homestays so tourists can stay with local families and explore Jharkhand&apos;s rich traditions.&rdquo;
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, background: 'rgba(196,124,67,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(196,124,67,0.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  🌱 Employment &amp; Youth Training
                </span>
                <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 20, background: 'rgba(196,124,67,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(196,124,67,0.3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  🏡 Homestays &amp; Cultural Heritage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNITY REVIEWS & REAL EXPERIENCES (INTERACTIVE FEEDBACK)
          ========================================================================= */}
      <section className="reviews-section section" id="reviews">
        <div className="section-head">
          <div>
            <span className="priority-pill">
              <Star size={13} fill="#e5995e" color="#e5995e" /> COMMUNITY VOICES • 100% REAL REVIEWS
            </span>
            <h2>
              RIDERS &amp; EXPLORERS<br />
              <span>COMMUNITY REVIEWS.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <p className="copy narrow" style={{ margin: 0, textAlign: 'right' }}>
              Real impressions from riders, off-road drivers, machine builders, and campers at Parinda.
            </p>
            <button
              className="btn primary"
              onClick={() => setReviewModalOpen(true)}
              style={{ fontSize: 11, padding: '10px 18px' }}
            >
              ★ Write a Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsList.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="review-card"
            >
              <div className="review-card-head">
                <div className="review-author-info">
                  <div className="review-avatar-circle">
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="review-author-details">
                    <h4>{rev.name}</h4>
                    <span className="review-role-badge">{rev.role}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={13}
                      fill={idx < rev.rating ? '#f6ad55' : 'transparent'}
                      color={idx < rev.rating ? '#f6ad55' : '#4a5568'}
                    />
                  ))}
                </div>
              </div>

              <div className="review-body">
                <p>&ldquo;{rev.comment}&rdquo;</p>
              </div>

              <div className="review-card-footer">
                <div className="review-vehicle-pill">
                  {rev.vehicle.toLowerCase().includes('thar') || rev.vehicle.toLowerCase().includes('4x4') || rev.vehicle.toLowerCase().includes('suv') ? (
                    <Car size={12} />
                  ) : (
                    <Bike size={12} />
                  )}
                  <span>{rev.vehicle}</span>
                </div>
                <span>{rev.date} {rev.verified && '• Verified ✓'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PARK FACILITIES GRID (8 CORE FACILITIES)
          ========================================================================= */}
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
            Engineered for seamless arrivals, quiet camping, machine care, hygiene, and standby recovery.
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
                {f.desc ? <p>{f.desc}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PHOTO & BLUEPRINT ARCHIVE (GALLERY)
          ========================================================================= */}
      <section className="section dark" id="gallery">
        <div className="section-head">
          <div>
            <p className="eyebrow">PHOTO &amp; ARCHIVE GALLERY</p>
            <h2>
              VISUAL<br />
              <span>DOCUMENTATION.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Authentic photographs and architectural visualisations from the Parinda sanctuary.
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

      {/* =========================================================================
          PARINDA VERTICAL: PARINDA CARAVAN (MOTORCYCLE EXPEDITIONS & COMMUNITY)
          ========================================================================= */}
      <section className="section" id="caravan">
        <div className="section-head">
          <div>
            <span className="priority-pill">PARINDA CARAVAN</span>
            <h2>
              PARINDA CARAVAN<br />
              <span>MOTORCYCLE EXPEDITIONS &amp; COMMUNITY.</span>
            </h2>
          </div>
          <p className="copy narrow">
            Group rides, cross-country overland expeditions, rider gatherings, skill sessions, and off-road community convoys.
          </p>
        </div>

        <div className="community-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div className="community-card">
            <Bike size={28} color="var(--accent)" />
            <div>
              <b>OVERLAND EXPEDITIONS</b>
              <span>Guided multi-day motorcycle journeys through unexplored trails &amp; terrain</span>
            </div>
          </div>
          <div className="community-card">
            <Flame size={28} color="var(--accent)" />
            <div>
              <b>RIDER GATHERINGS</b>
              <span>Campfire stories, acoustic evenings, and shared mechanical knowledge</span>
            </div>
          </div>
          <div className="community-card">
            <Compass size={28} color="var(--accent)" />
            <div>
              <b>RIDING SKILL SESSIONS</b>
              <span>Off-road riding skills, terrain navigation, and sand/rock mastery</span>
            </div>
          </div>
          <div className="community-card">
            <Trees size={28} color="var(--accent)" />
            <div>
              <b>COMMUNITY CONVOYS</b>
              <span>Weekend rides and peaceful natural forest escapes for riding groups</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARINDA VERTICAL: PARINDA EVENTS (CORPORATE & BRAND MEETS)
          ========================================================================= */}
      <section className="section dark" id="events">
        <div className="section-head">
          <div>
            <span className="priority-pill">PARINDA EVENTS</span>
            <h2>
              PARINDA EVENTS<br />
              <span>CORPORATE &amp; BRAND MEETS.</span>
            </h2>
          </div>
          <p className="copy narrow">
            A real-world forest arena for automotive brand reveals, media test drives, machine demonstrations, and corporate retreats.
          </p>
        </div>

        <div className="community-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          <div className="community-card">
            <Sparkles size={28} color="var(--accent)" />
            <div>
              <b>BRAND LAUNCH VENUE</b>
              <span>Vehicle reveals, media test tracks, and real-environment demonstrations</span>
            </div>
          </div>
          <div className="community-card">
            <ShieldCheck size={28} color="var(--accent)" />
            <div>
              <b>VEHICLE TRACK TESTING</b>
              <span>Technical proving grounds for production off-road motorcycles &amp; 4x4s</span>
            </div>
          </div>
          <div className="community-card">
            <Users size={28} color="var(--accent)" />
            <div>
              <b>CORPORATE RETREATS</b>
              <span>Curated outdoor team experiences, off-grid cottages, and dining</span>
            </div>
          </div>
          <div className="community-card">
            <Target size={28} color="var(--accent)" />
            <div>
              <b>MEDIA &amp; CONTENT DRIVES</b>
              <span>Cinematic forest backdrops, obstacle courses, and water stream crossings</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="btn primary" href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20inquire%20about%20booking%20an%20Event." target="_blank" rel="noopener noreferrer">
            Book Event via WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* =========================================================================
          SAFETY & STANDBY RECOVERY (STANDBY WINCH + ONSITE FIRST AID KIT)
          ========================================================================= */}
      <section className="safety section dark">
        <p className="eyebrow">STANDBY RECOVERY &amp; SAFETY PROTOCOLS</p>
        <h2>
          ADVENTURE,<br />
          <span>WITH CONFIDENCE.</span>
        </h2>
        <div className="safety-grid">
          <div>
            <ShieldCheck size={32} />
            <h3>Safety Briefing</h3>
            <p>Mandatory track orientation, route difficulty ratings, and safety gear verification in the reception lounge.</p>
          </div>
          <div>
            <Compass size={32} />
            <h3>4x4 Standby Recovery</h3>
            <p>Dedicated 4x4 heavy-duty winch and mechanical recovery support on active standby across all tracks.</p>
          </div>
          <div>
            <Sparkles size={32} />
            <h3>On-Site Dedicated First Aid Kit</h3>
            <p>On-site dedicated first aid equipment on standby.</p>
          </div>
        </div>
      </section>

      {/* CTA / WHATSAPP COMMUNITY */}
      <section className="cta" id="contact">
        <div className="cta-content">
          <p className="eyebrow">PARINDA • ADVENTURE MOBILITY EXPERIENCE CENTER</p>
          <h2>
            JOIN THE<br />
            <em>WHATSAPP COMMUNITY</em>
          </h2>
          <p>
            Connect directly with fellow riders, off-road enthusiasts, and machine builders. Stay updated on trail status, weekend meetups, and exclusive community expeditions.
          </p>

          <div className="actions" style={{ marginTop: 24, justifyContent: 'center' }}>
            <a className="btn primary" href="https://chat.whatsapp.com/Kp92NUbFsA8Cwa6ajFrpEm?s=cl&p=a&ilr=0" target="_blank" rel="noopener noreferrer" style={{ padding: '14px 28px', fontSize: 14 }}>
              💬 Join WhatsApp Community <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <ParindaLogo size="lg" />
          <p style={{ marginTop: 14 }}>
            Adventure Mobility Experience Center.<br />
            100% Sustainable Forest Infrastructure.
          </p>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)' }}>
            <span>📞 <b>Phone:</b> <a href="tel:+919934906882" style={{ color: 'var(--accent-light)' }}>+91 9934906882</a></span>
            <span>✉️ <b>Email:</b> <a href="mailto:parindamotorworks@gmail.com" style={{ color: 'var(--accent-light)' }}>parindamotorworks@gmail.com</a></span>
          </div>
        </div>

        <div className="footer-links">
          <a href="/packages">Passes &amp; Packages</a>
          <a href="#caravan">Parinda Caravan</a>
          <a href="#workshop">Parinda Workshop</a>
          <a href="#experiences">Off-Road Track</a>
          <a href="#camp">Parinda Base</a>
          <a href="#reviews">Community Reviews</a>
          <a href="#gallery">Visual Documentation</a>
          <a href="#reception">Parinda Reception</a>
          <a href="#events">Parinda Events</a>
          <a href="#about">Our Story &amp; Founder</a>
          <a href="#vision-mission">Vision &amp; Mission</a>
        </div>

        <div className="social">
          <a href="https://chat.whatsapp.com/Kp92NUbFsA8Cwa6ajFrpEm?s=cl&p=a&ilr=0" target="_blank" rel="noreferrer" aria-label="WhatsApp Community">
            <MessageCircle size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={18} />
          </a>
        </div>

        <small>© 2026 Parinda. All Rights Reserved. Adventure Mobility Experience Center.</small>
      </footer>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {reviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setReviewModalOpen(false)}
          >
            <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close"
                onClick={() => setReviewModalOpen(false)}
              >
                <X size={18} /> Close
              </button>

              <div style={{ marginBottom: 18 }}>
                <span className="priority-pill">COMMUNITY VOICES</span>
                <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: 26, margin: '6px 0 0', textTransform: 'uppercase' }}>
                  Share Your Parinda Experience
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: '4px 0 0' }}>
                  Your feedback helps fellow riders and off-road explorers prepare for the trail.
                </p>
              </div>

              {reviewSubmitSuccess ? (
                <div style={{ padding: '30px 20px', textAlign: 'center', background: 'rgba(104, 211, 145, 0.1)', border: '1px solid #68d391', borderRadius: 8 }}>
                  <CheckCircle2 size={40} color="#68d391" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: 20, color: '#fff', margin: 0 }}>Thank You for Your Review!</h4>
                  <p style={{ fontSize: 13, color: '#a0aec0', marginTop: 6 }}>Your experience has been posted to the community feed.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent-light)', display: 'block', marginBottom: 4 }}>
                      Your Rating
                    </label>
                    <div className="star-rating-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-btn"
                          onClick={() => setNewReviewRating(star)}
                        >
                          <Star
                            size={24}
                            fill={star <= newReviewRating ? '#f6ad55' : 'transparent'}
                            color={star <= newReviewRating ? '#f6ad55' : '#4a5568'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-field">
                      <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', background: '#0c0d0a', border: '1px solid var(--line-light)', color: '#fff', borderRadius: 4 }}
                      />
                    </div>
                    <div className="form-field">
                      <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Machine / Vehicle</label>
                      <input
                        type="text"
                        placeholder="e.g. Himalayan 450 / Thar 4x4"
                        value={newReviewVehicle}
                        onChange={(e) => setNewReviewVehicle(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', background: '#0c0d0a', border: '1px solid var(--line-light)', color: '#fff', borderRadius: 4 }}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Your Experience / Role</label>
                    <select
                      value={newReviewRole}
                      onChange={(e) => setNewReviewRole(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', background: '#0c0d0a', border: '1px solid var(--line-light)', color: '#fff', borderRadius: 4 }}
                    >
                      <option value="Adventure Rider">Adventure Rider</option>
                      <option value="4x4 SUV Explorer">4x4 SUV Explorer</option>
                      <option value="Overnight Camper">Overnight Camper</option>
                      <option value="The Nest Café Guest">The Nest Café Guest</option>
                      <option value="Machine Builder / Mechanic">Machine Builder / Mechanic</option>
                      <option value="Family & Weekend Visitor">Family &amp; Weekend Visitor</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Your Review &amp; Experience Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share what you liked about the track, camping, hospitality, or amenities..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', background: '#0c0d0a', border: '1px solid var(--line-light)', color: '#fff', borderRadius: 4, resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
                  >
                    Submit Review <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* MOBILE STICKY QUICK ACTION BAR */}
      <div className="mobile-sticky-bar">
        <a
          href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20pass."
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-sticky-btn primary"
        >
          <Ticket size={16} /> Book Pass
        </a>
        <a
          href="/packages"
          className="bar-btn secondary"
        >
          <Ticket size={14} color="#e5995e" /> Passes &amp; Book
        </a>
        <a
          href="tel:+919934906882"
          className="bar-btn call-btn"
          aria-label="Call Direct Support"
        >
          <Phone size={15} />
        </a>
      </div>
    </main>
  );
}
