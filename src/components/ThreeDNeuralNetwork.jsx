import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDNeuralNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 250;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Neural net parameters
    const particleCount = window.innerWidth < 768 ? 40 : 90;
    const maxDistance = 75;
    const mouseRadius = 120;

    // Geometries & Materials
    const particleGeometry = new THREE.BufferGeometry();
    const lineGeometry = new THREE.BufferGeometry();

    // Node particle visual appearance - small circular glowing point
    // We create a canvas texture for a soft glow circle
    const createCircleTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 1)'); // neon cyan
      gradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.8)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)'); // purple glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createCircleTexture()
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1 // Note: linewidth > 1 is usually not supported by WebGL implementations
    });

    // Particle positions and velocities
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    const colorCyan = new THREE.Color('#06b6d4');
    const colorPurple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a 3D box
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 200;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign initial velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.3
      });

      // Colors mix between cyan and purple
      const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse positions (normalized coordinates)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Target normalized coordinates [-1, 1]
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Line segments pool helper
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const lineColors = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animation variables
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax camera movement
      camera.position.x += (mouse.x * 60 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 40 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotate entire system slightly
      particles.rotation.y += 0.0006;
      lines.rotation.y += 0.0006;
      particles.rotation.x += 0.0002;
      lines.rotation.x += 0.0002;

      const posArray = particleGeometry.attributes.position.array;
      let lineIndex = 0;
      let colorIndex = 0;

      // Update positions & calculate connections
      for (let i = 0; i < particleCount; i++) {
        // Move particles
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounding check (wrap or bounce)
        if (posArray[i * 3] < -250 || posArray[i * 3] > 250) velocities[i].x *= -1;
        if (posArray[i * 3 + 1] < -180 || posArray[i * 3 + 1] > 180) velocities[i].y *= -1;
        if (posArray[i * 3 + 2] < -150 || posArray[i * 3 + 2] > 150) velocities[i].z *= -1;

        // Project mouse coordinate to 3D roughly
        // If particle is close to the mouse position (in normalized viewport terms), we can influence it
        // Or simply compare distance pairwise
        const xi = posArray[i * 3];
        const yi = posArray[i * 3 + 1];
        const zi = posArray[i * 3 + 2];

        // Draw connections
        for (let j = i + 1; j < particleCount; j++) {
          const xj = posArray[j * 3];
          const yj = posArray[j * 3 + 1];
          const zj = posArray[j * 3 + 2];

          const dx = xi - xj;
          const dy = yi - yj;
          const dz = zi - zj;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Add segment vertices
            linePositions[lineIndex++] = xi;
            linePositions[lineIndex++] = yi;
            linePositions[lineIndex++] = zi;
            linePositions[lineIndex++] = xj;
            linePositions[lineIndex++] = yj;
            linePositions[lineIndex++] = zj;

            // Calculate transparency based on distance
            const alpha = 1.0 - (dist / maxDistance);
            
            // Neon cyan to neon purple gradient lines
            const cMix1 = colorCyan.clone().lerp(colorPurple, Math.abs(xi) / 200);
            const cMix2 = colorCyan.clone().lerp(colorPurple, Math.abs(xj) / 200);

            lineColors[colorIndex++] = cMix1.r * alpha * 0.4;
            lineColors[colorIndex++] = cMix1.g * alpha * 0.7;
            lineColors[colorIndex++] = cMix1.b * alpha * 0.8;
            
            lineColors[colorIndex++] = cMix2.r * alpha * 0.4;
            lineColors[colorIndex++] = cMix2.g * alpha * 0.7;
            lineColors[colorIndex++] = cMix2.b * alpha * 0.8;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.subarray(0, lineIndex), 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors.subarray(0, colorIndex), 3));

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose WebGL resources
      if (renderer) renderer.dispose();
      particleGeometry.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.25, // push the network lines into the background for readability
        background: 'transparent' // Transparent background to let the theme background color shine through
      }}
    />
  );
}
