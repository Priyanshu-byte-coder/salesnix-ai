"use client";

import { useState, useEffect } from "react";

const DANGER_STATS = [
  { val: "30%+", desc: "of field force can't sell the full range", impact: "-9%" },
  { val: "10-15%", desc: "of outlets skipped every day", impact: "-7%" },
  { val: "35-40%", desc: "avg attrition. 6 months to ramp new hires", impact: "-10%" },
  { val: "8-12%", desc: "field absent daily. Territories go dark", impact: "-7%" },
];

export default function RevenueLoss() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`revenue-loss-section ${mounted ? 'fade-in' : ''}`}>
      <div className="revenue-loss-bg" />
      <div className="container">
        <div className="loss-header">
          <h2>
            <span className="text-muted block">Your Sales Team is losing revenue.</span>
            <span className="text-danger block">Every Day.</span>
          </h2>
        </div>

        <div className="loss-grid">
          {/* Graphical Abstract Left */}
          <div className="loss-graphic">
            <div className="loss-chart-container">
              <svg viewBox="0 0 200 200" className="loss-chart-svg">
                {/* Background Ring */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(220, 38, 38, 0.1)" strokeWidth="15" />
                
                {/* Red Loss Ring */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#dc2626" strokeWidth="15"
                  strokeDasharray="502" strokeDashoffset="330" strokeLinecap="round"
                  className="loss-ring-anim"
                />

                {/* Inner Text */}
                <text x="100" y="95" textAnchor="middle" fill="#dc2626" fontSize="48" fontWeight="bold">
                  33%
                </text>
                <text x="100" y="125" textAnchor="middle" fill="var(--text-muted)" fontSize="16">
                  Sales Loss
                </text>
              </svg>
              <div className="loss-legend">
                <div className="legend-item"><span className="dot dot-brand" /> Revenue Captured</div>
                <div className="legend-item"><span className="dot dot-danger" /> Sales Loss</div>
              </div>
            </div>
          </div>

          {/* Cards Right */}
          <div className="loss-cards">
            {DANGER_STATS.map((s, i) => (
              <div key={i} className="danger-card">
                <div className="danger-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="danger-content">
                  <div className="danger-val">{s.val}</div>
                  <div className="danger-desc">{s.desc}</div>
                </div>
                <div className="danger-impact">{s.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
