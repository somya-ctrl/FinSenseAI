import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3000/api";

function useMaterialSymbols() {
  useEffect(() => {
    const id = "material-symbols-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block";
    document.head.appendChild(link);
  }, []);
}

const Icon = ({ name, fill = false, className = "" }) => (
  <span
    className={`material-symbols-outlined leading-none select-none ${className}`}
    style={
      fill
        ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
        : { fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    }
  >
    {name}
  </span>
);

const navItems = [
  { icon: "dashboard", label: "Overview", path: "/overview" },
  { icon: "payments", label: "Cash Flow Prediction", path: "/cashflow" },
  { icon: "account_balance", label: "Analyze Transaction", path: "/analyze", active: true },
  { icon: "smart_toy", label: "FinBot", path: "/finbot" },
  { icon: "bar_chart", label: "Reports", path: "/reports" },
  { icon: "settings", label: "Settings", path: "/settings" },
];

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (err) {
        console.error("Sign out error:", err);
      } finally {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/25 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={[
          "h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="mb-10 px-4">
          <h1 className="text-lg font-black text-[#00426d] uppercase tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            FinSense<span className="text-[#006a6a]">Ai</span>
          </h1>
          <p className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mt-0.5">Small Biz Edition</p>
        </div>
        <div className="lg:hidden mb-2">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-200/50 text-slate-500">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, path, active }) => (
            <a
              key={label}
              href={path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active ? "bg-white text-[#00426d] shadow-sm" : "text-slate-500 hover:bg-slate-200/50"
              }`}
            >
              <Icon name={icon} className="text-[20px]" />
              <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-6 space-y-1">
          <a
            href="/new-entry"
            className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
          >
            New Entry
          </a>
          <a href="/help" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg">
            <Icon name="help_outline" className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">Help Center</span>
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-lg text-left"
          >
            <Icon name="logout" className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-4 sm:px-8 py-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <Icon name="menu" className="text-xl" />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-[#005A92]">Aeon Ledger</h1>
        <div className="hidden sm:block h-4 w-px bg-slate-200" />
        <span className="hidden sm:block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em]">
          Transaction Intelligence
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex relative items-center">
          <Icon name="search" className="absolute left-3 text-slate-400 text-[18px]" />
          <input
            className="bg-[#f2f4f6] border border-slate-200 rounded-full py-2 pl-9 pr-4 text-xs w-44 lg:w-56 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search entries..."
            type="text"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors relative">
          <Icon name="notifications" className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#005A92] rounded-full" />
        </button>
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors">
          <Icon name="account_circle" fill className="text-[30px] text-[#005A92]" />
          <span className="hidden sm:block text-[12px] font-bold text-slate-700">DR. FINN</span>
        </button>
      </div>
    </header>
  );
}

// ── Forecast Daily Bar Chart (real data from API) ────────────────────────────
function ForecastBarChart({ daily }) {
  if (!daily || daily.length === 0) return null;
  const maxBalance = Math.max(...daily.map((d) => d.balance));

  return (
    <div className="h-48 w-full flex items-end justify-around gap-3 px-2 py-4 bg-gradient-to-t from-blue-50/40 to-transparent rounded-xl">
      {daily.map((day, idx) => {
        const heightPercent = (day.balance / maxBalance) * 100;
        return (
          <div key={idx} className="flex flex-col items-center justify-end gap-1.5 flex-1 group">
            <div className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-center">
              {formatCompact(day.balance)}
            </div>
            <div
              className="w-full rounded-t-lg transition-all duration-500 relative"
              style={{
                height: `${heightPercent}%`,
                background: "linear-gradient(to top, #005A92, #3b82f6)",
                minHeight: "8px",
              }}
            />
            <span className="text-[10px] font-bold text-slate-500">D{day.day}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Insight severity badge colours ────────────────────────────────────────────
const severityConfig = {
  warning: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", icon: "warning", iconColor: "text-amber-500" },
  info:    { bg: "bg-blue-50 border-blue-200",   text: "text-blue-700",  icon: "info",    iconColor: "text-blue-500"  },
  good:    { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", icon: "check_circle", iconColor: "text-emerald-500" },
  error:   { bg: "bg-red-50 border-red-200",     text: "text-red-700",   icon: "error",   iconColor: "text-red-500"   },
};

function InsightCard({ insight }) {
  const cfg = severityConfig[insight.severity] || severityConfig.info;
  return (
    <div className={`flex gap-3 items-start p-3.5 rounded-xl border ${cfg.bg}`}>
      <Icon name={cfg.icon} fill className={`${cfg.iconColor} text-[18px] flex-shrink-0 mt-0.5`} />
      <p className={`text-xs font-medium leading-relaxed ${cfg.text}`}>{insight.message}</p>
    </div>
  );
}

// ── Keyword chip ──────────────────────────────────────────────────────────────
function KeywordChip({ keyword, weight }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#005A92]/10 text-[#005A92] text-[11px] font-bold rounded-full">
      {keyword}
      {weight !== undefined && (
        <span className="text-[9px] font-normal opacity-70">×{Number(weight).toFixed(2)}</span>
      )}
    </span>
  );
}

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const formatCompact = (value) => {
  const n = Number(value || 0);
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
};

export default function AnalyzeTransaction() {
  useMaterialSymbols();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [forecastDays, setForecastDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    description: "Cloud Infrastructure Monthly",
    amount: "1240.00",
    income: "5000.00",
    expense: "2000.00",
    current_balance: "45230.12",
    user_id: "",
    business_id: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnalyze = async () => {
    if (!form.business_id) {
      setError("Please fill in Business ID to run analysis.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/analyze/single`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_id: form.business_id }),
      });

      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error("Server returned invalid JSON.");
      }

      if (!res.ok) throw new Error(data?.detail || data?.message || "API request failed");

      // ── Map the full nested response ──────────────────────────────────────
      // data.data.analysis is the full ML analysis object
      const analysis = data?.data?.analysis || data?.data || data;
      setResult(analysis);
    } catch (err) {
      console.error("❌ Analyze Transaction Error:", err);
      setError(err.message || "Something went wrong while analyzing transaction.");
    } finally {
      setLoading(false);
    }
  };

  // ── Derived values from the real API shape ────────────────────────────────
  // API returns: result.confidence (not confidence_score)
  const confidence = useMemo(() => {
    if (!result?.confidence) return "—";
    return `${Number(result.confidence).toFixed(1)}%`;
  }, [result]);

  // result.forecast.final_balance vs start_balance = net impact
  const forecastImpact = useMemo(() => {
    if (result?.forecast?.final_balance && result?.forecast?.start_balance) {
      return result.forecast.final_balance - result.forecast.start_balance;
    }
    return -Number(form.amount || 0);
  }, [result, form.amount]);

  const isAnomaly = result?.anomaly?.is_anomaly ?? false;
  const anomalyMsg = result?.anomaly?.explanation || "";
  const insights = result?.insights || [];
  const forecast = result?.forecast || null;
  const explanation = result?.explanation || null;
  const keywords = result?.top_keywords || result?.summary?.top_keywords || [];
  const keywordWeights = explanation?.keyword_weights || {};
  const alternatives = explanation?.alternatives || [];
  const category = result?.category || result?.summary?.category;
  const sentiment = result?.sentiment || (isAnomaly ? "Anomalous" : "Normal");
  const recommendation = result?.summary?.key_insight || result?.recommendation;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
              <section className="w-full lg:w-5/12 space-y-5">
                <header>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e]">
                    Analyze Transaction
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-md">
                    Input transaction metadata to leverage Aeon's predictive modeling for
                    categorization and cash flow forecasting.
                  </p>
                </header>

                <div className="bg-white border border-slate-200/60 p-5 sm:p-6 rounded-2xl space-y-4 shadow-sm">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="description" value={form.description} onChange={handleChange}
                      className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                      type="text" placeholder="e.g. Office Supplies"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Amount ($) <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="amount" value={form.amount} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 transition-all"
                        type="number" placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Current Balance ($)
                      </label>
                      <input
                        name="current_balance" value={form.current_balance} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 transition-all"
                        type="number" placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Income ($)</label>
                      <input
                        name="income" value={form.income} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#006a6a]/20 transition-all"
                        type="number" placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Expense ($)</label>
                      <input
                        name="expense" value={form.expense} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ef4444]/20 transition-all"
                        type="number" placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        User ID
                      </label>
                      <input
                        name="user_id" value={form.user_id} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 transition-all"
                        type="text" placeholder="USR-9921"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Business ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="business_id" value={form.business_id} onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 transition-all"
                        type="text" placeholder="BSN-042"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Forecast Horizon</label>
                      <span className="text-[11px] font-bold text-[#005A92] bg-[#005A92]/10 px-2.5 py-0.5 rounded-full">
                        {forecastDays} DAYS
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#005A92]"
                      max="90" min="7" step="1" type="range" value={forecastDays}
                      onChange={(e) => setForecastDays(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span>7d</span><span>30d</span><span>60d</span><span>90d</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
                    <Icon name="warning" className="text-base mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={[
                    "w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md text-sm",
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#005A92] hover:bg-[#004a78] active:scale-[0.98] shadow-[#005A92]/25",
                  ].join(" ")}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Icon name="analytics" className="text-lg" />
                      Analyze Transaction
                    </>
                  )}
                </button>

                {/* ── Bottom summary cards (local form calc) ──────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Income vs Expense</h5>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="trending_up" className="text-green-600 text-[20px]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {form.income && form.expense
                            ? `${((parseFloat(form.income) / parseFloat(form.expense)) * 100).toFixed(1)}%`
                            : "N/A"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Income to Expense Ratio</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Net Balance Projection</h5>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="account_balance" className="text-blue-600 text-[20px]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {formatCurrency(
                            (parseFloat(form.current_balance) || 0) +
                            (parseFloat(form.income) || 0) -
                            (parseFloat(form.expense) || 0)
                          )}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Projected balance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
              <section className="w-full lg:w-7/12 space-y-5">
                <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">

                  {/* ── Header: Category + Confidence ───────────────────────── */}
                  <div className="p-6 sm:p-8 border-b border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon name="verified" fill className="text-[#006a6a] text-[16px]" />
                          <span className="text-[10px] font-bold text-[#006a6a] uppercase tracking-[0.2em]">
                            {result ? "Prediction Complete" : "Awaiting Input"}
                          </span>
                          {/* Anomaly badge */}
                          {result && (
                            <span className={`ml-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isAnomaly
                                ? "bg-red-100 text-red-600"
                                : "bg-emerald-100 text-emerald-600"
                            }`}>
                              {isAnomaly ? "⚠ Anomaly" : "✓ Normal"}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-extrabold text-[#191c1e]">Analysis Results</h3>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence</p>
                        <div className={`text-3xl font-bold ${result ? "text-[#005A92]" : "text-slate-300"}`}>
                          {confidence}
                        </div>
                        {result && (
                          <div className="mt-1 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#005A92] transition-all duration-700"
                              style={{ width: `${result.confidence || 0}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Category + Sentiment row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#f7f9fb] p-4 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Predicted Category</p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#cfe4ff] flex items-center justify-center flex-shrink-0">
                            <Icon name="label" fill className="text-[#005A92] text-[18px]" />
                          </div>
                          <span className="font-bold text-[#191c1e] text-sm capitalize">
                            {category || <span className="text-slate-400 font-normal">Awaiting analysis</span>}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#f7f9fb] p-4 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Anomaly Status</p>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isAnomaly ? "bg-red-100" : "bg-emerald-100"
                          }`}>
                            <Icon
                              name={isAnomaly ? "warning" : "check_circle"}
                              fill
                              className={`text-[18px] ${isAnomaly ? "text-red-500" : "text-emerald-500"}`}
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#191c1e] text-sm block">
                              {isAnomaly ? "Anomaly Detected" : "Within Normal Range"}
                            </span>
                            {result && (
                              <span className="text-[10px] text-slate-400">
                                Z-score: {result.anomaly?.z_score?.toFixed(2) ?? "—"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Anomaly explanation */}
                    {result && anomalyMsg && (
                      <div className={`mt-4 px-4 py-3 rounded-xl text-xs font-medium ${
                        isAnomaly ? "bg-red-50 text-red-700 border border-red-200" : "bg-slate-50 text-slate-500 border border-slate-100"
                      }`}>
                        {anomalyMsg}
                      </div>
                    )}
                  </div>

                  {/* ── Forecast Impact ──────────────────────────────────────── */}
                  <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
                    <div className="flex flex-wrap justify-between items-end gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {forecast?.days ?? forecastDays}-Day Forecast Impact
                        </p>
                        <h4 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191c1e]">
                          {forecastImpact < 0 ? "−" : "+"}
                          {formatCompact(Math.abs(forecastImpact))}
                          <span className="text-sm font-medium text-slate-400 ml-2">Projected</span>
                        </h4>
                        {forecast && (
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">
                              Start: <strong>{formatCompact(forecast.start_balance)}</strong>
                            </span>
                            <span className="text-slate-300">→</span>
                            <span className="text-xs text-slate-500">
                              End: <strong className="text-[#005A92]">{formatCompact(forecast.final_balance)}</strong>
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              forecast.trend === "growing"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-red-100 text-red-600"
                            }`}>
                              {forecast.trend}
                            </span>
                          </div>
                        )}
                      </div>
                      {forecast?.improvement_pct !== undefined && (
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Improvement</p>
                          <p className="text-2xl font-extrabold text-emerald-500">+{forecast.improvement_pct}%</p>
                        </div>
                      )}
                    </div>

                    {/* Daily forecast bar chart — real API data */}
                    {forecast?.daily && forecast.daily.length > 0 && (
                      <>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Balance Projection</p>
                        <ForecastBarChart daily={forecast.daily} />
                        {/* Daily table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="text-left pb-2">Day</th>
                                <th className="text-right pb-2">Net Cashflow</th>
                                <th className="text-right pb-2">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {forecast.daily.map((day) => (
                                <tr key={day.day} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                  <td className="py-2 font-semibold text-slate-600">Day {day.day}</td>
                                  <td className={`py-2 text-right font-bold ${day.net_cashflow >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                    {day.net_cashflow >= 0 ? "+" : "−"}{formatCompact(Math.abs(day.net_cashflow))}
                                  </td>
                                  <td className="py-2 text-right font-bold text-[#005A92]">
                                    {formatCompact(day.balance)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>

                  {/* ── ML Explanation: Keywords + Alternatives ──────────────── */}
                  {result && (explanation || keywords.length > 0) && (
                    <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
                      <h4 className="text-sm font-bold text-[#191c1e]">Classification Explanation</h4>

                      {explanation?.reasoning_sentence && (
                        <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                          {explanation.reasoning_sentence}
                        </p>
                      )}

                      {/* Top keywords */}
                      {keywords.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Top Keywords</p>
                          <div className="flex flex-wrap gap-2">
                            {keywords.map((kw) => (
                              <KeywordChip key={kw} keyword={kw} weight={keywordWeights[kw]} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Alternative categories */}
                      {alternatives.length > 0 && (
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alternative Categories</p>
                          <div className="space-y-2">
                            {alternatives.map((alt) => (
                              <div key={alt.category} className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-600 capitalize w-20 flex-shrink-0">{alt.category}</span>
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-slate-400"
                                    style={{ width: `${alt.confidence}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 w-10 text-right">{alt.confidence}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Insights ─────────────────────────────────────────────── */}
                  {insights.length > 0 && (
                    <div className="p-6 sm:p-8 border-b border-slate-100 space-y-3">
                      <h4 className="text-sm font-bold text-[#191c1e] flex items-center gap-2">
                        <Icon name="insights" className="text-[18px] text-[#005A92]" />
                        Spending Insights
                      </h4>
                      {insights.map((insight, idx) => (
                        <InsightCard key={idx} insight={insight} />
                      ))}
                    </div>
                  )}

                  {/* ── AI Recommendation (key_insight from summary) ─────────── */}
                  <div className="bg-[#e8f7f7] p-5 sm:p-6 flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon name="auto_awesome" fill className="text-[#006a6a] text-[20px]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#004f4f] uppercase tracking-widest mb-1.5">
                        Key Insight
                      </p>
                      <p className="text-sm text-[#004f4f] font-medium leading-relaxed">
                        {recommendation || "Run an analysis to generate insights for this transaction."}
                      </p>
                      {result?.forecast?.summary && (
                        <p className="text-xs text-[#005a5a] mt-2 opacity-80">{result.forecast.summary}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}