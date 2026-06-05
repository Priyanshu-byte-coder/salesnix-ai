"use client";

import { useEffect, useState } from "react";

const METRICS = [
  {
    val: "35-50%",
    label: "Call Pick-Up Rate",
    vs: "vs 10-20%",
    human: "with Human",
  },
  {
    val: "40-50%",
    label: "Engagement Rate",
    vs: "vs 20-30%",
    human: "with Human",
  },
  {
    val: "15-25%",
    label: "Order Conversion",
    vs: "vs <5%",
    human: "with Human",
  },
  {
    val: "25%+",
    label: "Repeat Order Rate",
    vs: "vs Not Tracked",
    human: "with Human",
  },
];

export default function ResultsMetrics() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`results-metrics-grid ${mounted ? 'fade-in' : ''}`}>
      {METRICS.map((m, i) => (
        <div key={i} className="results-card border-beam-card" style={{ animationDelay: `${i * 0.15}s` }}>
          <div className="results-card-glow" />
          <div className="results-val text-brand-gradient">{m.val}</div>
          <div className="results-label">{m.label}</div>
          <div className="results-vs-wrap">
            <div className="vs-badge">
              <span className="vs-red">▼ {m.vs}</span>
              <span className="vs-text">{m.human}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
