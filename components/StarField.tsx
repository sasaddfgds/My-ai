
import React, { useEffect, useRef, useCallback } from 'react';
import { Star } from '../types';

const STAR_COUNT = 3500;
const NEON_COLORS = ['#ffffff', '#ff0044', '#00e5ff', '#ffeb3b', '#cc0000'];

const StarField: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rotationXRef = useRef<number>(0);
  const rotationYRef = useRef<number>(0);
  const targetXRef = useRef<number>(0);
  const targetYRef = useRef<number>(0);

  useEffect(() => {
    const galaxy: Star[] = Array.from({ length: STAR_COUNT }).map(() => {
      const radius = Math.random() * 2500;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 2,
        opacity: Math.random() * 0.9 + 0.1,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)]
      };
    });
    starsRef.current = galaxy;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    // Маппинг 0...1 в 0...2PI (360 градусов)
    targetXRef.current = (e.clientX / innerWidth) * Math.PI * 2;
    targetYRef.current = (e.clientY / innerHeight) * Math.PI * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Плавная интерполяция вращения
      rotationXRef.current += (targetXRef.current - rotationXRef.current) * 0.04;
      rotationYRef.current += (targetYRef.current - rotationYRef.current) * 0.04;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Поворот на 360 градусов по осям
      ctx.rotate(rotationXRef.current);
      const skew = Math.sin(rotationYRef.current) * 0.5;
      ctx.transform(1, skew, skew, 1, 0, 0);

      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * (active ? 1.0 : 0.3);
        ctx.fill();
      });

      ctx.restore();

      // Максималистские визуальные артефакты
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      for (let i = 0; i < canvas.height; i += 6) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default StarField;
