import React, { useEffect, useRef, useState } from 'react';

export default function ThreeDTagCloud() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredTag, setHoveredTag] = useState(null);

  // Core skills array
  const skillsList = [
    { name: 'Python', category: 'prog' },
    { name: 'C++', category: 'prog' },
    { name: 'C', category: 'prog' },
    { name: 'SQL', category: 'prog' },
    { name: 'DSA', category: 'core' },
    { name: 'OOP', category: 'core' },
    { name: 'DBMS', category: 'core' },
    { name: 'Problem Solving', category: 'core' },
    { name: 'NumPy', category: 'data' },
    { name: 'Pandas', category: 'data' },
    { name: 'Machine Learning', category: 'ai' },
    { name: 'Python for AI/ML', category: 'ai' },
    { name: 'Google Colab', category: 'tools' },
    { name: 'Git', category: 'tools' },
    { name: 'GitHub', category: 'tools' },
    { name: 'VS Code', category: 'tools' },
    { name: 'MySQL', category: 'tools' },
    { name: 'Arduino IDE', category: 'tools' },
    { name: 'HTML5', category: 'web' },
    { name: 'CSS3', category: 'web' },
    { name: 'JavaScript', category: 'web' },
    { name: 'Node.js', category: 'web' },
    { name: 'Express.js', category: 'web' },
    { name: 'REST APIs', category: 'web' },
    { name: 'Socket.IO', category: 'web' },
    { name: 'Cloudinary', category: 'web' },
    { name: 'JWT', category: 'web' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Dimension management
    let width = containerRef.current?.offsetWidth || 400;
    let height = width; // Keep it square
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * 0.38; // Radius of the sphere

    // 3D Tag Class
    class Tag {
      constructor(name, category, theta, phi) {
        this.name = name;
        this.category = category;
        this.theta = theta;
        this.phi = phi;
        
        // 3D coordinates
        this.x = radius * Math.sin(this.phi) * Math.cos(this.theta);
        this.y = radius * Math.sin(this.phi) * Math.sin(this.theta);
        this.z = radius * Math.cos(this.phi);

        // Projected 2D coordinates
        this.projX = 0;
        this.projY = 0;
        this.scale = 1;
        this.opacity = 1;
        this.width = 0;
        this.height = 18;
      }

      // Rotate coordinates around X and Y axes
      rotate(rx, ry) {
        // Rotate X
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const y1 = this.y * cosX - this.z * sinX;
        const z1 = this.y * sinX + this.z * cosX;

        // Rotate Y
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const x2 = this.x * cosY - z1 * sinY;
        const z2 = this.x * sinY + z1 * cosY;

        this.x = x2;
        this.y = y1;
        this.z = z2;

        // Perspective Projection
        const d = radius * 1.5; // Distance to camera projection plane
        this.scale = d / (d + this.z);
        this.projX = centerX + this.x * this.scale;
        this.projY = centerY + this.y * this.scale;
        
        // Opacity based on Z depth (back is translucent, front is opaque)
        this.opacity = 0.15 + 0.85 * (radius - this.z) / (2 * radius);
      }

      draw(context, isHovered) {
        context.save();
        context.globalAlpha = this.opacity;
        
        // Set font size based on distance projection scale
        const fontSize = Math.max(10, Math.floor(13 * this.scale));
        context.font = `600 ${fontSize}px 'Inter', sans-serif`;
        
        // Measure text size for hit bounds
        this.width = context.measureText(this.name).width;
        
        // Tag category colors
        let tagColor = '#06b6d4'; // default cyan
        if (this.category === 'prog') tagColor = '#60a5fa'; // Blue
        if (this.category === 'data') tagColor = '#10b981'; // Green
        if (this.category === 'tools') tagColor = '#eab308'; // Yellow
        if (this.category === 'ai' || this.category === 'core') tagColor = '#a855f7'; // Purple

        // Render card background if hovered
        if (isHovered) {
          context.fillStyle = 'rgba(6, 182, 212, 0.15)';
          context.strokeStyle = 'rgba(6, 182, 212, 0.6)';
          context.lineWidth = 1;
          
          const paddingX = 10;
          const paddingY = 6;
          
          // Rounded rect path
          const rx = this.projX - this.width / 2 - paddingX;
          const ry = this.projY - fontSize / 2 - paddingY;
          const rw = this.width + paddingX * 2;
          const rh = fontSize + paddingY * 2;
          const radiusRect = 6;
          
          context.beginPath();
          context.roundRect(rx, ry, rw, rh, radiusRect);
          context.fill();
          context.stroke();
          
          context.fillStyle = '#22d3ee'; // bright cyan
          context.shadowBlur = 10;
          context.shadowColor = '#06b6d4';
        } else {
          context.fillStyle = tagColor;
        }

        // Draw tag text centered at (projX, projY)
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this.name, this.projX, this.projY);
        context.restore();
      }

      // Check if mouse is hovering over tag bounds
      isMouseOver(mx, my) {
        const padding = 8;
        return (
          mx >= this.projX - this.width / 2 - padding &&
          mx <= this.projX + this.width / 2 + padding &&
          my >= this.projY - this.height / 2 - padding &&
          my <= this.projY + this.height / 2 + padding &&
          this.z <= 0 // Only allow hover on front-half of sphere
        );
      }
    }

    // Initialize tags on a Fibonacci Sphere
    const tags = [];
    const count = skillsList.length;
    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      tags.push(new Tag(skillsList[i].name, skillsList[i].category, theta, phi));
    }

    // Rotation speeds
    let speedX = 0.003;
    let speedY = 0.003;
    
    // Drag interaction states
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      lastMouseX = e.clientX - rect.left;
      lastMouseY = e.clientY - rect.top;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (isDragging) {
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        
        // Alter rotation speed based on drag offset
        speedY = dx * 0.005;
        speedX = -dy * 0.005;
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        lastMouseX = e.touches[0].clientX - rect.left;
        lastMouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        
        speedY = dx * 0.005;
        speedX = -dy * 0.005;
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Animation Loop
    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate drag speed down to ambient speed
      if (!isDragging) {
        speedX += (0.001 - speedX) * 0.05;
        speedY += (0.001 - speedY) * 0.05;
      }

      // Track active hover
      let currentHovered = null;
      if (!isDragging) {
        for (let i = 0; i < tags.length; i++) {
          if (tags[i].isMouseOver(mouseX, mouseY)) {
            currentHovered = tags[i];
            break; // Find first one matching closest to front
          }
        }
      }

      setHoveredTag(currentHovered ? currentHovered.name : null);

      // Rotate and sort tags by Z-depth before rendering so back tags draw first
      // This ensures proper 3D occlusion layering
      tags.forEach(tag => {
        // If hovered, stop rotation on that tag
        if (currentHovered && currentHovered === tag) {
          tag.rotate(speedX * 0.1, speedY * 0.1);
        } else {
          tag.rotate(speedX, speedY);
        }
      });

      // Sort: descending order of Z coordinate (backmost first)
      const sortedTags = [...tags].sort((a, b) => b.z - a.z);

      // Draw all tags
      sortedTags.forEach(tag => {
        tag.draw(ctx, currentHovered === tag);
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth;
        height = width;
        canvas.width = width;
        canvas.height = height;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="tag-cloud-container" ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          margin: '0 auto',
          cursor: hoveredTag ? 'pointer' : 'grab',
          maxWidth: '100%',
        }}
      />
      {hoveredTag && (
        <div className="tag-cloud-tooltip">
          <span className="tooltip-title">{hoveredTag}</span>
          <span className="tooltip-action">Drag to rotate • Release to spin</span>
        </div>
      )}
    </div>
  );
}
