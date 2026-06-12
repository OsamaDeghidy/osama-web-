import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate 3D grid/mesh points (Sphere nodes in space)
    const points: Point3D[] = [];
    const spheresCount = 90;
    const radius = Math.min(width, height) * 0.28;

    // Golden spiral distribution on sphere for perfect balance
    for (let i = 0; i < spheresCount; i++) {
      const theta = Math.acos(-1 + (2 * i) / spheresCount);
      const phi = Math.sqrt(spheresCount * Math.PI) * theta;

      const x = Math.cos(phi) * Math.sin(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(theta) * radius;

      points.push({ x, y, z, baseX: x, baseY: y, baseZ: z });
    }

    // Generate terrain grid points (moving wave at the bottom region)
    const wavePoints: Point3D[] = [];
    const rows = 12;
    const cols = 12;
    const cellWidth = (width * 1.5) / cols;
    const cellDepth = 600 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * cellWidth;
        const y = height * 0.35; // Position below middle
        const z = r * cellDepth - 300;
        wavePoints.push({ x, y, z, baseX: x, baseY: y, baseZ: z });
      }
    }

    // Adjust size on resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse coordinates relative to window center
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.12;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.12;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let angleX = 0.0015;
    let angleY = 0.002;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spring interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      time += 0.015;

      // Draw background ambient dark overlay to ensure high contrast
      ctx.fillStyle = "rgba(5, 5, 5, 0.4)";
      ctx.fillRect(0, 0, width, height);

      // Center coordinates
      const cx = width * 0.72; // Position sphere on the right side on desktop
      const cy = height * 0.4;
      const perspective = 450;

      // Rotate sphere values based on self-motion + mouse offset dynamic controls
      const cosY = Math.cos(angleY + mouseX * 0.0031);
      const sinY = Math.sin(angleY + mouseX * 0.0031);
      const cosX = Math.cos(angleX + mouseY * 0.0031);
      const sinX = Math.sin(angleX + mouseY * 0.0031);

      // Project and render sphere nodes
      const projectedPoints = points.map((p) => {
        // Rotate Y axis
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseX * sinY + p.baseZ * cosY;

        // Rotate X axis
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = p.baseY * sinX + z1 * cosX;

        // Add periodic breathing animation
        const wave = 1 + Math.sin(time + p.baseX * 0.01) * 0.06;
        x1 *= wave;
        y2 *= wave;

        // Projection
        const scale = perspective / (perspective + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Draw Connection Lines between sphere nodes (Mesh connections)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        let connections = 0;

        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Connect points that are close to each other in projected coordinates
          if (dist < 130 && connections < 3) {
            connections++;
            const alpha = (1 - dist / 130) * 0.16 * (1 - p1.z / (radius * 2));
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw sphere particles
      projectedPoints.forEach((p) => {
        const size = Math.max(0.5, p.scale * 2.2);
        const alpha = Math.max(0.1, (1 - p.z / (radius * 2.2)) * 0.45);
        
        ctx.fillStyle = `rgba(243, 229, 171, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Glowing core overlay for prominent front node shapes
        if (p.z < 0) {
          ctx.shadowColor = "#d4af37";
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Update sphere continuous rotation
      angleY += 0.0016;
      angleX += 0.0009;

      // Render 3D wavy digital terrain floor at the bottom
      const terrainCenterY = height * 0.95;
      ctx.lineWidth = 0.9;
      
      const waveProjected = wavePoints.map((p) => {
        // Add dynamic wave offset based on sine calculations
        const d = Math.hypot(p.baseX, p.baseZ);
        const dynamicY = p.baseY + Math.sin(d * 0.0041 - time * 1.5) * 28;

        // Apply interactive mouse incline tilt for immersive 3D perspective
        const tiltX = mouseY * 0.25;
        const tiltY = mouseX * 0.25;

        const rotatedX = p.baseX + tiltY;
        const rotatedY = dynamicY + tiltX;
        const rotatedZ = p.baseZ + 350; // offset back in space

        const scale = 500 / (500 + rotatedZ);
        return {
          x: width / 2 + rotatedX * scale,
          y: terrainCenterY + rotatedY * scale - 70,
          z: rotatedZ,
          scale,
        };
      });

      // Draw terrain grid lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const pCurr = waveProjected[idx];

          if (!pCurr) continue;

          const alpha = Math.max(0, (1 - pCurr.z / 900) * 0.22);
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;

          // Draw horizontal connection line
          if (c < cols - 1) {
            const pNext = waveProjected[idx + 1];
            if (pNext) {
              ctx.beginPath();
              ctx.moveTo(pCurr.x, pCurr.y);
              ctx.lineTo(pNext.x, pNext.y);
              ctx.stroke();
            }
          }

          // Draw vertical connection line
          if (r < rows - 1) {
            const pBelow = waveProjected[idx + cols];
            if (pBelow) {
              ctx.beginPath();
              ctx.moveTo(pCurr.x, pCurr.y);
              ctx.lineTo(pBelow.x, pBelow.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none block"
      style={{
        mixBlendMode: "screen",
      }}
    />
  );
}
