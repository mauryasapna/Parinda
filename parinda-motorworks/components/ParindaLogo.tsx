import React from 'react';

interface ParindaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  variant?: 'full' | 'mark';
}

export function ParindaLogo({
  size = 'sm',
  showSubtitle = false,
  subtitleText = 'ADVENTURE MOBILITY EXPERIENCE CENTER',
  className = ''
}: ParindaLogoProps) {
  return (
    <div className={`parinda-brand-lockup parinda-size-${size} ${className}`}>
      <img
        src="/images/parinda-official-logo.png"
        alt="PARINDA - Adventure Mobility Experience Center"
        className="parinda-brand-logo-img"
      />
      {showSubtitle && (
        <span className="parinda-logo-tagline">
          <span className="tagline-bullet" />
          <span className="tagline-text">{subtitleText}</span>
        </span>
      )}
    </div>
  );
}



