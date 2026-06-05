"use client";

import { useEffect, useState } from 'react';

export default function IntegrationDiagram() {
  const [activePath, setActivePath] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getPathStyle = (index: number) => ({
    stroke: activePath === index ? "var(--brand)" : "rgba(255,255,255,0.1)",
    strokeWidth: activePath === index ? "3" : "2",
    filter: activePath === index ? "drop-shadow(0 0 8px rgba(23,168,153,0.6))" : "none",
    transition: "all 0.5s ease"
  });

  const getBoxStyle = (index: number) => ({
    fill: activePath === index ? "rgba(23,168,153,0.1)" : "rgba(255,255,255,0.03)",
    stroke: activePath === index ? "var(--brand)" : "rgba(255,255,255,0.1)",
    strokeWidth: activePath === index ? "2" : "1",
    transition: "all 0.5s ease"
  });

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto', display: 'block' }}>
        
        {/* Salesnix Core Node */}
        <rect x="300" y="100" width="200" height="100" rx="16" fill="rgba(23,168,153,0.15)" stroke="var(--brand)" strokeWidth="2" />
        <text x="400" y="145" fill="#fff" fontSize="22" fontWeight="700" textAnchor="middle">Salesnix AI</text>
        <text x="400" y="170" fill="var(--brand)" fontSize="14" textAnchor="middle">Brain</text>
        
        {/* Paths */}
        {/* To CRM */}
        <path d="M500 130 C 580 130, 600 80, 650 80" fill="none" {...getPathStyle(0)} strokeDasharray="6 6" />
        <circle cx="500" cy="130" r="4" fill="var(--brand)" opacity={activePath === 0 ? 1 : 0} />
        
        {/* To ERP */}
        <path d="M500 150 L 650 150" fill="none" {...getPathStyle(1)} strokeDasharray="6 6" />
        <circle cx="500" cy="150" r="4" fill="var(--brand)" opacity={activePath === 1 ? 1 : 0} />
        
        {/* To Payment */}
        <path d="M500 170 C 580 170, 600 220, 650 220" fill="none" {...getPathStyle(2)} strokeDasharray="6 6" />
        <circle cx="500" cy="170" r="4" fill="var(--brand)" opacity={activePath === 2 ? 1 : 0} />
        
        {/* Input Path */}
        <path d="M150 150 L 300 150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="225" cy="150" r="6" fill="var(--brand)">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* External Nodes */}
        {/* Input */}
        <rect x="50" y="120" width="100" height="60" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        <text x="100" y="155" fill="#a1a1aa" fontSize="16" fontWeight="500" textAnchor="middle">WhatsApp</text>

        {/* CRM */}
        <rect x="650" y="50" width="100" height="60" rx="12" {...getBoxStyle(0)} />
        <text x="700" y="85" fill={activePath === 0 ? "#fff" : "#a1a1aa"} fontSize="16" fontWeight="500" textAnchor="middle" style={{ transition: 'fill 0.5s' }}>CRM</text>

        {/* ERP */}
        <rect x="650" y="120" width="100" height="60" rx="12" {...getBoxStyle(1)} />
        <text x="700" y="155" fill={activePath === 1 ? "#fff" : "#a1a1aa"} fontSize="16" fontWeight="500" textAnchor="middle" style={{ transition: 'fill 0.5s' }}>ERP / DB</text>

        {/* Payment */}
        <rect x="650" y="190" width="100" height="60" rx="12" {...getBoxStyle(2)} />
        <text x="700" y="225" fill={activePath === 2 ? "#fff" : "#a1a1aa"} fontSize="16" fontWeight="500" textAnchor="middle" style={{ transition: 'fill 0.5s' }}>Stripe</text>
      </svg>
    </div>
  );
}
