import React from 'react';
import { notFound } from 'next/navigation';
import { PANORAMA_LOCATIONS, getLocationById, PanoramaLocation } from '@/data/panoramas';
import { PanoramaViewer } from '@/components/panorama';
import { Metadata } from 'next';
import { Compass, ArrowLeft, RotateCw, MapPin, Check } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export async function generateStaticParams() {
  return PANORAMA_LOCATIONS.map((loc) => ({
    location: loc.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await params;
  const loc = getLocationById(location);

  if (!loc) {
    return {
      title: 'Parinda 360° Experience',
      description: 'Step inside the Parinda adventure destination in true 3D 360° virtual reality.'
    };
  }

  return {
    title: `${loc.title} - 360° Virtual Experience | Parinda`,
    description: loc.description,
    openGraph: {
      title: `${loc.title} - Parinda 360° Tour`,
      description: loc.description,
      images: [loc.thumbnail]
    }
  };
}

export default async function Location360Page({ params }: PageProps) {
  const { location } = await params;
  const loc = getLocationById(location);

  if (!loc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 select-none overflow-x-hidden">
      {/* ================= TOP COMPACT NAVIGATION BAR ================= */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 mb-4 sm:mb-6">
        {/* Return to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e5995e] transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Center Badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e5995e] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#e5995e]">
            PARINDA 360° CINEMA VIEWER
          </span>
        </div>

        {/* Active Scene Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300">
          <MapPin className="w-3.5 h-3.5 text-[#e5995e]" />
          <span className="font-semibold text-white">{loc.title}</span>
        </div>
      </header>

      {/* ================= MAIN CRISP CINEMA VIEWPORT ================= */}
      <main className="max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Location selector pills */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none">
          {PANORAMA_LOCATIONS.map((item) => {
            const isActive = item.id === loc.id;
            return (
              <Link
                key={item.id}
                href={`/360/${item.slug}`}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#c47c43] text-black border-[#e5995e] font-bold shadow-[0_4px_16px_rgba(196,124,67,0.4)] scale-[1.02]'
                    : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.title.replace('Parinda ', '')}</span>
                {isActive && <Check className="w-3 h-3 text-black stroke-[3]" />}
              </Link>
            );
          })}
        </div>

        {/* The Framed Stage */}
        <div className="relative w-full max-w-[1100px] h-[460px] sm:h-[540px] md:h-[580px] lg:h-[620px] rounded-2xl sm:rounded-3xl border border-white/15 bg-black overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] ring-1 ring-[#e5995e]/20">
          <PanoramaViewer
            locationId={loc.id}
            title={loc.title}
            image={loc.image}
            className="w-full h-full"
          />

          {/* Floating Subtle Quality & Guidance Pill */}
          <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-neutral-300">
            <RotateCw className="w-3 h-3 text-[#e5995e] animate-spin" style={{ animationDuration: '8s' }} />
            <span>HD Optimized Viewport • Drag to Rotate 360°</span>
          </div>
        </div>

        {/* ================= LOCATION DETAILS CARD ================= */}
        <div className="w-full max-w-[1100px] mt-4 sm:mt-5 p-4 sm:p-6 rounded-2xl bg-[#0e1014] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#e5995e] uppercase bg-[#c47c43]/15 px-2 py-0.5 rounded border border-[#c47c43]/30">
                {loc.category}
              </span>
              <span className="text-xs text-neutral-400">• {loc.tagline}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {loc.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed max-w-3xl">
              {loc.description}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
            >
              Explore Full Overview
            </Link>
          </div>
        </div>
      </main>

      {/* ================= FOOTER NOTE ================= */}
      <footer className="max-w-6xl w-full mx-auto mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
        <span>© {new Date().getFullYear()} Parinda Motorworks • Adventure Mobility Experience Center</span>
        <span className="flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-[#e5995e]" /> High-Definition 360° Spherical Projection
        </span>
      </footer>
    </div>
  );
}
