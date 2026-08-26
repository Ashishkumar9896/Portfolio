import React, { useRef, useState } from 'react';

export default function TiltCard({ children, className = '', maxTilt = 10, scale = 1.03 }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (-maxTilt to +maxTilt)
    // Moving mouse to the right rotates around Y axis (clockwise from top view -> positive)
    // Moving mouse down rotates around X axis (clockwise from right view -> negative)
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
    });

    setGlareStyle({
      opacity: 0.25,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, rgba(0,0,0,0) 80%)`,
      transition: 'opacity 0.2s ease'
    });
  };

  const handleMouseLeave = () => {
    // Reset back to original state with smooth transition
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });

    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card-wrapper ${className}`}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        ...tiltStyle
      }}
    >
      {/* Glare/Shine layer */}
      <div
        className="tilt-card-glare"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 5,
          mixBlendMode: 'screen',
          ...glareStyle
        }}
      />
      
      {/* Content wrapper with preserve-3d to enable children depth layering */}
      <div className="tilt-card-content" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
