"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FlickeringGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Configuration
    const gridSize = 40;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);
    const dots: { x: number; y: number; alpha: number; speed: number; maxAlpha: number }[] = [];

    // Initialize dots
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * gridSize,
          y: j * gridSize,
          alpha: Math.random() * 0.5,
          speed: (Math.random() * 0.02) + 0.005,
          maxAlpha: (Math.random() * 0.8) + 0.2
        });
      }
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      dots.forEach((dot) => {
        // Flicker logic
        dot.alpha += dot.speed;
        if (dot.alpha > dot.maxAlpha || dot.alpha < 0) {
          dot.speed *= -1;
        }
        
        ctx.fillStyle = `rgba(23, 168, 153, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw faint grid lines
      ctx.strokeStyle = "rgba(23, 168, 153, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, h);
      }
      for (let j = 0; j < rows; j++) {
        ctx.moveTo(0, j * gridSize);
        ctx.lineTo(w, j * gridSize);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <div className="flickering-grid-wrapper">
      <div className="flickering-mask"></div>
      <canvas ref={canvasRef} className="flickering-canvas"></canvas>
    </div>
  );
}
