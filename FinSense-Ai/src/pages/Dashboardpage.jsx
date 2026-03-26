import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = "http://localhost:3000/api";

// ── Fonts & Icons ─────────────────────────────────────────────────────────────
const Icon = ({ name, className = "", filled = false }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

// ── Sidebar ───────────────────────────────────────────────────────────────────
const navItems = [
  { icon: "dashboard",        label: "Overview",             path: "/dashboard", active: true },
  { icon: "payments",         label: "Cash Flow Prediction", path: "/cash-flow" },
  { icon: "account_balance",  label: "Analyze Transaction",  path: "/analyze" },
  { icon: "description",      label: "FinBot",               path: "/finbot" },
  { icon: "bar_chart",        label: "Reports",              path: "/reports" },
  { icon: "settings",         label: "Settings",             path: "/settings"},
];

function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40">
      <div className="mb-10 px-4">
        <h1
          className="text-lg font-black text-[#00426d] uppercase tracking-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          FinSense<span className="text-[#006a6a]">Ai</span>
        </h1>
        <p className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mt-0.5">
          Small Biz Edition
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ icon, label, path, active }) => (
          <Link
            key={label}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              active
                ? "bg-white text-[#00426d] shadow-sm"
                : "text-slate-500 hover:bg-slate-200/50"
            }`}
          >
            <Icon name={icon} className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <Link
          to="/new-entry"
          className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
        >
          New Entry
        </Link>
        {[
          { icon: "help_outline", label: "Help Center" },
          { icon: "logout",       label: "Sign Out" },
        ].map(({ icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg"
          >
            <Icon name={icon} className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ── Business ID Input Bar ─────────────────────────────────────────────────────
function BusinessIdInput({ onFetch, loading }) {
  const [businessId, setBusinessId] = useState("");

  const handleFetch = () => {
    if (!businessId.trim()) return;
    onFetch(businessId.trim().toUpperCase());
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex-1 max-w-sm">
        <span className="text-[#717881] text-sm font-bold uppercase tracking-wider">BIZ ID</span>
        <div className="w-px h-5 bg-gray-200" />
        <input
          type="text"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleFetch()}
          placeholder="e.g. BIZ_001"
          className="flex-1 bg-transparent border-none outline-none text-[#00426d] font-bold placeholder:text-gray-300 text-sm"
        />
      </div>
      <button
        onClick={handleFetch}
        disabled={!businessId.trim() || loading}
        className="px-6 py-3 bg-[#00426d] text-white font-bold text-sm rounded-xl hover:bg-[#005a92] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading...
          </>
        ) : (
          "Fetch Data"
        )}
      </button>
    </div>
  );
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ bars, activeColor, inactiveColor }) {
  return (
    <div className="mt-8 h-12 flex items-end gap-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? activeColor : inactiveColor}`}
          style={{ height: `${h}%`, opacity: 0.2 + i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, trend, trendUp, trendColor, bg, sparkBars, activeColor, inactiveColor }) {
  return (
    <div className={`${bg} p-8 rounded-xl`} style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-400 mb-4">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-extrabold text-[#00426d]" style={{ fontFamily: "Manrope, sans-serif" }}>
          {value}
        </span>
        <span className={`${trendColor} text-sm font-bold flex items-center gap-0.5`}>
          <Icon name={trendUp ? "trending_up" : "trending_down"} className="text-sm" />
          {trend}
        </span>
      </div>
      <Sparkline bars={sparkBars} activeColor={activeColor} inactiveColor={inactiveColor} />
    </div>
  );
}

// ── Cash Flow Chart ───────────────────────────────────────────────────────────
const chartBars = [
  { month: "Jul", h: 40, predicted: false },
  { month: "Aug", h: 55, predicted: false },
  { month: "Sep", h: 75, predicted: false, highlight: true },
  { month: "Oct", h: 85, predicted: true },
  { month: "Nov", h: 92, predicted: true },
  { month: "Dec", h: 80, predicted: true },
];

function CashFlowChart() {
  return (
    <div className="col-span-2 bg-white p-8 rounded-xl" style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-[#191c1e]" style={{ fontFamily: "Manrope, sans-serif" }}>
            Cash Flow Projection
          </h3>
          <p className="text-xs text-slate-400">Expected liquidity for the next 6 months</p>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00426d]">
            <span className="w-2 h-2 rounded-full bg-[#00426d] inline-block" /> Actual
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" /> Forecast
          </span>
        </div>
      </div>
      <div className="h-64 relative flex items-end justify-between px-4 pb-8">
        {chartBars.map(({ month, h, predicted, highlight }) => (
          <div key={month} className="relative w-12">
            <div
              className={`w-full rounded-t-lg ${
                highlight
                  ? "bg-[#00426d]"
                  : predicted
                  ? "bg-slate-100 border-t-2 border-dashed border-[#00426d]/40"
                  : "bg-[#9acbff]/50"
              }`}
              style={{ height: `${h}%` }}
            />
            <span
              className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase ${
                highlight ? "text-[#00426d]" : "text-slate-400"
              }`}
            >
              {month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AI Insights ───────────────────────────────────────────────────────────────
function AIInsights({ summaryText, recommendation, financialHealth, profitMargin, anomalies }) {
  const healthColor =
    financialHealth === "good"
      ? "text-green-600"
      : financialHealth === "average"
      ? "text-yellow-600"
      : "text-red-500";

  return (
    <div className="bg-[#8cf3f3]/30 backdrop-blur-xl p-8 rounded-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="insights" className="text-[#006a6a]" filled />
        <h3 className="font-bold text-[#007070] tracking-tight">Priority Insights</h3>
      </div>
      <ul className="space-y-6">
        <li className="flex gap-4">
          <span className="w-1 h-12 bg-red-500 rounded-full block flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#191c1e]">Business Summary</p>
            <p className="text-xs text-slate-500 mt-1">
              {summaryText || `Profit Margin: ${profitMargin ?? "—"}%`}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="w-1 h-12 bg-[#006a6a] rounded-full block flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#191c1e]">Financial Health</p>
            <p className={`text-xs mt-1 font-semibold capitalize ${healthColor}`}>
              {financialHealth || (profitMargin > 0 ? "✅ Profitable" : "⚠️ Running at a loss")}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="w-1 h-12 bg-yellow-500 rounded-full block flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#191c1e]">Recommendation</p>
            <p className="text-xs text-slate-500 mt-1">
              {recommendation || "No recommendation available."}
            </p>
          </div>
        </li>
        {anomalies?.length > 0 && (
          <li className="flex gap-4">
            <span className="w-1 h-12 bg-orange-400 rounded-full block flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#191c1e]">Anomalies Detected</p>
              <p className="text-xs text-slate-500 mt-1">
                {anomalies.length} unusual transaction(s) flagged by AI
              </p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

// ── Category Breakdown ────────────────────────────────────────────────────────
function CategoryBreakdown({ categoryBreakdown, totalExpense }) {
  if (!categoryBreakdown) return null;
  return (
    <div className="bg-white p-8 rounded-xl" style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <h3 className="text-sm font-bold text-[#00426d] mb-6">Expense Category Breakdown</h3>
      <div className="space-y-4">
        {Object.entries(categoryBreakdown).map(([cat, amt]) => {
          const pct = Math.round((amt / totalExpense) * 100);
          return (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#414750] capitalize">{cat}</span>
                <span className="font-bold text-[#00426d]">₹{amt.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00426d] rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Recent Activity ───────────────────────────────────────────────────────────
function RecentActivity({ totalTransactions, anomalyCount }) {
  return (
    <div className="bg-white p-8 rounded-xl" style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <h3 className="text-lg font-bold text-[#191c1e] mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
        Recent Activity
      </h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#191c1e]">Total Transactions</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Imported from overview API
            </p>
          </div>
          <span className="text-lg font-bold text-[#00426d]">{totalTransactions ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-sm font-bold text-[#191c1e]">Total Anomalies</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Detected by AI
            </p>
          </div>
          <span className="text-lg font-bold text-[#00426d]">{anomalyCount ?? 0}</span>
        </div>
      </div>
      <button className="w-full mt-8 py-3 border border-slate-200 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:bg-slate-50 transition-colors rounded-lg">
        Go to Ledger
      </button>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 bg-[#e6e8ea] rounded-2xl flex items-center justify-center mb-4">
        <span className="text-3xl">🏢</span>
      </div>
      <p className="text-[#00426d] font-bold text-lg">Enter your Business ID</p>
      <p className="text-[#717881] text-sm mt-1">Type your Business ID above and click Fetch Data</p>
    </div>
  );
}

// ── Dashboard Page (Main Export) ──────────────────────────────────────────────
export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchedId, setFetchedId] = useState("");

  const handleFetch = async (id) => {
    setLoading(true);
    setError("");
    setSummary(null);
    setFetchedId(id);
    try {
      const res = await axios.get(`${API_BASE_URL}/overview/summary/${id}`);
      setSummary(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Business ID not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <Sidebar />

      <main className="ml-64 flex-1 p-12 min-h-screen">
        {/* ── Header ── */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-slate-400 mb-2 block">
              Executive Summary
            </span>
            <h2 className="text-4xl font-extrabold text-[#191c1e] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
              Business Overview
            </h2>
          </div>
          {summary && (
            <div className="bg-slate-50 px-6 py-3 flex items-center gap-3 rounded-xl border-l-4 border-[#006a6a]">
              <Icon name="auto_awesome" className="text-[#006a6a]" filled />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">AI Financial Advisor</p>
                <p className="text-sm font-semibold text-[#191c1e]">
                  {summary?.recommendation || "Cash flow looks optimal for Q4 reinvestment."}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* ── Business ID Input ── */}
        <BusinessIdInput onFetch={handleFetch} loading={loading} />

        {/* ── Error ── */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-bold">
            ⚠️ {error}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center h-48 text-slate-400 font-bold text-sm uppercase tracking-widest">
            Loading dashboard for {fetchedId}...
          </div>
        )}

        {/* ── Dashboard ── */}
        {summary && !loading && (
          <>
            <div className="grid grid-cols-12 gap-8">
              {/* Left: Stats + Chart */}
              <section className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-8">
                <StatCard
                  label="Total Revenue (MTD)"
                  value={formatCurrency(summary.total_income)}
                  trend={`${Math.abs(summary.savings_rate_pct || 0)}%`}
                  trendUp={(summary.savings_rate_pct || 0) >= 0}
                  trendColor={(summary.savings_rate_pct || 0) >= 0 ? "text-[#006a6a]" : "text-red-500"}
                  bg="bg-white"
                  sparkBars={[40, 60, 50, 80, 70, 100]}
                  activeColor="bg-[#00426d]"
                  inactiveColor="bg-[#9acbff]"
                />
                <StatCard
                  label="Total Expenses (MTD)"
                  value={formatCurrency(summary.total_expense)}
                  trend={`${Math.abs(summary.savings_rate_pct || 0)}%`}
                  trendUp={(summary.savings_rate_pct || 0) < 0}
                  trendColor={(summary.savings_rate_pct || 0) < 0 ? "text-red-500" : "text-[#006a6a]"}
                  bg="bg-slate-50"
                  sparkBars={[30, 45, 35, 20, 55, 65]}
                  activeColor="bg-slate-500"
                  inactiveColor="bg-slate-300"
                />
                <CashFlowChart />
                <CategoryBreakdown
                  categoryBreakdown={summary.category_breakdown}
                  totalExpense={summary.total_expense}
                />
              </section>

              {/* Right: Insights + Activity */}
              <aside className="col-span-12 lg:col-span-4 space-y-8">
                <AIInsights
                  summaryText={summary.summary}
                  recommendation={summary.recommendation}
                  financialHealth={summary.financial_health}
                  profitMargin={summary.profit_margin}
                  anomalies={summary.anomalies}
                />
                <RecentActivity
                  totalTransactions={summary.total_transactions}
                  anomalyCount={summary.anomalies?.length}
                />
              </aside>
            </div>

            {/* ── Footer ── */}
            <footer className="mt-20 border-t border-slate-200/50 pt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <div className="flex gap-12">
                <span>
                  Net Balance:
                  <span className={`ml-2 ${(summary.net_balance ?? 0) >= 0 ? "text-[#006a6a]" : "text-red-500"}`}>
                    {formatCurrency(summary.net_balance)}
                  </span>
                </span>
                <span>
                  Savings Rate:
                  <span className={`ml-2 ${(summary.savings_rate_pct ?? 0) >= 0 ? "text-[#006a6a]" : "text-red-500"}`}>
                    {summary.savings_rate_pct}%
                  </span>
                </span>
                <span>
                  Financial Health:
                  <span className="text-[#191c1e] ml-2 capitalize">{summary.financial_health}</span>
                </span>
              </div>
              <div>© 2024 FinSenseAi. All rights reserved.</div>
            </footer>
          </>
        )}

        {/* ── Empty State ── */}
        {!summary && !loading && !error && <EmptyState />}
      </main>

      {/* FAB */}
      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-[#00426d] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
          <Icon name="add" filled />
        </button>
      </div>
    </div>
  );
}