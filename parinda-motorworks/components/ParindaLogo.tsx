import React from 'react';

interface ParindaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  variant?: 'full' | 'mark';
}

export function ParindaLogo({
  size = 'md',
  showSubtitle = false,
  subtitleText = 'PARINDA MOTORWORKS • ADVENTURE COMMUNITY EXPERIENCE',
  className = ''
}: ParindaLogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isHero = size === 'hero';

  const logoHeight = isSm ? 38 : isLg ? 76 : isHero ? 110 : 54;

  return (
    <div
      className={`parinda-brand-lockup ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        userSelect: 'none',
        background: 'transparent'
      }}
    >
      <img
        src="/images/parinda-official-logo.png"
        alt="PARINDA - Adventure Mobility Experience Center"
        style={{
          height: `${logoHeight}px`,
          width: 'auto',
          maxWidth: isHero ? '340px' : isLg ? '240px' : isSm ? '150px' : '190px',
          objectFit: 'contain',
          background: 'transparent',
          mixBlendMode: 'screen',
          filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.6))',
          transition: 'transform 0.3s ease',
          display: 'block'
        }}
      />
      {showSubtitle && (
        <span
          className="parinda-logo-tagline"
          style={{
            marginTop: '3px',
            fontSize: isSm ? '8.5px' : '10px',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            color: 'var(--accent-light, #e5995e)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: '12px', height: '2px', background: 'var(--accent, #c47c43)', display: 'inline-block' }} />
          {subtitleText}
        </span>
      )}
    </div>
  );
}

