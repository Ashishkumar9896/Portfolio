import React from 'react';

export default function TiltCard({ children, className = '' }) {
  return (
    <div className={`pro-card-wrapper ${className}`}>
      {children}
    </div>
  );
}

