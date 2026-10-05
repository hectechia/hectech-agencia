'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate grid points for geometric micro-mesh
    const cols = Math.floor(width / 48) + 1;
    const rows = Math.floor(height / 48) + 1;
    const points: Point[] = [];

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols) * width;
        const y = (r / rows) * height;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
        });
      }
    }

    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    const render = () => {
      time += 0.015;

      // Smooth mouse lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle wave harmonics & reactive displacement
      const maxDistance = 160;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Harmonic organic oscillation
        const waveX = Math.sin(time + p.baseY * 0.008) * 3;
        const waveY = Math.cos(time + p.baseX * 0.008) * 3;

        let targetX = p.baseX + waveX;
        let targetY = p.baseY + waveY;

        // Reactive displacement to cursor
        if (mouse.active) {
          const dx = mouse.x - p.baseX;
          const dy = mouse.y - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const force = (1 - dist / maxDistance) * 22;
            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * force;
            targetY -= Math.sin(angle) * force;
          }
        }

        p.x += (targetX - p.x) * 0.12;
        p.y += (targetY - p.y) * 0.12;
      }

      // Draw connecting micro-mesh segments
      ctx.lineWidth = 0.5;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const idx = r * (cols + 1) + c;
          const p = points[idx];
          if (!p) continue;

          // Connect horizontally
          if (c < cols) {
            const rightP = points[idx + 1];
            if (rightP) {
              const grad = ctx.createLinearGradient(p.x, p.y, rightP.x, rightP.y);
              grad.addColorStop(0, 'rgba(0, 255, 133, 0.04)');
              grad.addColorStop(1, 'rgba(0, 242, 255, 0.03)');
              ctx.strokeStyle = grad;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(rightP.x, rightP.y);
              ctx.stroke();
            }
          }

          // Connect vertically
          if (r < rows) {
            const downP = points[idx + (cols + 1)];
            if (downP) {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(downP.x, downP.y);
              ctx.stroke();
            }
          }

          // Render micro-nodes near cursor
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.5;
              ctx.fillStyle = `rgba(0, 255, 133, ${alpha})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
