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
  subtitleText = 'ADVENTURE MOBILITY EXPERIENCE CENTER',
  className = ''
}: ParindaLogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const isHero = size === 'hero';

  const logoHeight = isSm ? 46 : isLg ? 88 : isHero ? 120 : 62;

  return (
    <div
      className={`parinda-brand-lockup ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        userSelect: 'none',
        background: 'transparent',
        maxWidth: '100%'
      }}
    >
      <img
        src="/images/parinda-official-logo.png"
        alt="PARINDA - Adventure Mobility Experience Center"
        className="parinda-brand-logo-img"
        style={{
          height: `${logoHeight}px`,
          width: 'auto',
          maxWidth: isHero ? '360px' : isLg ? '280px' : isSm ? '170px' : '220px',
          objectFit: 'contain',
          background: 'transparent',
          mixBlendMode: 'screen',
          filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.7))',
          transition: 'transform 0.3s ease',
          display: 'block'
        }}
      />
      {showSubtitle && (
        <span
          className="parinda-logo-tagline"
          style={{
            marginTop: '3px',
            fontSize: isSm ? '7px' : '8px',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--accent-light, #e5995e)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            lineHeight: 1.1
          }}
        >
          <span style={{ width: '8px', height: '1.5px', background: 'var(--accent, #c47c43)', display: 'inline-block', flexShrink: 0 }} />
          <span className="tagline-text">{subtitleText}</span>
        </span>
      )}
    </div>
  );
}

