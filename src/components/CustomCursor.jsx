import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Do not render custom cursor on mobile

    setIsVisible(true);

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Global hover detection using mouseover event bubbling
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('.tilt-card-wrapper') ||
        target.closest('.nav-link') ||
        target.closest('.quick-btn') ||
        target.closest('.social-link') ||
        target.closest('.cert-card') ||
        target.closest('.training-card') ||
        target.classList.contains('interactive');

      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp loop for the trailing ring
    let animationFrameId;
    const updatePosition = () => {
      // Lerp math: current = current + (target - current) * factor
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    // Inject global cursor styles to hide default cursor
    const styleNode = document.createElement('style');
    styleNode.innerHTML = `
      body, a, button, input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleNode);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.head.removeChild(styleNode);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Central target dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#06b6d4',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
          willChange: 'transform'
        }}
      />
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid #06b6d4',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.2)',
          transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-color 0.2s, background-color 0.2s'
        }}
      />
    </>
  );
}
