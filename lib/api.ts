/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SALESNIX API CLIENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Set NEXT_PUBLIC_API_URL in your .env.local (or Netlify env vars) to point
 *  at your backend.  Example:
 *    NEXT_PUBLIC_API_URL=https://api.salesnix.ai
 *
 *  All endpoints below are relative to that base URL.
 *  Every fetch function returns typed data or throws on non-2xx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`API ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SHARED TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type PipelineStage = {
  stage: string;           // e.g. "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won"
  count: number;           // number of contacts in this stage
  value: string;           // formatted string e.g. "₹28L"  (or send raw number and format client-side)
  pct: number;             // 0-100, width % for the bar (relative to Lead = 100)
  color: string;           // hex color for the bar/dot
};

export type Contact = {
  id: number;
  initials: string;        // e.g. "RK"
  name: string;
  company: string;
  phone: string;
  stage: string;           // key: "lead" | "qualified" | "proposal" | "negotiation" | "closed"
  stageLabel: string;      // display: "Lead" | "Qualified" etc.
  value: string;           // formatted deal value e.g. "₹2.4L"
  last: string;            // relative time e.g. "2h ago"
  messages: number;
  calls: number;
  hot: boolean;
};

export type ActivityItem = {
  type: "call" | "message" | "deal";
  color: string;
  time: string;            // e.g. "10:23 AM"
  text: string;            // human-readable description
  icon: string;            // emoji or icon key — frontend maps this to SVG
};

export type FollowUp = {
  name: string;
  time: string;            // e.g. "Tomorrow 10:00 AM"
  priority: "urgent" | "high" | "medium" | "low";
  stage: string;
};

export type ChartBar = {
  day: string;             // "Mon" | "Tue" etc.
  calls: number;
  deals: number;
};

export type ConversionMetric = {
  label: string;
  val: string;             // formatted e.g. "71%"
  bar: number;             // 0-100 for CSS width
  color: string;
};

// ─────────────────────────────────────────────────────────────────────────────
//  DASHBOARD TYPES & ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export type DashboardKpi = {
  label: string;
  value: string;           // formatted, e.g. "1,247" | "₹68.4L" | "0.8s"
  change: string;          // e.g. "+12%" | "−15%"
  up: boolean;             // true = green, false = red
};

export type DashboardData = {
  kpis: DashboardKpi[];           // exactly 5 items (see order in dashboard page)
  pipeline: PipelineStage[];
  contacts: Contact[];             // last 10 contacts sorted by last interaction
  activity: ActivityItem[];        // last 8 activity events
  followups: FollowUp[];
  chart: ChartBar[];               // last 7 days
  conversions: ConversionMetric[]; // 5 conversion rows
  aiActivity: {
    calls: number;
    messages: number;
    dealsProgressed: number;
    ordersPlaced: number;
    avgSentiment: number;          // 0-100
  };
};

/**
 * GET /api/dashboard
 *
 * Returns all data needed to render the CRM dashboard in one shot.
 * Backend should aggregate from call logs, contacts, and deal pipeline.
 */
export async function getDashboard(): Promise<DashboardData> {
  return get<DashboardData>("/api/dashboard");
}

// ─────────────────────────────────────────────────────────────────────────────
//  CALL LOGS TYPES & ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export type TranscriptMessage = {
  role: "ai" | "contact";
  text: string;
  time: string;            // "HH:MM:SS"
};

export type CallLog = {
  id: number;
  initials: string;
  contact: string;
  company: string;
  phone: string;
  type: "outbound" | "inbound";
  time: string;            // human-readable e.g. "Today, 10:23 AM"
  duration: string;        // "MM:SS" — empty string if missed
  status: "completed" | "missed" | "in_progress" | "callback";
  outcome: string;         // display string e.g. "Order Placed"
  outcomeKey: string;      // key: "order"|"payment"|"demo"|"callback"|"interested"|"no"|"missed"
  sentiment: number;       // 0-100 (0 = n/a / missed call)
  aiSummary: string;
  transcript: TranscriptMessage[];
};

export type LogsStats = {
  total: number;
  completed: number;
  missed: number;
  ordersPlaced: number;
  avgDuration: string;     // "MM:SS"
};

export type LogsResponse = {
  calls: CallLog[];
  stats: LogsStats;
  total: number;           // total count for pagination (unfiltered or filtered)
  page: number;
  pageSize: number;
};

export type LogsFilters = {
  page?: number;
  pageSize?: number;
  search?: string;         // searches contact name, company, phone
  status?: string;         // "all" | "completed" | "missed" | "callback" | "in_progress"
  outcome?: string;        // "all" | "order" | "payment" | "demo" | "callback" | "interested" | "no" | "missed"
};

/**
 * GET /api/logs?page=1&pageSize=20&search=&status=&outcome=
 *
 * Returns paginated call logs + aggregate stats.
 * Stats (totals, avg duration etc.) should reflect ALL calls, not just current page.
 * Transcript array can be empty [] and fetched lazily via GET /api/logs/:id if needed.
 */
export async function getLogs(filters: LogsFilters = {}): Promise<LogsResponse> {
  const params = new URLSearchParams();
  if (filters.page)     params.set("page",     String(filters.page));
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.search)   params.set("search",   filters.search);
  if (filters.status && filters.status !== "all")  params.set("status",  filters.status);
  if (filters.outcome && filters.outcome !== "all") params.set("outcome", filters.outcome);
  const qs = params.toString();
  return get<LogsResponse>(`/api/logs${qs ? `?${qs}` : ""}`);
}

/**
 * GET /api/logs/:id
 *
 * Returns a single call log including the full transcript.
 * Use this if GET /api/logs returns transcript: [] for performance.
 */
export async function getLogById(id: number): Promise<CallLog> {
  return get<CallLog>(`/api/logs/${id}`);
}
