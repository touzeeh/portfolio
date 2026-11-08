import React from 'react';

interface IsometricDividerProps {
  className?: string;
}

export const IsometricDivider: React.FC<IsometricDividerProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 my-6 pointer-events-none select-none flex items-center justify-center opacity-60 ${className}`}
    >
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-6 stroke-[var(--blueprint-line)]"
      >
        {/* Left baseline */}
        <line x1="0" y1="12" x2="480" y2="12" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Center Isometric Floorplate Projection */}
        <path
          d="M 480 12 L 520 20 L 600 20 L 680 12 L 640 4 L 560 4 Z"
          strokeWidth="1"
          fill="none"
        />
        <line x1="520" y1="20" x2="560" y2="4" strokeWidth="0.75" />
        <line x1="600" y1="20" x2="640" y2="4" strokeWidth="0.75" />

        {/* Right baseline */}
        <line x1="680" y1="12" x2="1200" y2="12" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};
