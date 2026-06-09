"use client";
import { Fragment, useEffect, useState, useCallback } from "react";
import DashboardShell from "@/components/DashboardShell";
import { getLogs, getLogById, type CallLog, type LogsStats, type LogsFilters } from "@/lib/api";

// ── Status / Outcome maps (UI only) ──────────────────────────────────────────

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  completed:   { label: "Completed",  color: "#16a34a", bg: "#f0fdf4" },
  missed:      { label: "No Answer",  color: "#dc2626", bg: "#fef2f2" },
  callback:    { label: "Callback",   color: "#d97706", bg: "#fffbeb" },
  in_progress: { label: "Live",       color: "#2563eb", bg: "#eff6ff" },
};

const OUTCOME_META: Record<string, { color: string; bg: string }> = {
  order:      { color: "#16a34a", bg: "#f0fdf4" },
  payment:    { color: "#7c3aed", bg: "#f5f3ff" },
  demo:       { color: "#2563eb", bg: "#eff6ff" },
  callback:   { color: "#d97706", bg: "#fffbeb" },
  interested: { color: "#0891b2", bg: "#ecfeff" },
  no:         { color: "#dc2626", bg: "#fef2f2" },
  missed:     { color: "#6b7280", bg: "#f9fafb" },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Skeleton({ w = "100%", h = "1rem" }: { w?: string; h?: string }) {
  return (
    <div style={{ width: w, height: h, background: "#e2e8f0", borderRadius: "6px", animation: "skeletonPulse 1.5s ease-in-out infinite" }} />
  );
}

function SentimentBadge({ score }: { score: number }) {
  if (!score) return <span className="db-sentiment-badge neutral">N/A</span>;
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  return (
    <div className="db-sentiment-badge-wrap">
      <div className="db-sentiment-mini-bar">
        <div style={{ width: score + "%", background: color, height: "100%", borderRadius: "4px" }} />
      </div>
      <span style={{ color, fontWeight: 700, fontSize: "0.78rem" }}>{score}%</span>
    </div>
  );
}

// ── Expanded row — lazy-loads transcript ──────────────────────────────────────

function ExpandedRow({ call: initialCall }: { call: CallLog }) {
  const [call, setCall] = useState(initialCall);
  const [loadingTranscript, setLoadingTranscript] = useState(false);

  useEffect(() => {
    // If transcript not included in list response, fetch it now
    if (!initialCall.transcript || initialCall.transcript.length === 0) {
      setLoadingTranscript(true);
      getLogById(initialCall.id)
        .then(setCall)
        .catch(() => {/* keep initialCall */})
        .finally(() => setLoadingTranscript(false));
    }
  }, [initialCall]);

  return (
    <div className="db-transcript-panel">
      {/* AI Summary */}
      <div className="db-summary-block">
        <div className="db-summary-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          AI Summary
        </div>
        <p className="db-summary-text">{call.aiSummary || "No summary available."}</p>
      </div>

      {/* Transcript */}
      <div className="db-transcript-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Full Transcript
      </div>

      {loadingTranscript ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {Array(4).fill(null).map((_, i) => <Skeleton key={i} w="60%" h="48px" />)}
        </div>
      ) : (
        <div className="db-transcript-msgs">
          {(call.transcript ?? []).length === 0 ? (
            <p style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>Transcript not available for this call.</p>
          ) : call.transcript.map((msg, i) => (
            <div key={i} className={`db-transcript-msg ${msg.role}`}>
              <div className="db-msg-meta">
                <span className="db-msg-role" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {msg.role === "ai" ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
                      AI Agent
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {call.contact}
                    </>
                  )}
                </span>
                <span className="db-msg-time">{msg.time}</span>
              </div>
              <div className="db-msg-text">{msg.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="db-transcript-actions">
        <button className="db-btn-secondary db-btn-sm">Schedule Follow-up</button>
        <button className="db-btn-secondary db-btn-sm">View Contact</button>
        <button className="db-btn-primary db-btn-sm">Add to Sequence</button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export default function LogsPage() {
  const [calls, setCalls]   = useState<CallLog[]>([]);
  const [stats, setStats]   = useState<LogsStats | null>(null);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  const [search,        setSearch]        = useState("");
  const [statusFilter,  setStatusFilter]  = useState("all");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [expandedId,    setExpandedId]    = useState<number | null>(null);

  const fetchLogs = useCallback((filters: LogsFilters) => {
    setLoading(true);
    getLogs(filters)
      .then((res) => {
        setCalls(res.calls);
        setStats(res.stats);
        setTotal(res.total);
        setPage(res.page);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Initial load
  useEffect(() => {
    fetchLogs({ page: 1, pageSize: PAGE_SIZE });
  }, [fetchLogs]);

  // Re-fetch on filter change (debounced via useEffect deps)
  useEffect(() => {
    const t = setTimeout(() => {
      fetchLogs({ page: 1, pageSize: PAGE_SIZE, search, status: statusFilter, outcome: outcomeFilter });
    }, 300);
    return () => clearTimeout(t);
  }, [search, statusFilter, outcomeFilter, fetchLogs]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <DashboardShell title="Call Logs">

      {error && (
        <div className="db-api-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Could not load call logs — {error}
        </div>
      )}

      {/* Header */}
      <div className="db-welcome">
        <div>
          <h1 className="db-page-title">Call Logs</h1>
          <p className="db-page-sub">All AI agent calls — transcripts, outcomes, and sentiment analysis.</p>
        </div>
        <div className="db-welcome-actions">
          <button className="db-btn-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="db-kpi-grid db-kpi-grid--5">
        {[
          { label: "Total Calls",   value: stats?.total,        sub: "All time",           color: "#6366f1" },
          { label: "Completed",     value: stats?.completed,    sub: stats ? `${Math.round((stats.completed / stats.total) * 100)}% rate` : "—", color: "#22c55e" },
          { label: "Missed / N/A",  value: stats?.missed,       sub: stats ? `${Math.round((stats.missed / stats.total) * 100)}% rate` : "—", color: "#ef4444" },
          { label: "Orders Placed", value: stats?.ordersPlaced, sub: "From calls",          color: "#17A899" },
          { label: "Avg Duration",  value: stats?.avgDuration,  sub: "Per call",            color: "#f59e0b" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card">
            {loading || !stats
              ? <><Skeleton w="60px" h="28px" /><Skeleton w="90px" h="13px" /><Skeleton w="55px" h="11px" /></>
              : <>
                  <div className="db-kpi-val" style={{ color: k.color }}>{k.value ?? "—"}</div>
                  <div className="db-kpi-label">{k.label}</div>
                  <div className="db-kpi-sub">{k.sub}</div>
                </>
            }
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="db-panel db-filter-panel">
        <div className="db-filter-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            className="db-filter-input"
            placeholder="Search by name, company, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <button className="db-filter-clear" onClick={() => setSearch("")}>✕</button>}
        </div>
        <div className="db-filter-group">
          <select className="db-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="missed">No Answer</option>
            <option value="callback">Callback</option>
            <option value="in_progress">In Progress</option>
          </select>
          <select className="db-filter-select" value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value)}>
            <option value="all">All Outcomes</option>
            <option value="order">Order Placed</option>
            <option value="payment">Payment Sent</option>
            <option value="demo">Demo Scheduled</option>
            <option value="callback">Callback</option>
            <option value="interested">Interested</option>
            <option value="no">Not Interested</option>
            <option value="missed">No Answer</option>
          </select>
          <span className="db-filter-count">{loading ? "…" : `${total} calls`}</span>
        </div>
      </div>

      {/* Table */}
      <div className="db-panel db-panel--no-pad">
        <div className="db-table-wrap">
          <table className="db-table db-logs-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Type</th>
                <th>Date &amp; Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Outcome</th>
                <th>Sentiment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(8).fill(null).map((_, i) => (
                    <tr key={i} className="db-table-row">
                      <td><div className="db-contact-cell"><Skeleton w="34px" h="34px" /><div style={{ display:"flex", flexDirection:"column", gap:"4px" }}><Skeleton w="100px" h="13px" /><Skeleton w="80px" h="11px" /></div></div></td>
                      <td><Skeleton w="44px" h="20px" /></td>
                      <td><Skeleton w="110px" h="13px" /></td>
                      <td><Skeleton w="36px" h="13px" /></td>
                      <td><Skeleton w="70px" h="20px" /></td>
                      <td><Skeleton w="80px" h="20px" /></td>
                      <td><Skeleton w="70px" h="13px" /></td>
                      <td><Skeleton w="20px" h="20px" /></td>
                    </tr>
                  ))
                : calls.map((call) => {
                    const expanded = expandedId === call.id;
                    const sm = STATUS_META[call.status] ?? { label: call.status, color: "#6b7280", bg: "#f9fafb" };
                    const om = OUTCOME_META[call.outcomeKey] ?? { color: "#6b7280", bg: "#f9fafb" };
                    return (
                      <Fragment key={call.id}>
                        <tr
                          className={`db-table-row db-log-row${expanded ? " db-log-row--expanded" : ""}`}
                          onClick={() => setExpandedId(expanded ? null : call.id)}
                        >
                          <td>
                            <div className="db-contact-cell">
                              <div className="db-contact-avatar" style={{ background: "#17A89920", color: "#17A899" }}>
                                {call.initials}
                              </div>
                              <div>
                                <div className="db-contact-name">{call.contact}</div>
                                <div className="db-contact-company">{call.company}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`db-call-type ${call.type}`}>
                              {call.type === "outbound" ? "↗ Out" : "↙ In"}
                            </span>
                          </td>
                          <td className="db-td-muted">{call.time}</td>
                          <td className="db-td-value">{call.duration || "—"}</td>
                          <td>
                            <span className="db-status-pill" style={{ background: sm.bg, color: sm.color }}>
                              {call.status === "in_progress" && <span className="db-live-dot-sm" />}
                              {sm.label}
                            </span>
                          </td>
                          <td>
                            <span className="db-outcome-pill" style={{ background: om.bg, color: om.color }}>
                              {call.outcome}
                            </span>
                          </td>
                          <td><SentimentBadge score={call.sentiment} /></td>
                          <td>
                            <button className={`db-expand-btn${expanded ? " open" : ""}`} aria-label="Expand">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                            </button>
                          </td>
                        </tr>
                        {expanded && (
                          <tr className="db-transcript-row">
                            <td colSpan={8}>
                              <ExpandedRow call={call} />
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })
              }
            </tbody>
          </table>

          {!loading && calls.length === 0 && (
            <div className="db-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>No calls match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="db-pagination">
          <span className="db-pagination-info">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} calls
          </span>
          <div className="db-pagination-btns">
            <button className="db-page-btn" disabled={page <= 1} onClick={() => fetchLogs({ page: page - 1, pageSize: PAGE_SIZE, search, status: statusFilter, outcome: outcomeFilter })}>← Prev</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`db-page-btn${p === page ? " active" : ""}`} onClick={() => fetchLogs({ page: p, pageSize: PAGE_SIZE, search, status: statusFilter, outcome: outcomeFilter })}>{p}</button>
            ))}
            {totalPages > 5 && <span className="db-page-ellipsis">…</span>}
            {totalPages > 5 && (
              <button className={`db-page-btn${totalPages === page ? " active" : ""}`} onClick={() => fetchLogs({ page: totalPages, pageSize: PAGE_SIZE, search, status: statusFilter, outcome: outcomeFilter })}>{totalPages}</button>
            )}
            <button className="db-page-btn" disabled={page >= totalPages} onClick={() => fetchLogs({ page: page + 1, pageSize: PAGE_SIZE, search, status: statusFilter, outcome: outcomeFilter })}>Next →</button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
