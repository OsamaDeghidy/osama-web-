import React, { useEffect, useRef } from "react";

export function ParticleSeparator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    const height = (canvas.height = 80);

    // Generate random drift particles
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.45,
        decay: 0.002 + Math.random() * 0.004,
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Create beautiful glowing middle line accent (laser thin)
      const gradient = ctx.createLinearGradient(0, height / 2, width, height / 2);
      gradient.addColorStop(0, "rgba(212, 175, 55, 0)");
      gradient.addColorStop(0.15, "rgba(212, 175, 55, 0.04)");
      gradient.addColorStop(0.5, "rgba(212, 175, 55, 0.45)");
      gradient.addColorStop(0.85, "rgba(212, 175, 55, 0.04)");
      gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Render drifting stars / particles around the divider
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce horizontally
        if (p.x < 0 || p.x > width) p.vx *= -1;
        // Float limit vertically
        if (Math.abs(p.y - height / 2) > 30) p.vy *= -1;

        // Micro sparkle pulse
        p.alpha += p.decay;
        if (p.alpha > 0.65 || p.alpha < 0.1) {
          p.decay *= -1;
        }

        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.05, p.alpha)})`;
        ctx.beginPath();
        // Circular particle
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // High gloss core for larger ones
        if (p.size > 1.8) {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw faint connections close to center line
      ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distX = Math.abs(p1.x - p2.x);
          const distY = Math.abs(p1.y - p2.y);

          if (distX < 85 && distY < 12) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-4 relative z-10 opacity-75">
      <canvas ref={canvasRef} className="w-full h-[80px] block" />
    </div>
  );
}
