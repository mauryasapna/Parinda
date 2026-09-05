'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Car,
  Bike,
  Sparkles,
  TentTree,
  Coffee,
  ShieldCheck,
  Download,
  Share2,
  X,
  Clock,
  MapPin,
  Flame,
  Wrench,
  Check,
  Phone
} from 'lucide-react';
import { ParindaLogo } from '@/components/ParindaLogo';
import { bookingPackages, PassPackage } from '@/data/site';

export default function PackagesPage() {
  const [selectedPass, setSelectedPass] = useState<PassPackage>(bookingPackages[1]); // Default to 24h pass
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-15');
  const [vehicleType, setVehicleType] = useState<'motorcycle' | '4x4' | 'both'>('motorcycle');
  const [tentAddon, setTentAddon] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Extract base numerical price
  const basePrice = parseInt(selectedPass.price.replace(/[^0-9]/g, '')) || 999;
  const addonsTotal = tentAddon ? 599 : 0;
  const totalPrice = basePrice * guestsCount + addonsTotal;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'PAR-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setBookingConfirmed(true);
  };

  return (
    <main className="packages-page">
      {/* Top Navbar */}
      <header className="nav">
        <a href="/" className="brand" aria-label="Parinda Home">
          <ParindaLogo size="sm" />
        </a>

        <div className="nav-back-link">
          <a href="/" className="btn ghost" style={{ padding: '8px 16px', fontSize: 11 }}>
            <ArrowLeft size={14} /> Back to Sanctuary
          </a>
        </div>
      </header>

      {/* Hero Header */}
      <section className="packages-hero section">
        <div className="packages-hero-content">
          <div className="priority-pill">
            <Sparkles size={13} /> COMMUNITY PASSES &amp; BOOKINGS
          </div>
          <h1>
            CHOOSE YOUR<br />
            <span>EXPERIENCE PASS.</span>
          </h1>
          <p className="lead" style={{ maxWidth: 700, margin: '14px auto 0' }}>
            Instant community passes for day excursions, 24-hours overnight camping, and convoy group getaways in the natural forest sanctuary.
          </p>
        </div>
      </section>

      {/* Passes Grid */}
      <section className="section dark" style={{ paddingTop: 20 }}>
        <div className="passes-grid">
          {bookingPackages.map((pkg) => {
            const isSelected = selectedPass.id === pkg.id;
            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                className={`pass-card ${isSelected ? 'selected' : ''} ${pkg.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPass(pkg)}
              >
                {pkg.popular && (
                  <div className="pass-popular-badge">
                    <span>★ MOST POPULAR</span>
                  </div>
                )}

                <div className="pass-card-head">
                  <span className="pass-type-badge">{pkg.badge}</span>
                  <h3>{pkg.title}</h3>
                  <p className="pass-duration">
                    <Clock size={13} /> {pkg.duration}
                  </p>
                </div>

                <div className="pass-price-row">
                  <div className="pass-price">
                    <span className="amount">{pkg.price}</span>
                    <span className="period">/{pkg.period}</span>
                  </div>
                </div>

                <p className="pass-desc">{pkg.desc}</p>

                {/* Micro Highlights */}
                <div className="pass-highlights">
                  {pkg.highlights.map((h, i) => (
                    <span key={i} className="pass-highlight-pill">
                      <i>{h.icon}</i> {h.text}
                    </span>
                  ))}
                </div>

                <hr className="pass-divider" />

                {/* Features list */}
                <div className="pass-features-list">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="pass-feature">
                      <CheckCircle2 size={14} color="#c47c43" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`btn ${isSelected ? 'primary' : 'ghost'} pass-select-btn`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPass(pkg);
                    const bookingFormEl = document.getElementById('booking-form-section');
                    if (bookingFormEl) bookingFormEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {isSelected ? 'Selected Pass ✓' : 'Select This Pass'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Booking Configurator */}
      <section className="section" id="booking-form-section">
        <div className="booking-configurator-grid">
          {/* Left Form */}
          <div className="booking-form-card">
            <div className="section-head-sm">
              <p className="eyebrow">CUSTOMIZE &amp; RESERVE</p>
              <h2>BOOKING DETAILS</h2>
              <p className="copy" style={{ fontSize: 13, margin: '6px 0 20px' }}>
                Selected: <b>{selectedPass.title} ({selectedPass.price})</b>
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="pass-booking-form">
              <div className="form-group-row">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-field">
                  <label>
                    <Calendar size={14} /> Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>
                    <Users size={14} /> Number of Guests
                  </label>
                  <div className="guests-counter">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    >
                      -
                    </button>
                    <span>{guestsCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(guestsCount + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Vehicle Type Selection */}
              <div className="form-field">
                <label>Arrival Machine / Vehicle Type</label>
                <div className="vehicle-toggle-group">
                  <button
                    type="button"
                    className={`v-btn ${vehicleType === 'motorcycle' ? 'active' : ''}`}
                    onClick={() => setVehicleType('motorcycle')}
                  >
                    <Bike size={16} /> Adventure Motorcycle
                  </button>
                  <button
                    type="button"
                    className={`v-btn ${vehicleType === '4x4' ? 'active' : ''}`}
                    onClick={() => setVehicleType('4x4')}
                  >
                    <Car size={16} /> 4x4 Off-Road SUV
                  </button>
                  <button
                    type="button"
                    className={`v-btn ${vehicleType === 'both' ? 'active' : ''}`}
                    onClick={() => setVehicleType('both')}
                  >
                    <Sparkles size={16} /> Convoy / Multiple
                  </button>
                </div>
              </div>

              {/* Addons Selection */}
              <div className="form-field">
                <label>Experience Add-Ons (Optional)</label>
                <div className="addons-list">
                  <label className={`addon-item ${tentAddon ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={tentAddon}
                      onChange={(e) => setTentAddon(e.target.checked)}
                    />
                    <div>
                      <b>Rent a Tent (Do-It-Yourself Pitching) (+₹599)</b>
                      <span>High-grade waterproof tent provided for self-pitching in your bay.</span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                Confirm Pass Reservation <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Right Summary & Price Breakdown */}
          <div className="booking-summary-card">
            <div className="summary-header">
              <span className="priority-pill" style={{ marginBottom: 6 }}>PASS SUMMARY</span>
              <h3>{selectedPass.title}</h3>
              <span className="pass-duration">
                <Clock size={13} /> {selectedPass.duration}
              </span>
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Base Pass ({selectedPass.price} × {guestsCount} guests)</span>
                <b>₹{basePrice * guestsCount}</b>
              </div>
              {tentAddon && (
                <div className="breakdown-row">
                  <span>Rent a Tent (Do-It-Yourself Pitching)</span>
                  <b>₹599</b>
                </div>
              )}
              <hr style={{ borderColor: 'var(--line)', margin: '14px 0' }} />
              <div className="breakdown-row total">
                <span>Total Estimated Amount</span>
                <span className="total-val">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-perks">
              <div className="perk">
                <CheckCircle2 size={16} color="#68d391" />
                <span>Zero-honk peaceful parking near your pitched tent</span>
              </div>
              <div className="perk">
                <CheckCircle2 size={16} color="#68d391" />
                <span>Access to clean private washrooms &amp; hot showers</span>
              </div>
              <div className="perk">
                <CheckCircle2 size={16} color="#68d391" />
                <span>The Nest separate Veg/Non-Veg kitchen access</span>
              </div>
              <div className="perk">
                <CheckCircle2 size={16} color="#68d391" />
                <span>Dedicated 4x4 standby safety recovery crew on duty</span>
              </div>
            </div>

            <div className="summary-notice">
              <ShieldCheck size={18} color="#c47c43" />
              <p>
                Entry allowed: We prefer online reservations first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setBookingConfirmed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="pass-ticket-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setBookingConfirmed(false)}
              >
                <X size={18} /> Close
              </button>

              <div className="ticket-header">
                <ParindaLogo size="sm" />
                <span className="ticket-badge">CONFIRMED PASS</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-qr-dummy">
                  <span style={{ fontSize: 36 }}>🎫</span>
                  <b>{bookingRef}</b>
                  <small>Show at Reception Counter</small>
                </div>

                <div className="ticket-details">
                  <h3>{selectedPass.title}</h3>
                  <div className="ticket-grid">
                    <div>
                      <span>Guest Name</span>
                      <b>{fullName || 'Community Guest'}</b>
                    </div>
                    <div>
                      <span>Visit Date</span>
                      <b>{selectedDate}</b>
                    </div>
                    <div>
                      <span>Guests</span>
                      <b>{guestsCount} Person(s)</b>
                    </div>
                    <div>
                      <span>Machine</span>
                      <b>{vehicleType.toUpperCase()}</b>
                    </div>
                  </div>

                  <div className="ticket-total-row">
                    <span>Pay at Reception:</span>
                    <b>₹{totalPrice.toLocaleString()}</b>
                  </div>
                </div>
              </div>

              <div className="ticket-footer">
                <a
                  href={`https://wa.me/919934906882?text=${encodeURIComponent(`Hello Parinda! I want to confirm my booking:
- Pass: ${selectedPass.title} (${selectedPass.price})
- Ref: ${bookingRef}
- Guests: ${guestsCount}
- Machine: ${vehicleType.toUpperCase()}
- Date: ${selectedDate}
- Total: ₹${totalPrice.toLocaleString()}
- Name: ${fullName || 'Guest'}
- Phone: ${phone || 'N/A'}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Send Booking on WhatsApp <Share2 size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <ParindaLogo size="lg" />
          <p style={{ marginTop: 14 }}>
            Adventure Mobility Experience Center.<br />
            100% Sustainable Forest Sanctuary.
          </p>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)' }}>
            <span>📞 <b>Phone:</b> <a href="tel:+919934906882" style={{ color: 'var(--accent-light)' }}>+91 9934906882</a></span>
            <span>✉️ <b>Email:</b> <a href="mailto:parindamotorworks@gmail.com" style={{ color: 'var(--accent-light)' }}>parindamotorworks@gmail.com</a></span>
          </div>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/packages">Passes &amp; Packages</a>
          <a href="/#camp">Parinda Base</a>
          <a href="/#the-nest">The Nest Café</a>
          <a href="/#workshop">Workshop</a>
          <a href="/#about">Our Story &amp; Founder</a>
          <a href="/#vision-mission">Vision &amp; Mission</a>
        </div>

        <small>© 2026 Parinda. All Rights Reserved. Adventure Mobility Experience Center.</small>
      </footer>

      {/* BOTTOM ACTION BAR (RESPONSIVE FOR BOTH MOBILE & DESKTOP) */}
      <div className="packages-action-bar-container">
        <div className="packages-action-bar-inner">
          <div className="packages-action-price-info">
            <span className="action-selected-title">{selectedPass.title} ({guestsCount} {guestsCount > 1 ? 'Guests' : 'Guest'})</span>
            <b className="action-total-price">₹{totalPrice.toLocaleString()}</b>
          </div>
          <div className="packages-action-buttons">
            <a
              href="#booking-form-section"
              className="bar-btn secondary"
            >
              Customize Pass (₹{totalPrice.toLocaleString()})
            </a>
            <a
              href="https://wa.me/919934906882?text=Hello%20Parinda%2C%20I%20want%20to%20book%20a%20pass."
              target="_blank"
              rel="noopener noreferrer"
              className="bar-btn primary"
            >
              <Share2 size={15} /> Book Pass
            </a>
            <a
              href="tel:+919934906882"
              className="bar-btn call-btn"
              aria-label="Call Direct Support"
            >
              <Phone size={15} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
