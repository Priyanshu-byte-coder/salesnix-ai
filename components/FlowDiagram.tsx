const CY = 95;

interface FlowNode {
  cx: number;
  r: number;
  label: string;
  type: "person" | "chat" | "ai" | "db" | "check";
  center?: boolean;
}

const NODES: FlowNode[] = [
  { cx: 80,  r: 40, label: "Customer",    type: "person" },
  { cx: 258, r: 40, label: "WhatsApp",    type: "chat"   },
  { cx: 450, r: 48, label: "Salesnix AI", type: "ai", center: true },
  { cx: 642, r: 40, label: "Your CRM",    type: "db"     },
  { cx: 820, r: 40, label: "Confirmed",   type: "check"  },
];

const CONNECTORS = NODES.slice(0, -1).map((n, i) => ({
  x1: n.cx + n.r + 5, x2: NODES[i + 1].cx - NODES[i + 1].r - 5, y: CY,
}));

function NodeIcon({ node }: { node: FlowNode }) {
  const { cx, type } = node;
  if (type === "person") return (
    <g>
      <circle cx={cx} cy={CY - 13} r={7.5} fill="rgba(255,255,255,0.8)"/>
      <path d={`M ${cx-13} ${CY+6} Q ${cx-11} ${CY-2} ${cx} ${CY-2} Q ${cx+11} ${CY-2} ${cx+13} ${CY+6}`} fill="rgba(255,255,255,0.8)"/>
    </g>
  );
  if (type === "chat") return (
    <g>
      <rect x={cx-14} y={CY-15} width="28" height="20" rx="4.5" fill="#25D366" opacity="0.9"/>
      <polygon points={`${cx-7},${CY+5} ${cx-14},${CY+13} ${cx-1},${CY+7}`} fill="#25D366" opacity="0.9"/>
      <line x1={cx-9} y1={CY-9} x2={cx+9} y2={CY-9} stroke="white" strokeWidth="1.5" opacity="0.8"/>
      <line x1={cx-9} y1={CY-4} x2={cx+4} y2={CY-4} stroke="white" strokeWidth="1.5" opacity="0.8"/>
    </g>
  );
  if (type === "ai") return (
    <g>
      <path d={`M ${cx-12} ${CY} Q ${cx-6} ${CY-10} ${cx} ${CY}`} stroke="#17A899" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d={`M ${cx-18} ${CY} Q ${cx-9} ${CY-18} ${cx} ${CY}`} stroke="#17A899" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d={`M ${cx-24} ${CY} Q ${cx-12} ${CY-26} ${cx} ${CY}`} stroke="#17A899" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
      <circle cx={cx} cy={CY} r="4" fill="#17A899" filter="drop-shadow(0 0 5px #17A899)"/>
    </g>
  );
  if (type === "db") return (
    <g>
      <ellipse cx={cx} cy={CY-11} rx="12" ry="4" fill="rgba(255,255,255,0.7)"/>
      <rect x={cx-12} y={CY-11} width="24" height="22" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <ellipse cx={cx} cy={CY+11} rx="12" ry="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <ellipse cx={cx} cy={CY} rx="12" ry="2.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    </g>
  );
  if (type === "check") return (
    <g>
      <circle cx={cx} cy={CY} r="14" fill="rgba(23,168,153,0.15)" stroke="#17A899" strokeWidth="2"/>
      <path d={`M ${cx-7} ${CY} L ${cx-2} ${CY+5.5} L ${cx+8} ${CY-6}`} stroke="#17A899" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  );
  return null;
}

export default function FlowDiagram() {
  return (
    <div className="flow-wrap">
      <svg viewBox="0 0 900 175" className="flow-svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#17A899" stopOpacity="0.05"/>
            <stop offset="50%" stopColor="#17A899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#17A899" stopOpacity="0.05"/>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {CONNECTORS.map((c, i) => (
          <g key={i}>
            <line x1={c.x1} y1={c.y} x2={c.x2} y2={c.y} stroke="url(#lineGrad)" strokeWidth="2"/>
            <line x1={c.x1} y1={c.y} x2={c.x2} y2={c.y} stroke="rgba(23,168,153,0.3)" strokeWidth="2" strokeDasharray="4,8"/>
            {[0, 1, 2].map(j => (
              <circle key={j} r={j === 0 ? 4 : 3} fill="#17A899" opacity={j === 0 ? 1 : j === 1 ? 0.7 : 0.4} filter="url(#glow)">
                <animateMotion
                  dur={`${2 + i * 0.15}s`}
                  begin={`${-(j * (2 + i * 0.15) / 3)}s`}
                  repeatCount="indefinite"
                  path={`M ${c.x1},${c.y} L ${c.x2},${c.y}`}
                />
              </circle>
            ))}
          </g>
        ))}

        {NODES.map((node, i) => (
          <g key={i}>
            {node.center && (
              <circle cx={node.cx} cy={CY} r={node.r + 15}
                fill="none" stroke="rgba(23,168,153,0.4)" strokeWidth="1.5"
                style={{ animation: "pulse-ring 2.5s ease-in-out infinite" }}
              />
            )}
            {node.center && (
              <circle cx={node.cx} cy={CY} r={node.r + 30}
                fill="none" stroke="rgba(23,168,153,0.15)" strokeWidth="1"
                style={{ animation: "pulse-ring 2.5s ease-in-out 0.5s infinite" }}
              />
            )}
            {node.center && (
              <circle cx={node.cx} cy={CY} r={node.r}
                fill="rgba(23,168,153,0.15)"
                style={{ animation: "center-glow 2.5s ease-in-out infinite" }}
                filter="url(#glow)"
              />
            )}
            <circle cx={node.cx} cy={CY} r={node.r}
              fill={node.center ? "rgba(23,168,153,0.1)" : "rgba(255,255,255,0.03)"}
              stroke={node.center ? "#17A899" : "rgba(255,255,255,0.15)"}
              strokeWidth={node.center ? "2" : "1"}
            />
            <NodeIcon node={node}/>
            <text
              x={node.cx} y={CY + node.r + 24}
              textAnchor="middle"
              fill={node.center ? "#fff" : "rgba(255,255,255,0.6)"}
              fontSize="13" fontFamily="Inter, system-ui"
              fontWeight={node.center ? "700" : "500"}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
