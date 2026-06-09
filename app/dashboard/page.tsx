"use client";
import React, { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { getDashboard, type DashboardData } from "@/lib/api";

// ── Icon SVGs (UI only — no data) ─────────────────────────────────────────────

const KPI_ICONS = [
  <svg key="contacts" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="deals" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  <svg key="pipeline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="revenue" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  <svg key="response" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

const KPI_COLORS = ["#6366f1", "#f59e0b", "#17A899", "#22c55e", "#8b5cf6"];

const ACTIVITY_ICONS: Record<string, React.ReactElement> = {
  call:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  message: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  deal:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
};

const STAGE_COLORS: Record<string, string> = {
  lead: "#6366f1", qualified: "#f59e0b", proposal: "#17A899",
  negotiation: "#8b5cf6", closed: "#22c55e",
};

// ── Loading Skeleton ──────────────────────────────────────────────────────────

function Skeleton({ w = "100%", h = "1rem" }: { w?: string; h?: string }) {
  return (
    <div style={{ width: w, height: h, background: "#e2e8f0", borderRadius: "6px", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const maxCalls = data ? Math.max(...data.chart.map((b) => b.calls), 1) : 1;

  return (
    <DashboardShell title="Dashboard">

      {/* ── Error banner ── */}
      {error && (
        <div className="db-api-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Could not load dashboard data — {error}
        </div>
      )}

      {/* Welcome */}
      <div className="db-welcome">
        <div>
          <h1 className="db-page-title">Dashboard</h1>
          <p className="db-page-sub">Your AI agent&apos;s live activity overview.</p>
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
        {(data?.kpis ?? Array(5).fill(null)).map((k, i) => (
          <div key={i} className="db-kpi-card">
            <div className="db-kpi-top">
              <div className="db-kpi-icon" style={{ background: KPI_COLORS[i] + "18", color: KPI_COLORS[i] }}>
                {KPI_ICONS[i]}
              </div>
              {k ? (
                <span className={`db-kpi-change${k.up ? " up" : " down"}`}>
                  {k.up ? "↑" : "↓"} {k.change}
                </span>
              ) : <Skeleton w="48px" h="20px" />}
            </div>
            {k ? <div className="db-kpi-val">{k.value}</div> : <Skeleton w="80px" h="28px" />}
            {k ? <div className="db-kpi-label">{k.label}</div> : <Skeleton w="100px" h="14px" />}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="db-main-grid">

        {/* LEFT */}
        <div className="db-col-left">

          {/* Pipeline */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div>
                <div className="db-panel-title">Sales Pipeline</div>
                <div className="db-panel-sub">Conversion: Lead → Closed Won</div>
              </div>
              <button className="db-panel-action">View All →</button>
            </div>
            <div className="db-pipeline">
              {loading
                ? Array(5).fill(null).map((_, i) => (
                    <div key={i} className="db-pipeline-row">
                      <div className="db-pipeline-label"><Skeleton w="90px" h="14px" /></div>
                      <div className="db-pipeline-bar-wrap"><div className="db-pipeline-bar"><div className="db-pipeline-fill" style={{ width: "0%" }} /></div></div>
                      <div className="db-pipeline-meta"><Skeleton w="60px" h="14px" /></div>
                    </div>
                  ))
                : (data?.pipeline ?? []).map((p) => (
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
                  ))
              }
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
                  {loading
                    ? Array(6).fill(null).map((_, i) => (
                        <tr key={i} className="db-table-row">
                          <td><div className="db-contact-cell"><Skeleton w="34px" h="34px" /><div style={{ display:"flex", flexDirection:"column", gap:"4px" }}><Skeleton w="100px" h="13px" /><Skeleton w="80px" h="11px" /></div></div></td>
                          <td><Skeleton w="70px" h="20px" /></td>
                          <td><Skeleton w="50px" h="13px" /></td>
                          <td><Skeleton w="60px" h="13px" /></td>
                          <td><Skeleton w="55px" h="13px" /></td>
                        </tr>
                      ))
                    : (data?.contacts ?? []).map((c) => (
                        <tr key={c.id} className="db-table-row">
                          <td>
                            <div className="db-contact-cell">
                              <div className="db-contact-avatar" style={{ background: (STAGE_COLORS[c.stage] ?? "#17A899") + "22", color: STAGE_COLORS[c.stage] ?? "#17A899" }}>
                                {c.initials}
                              </div>
                              <div>
                                <div className="db-contact-name">
                                  {c.name}
                                  {c.hot && (
                                    <span className="db-hot-tag" title="Hot Lead">
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                                    </span>
                                  )}
                                </div>
                                <div className="db-contact-company">{c.company}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="db-stage-pill" style={{ background: (STAGE_COLORS[c.stage] ?? "#17A899") + "18", color: STAGE_COLORS[c.stage] ?? "#17A899", borderColor: (STAGE_COLORS[c.stage] ?? "#17A899") + "44" }}>
                              {c.stageLabel}
                            </span>
                          </td>
                          <td className="db-td-value">{c.value}</td>
                          <td>
                            <div className="db-activity-mini">
                              <span title="Messages" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                {c.messages}
                              </span>
                              <span title="Calls" style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                {c.calls}
                              </span>
                            </div>
                          </td>
                          <td className="db-td-muted">{c.last}</td>
                        </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="db-col-right">

          {/* Today's AI Activity */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Today&apos;s AI Activity</div>
              <span className="db-live-indicator"><span className="db-live-dot-sm" /> Live</span>
            </div>
            <div className="db-ai-stats">
              {loading ? Array(4).fill(null).map((_, i) => (
                <div key={i} className="db-ai-stat"><Skeleton w="50px" h="28px" /><Skeleton w="70px" h="12px" /></div>
              )) : [
                { val: data?.aiActivity.calls,            label: "Calls Made",        color: "#17A899" },
                { val: data?.aiActivity.messages,         label: "Messages Sent",     color: "#6366f1" },
                { val: data?.aiActivity.dealsProgressed,  label: "Deals Progressed",  color: "#22c55e" },
                { val: data?.aiActivity.ordersPlaced,     label: "Orders Placed",     color: "#f59e0b" },
              ].map((s, i) => (
                <div key={i} className="db-ai-stat">
                  <div className="db-ai-stat-val" style={{ color: s.color }}>{s.val ?? "—"}</div>
                  <div className="db-ai-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="db-sentiment-row">
              <span className="db-sentiment-label">Avg Sentiment</span>
              <div className="db-sentiment-bar-wrap">
                <div className="db-sentiment-bar">
                  <div className="db-sentiment-fill" style={{ width: (data?.aiActivity.avgSentiment ?? 0) + "%" }} />
                </div>
              </div>
              <span className="db-sentiment-score">{data?.aiActivity.avgSentiment ?? "—"}{data ? "%" : ""}</span>
            </div>
          </div>

          {/* Upcoming Follow-ups */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Upcoming Follow-ups</div>
              {data && <span className="db-badge-count">{data.followups.length}</span>}
            </div>
            <div className="db-followup-list">
              {loading
                ? Array(4).fill(null).map((_, i) => (
                    <div key={i} className="db-followup-item">
                      <div className="db-priority-dot priority-medium" />
                      <div className="db-followup-info"><Skeleton w="100px" h="13px" /><Skeleton w="60px" h="11px" /></div>
                      <Skeleton w="80px" h="11px" />
                    </div>
                  ))
                : (data?.followups ?? []).map((f, i) => (
                    <div key={i} className="db-followup-item">
                      <div className={`db-priority-dot priority-${f.priority}`} />
                      <div className="db-followup-info">
                        <div className="db-followup-name">{f.name}</div>
                        <div className="db-followup-stage">{f.stage}</div>
                      </div>
                      <div className="db-followup-time">{f.time}</div>
                    </div>
                  ))
              }
            </div>
          </div>

          {/* Activity Feed */}
          <div className="db-panel">
            <div className="db-panel-header">
              <div className="db-panel-title">Activity Feed</div>
              <button className="db-panel-action">All →</button>
            </div>
            <div className="db-activity-feed">
              {loading
                ? Array(5).fill(null).map((_, i) => (
                    <div key={i} className="db-activity-item">
                      <div className="db-activity-icon-wrap" style={{ background: "#f1f5f9" }}><Skeleton w="16px" h="16px" /></div>
                      <div className="db-activity-body"><Skeleton w="100%" h="12px" /><Skeleton w="50px" h="10px" /></div>
                    </div>
                  ))
                : (data?.activity ?? []).slice(0, 6).map((a, i) => (
                    <div key={i} className="db-activity-item">
                      <div className="db-activity-icon-wrap" style={{ background: a.color + "18" }}>
                        {ACTIVITY_ICONS[a.type] ?? ACTIVITY_ICONS.deal}
                      </div>
                      <div className="db-activity-body">
                        <div className="db-activity-text">{a.text}</div>
                        <div className="db-activity-time">{a.time}</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="db-bottom-grid">

        {/* Calls chart */}
        <div className="db-panel">
          <div className="db-panel-header">
            <div>
              <div className="db-panel-title">Calls This Week</div>
              <div className="db-panel-sub">{data ? `Total ${data.chart.reduce((s, b) => s + b.calls, 0)} calls · ${data.chart.reduce((s, b) => s + b.deals, 0)} deals progressed` : "Loading…"}</div>
            </div>
            <div className="db-chart-legend">
              <span><span className="db-legend-dot" style={{ background: "#17A899" }} /> Calls</span>
              <span><span className="db-legend-dot" style={{ background: "#22c55e" }} /> Deals</span>
            </div>
          </div>
          <div className="db-bar-chart">
            {loading
              ? Array(7).fill(null).map((_, i) => (
                  <div key={i} className="db-bar-col">
                    <div className="db-bar-stack"><div className="db-bar-fill" style={{ height: Math.round(Math.random() * 60 + 20) + "%", background: "#e2e8f0" }} /></div>
                    <div className="db-bar-label"><Skeleton w="24px" h="10px" /></div>
                  </div>
                ))
              : (data?.chart ?? []).map((b) => (
                  <div key={b.day} className="db-bar-col">
                    <div className="db-bar-stack">
                      <div className="db-bar-fill" style={{ height: Math.round((b.calls / maxCalls) * 100) + "%", background: "#17A89940" }} />
                      <div className="db-bar-fill db-bar-deal" style={{ height: Math.round((b.deals / maxCalls) * 100) + "%", background: "#22c55e" }} />
                    </div>
                    <div className="db-bar-label">{b.day}</div>
                    <div className="db-bar-val">{b.calls}</div>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Conversion summary */}
        <div className="db-panel">
          <div className="db-panel-header">
            <div className="db-panel-title">Conversion Summary</div>
          </div>
          <div className="db-conv-list">
            {loading
              ? Array(5).fill(null).map((_, i) => (
                  <div key={i} className="db-conv-row">
                    <div className="db-conv-label"><Skeleton w="120px" h="13px" /></div>
                    <div className="db-conv-bar-wrap"><div className="db-conv-bar"><div className="db-conv-fill" style={{ width: "0%", background: "#e2e8f0" }} /></div></div>
                    <div className="db-conv-val"><Skeleton w="35px" h="13px" /></div>
                  </div>
                ))
              : (data?.conversions ?? []).map((r) => (
                  <div key={r.label} className="db-conv-row">
                    <div className="db-conv-label">{r.label}</div>
                    <div className="db-conv-bar-wrap">
                      <div className="db-conv-bar">
                        <div className="db-conv-fill" style={{ width: r.bar + "%", background: r.color }} />
                      </div>
                    </div>
                    <div className="db-conv-val" style={{ color: r.color }}>{r.val}</div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
