import React from 'react';

interface ParindaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export function ParindaLogo({ size = 'md', showSubtitle = true, className = '' }: ParindaLogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isHero = size === 'hero';

  const eagleSize = isSm ? 28 : isLg ? 48 : isHero ? 64 : 36;
  const titleSize = isSm ? '18px' : isLg ? '28px' : isHero ? '36px' : '22px';
  const subSize = isSm ? '8px' : isLg ? '10px' : isHero ? '12px' : '9px';

  return (
    <div className={`parinda-brand-lockup ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: isSm ? 10 : 14 }}>
      {/* Authentic Geometric Eagle Vector Drawing */}
      <svg
        width={eagleSize}
        height={eagleSize * 0.85}
        viewBox="0 0 100 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(196, 124, 67, 0.45))' }}
      >
        <defs>
          <linearGradient id="eagleGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5eedc" />
            <stop offset="50%" stopColor="#e5995e" />
            <stop offset="100%" stopColor="#c47c43" />
          </linearGradient>
          <linearGradient id="eagleWing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cfc4b0" />
          </linearGradient>
        </defs>

        {/* Left Wing Outer Feathers */}
        <polygon points="50,42 28,12 8,28 32,48" fill="url(#eagleWing)" />
        <polygon points="46,45 20,22 4,40 28,55" fill="url(#eagleGold)" opacity="0.9" />
        <polygon points="42,50 14,35 2,52 24,62" fill="url(#eagleWing)" opacity="0.8" />

        {/* Right Wing Outer Feathers */}
        <polygon points="50,42 72,12 92,28 68,48" fill="url(#eagleWing)" />
        <polygon points="54,45 80,22 96,40 72,55" fill="url(#eagleGold)" opacity="0.9" />
        <polygon points="58,50 86,35 98,52 76,62" fill="url(#eagleWing)" opacity="0.8" />

        {/* Central Eagle Body & Tail */}
        <polygon points="50,22 42,48 50,78 58,48" fill="url(#eagleGold)" />
        {/* Eagle Head & Beak */}
        <polygon points="50,10 44,22 56,22" fill="#ffffff" />
        <polygon points="44,16 38,20 44,22" fill="#c47c43" />

        {/* Dynamic Chest Shield / Incline Motif */}
        <polygon points="50,30 46,46 50,56 54,46" fill="#141512" />
        <polygon points="50,34 48,44 50,50 52,44" fill="url(#eagleGold)" />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          letterSpacing: '2px',
          fontSize: titleSize,
          lineHeight: 0.95,
          color: '#ede7dc',
          textTransform: 'uppercase'
        }}>
          PARINDA
        </div>
        {showSubtitle && (
          <div style={{
            fontSize: subSize,
            letterSpacing: '3.5px',
            color: '#c47c43',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginTop: '3px'
          }}>
            MOTORWORKS
          </div>
        )}
      </div>
    </div>
  );
}
