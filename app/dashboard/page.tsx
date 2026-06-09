"use client";
import DashboardShell from "@/components/DashboardShell";

// ── Demo Data ─────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Total Contacts",   value: "1,247",  change: "+12%",  up: true,  color: "#6366f1", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { label: "Active Deals",     value: "43",     change: "+8%",   up: true,  color: "#f59e0b", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  )},
  { label: "Pipeline Value",   value: "₹68.4L", change: "+22%",  up: true,  color: "#17A899", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )},
  { label: "This Month Rev.",  value: "₹12.8L", change: "+34%",  up: true,  color: "#22c55e", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  )},
  { label: "Avg Response",     value: "0.8s",   change: "−15%",  up: true,  color: "#8b5cf6", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )},
];

const PIPELINE = [
  { stage: "Lead",        count: 47, value: "₹28L",   pct: 100, color: "#6366f1" },
  { stage: "Qualified",   count: 23, value: "₹19.2L", pct: 49,  color: "#f59e0b" },
  { stage: "Proposal",    count: 12, value: "₹14.5L", pct: 26,  color: "#17A899" },
  { stage: "Negotiation", count: 7,  value: "₹9.8L",  pct: 15,  color: "#8b5cf6" },
  { stage: "Closed Won",  count: 4,  value: "₹5.8L",  pct: 9,   color: "#22c55e" },
];

const CONTACTS = [
  { id: 1,  initials: "RK", name: "Rajesh Kumar",    company: "Kumar Electronics",  phone: "+91 98765 43210", stage: "negotiation", stageLabel: "Negotiation", value: "₹2.4L",  last: "2h ago",  messages: 24, calls: 3, hot: true  },
  { id: 2,  initials: "SP", name: "Sunita Patel",    company: "Patel Finance Ltd",  phone: "+91 65432 10987", stage: "proposal",    stageLabel: "Proposal",    value: "₹3.1L",  last: "5h ago",  messages: 18, calls: 2, hot: true  },
  { id: 3,  initials: "VS", name: "Vikram Singh",    company: "Singh Retail Chain", phone: "+91 54321 09876", stage: "qualified",   stageLabel: "Qualified",   value: "₹4.2L",  last: "30m ago", messages: 31, calls: 5, hot: true  },
  { id: 4,  initials: "PS", name: "Priya Sharma",    company: "MedCare Pharma",     phone: "+91 87654 32109", stage: "lead",        stageLabel: "Lead",        value: "₹1.8L",  last: "1d ago",  messages: 12, calls: 1, hot: false },
  { id: 5,  initials: "AM", name: "Akash Mehta",     company: "Mehta Traders",      phone: "+91 76543 21098", stage: "proposal",    stageLabel: "Proposal",    value: "₹95K",   last: "3d ago",  messages: 9,  calls: 2, hot: false },
  { id: 6,  initials: "DN", name: "Deepa Nair",      company: "Nair Distributors",  phone: "+91 91234 56789", stage: "qualified",   stageLabel: "Qualified",   value: "₹1.3L",  last: "4h ago",  messages: 16, calls: 2, hot: false },
  { id: 7,  initials: "MJ", name: "Mohit Joshi",     company: "Joshi Wholesale",    phone: "+91 80012 34567", stage: "negotiation", stageLabel: "Negotiation", value: "₹2.9L",  last: "6h ago",  messages: 22, calls: 4, hot: true  },
  { id: 8,  initials: "AB", name: "Anita Bose",      company: "Bose Enterprises",   phone: "+91 70098 76543", stage: "lead",        stageLabel: "Lead",        value: "₹68K",   last: "2d ago",  messages: 6,  calls: 1, hot: false },
];

const ACTIVITY = [
  { type: "call",    color: "#17A899", time: "10:23 AM", text: "Outbound call to Rajesh Kumar — Order placed ₹2.4L",       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  { type: "message", color: "#6366f1", time: "10:41 AM", text: "Follow-up message sent to 14 leads in Electronics segment", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { type: "deal",    color: "#22c55e", time: "11:05 AM", text: "Sunita Patel moved to Proposal stage — ₹3.1L deal",        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { type: "call",    color: "#17A899", time: "11:28 AM", text: "Outbound call to Vikram Singh — Demo scheduled",           icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  { type: "message", color: "#f59e0b", time: "12:02 PM", text: "Payment link sent to Mohit Joshi — ₹2.9L",                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { type: "call",    color: "#ef4444", time: "12:45 PM", text: "Missed call from Deepa Nair — Auto-callback scheduled",    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/></svg> },
  { type: "deal",    color: "#22c55e", time: "1:14 PM",  text: "Order confirmed — Akash Mehta ₹95K",                       icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  { type: "message", color: "#6366f1", time: "2:31 PM",  text: "Sequence 'Pharma Re-engagement' sent to 8 contacts",      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> },
];

const FOLLOWUPS = [
  { name: "Rajesh Kumar",   time: "Tomorrow 10:00 AM", priority: "high",   stage: "Negotiation" },
  { name: "Vikram Singh",   time: "Today 4:00 PM",     priority: "urgent", stage: "Demo Call"   },
  { name: "Priya Sharma",   time: "Tomorrow 2:30 PM",  priority: "medium", stage: "Callback"    },
  { name: "Sunita Patel",   time: "Thu 11:00 AM",      priority: "medium", stage: "Proposal"    },
];

const CHART_BARS = [
  { day: "Mon", calls: 38, deals: 4  },
  { day: "Tue", calls: 52, deals: 7  },
  { day: "Wed", calls: 45, deals: 5  },
  { day: "Thu", calls: 61, deals: 9  },
  { day: "Fri", calls: 47, deals: 6  },
  { day: "Sat", calls: 28, deals: 3  },
  { day: "Sun", calls: 19, deals: 2  },
];
const MAX_CALLS = Math.max(...CHART_BARS.map((b) => b.calls));

const STAGE_COLORS: Record<string, string> = {
  lead: "#6366f1",
  qualified: "#f59e0b",
  proposal: "#17A899",
  negotiation: "#8b5cf6",
  closed: "#22c55e",
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      {/* Welcome */}
      <div className="db-welcome">
        <div>
          <h1 className="db-page-title">Good morning, Priyanshu</h1>
          <p className="db-page-sub">Here&apos;s what your AI agent has been up to today.</p>
        </div>
        <div className="db-welcome-actions">
          <button className="db-btn-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
          <button className="db-btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Contact
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="db-kpi-grid">
        {KPIS.map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-top">
              <div className="db-kpi-icon" style={{ background: k.color + "18", color: k.color }}>
                {k.icon}
              </div>
              <span className={`db-kpi-change${k.up ? " up" : " down"}`}>
                {k.up ? "↑" : "↓"} {k.change}
              </span>
            </div>
            <div className="db-kpi-val">{k.value}</div>
            <div className="db-kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="db-main-grid">
        {/* LEFT COLUMN */}
        <div className="db-col-left">

          {/* Pipeline */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div>
                <div className="db-panel-title">Sales Pipeline</div>
                <div className="db-panel-sub">Conversion: Lead → Closed Won = 8.5%</div>
              </div>
              <button className="db-panel-action">View All →</button>
            </div>
            <div className="db-pipeline">
              {PIPELINE.map((p) => (
                <div key={p.stage} className="db-pipeline-row">
                  <div className="db-pipeline-label">
                    <span className="db-pipeline-dot" style={{ background: p.color }} />
                    <span className="db-pipeline-stage">{p.stage}</span>
                  </div>
                  <div className="db-pipeline-bar-wrap">
                    <div className="db-pipeline-bar">
                      <div className="db-pipeline-fill" style={{ width: p.pct + "%", background: p.color }} />
                    </div>
                  </div>
                  <div className="db-pipeline-meta">
                    <span className="db-pipeline-count">{p.count}</span>
                    <span className="db-pipeline-value">{p.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts Table */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div>
                <div className="db-panel-title">Recent Contacts</div>
                <div className="db-panel-sub">Sorted by last AI interaction</div>
              </div>
              <button className="db-panel-action">View All →</button>
            </div>
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Stage</th>
                    <th>Deal Value</th>
                    <th>Activity</th>
                    <th>Last Touch</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTACTS.map((c) => (
                    <tr key={c.id} className="db-table-row">
                      <td>
                        <div className="db-contact-cell">
                          <div className="db-contact-avatar" style={{ background: STAGE_COLORS[c.stage] + "22", color: STAGE_COLORS[c.stage] }}>
                            {c.initials}
                          </div>
                          <div>
                            <div className="db-contact-name">
                              {c.name}
                              {c.hot && <span className="db-hot-tag" title="Hot Lead"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></span>}
                            </div>
                            <div className="db-contact-company">{c.company}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="db-stage-pill" style={{ background: STAGE_COLORS[c.stage] + "18", color: STAGE_COLORS[c.stage], borderColor: STAGE_COLORS[c.stage] + "44" }}>
                          {c.stageLabel}
                        </span>
                      </td>
                      <td className="db-td-value">{c.value}</td>
                      <td>
                        <div className="db-activity-mini">
                          <span title="Messages" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> {c.messages}</span>
                          <span title="Calls" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> {c.calls}</span>
                        </div>
                      </td>
                      <td className="db-td-muted">{c.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="db-col-right">

          {/* Today's AI Activity */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Today&apos;s AI Activity</div>
              <span className="db-live-indicator"><span className="db-live-dot-sm" /> Live</span>
            </div>
            <div className="db-ai-stats">
              <div className="db-ai-stat">
                <div className="db-ai-stat-val" style={{ color: "#17A899" }}>47</div>
                <div className="db-ai-stat-label">Calls Made</div>
              </div>
              <div className="db-ai-stat">
                <div className="db-ai-stat-val" style={{ color: "#6366f1" }}>124</div>
                <div className="db-ai-stat-label">Messages Sent</div>
              </div>
              <div className="db-ai-stat">
                <div className="db-ai-stat-val" style={{ color: "#22c55e" }}>8</div>
                <div className="db-ai-stat-label">Deals Progressed</div>
              </div>
              <div className="db-ai-stat">
                <div className="db-ai-stat-val" style={{ color: "#f59e0b" }}>3</div>
                <div className="db-ai-stat-label">Orders Placed</div>
              </div>
            </div>
            {/* Sentiment gauge */}
            <div className="db-sentiment-row">
              <span className="db-sentiment-label">Avg Sentiment</span>
              <div className="db-sentiment-bar-wrap">
                <div className="db-sentiment-bar">
                  <div className="db-sentiment-fill" style={{ width: "78%" }} />
                </div>
              </div>
              <span className="db-sentiment-score">78%</span>
            </div>
          </div>

          {/* Upcoming Follow-ups */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Upcoming Follow-ups</div>
              <span className="db-badge-count">4</span>
            </div>
            <div className="db-followup-list">
              {FOLLOWUPS.map((f, i) => (
                <div key={i} className="db-followup-item">
                  <div className={`db-priority-dot priority-${f.priority}`} />
                  <div className="db-followup-info">
                    <div className="db-followup-name">{f.name}</div>
                    <div className="db-followup-stage">{f.stage}</div>
                  </div>
                  <div className="db-followup-time">{f.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Activity Feed</div>
              <button className="db-panel-action">All →</button>
            </div>
            <div className="db-activity-feed">
              {ACTIVITY.slice(0, 6).map((a, i) => (
                <div key={i} className="db-activity-item">
                  <div className="db-activity-icon-wrap" style={{ background: a.color + "18" }}>
                    <span style={{ fontSize: "13px" }}>{a.icon}</span>
                  </div>
                  <div className="db-activity-body">
                    <div className="db-activity-text">{a.text}</div>
                    <div className="db-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Calls chart + Top deals */}
      <div className="db-bottom-grid">

        {/* Calls per day chart */}
        <div className="db-panel">
          <div className="db-panel-header">
            <div>
              <div className="db-panel-title">Calls This Week</div>
              <div className="db-panel-sub">Total 290 calls · 36 deals progressed</div>
            </div>
            <div className="db-chart-legend">
              <span><span className="db-legend-dot" style={{ background: "#17A899" }} /> Calls</span>
              <span><span className="db-legend-dot" style={{ background: "#22c55e" }} /> Deals</span>
            </div>
          </div>
          <div className="db-bar-chart">
            {CHART_BARS.map((b) => (
              <div key={b.day} className="db-bar-col">
                <div className="db-bar-stack">
                  <div
                    className="db-bar-fill"
                    style={{ height: Math.round((b.calls / MAX_CALLS) * 100) + "%", background: "#17A89940" }}
                  />
                  <div
                    className="db-bar-fill db-bar-deal"
                    style={{ height: Math.round((b.deals / MAX_CALLS) * 100) + "%", background: "#22c55e" }}
                  />
                </div>
                <div className="db-bar-label">{b.day}</div>
                <div className="db-bar-val">{b.calls}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion summary */}
        <div className="db-panel">
          <div className="db-panel-header">
            <div className="db-panel-title">Conversion Summary</div>
          </div>
          <div className="db-conv-list">
            {[
              { label: "Call Pickup Rate",   val: "71%",  bar: 71,  color: "#17A899" },
              { label: "Lead → Qualified",   val: "48.9%",bar: 49,  color: "#f59e0b" },
              { label: "Qualified → Closed", val: "17.4%",bar: 17,  color: "#6366f1" },
              { label: "WhatsApp Response",  val: "82%",  bar: 82,  color: "#22c55e" },
              { label: "Order Completion",   val: "94.2%",bar: 94,  color: "#8b5cf6" },
            ].map((r) => (
              <div key={r.label} className="db-conv-row">
                <div className="db-conv-label">{r.label}</div>
                <div className="db-conv-bar-wrap">
                  <div className="db-conv-bar">
                    <div className="db-conv-fill" style={{ width: r.bar + "%", background: r.color }} />
                  </div>
                </div>
                <div className="db-conv-val" style={{ color: r.color }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
