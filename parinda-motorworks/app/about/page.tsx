'use client';

import { ChevronRight } from 'lucide-react';
import { ParindaLogo } from '../../components/ParindaLogo';

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Navbar */}
      <header className="nav">
        <a href="/" className="brand" aria-label="Parinda Motorworks Home">
          <ParindaLogo size="sm" showSubtitle={true} />
        </a>

        <div className="nav-links">
          <a href="/#camping">Camping</a>
          <a href="/#the-nest">The Nest</a>
          <a href="/#workshop">Workshop</a>
          <a href="/#blueprint">Park Blueprint</a>
          <a href="/#facilities">Facilities</a>
          <a href="/#gallery">Gallery</a>
          <a href="/about" className="active" style={{ color: 'var(--accent-light)' }}>Our Story</a>
        </div>

        <div className="nav-actions">
          <a className="btn primary" href="/packages">
            Book Passes <ChevronRight size={14} />
          </a>
        </div>
      </header>

      {/* Main Story & Founder Section */}
      <section className="about-founder section dark" style={{ paddingTop: 110 }}>
        <div className="story-split-container">
          {/* Left Column: Full Uncropped Photo */}
          <div className="story-sticky-photo">
            <img
              src="/images/ayush-raj-founder.jpg"
              alt="Ayush Raj - Founder, Parinda Motorworks"
            />
            <div className="story-photo-footer">
              <div>
                <b>AYUSH RAJ</b>
                <span style={{ display: 'block', marginTop: 2 }}>FOUNDER &amp; RIDER</span>
              </div>
              <span>PARINDA MOTORWORKS</span>
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
                &ldquo;a place built around the complete experience of adventure mobility.&rdquo;
              </p>

              <p style={{ color: '#fff', fontWeight: 600 }}>
                Parinda is the result of that idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <ParindaLogo size="lg" />
            <p className="copy narrow" style={{ marginTop: 12 }}>
              A sanctuary for adventure motoring, machine culture, off-road trails and off-grid hospitality.
            </p>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)' }}>
              <span>📞 <b>Phone:</b> <a href="tel:+919934906882" style={{ color: 'var(--accent-light)' }}>+91 9934906882</a></span>
              <span>✉️ <b>Email:</b> <a href="mailto:a.rrajayush2@gmail.com" style={{ color: 'var(--accent-light)' }}>a.rrajayush2@gmail.com</a></span>
            </div>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/packages">Day &amp; Weekend Passes</a>
            <a href="/#camping">Camping &amp; Stay</a>
            <a href="/#the-nest">The Nest Café</a>
            <a href="/about">Our Story &amp; Founder</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Parinda Motorworks. Built for riders, drivers and explorers.</p>
          <div className="status-indicator">
            <span className="dot pulse" /> ALL TRAILS OPEN
          </div>
        </div>
      </footer>
    </main>
  );
}
