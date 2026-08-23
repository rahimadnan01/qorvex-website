import React from 'react';

interface QorvexLogoProps {
  className?: string;
  showText?: boolean;
  size?: number | string;
  useImage?: boolean;
  variant?: 'navy' | 'light' | 'colored';
}

export default function QorvexLogo({
  className = '',
  showText = true,
  size = 40,
  useImage = false,
  variant = 'colored'
}: QorvexLogoProps) {
  // If useImage is true, render the exact logo image uploaded by the user
  if (useImage) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo.png"
          alt="Qorvex Studio Logo"
          style={{ height: typeof size === 'number' ? `${size}px` : size }}
          className="object-contain"
        />
      </div>
    );
  }

  const primaryColor = variant === 'light' ? '#FFFFFF' : '#152436';
  const accentColor = '#0D98A2';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Octagonal Q Icon Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Octagonal Q Ring Frame */}
        <path
          d="M 32,10 L 68,10 L 90,32 L 90,68 L 68,90 L 32,90 L 10,68 L 10,32 Z
             M 34,30 L 30,34 L 30,62 L 34,66 L 52,66 L 40,50 L 58,50 L 66,60 L 70,60 L 70,34 L 66,30 Z"
          fill={primaryColor}
          fillRule="evenodd"
        />

        {/* Slanted Teal Parallelogram / Chevron Tail */}
        <path
          d="M 44,54 L 75,54 L 96,82 L 65,82 Z"
          fill={accentColor}
        />
      </svg>

      {/* Official Qorvex Typography Wordmark matching the uploaded image */}
      {showText && (
        <div className="flex items-center font-display font-extrabold tracking-tight text-2xl sm:text-3xl" style={{ color: primaryColor }}>
          {/* Custom geometric 'Q' */}
          <span className="relative inline-flex items-center">
            Q
            {/* Teal Slash in 'Q' */}
            <span
              className="absolute bottom-1 right-0 w-2.5 h-2.5 bg-brand-accent rounded-xs"
              style={{ transform: 'skewX(-25deg)' }}
            />
          </span>
          <span>orve</span>
          {/* Custom geometric 'X' with Teal intersecting branch */}
          <span className="relative inline-block ml-0.5">
            <span style={{ color: primaryColor }}>X</span>
            <span
              className="absolute inset-0 font-extrabold"
              style={{
                color: accentColor,
                clipPath: 'polygon(50% 0, 100% 0, 50% 100%, 0% 100%)'
              }}
            >
              X
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
