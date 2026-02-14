
import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const SakuraField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useRef<Petal[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createPetal = (): Petal => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      size: 4 + Math.random() * 8,
      speedY: 0.8 + Math.random() * 1.8,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: 0.3 + Math.random() * 0.5,
    });

    // Reduced count slightly for better text legibility
    for (let i = 0; i < 50; i++) {
      petals.current.push(createPetal());
    }

    let animationFrame: number;

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-petal.size, -petal.size, -petal.size, petal.size, 0, petal.size);
      ctx.bezierCurveTo(petal.size, petal.size, petal.size, -petal.size, 0, 0);
      ctx.fillStyle = `rgba(180, 0, 0, ${petal.opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.current.forEach((petal, index) => {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y / 80) * 0.4;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvas.height + 20) {
          petals.current[index] = createPetal();
        }

        drawPetal(ctx, petal);
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default SakuraField;
