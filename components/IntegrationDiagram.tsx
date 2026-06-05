"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INTEGRATIONS = [
  { name: "WhatsApp",   logo: "/logos/whatsapp.svg",   color: "#25D366" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", color: "#00A1E0" },
  { name: "HubSpot",    logo: "/logos/hubspot.svg",    color: "#FF7A59" },
  { name: "Zoho",       logo: "/logos/zoho.svg",       color: "#E42527" },
  { name: "Stripe",     logo: "/logos/stripe.svg",     color: "#635BFF" },
  { name: "Razorpay",   logo: "/logos/razorpay.svg",   color: "#0C2451" },
  { name: "Shopify",    logo: "/logos/shopify.svg",    color: "#7AB55C" },
];

export default function IntegrationDiagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % INTEGRATIONS.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Place nodes in a circle around center
  const cx = 50; // % from left
  const cy = 50; // % from top
  const rx = 38; // % radius x
  const ry = 42; // % radius y

  return (
    <div className="int-diagram">
      {/* SVG lines layer */}
      <svg className="int-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {INTEGRATIONS.map((_, i) => {
          const angle = (i / INTEGRATIONS.length) * 2 * Math.PI - Math.PI / 2;
          const x = cx + rx * Math.cos(angle);
          const y = cy + ry * Math.sin(angle);
          const isActive = active === i;
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={x} y2={y}
              stroke={isActive ? INTEGRATIONS[i].color : "rgba(0,0,0,0.1)"}
              strokeWidth={isActive ? "0.6" : "0.3"}
              strokeDasharray={isActive ? "2 1" : "1.5 2"}
              style={{ transition: "all 0.5s ease" }}
            />
          );
        })}
        {/* Animated dot on active line */}
        {(() => {
          const i = active;
          const angle = (i / INTEGRATIONS.length) * 2 * Math.PI - Math.PI / 2;
          const x = cx + rx * Math.cos(angle);
          const y = cy + ry * Math.sin(angle);
          return (
            <circle r="1.2" fill={INTEGRATIONS[i].color}>
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                path={`M ${cx} ${cy} L ${x} ${y}`}
              />
            </circle>
          );
        })()}
      </svg>

      {/* Hub center */}
      <div className="int-hub">
        <span className="int-hub-text">Salesnix</span>
        <span className="int-hub-sub">AI</span>
      </div>

      {/* Orbital nodes */}
      {INTEGRATIONS.map((item, i) => {
        const angle = (i / INTEGRATIONS.length) * 2 * Math.PI - Math.PI / 2;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        const isActive = active === i;
        return (
          <div
            key={item.name}
            className={`int-node${isActive ? " int-node--active" : ""}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              "--node-color": item.color,
              boxShadow: isActive ? `0 0 0 3px ${item.color}33, 0 4px 16px ${item.color}22` : undefined,
            } as React.CSSProperties}
          >
            <Image src={item.logo} alt={item.name} width={28} height={28} unoptimized />
            <span className="int-node-label">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
