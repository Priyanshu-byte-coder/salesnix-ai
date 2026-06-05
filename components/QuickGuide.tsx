"use client";

import { useState, useEffect } from "react";

const STEPS = [
  { title: "Tell us about your business", label: "STEP 1" },
  { title: "Add the products you want to sell", label: "STEP 2" },
  { title: "Watch your agent take a real order", label: "STEP 3" },
];

export default function QuickGuide() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`quick-guide-section ${mounted ? 'fade-in' : ''}`}>
      <div className="container">
        <div className="quick-guide-header">
          <h2>
            Experience in <span className="text-brand-gradient">3 clicks</span><br/>
            &amp; Build for Your Enterprise
          </h2>
        </div>

        <div className="quick-guide-body">
          {/* Timeline Left */}
          <div className="qg-timeline">
            {STEPS.map((s, i) => (
              <div key={i} className="qg-step">
                <div className="qg-indicator">
                  <div className="qg-dot pulse-anim" />
                  {i < STEPS.length - 1 && <div className="qg-line" />}
                </div>
                <div className="qg-content">
                  <span className="qg-label">{s.label}</span>
                  <h3 className="qg-title">{s.title}</h3>
                </div>
              </div>
            ))}
            <div className="qg-ctas">
              <button className="btn btn-teal">Experience in 3 Clicks!</button>
              <button className="btn btn-ghost" style={{ border: "1px solid var(--border)" }}>Contact Sales</button>
            </div>
          </div>

          {/* Graphical Abstract Right */}
          <div className="qg-graphic">
            <div className="qg-graphic-card glass-panel">
              <svg viewBox="0 0 400 300" className="qg-svg">
                <defs>
                  <linearGradient id="qgGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glowQg">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Abstract Setup UI */}
                <rect x="50" y="50" width="300" height="200" rx="10" fill="rgba(0,0,0,0.02)" stroke="var(--border)" strokeWidth="1" />
                
                {/* Profile / Avatar */}
                <circle cx="100" cy="100" r="25" fill="url(#qgGrad)" />
                <rect x="140" y="85" width="120" height="10" rx="5" fill="rgba(0,0,0,0.15)" />
                <rect x="140" y="105" width="80" height="10" rx="5" fill="rgba(0,0,0,0.08)" />

                {/* Data Rows */}
                <rect x="75" y="150" width="250" height="15" rx="5" fill="rgba(0,0,0,0.05)" className="row-anim row-1" />
                <rect x="75" y="180" width="200" height="15" rx="5" fill="rgba(0,0,0,0.05)" className="row-anim row-2" />
                <rect x="75" y="210" width="220" height="15" rx="5" fill="rgba(0,0,0,0.05)" className="row-anim row-3" />

                {/* Magic Wand / Sparkle */}
                <path d="M280 90 L290 100 L280 110 L270 100 Z" fill="var(--brand)" filter="url(#glowQg)" className="sparkle-anim" />
                <path d="M310 70 L315 75 L310 80 L305 75 Z" fill="var(--brand)" filter="url(#glowQg)" className="sparkle-anim" style={{animationDelay: '0.5s'}} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
