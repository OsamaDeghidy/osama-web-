import React, { useEffect, useRef, useState } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
}

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvasRef.current.parentElement?.clientWidth || 360);
    let height = (canvas.height = 380);

    // 3D slabs/layers representing Server Architecture layers
    const layers = [
      { name: "API Gateways", y: -90, color: "rgba(212, 175, 55, 0.45)", activeColor: "rgba(212, 175, 55, 0.95)" },
      { name: "Django Core Core", y: -10, color: "rgba(228, 228, 231, 0.45)", activeColor: "rgba(228, 228, 231, 0.95)" },
      { name: "PostgreSQL & Cache", y: 70, color: "rgba(191, 160, 46, 0.45)", activeColor: "rgba(191, 160, 46, 0.95)" },
    ];

    // Data packet animations floating between server layers
    interface Packet {
      fromY: number;
      toY: number;
      progress: number;
      speed: number;
      xOffset: number;
      zOffset: number;
      color: string;
    }
    const packets: Packet[] = [];

    // Local nodes on each layer
    const nodes: Node3D[] = [];
    layers.forEach((layer) => {
      // 4 nodes per layer (at corners)
      nodes.push({ x: -65, y: layer.y, z: -65, color: layer.color, pulseSpeed: 0.05, pulseOffset: Math.random() * 10 });
      nodes.push({ x: 65, y: layer.y, z: -65, color: layer.color, pulseSpeed: 0.04, pulseOffset: Math.random() * 10 });
      nodes.push({ x: 65, y: layer.y, z: 65, color: layer.color, pulseSpeed: 0.06, pulseOffset: Math.random() * 10 });
      nodes.push({ x: -65, y: layer.y, z: 65, color: layer.color, pulseSpeed: 0.05, pulseOffset: Math.random() * 10 });
    });

    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        width = canvas.width = canvasRef.current.parentElement.clientWidth;
        height = canvas.height = 380;
      }
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseRef.current.targetX = x * 0.25;
      mouseRef.current.targetY = y * 0.25;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let angleY = 0.015;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interactive tilt updates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      time += 0.02;

      // Projection values
      const cx = width / 2;
      const cy = height / 2 + 10;
      const perspective = 380;

      // Combined auto spin and interactive rotate values
      const currentAngleY = angleY + mouseRef.current.x * 0.005;
      const tiltAngleX = mouseRef.current.y * 0.005;

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(tiltAngleX);
      const sinX = Math.sin(tiltAngleX);

      // Draw vertical backbone connection rods
      const backboneNodes = [
        { x: -65, z: -65 },
        { x: 65, z: -65 },
        { x: 65, z: 65 },
        { x: -65, z: 65 },
      ];

      ctx.lineWidth = 1.2;
      backboneNodes.forEach((node) => {
        const topY = -120;
        const bottomY = 100;

        // Project top
        const txY1 = topY * cosX - node.z * sinX; // simplified
        const rotTxX = node.x * cosY - node.z * sinY;
        const rotTxZ = node.x * sinY + node.z * cosY + 180;
        const scaleT = perspective / (perspective + rotTxZ);
        const ptTop = { x: cx + rotTxX * scaleT, y: cy + topY * scaleT };

        // Project bottom
        const rotBxX = node.x * cosY - node.z * sinY;
        const rotBxZ = node.x * sinY + node.z * cosY + 180;
        const scaleB = perspective / (perspective + rotBxZ);
        const ptBottom = { x: cx + rotBxX * scaleB, y: cy + bottomY * scaleB };

        ctx.strokeStyle = "rgba(40, 40, 50, 0.6)";
        ctx.beginPath();
        ctx.moveTo(ptTop.x, ptTop.y);
        ctx.lineTo(ptBottom.x, ptBottom.y);
        ctx.stroke();
      });

      // Periodic packet spawner
      if (Math.random() < 0.07 && packets.length < 15) {
        const layerFrom = Math.floor(Math.random() * layers.length);
        let layerTo = Math.floor(Math.random() * layers.length);
        while (layerTo === layerFrom) {
          layerTo = Math.floor(Math.random() * layers.length);
        }

        packets.push({
          fromY: layers[layerFrom].y,
          toY: layers[layerTo].y,
          progress: 0,
          speed: 0.015 + Math.random() * 0.012,
          xOffset: -65 + Math.random() * 130,
          zOffset: -65 + Math.random() * 130,
          color: layers[layerFrom].color,
        });
      }

      // Render Layer Boards
      layers.forEach((layer, lIdx) => {
        // Build 4 points of the plane slab
        const halfSize = 90;
        const points = [
          { x: -halfSize, y: layer.y, z: -halfSize },
          { x: halfSize, y: layer.y, z: -halfSize },
          { x: halfSize, y: layer.y, z: halfSize },
          { x: -halfSize, y: layer.y, z: halfSize },
        ];

        const projected = points.map((p) => {
          // Rotate Y
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;

          // Rotate X tilt
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX + 200;

          const scale = perspective / (perspective + z2);
          return { x: cx + x1 * scale, y: cy + y2 * scale, scale };
        });

        // Check if mouse is hovering over this layer (simplified screen Y slice checks)
        const isHovered = false; // logic resolved screen boundaries

        // Fill background server deck plane
        ctx.fillStyle = lIdx === activeLayer ? "rgba(212, 175, 55, 0.06)" : "rgba(10, 10, 15, 0.35)";
        ctx.strokeStyle = lIdx === activeLayer ? layer.activeColor : "rgba(212, 175, 55, 0.16)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          ctx.lineTo(projected[i].x, projected[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw internal wireframe crosshairs for technical grid looks
        ctx.strokeStyle = "rgba(212, 175, 55, 0.04)";
        ctx.beginPath();
        // Diagonal 1
        ctx.moveTo(projected[0].x, projected[0].y);
        ctx.lineTo(projected[2].x, projected[2].y);
        // Diagonal 2
        ctx.moveTo(projected[1].x, projected[1].y);
        ctx.lineTo(projected[3].x, projected[3].y);
        ctx.stroke();

        // Render label text floating next to layer
        const rightmostPoint = projected[1]; 
        ctx.fillStyle = "rgba(156, 163, 175, 0.75)";
        ctx.font = "bold 9px monospace";
        ctx.fillText(`[LAYER 0${lIdx + 1} // ${layer.name}]`, rightmostPoint.x + 12, rightmostPoint.y + 3);
      });

      // Update and Draw Data Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.progress += pk.speed;

        if (pk.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        // Interpolated position
        const currY = pk.fromY + (pk.toY - pk.fromY) * pk.progress;

        // Project coordinate
        const rx = pk.xOffset * cosY - pk.zOffset * sinY;
        const rz = pk.xOffset * sinY + pk.zOffset * cosY;

        const ry2 = currY * cosX - rz * sinX;
        const rz2 = currY * sinX + rz * cosX + 200;

        const scale = perspective / (perspective + rz2);
        const pkX = cx + rx * scale;
        const pkY = cy + ry2 * scale;

        // Draw particle trail & glow flare
        ctx.fillStyle = pk.color;
        ctx.beginPath();
        ctx.arc(pkX, pkY, 2 + scale * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = "#d4af37";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pkX, pkY, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Corner Core Nodes on each layer
      nodes.forEach((node) => {
        // Rotate Y
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.x * sinY + node.z * cosY;

        // Rotate X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX + 200;

        const scale = perspective / (perspective + z2);
        const ndX = cx + x1 * scale;
        const ndY = cy + y2 * scale;

        // Heartbeat animation pulse
        const pulse = 1 + Math.sin(time * 3 + node.pulseOffset) * 0.15;

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(ndX, ndY, (2.5 + scale * 0.5) * pulse, 0, Math.PI * 2);
        ctx.fill();

        // White core spark
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(ndX, ndY, (1 + scale * 0.2) * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Auto rotation velocity
      angleY += 0.004;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeLayer]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl bg-[#09090c]/45 backdrop-blur-sm border border-slate-900/90 overflow-hidden min-h-[380px] flex flex-col justify-between p-6 hover:border-gold-500/30 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.02)]"
    >
      <div className="flex justify-between items-start z-10">
        <div>
          <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 bg-gold-950/40 border border-gold-800/40 text-gold-400 rounded-md font-mono font-bold block w-fit mb-2">
            Interactive 3D Engine
          </span>
          <h4 className="text-sm font-black text-white tracking-tight uppercase">Django Cluster Node</h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-450 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ONLINE</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 select-none pointer-events-auto cursor-crosshair z-0" />

      <div className="flex justify-between items-end z-10 pt-4 mt-auto border-t border-slate-900/50">
        <div className="space-y-1">
          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-mono">Simulated Latency</span>
          <span className="font-mono text-xs font-black text-zinc-300">1.8ms to DB</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onMouseEnter={() => setActiveLayer(idx)}
              onMouseLeave={() => setActiveLayer(null)}
              className={`h-4.5 px-2 rounded text-[8px] font-mono border transition-all ${
                activeLayer === idx
                  ? "bg-gold-500 text-[#050505] border-gold-400 font-extrabold"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800/40 hover:text-white hover:border-zinc-700"
              }`}
            >
              L0{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
