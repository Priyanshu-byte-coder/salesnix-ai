"use client";
import { useState, Fragment } from "react";
import DashboardShell from "@/components/DashboardShell";

// ── Demo Data ─────────────────────────────────────────────────────────────────

type Msg = { role: "ai" | "contact"; text: string; time: string };

type CallLog = {
  id: number;
  initials: string;
  contact: string;
  company: string;
  phone: string;
  type: "outbound" | "inbound";
  time: string;
  duration: string;
  status: "completed" | "missed" | "in_progress" | "callback";
  outcome: string;
  outcomeKey: string;
  sentiment: number;
  aiSummary: string;
  transcript: Msg[];
};

const CALLS: CallLog[] = [
  {
    id: 1, initials: "RK", contact: "Rajesh Kumar", company: "Kumar Electronics",
    phone: "+91 98765 43210", type: "outbound", time: "Today, 10:23 AM",
    duration: "4:32", status: "completed", outcome: "Order Placed", outcomeKey: "order",
    sentiment: 92,
    aiSummary: "Customer confirmed order for 50 units Philips 9W LED bulbs (B22) and 20 units Havells 4-way extension cords. Total order value ₹24,500. Delivery requested by Friday. Payment via Razorpay link sent.",
    transcript: [
      { role: "ai",      text: "Namaste Rajesh ji! Main Priya bol rahi hoon, Bajaj Wholesale se. Kya aap 2 minute baat kar sakte hain?", time: "10:23:05" },
      { role: "contact", text: "Haan, bolo.",                                                                                              time: "10:23:12" },
      { role: "ai",      text: "Rajesh ji, pichhle mahine aapne Philips LED ka jo order diya tha, kya woh stock khatam ho gaya? Naya stock aa gaya hai.",  time: "10:23:18" },
      { role: "contact", text: "Haan bhai, khatam hi hone wala hai. Kitne mein de rahe ho 9W wale?",                                        time: "10:23:31" },
      { role: "ai",      text: "50 piece loge toh ₹420 per piece. Last time se ₹15 less hai. Havells extension bhi chahiye?",              time: "10:23:40" },
      { role: "contact", text: "Haan, 20 extension bhi bhejo. Total kitna hoga?",                                                           time: "10:23:55" },
      { role: "ai",      text: "₹24,500 total. Payment link WhatsApp pe bhej rahi hoon. Shukravar tak deliver ho jayega.",                  time: "10:24:08" },
      { role: "contact", text: "Theek hai, link bhejo. Done.",                                                                              time: "10:24:20" },
    ],
  },
  {
    id: 2, initials: "SP", contact: "Sunita Patel", company: "Patel Finance Ltd",
    phone: "+91 65432 10987", type: "outbound", time: "Today, 10:41 AM",
    duration: "2:18", status: "callback", outcome: "Callback Requested", outcomeKey: "callback",
    sentiment: 64,
    aiSummary: "Contact was in a meeting. Requested callback at 4 PM today. AI agent logged the follow-up and scheduled automated reminder. Interest level: high — mentioned budget approval pending.",
    transcript: [
      { role: "ai",      text: "Good morning, Sunita ji! This is Priya from Salesnix. Is this a good time?",    time: "10:41:02" },
      { role: "contact", text: "Actually I'm in a meeting right now.",                                          time: "10:41:10" },
      { role: "ai",      text: "No problem at all! When would be a good time to call back?",                   time: "10:41:15" },
      { role: "contact", text: "Call me at 4 PM. I'm very interested but need budget approval first.",         time: "10:41:24" },
      { role: "ai",      text: "Perfect! I'll call you at 4 PM sharp. I'll also send you our proposal doc on WhatsApp.", time: "10:41:31" },
      { role: "contact", text: "Yes please do that.",                                                          time: "10:41:38" },
    ],
  },
  {
    id: 3, initials: "VS", contact: "Vikram Singh", company: "Singh Retail Chain",
    phone: "+91 54321 09876", type: "outbound", time: "Today, 11:28 AM",
    duration: "6:47", status: "completed", outcome: "Demo Scheduled", outcomeKey: "demo",
    sentiment: 88,
    aiSummary: "Highly engaged conversation. Vikram confirmed interest in full CRM integration. Demo scheduled for Thursday 3 PM with his tech team. Shared product brochure and pricing deck via WhatsApp.",
    transcript: [
      { role: "ai",      text: "Vikram ji, Priya here from Salesnix. You'd enquired last week about automating your sales calls?",        time: "11:28:04" },
      { role: "contact", text: "Yes yes, I was waiting for your call. How does your system work?",                                        time: "11:28:14" },
      { role: "ai",      text: "Our AI agent calls your leads, takes orders, follows up — all on WhatsApp. Integrates with your CRM.",    time: "11:28:28" },
      { role: "contact", text: "Interesting. We have 3 retail stores and 200+ regular wholesalers. Can it handle that volume?",          time: "11:28:45" },
      { role: "ai",      text: "Absolutely — we handle 1000+ calls daily for some clients. Can I arrange a demo with your team?",        time: "11:28:58" },
      { role: "contact", text: "Thursday 3 PM. Bring your tech guy too.",                                                                 time: "11:29:10" },
    ],
  },
  {
    id: 4, initials: "MJ", contact: "Mohit Joshi", company: "Joshi Wholesale",
    phone: "+91 80012 34567", type: "outbound", time: "Today, 12:02 PM",
    duration: "3:54", status: "completed", outcome: "Payment Sent", outcomeKey: "payment",
    sentiment: 79,
    aiSummary: "Existing customer follow-up. Confirmed previous order delivered correctly. Placed repeat order with 10% volume increase. Razorpay payment link sent for ₹2.9L. Expected payment within 24 hours.",
    transcript: [
      { role: "ai",      text: "Mohit bhai, Priya here. Last week ka delivery sahi mili?",                            time: "12:02:05" },
      { role: "contact", text: "Haan, sab sahi aaya. Good service.",                                                  time: "12:02:12" },
      { role: "ai",      text: "Acha! Is baar kuch aur chahiye? Naya stock aaya hai — Crompton fans ka bhi.",         time: "12:02:20" },
      { role: "contact", text: "Same order repeat karo, plus 10 Crompton fans add kar do.",                          time: "12:02:35" },
      { role: "ai",      text: "₹2,90,000 total. Payment link bhej rahi hoon. 48 ghante mein delivery.",             time: "12:02:52" },
      { role: "contact", text: "Theek hai.",                                                                          time: "12:03:01" },
    ],
  },
  {
    id: 5, initials: "DN", contact: "Deepa Nair", company: "Nair Distributors",
    phone: "+91 91234 56789", type: "outbound", time: "Today, 12:45 PM",
    duration: "0:00", status: "missed", outcome: "No Answer", outcomeKey: "missed",
    sentiment: 0,
    aiSummary: "No answer after 3 rings. AI agent automatically scheduled a callback for 2:30 PM and sent a WhatsApp message: 'Hi Deepa ji, tried calling but couldn't reach you. Please reply when convenient.'",
    transcript: [
      { role: "ai", text: "[Call initiated — no answer after 3 rings. Auto-callback scheduled for 2:30 PM. WhatsApp message sent.]", time: "12:45:00" },
    ],
  },
  {
    id: 6, initials: "PS", contact: "Priya Sharma", company: "MedCare Pharma",
    phone: "+91 87654 32109", type: "inbound", time: "Today, 1:14 PM",
    duration: "5:12", status: "completed", outcome: "Interested", outcomeKey: "interested",
    sentiment: 83,
    aiSummary: "Inbound call from existing lead. Enquired about bulk pricing for medical consumables. AI provided pricing and sent detailed quote. Priya asked for credit terms — escalated to human agent for approval.",
    transcript: [
      { role: "contact", text: "Hello, main Priya Sharma bol rahi hoon MedCare se. Bulk price puchna tha.",         time: "13:14:08" },
      { role: "ai",      text: "Priya ji! Aap kitni quantity mein interested hain?",                                  time: "13:14:16" },
      { role: "contact", text: "Monthly 500 units surgical gloves, 200 units syringes, various consumables.",       time: "13:14:28" },
      { role: "ai",      text: "Excellent! At that volume we offer 18% discount. Let me send you the complete quote.", time: "13:14:40" },
      { role: "contact", text: "Do you offer 30-day credit?",                                                        time: "13:14:52" },
      { role: "ai",      text: "For credit terms, let me connect you with our accounts team. They'll call back within 2 hours.", time: "13:15:04" },
      { role: "contact", text: "Okay please do that. Quote WhatsApp pe bhej do.",                                    time: "13:15:18" },
    ],
  },
  {
    id: 7, initials: "AB", contact: "Anita Bose", company: "Bose Enterprises",
    phone: "+91 70098 76543", type: "outbound", time: "Today, 2:31 PM",
    duration: "1:48", status: "completed", outcome: "Not Interested", outcomeKey: "no",
    sentiment: 38,
    aiSummary: "Lead marked as not interested. Currently using a competitor. AI agent politely closed the call and added contact to a 90-day re-engagement sequence. No hard sell attempted.",
    transcript: [
      { role: "ai",      text: "Good afternoon Anita ji! Priya from Salesnix. How are you doing?",         time: "14:31:10" },
      { role: "contact", text: "I'm busy. What is this about?",                                            time: "14:31:18" },
      { role: "ai",      text: "Just wanted to share how we're helping wholesale businesses automate sales on WhatsApp.", time: "14:31:26" },
      { role: "contact", text: "We already have a system. Not interested.",                                time: "14:31:34" },
      { role: "ai",      text: "Completely understood! I'll reach out again in 3 months. Have a great day.", time: "14:31:42" },
    ],
  },
  {
    id: 8, initials: "AM", contact: "Akash Mehta", company: "Mehta Traders",
    phone: "+91 76543 21098", type: "outbound", time: "Today, 3:05 PM",
    duration: "8:23", status: "completed", outcome: "Order Placed", outcomeKey: "order",
    sentiment: 95,
    aiSummary: "Highly successful call. Akash confirmed bulk order for festival season stock. Largest single order of the day — ₹95,000. Enthusiastic about AI agent. Asked for referral discount info. Payment completed.",
    transcript: [
      { role: "ai",      text: "Akash bhai! Diwali stock ke liye kuch socha? Bohot achha collection aaya hai.",       time: "15:05:12" },
      { role: "contact", text: "Haan yaar, soch raha tha. Kya kya hai stock mein?",                                   time: "15:05:22" },
      { role: "ai",      text: "Diyas, lights, decoratives — sab. Festival special pricing bhi hai.",                  time: "15:05:35" },
      { role: "contact", text: "Ek full list bhejo. Aur bulk mein discount milega?",                                   time: "15:05:50" },
      { role: "ai",      text: "₹50K+ order pe 20% extra. Aapke liye toh definitely milega.",                         time: "15:06:05" },
      { role: "contact", text: "Done. ₹95,000 ka order karo. Payment link bhejo.",                                    time: "15:06:20" },
    ],
  },
];

const LOG_KPIS = [
  { label: "Total Calls",    value: "1,247", sub: "All time",    color: "#6366f1" },
  { label: "Completed",      value: "892",   sub: "71.5% rate",  color: "#22c55e" },
  { label: "Missed / N/A",   value: "186",   sub: "14.9% rate",  color: "#ef4444" },
  { label: "Orders Placed",  value: "234",   sub: "Today: 3",    color: "#17A899" },
  { label: "Avg Duration",   value: "3:24",  sub: "Per call",    color: "#f59e0b" },
];

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  completed:   { label: "Completed",  color: "#16a34a", bg: "#f0fdf4" },
  missed:      { label: "No Answer",  color: "#dc2626", bg: "#fef2f2" },
  callback:    { label: "Callback",   color: "#d97706", bg: "#fffbeb" },
  in_progress: { label: "Live",       color: "#2563eb", bg: "#eff6ff" },
};

const OUTCOME_META: Record<string, { color: string; bg: string }> = {
  order:      { color: "#16a34a", bg: "#f0fdf4" },
  callback:   { color: "#d97706", bg: "#fffbeb" },
  demo:       { color: "#2563eb", bg: "#eff6ff" },
  payment:    { color: "#7c3aed", bg: "#f5f3ff" },
  missed:     { color: "#6b7280", bg: "#f9fafb" },
  interested: { color: "#0891b2", bg: "#ecfeff" },
  no:         { color: "#dc2626", bg: "#fef2f2" },
};

function SentimentBadge({ score }: { score: number }) {
  if (score === 0) return <span className="db-sentiment-badge neutral">N/A</span>;
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  const bg    = score >= 80 ? "#f0fdf4"  : score >= 60 ? "#fffbeb"  : "#fef2f2";
  return (
    <div className="db-sentiment-badge-wrap">
      <div className="db-sentiment-mini-bar">
        <div style={{ width: score + "%", background: color, height: "100%", borderRadius: "4px", transition: "width 0.6s ease" }} />
      </div>
      <span style={{ color, fontWeight: 700, fontSize: "0.78rem" }}>{score}%</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LogsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [outcomeFilter, setOutcomeFilter] = useState("all");

  const filtered = CALLS.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.contact.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.phone.includes(q);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchOutcome = outcomeFilter === "all" || c.outcomeKey === outcomeFilter;
    return matchSearch && matchStatus && matchOutcome;
  });

  return (
    <DashboardShell title="Call Logs">
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
        {LOG_KPIS.map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-val" style={{ color: k.color }}>{k.value}</div>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="db-panel db-filter-panel">
        <div className="db-filter-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="db-filter-input"
            placeholder="Search by name, company, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="db-filter-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>
        <div className="db-filter-group">
          <select className="db-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="missed">No Answer</option>
            <option value="callback">Callback</option>
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
          <span className="db-filter-count">{filtered.length} calls</span>
        </div>
      </div>

      {/* Calls Table */}
      <div className="db-panel db-panel--no-pad">
        <div className="db-table-wrap">
          <table className="db-table db-logs-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Outcome</th>
                <th>Sentiment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((call) => {
                const expanded = expandedId === call.id;
                const sm = STATUS_META[call.status];
                const om = OUTCOME_META[call.outcomeKey] || { color: "#6b7280", bg: "#f9fafb" };
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {expanded && (
                      <tr key={`${call.id}-expanded`} className="db-transcript-row">
                        <td colSpan={8}>
                          <div className="db-transcript-panel">
                            {/* AI Summary */}
                            <div className="db-summary-block">
                              <div className="db-summary-label">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                                AI Summary
                              </div>
                              <p className="db-summary-text">{call.aiSummary}</p>
                            </div>

                            {/* Transcript */}
                            <div className="db-transcript-label">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                              Full Transcript
                            </div>
                            <div className="db-transcript-msgs">
                              {call.transcript.map((msg, i) => (
                                <div key={i} className={`db-transcript-msg ${msg.role}`}>
                                  <div className="db-msg-meta">
                                    <span className="db-msg-role" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                      {msg.role === "ai" ? (
                                        <>
                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
                                          AI Agent (Priya)
                                        </>
                                      ) : (
                                        <>
                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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

                            {/* Actions */}
                            <div className="db-transcript-actions">
                              <button className="db-btn-secondary db-btn-sm">Schedule Follow-up</button>
                              <button className="db-btn-secondary db-btn-sm">View Contact</button>
                              <button className="db-btn-primary db-btn-sm">Add to Sequence</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="db-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-muted)", margin: "0 auto 1rem" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>No calls match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination (mock) */}
      <div className="db-pagination">
        <span className="db-pagination-info">Showing {filtered.length} of 1,247 calls</span>
        <div className="db-pagination-btns">
          <button className="db-page-btn" disabled>← Prev</button>
          <button className="db-page-btn active">1</button>
          <button className="db-page-btn">2</button>
          <button className="db-page-btn">3</button>
          <span className="db-page-ellipsis">…</span>
          <button className="db-page-btn">48</button>
          <button className="db-page-btn">Next →</button>
        </div>
      </div>
    </DashboardShell>
  );
}
