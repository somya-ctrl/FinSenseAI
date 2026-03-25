import { useState } from "react";

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "https://finsense-project.onrender.com";

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

const NAV_ITEMS = [
  { icon: "dashboard",    label: "Dashboard",            path: "/dashboard" },
  { icon: "query_stats",  label: "Analyze Transaction",  path: "/analyze",  active: true },
  { icon: "layers",       label: "Batch Analyze",        path: "/batch" },
  { icon: "insert_chart", label: "Business Summary",     path: "/summary" },
];

const BOTTOM_NAV = [
  { icon: "settings",        label: "Settings" },
  { icon: "contact_support", label: "Support"   },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={[
          "fixed left-0 top-0 h-screen w-64 flex flex-col z-50",
          "bg-[#f2f4f6] shadow-[2px_0_24px_rgba(0,0,0,0.07)]",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex flex-col h-full p-6 gap-2">
          {/* Logo */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div
                className="text-base font-extrabold text-[#005A92] uppercase tracking-widest"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                FinSense AI
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5">
                The Precision Ledger
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-700 mt-0.5"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>

          {/* Main nav */}
          <nav className="flex-1 flex flex-col gap-1">
            {NAV_ITEMS.map(({ icon, label, path, active }) => (
              <a
                key={path}
                href={path}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left",
                  "transition-all duration-200 group",
                  active
                    ? "bg-white text-[#005A92] shadow-sm translate-x-1 font-semibold"
                    : "text-slate-600 hover:bg-white/80",
                ].join(" ")}
              >
                <Icon
                  name={icon}
                  fill={!!active}
                  className={[
                    "text-xl",
                    active ? "text-[#005A92]" : "group-hover:text-[#005A92]",
                  ].join(" ")}
                />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* Bottom nav */}
          <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-1">
            {BOTTOM_NAV.map(({ icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white/80 rounded-lg w-full text-left group transition-all"
              >
                <Icon name={icon} className="text-xl group-hover:text-[#005A92]" />
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f9fb] border-b border-slate-100 flex justify-between items-center px-4 sm:px-8 py-3.5">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-white/80 transition-colors"
        >
          <Icon name="menu" className="text-xl" />
        </button>
        <h1
          className="text-lg font-bold tracking-tighter text-[#005A92]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Aeon Ledger
        </h1>
        <div className="hidden sm:block h-4 w-px bg-slate-200" />
        <span
          className="hidden sm:block text-[11px] font-semibold text-slate-400 uppercase tracking-widest"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Transaction Intelligence
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex relative items-center">
          <Icon name="search" className="absolute left-3 text-slate-400 text-[18px]" />
          <input
            className="bg-[#f2f4f6] border-none rounded-full py-2 pl-9 pr-4 text-xs w-44 lg:w-56 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search entries..."
            type="text"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-white/60 text-slate-500 transition-colors">
          <Icon name="notifications" className="text-xl" />
        </button>
        <button className="flex items-center gap-1.5 p-1 pr-2 sm:pr-3 rounded-full hover:bg-white/60 border border-slate-200/60 transition-colors">
          <Icon name="account_circle" className="text-[30px] text-[#005A92]" />
          <span
            className="hidden sm:block text-[11px] font-bold text-slate-700"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            DR. FINN
          </span>
        </button>
      </div>
    </header>
  );
}

function Sparkline() {
  return (
    <div className="h-28 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path
          d="M0,80 Q50,75 100,60 T200,40 T300,50 T400,20"
          fill="none"
          stroke="#006a6a"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <circle cx="400" cy="20" fill="#006a6a" r="4" />
        <line
          stroke="#e0e3e5"
          strokeDasharray="4"
          strokeWidth="1"
          x1="0" x2="400" y1="88" y2="88"
        />
      </svg>
    </div>
  );
}

export default function AnalyzeTransaction() {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [forecastDays, setForecastDays] = useState(30);
  const [loading, setLoading]           = useState(false);
  const [result, setResult]             = useState(null);
  const [error, setError]               = useState("");
  const [form, setForm] = useState({
    description:     "Cloud Infrastructure Monthly",
    amount:          "1240.00",
    current_balance: "45230.12",
    user_id:         "",
    business_id:     "",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async () => {
    if (!form.description || !form.amount || !form.user_id || !form.business_id) {
      setError("Please fill in Description, Amount, User ID and Business ID.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/analyze-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description:     form.description,
          amount:          parseFloat(form.amount),
          user_id:         form.user_id,
          business_id:     form.business_id,
          current_balance: form.current_balance ? parseFloat(form.current_balance) : null,
          forecast_days:   forecastDays,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "API returned an error");
      setResult(data);
    } catch (err) {
      setError(err.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const formattedAmount = form.amount
    ? `$${parseFloat(form.amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    : "$0.00";

  return (
    <div
      className="min-h-screen bg-[#f7f9fb] text-[#191c1e]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content wrapper — offset on lg+ */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

              {/* ── LEFT: Form ── */}
              <section className="w-full lg:w-5/12 space-y-6">
                <header>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Analyze Transaction
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-md">
                    Input transaction metadata to leverage Aeon's predictive modeling for
                    categorization and cash flow forecasting.
                  </p>
                </header>

                <div className="bg-[#f2f4f6] p-5 sm:p-7 rounded-xl space-y-5">
                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-white border-none rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm placeholder:text-slate-300 transition-all"
                      type="text"
                      placeholder="e.g. Office Supplies"
                    />
                  </div>

                  {/* Amount + Balance */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        Amount ($) <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
                        type="number"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        Balance ($)
                      </label>
                      <input
                        name="current_balance"
                        value={form.current_balance}
                        onChange={handleChange}
                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm transition-all"
                        type="number"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* User ID + Business ID */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        User ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm placeholder:text-slate-300 transition-all"
                        type="text"
                        placeholder="USR-9921"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        Business ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="business_id"
                        value={form.business_id}
                        onChange={handleChange}
                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm placeholder:text-slate-300 transition-all"
                        type="text"
                        placeholder="BSN-042"
                      />
                    </div>
                  </div>

                  {/* Forecast slider */}
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                        Forecast Horizon
                      </label>
                      <span
                        className="text-[11px] font-bold text-[#00426d]"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {forecastDays} DAYS
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-[#e0e3e5] rounded-lg appearance-none cursor-pointer accent-[#00426d]"
                      max="90"
                      min="7"
                      step="1"
                      type="range"
                      value={forecastDays}
                      onChange={(e) => setForecastDays(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-tighter px-0.5">
                      <span>7d</span>
                      <span>30d</span>
                      <span>60d</span>
                      <span>90d</span>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                    <span className="mt-px flex-shrink-0">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={[
                    "w-full text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2",
                    "transition-all duration-200 shadow-lg",
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-[#00426d] to-[#005a92] hover:scale-[1.01] active:scale-[0.98] shadow-[#00426d]/20",
                  ].join(" ")}
                  style={{ fontFamily: "Manrope, sans-serif" }}
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
              </section>

              {/* ── RIGHT: Results ── */}
              <section className="w-full lg:w-7/12 space-y-6">

                {/* Main result card */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#00426d]/5 rounded-[2rem] blur-2xl group-hover:bg-[#00426d]/10 transition-colors duration-700" />
                  <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl overflow-hidden">

                    {/* Card top */}
                    <div className="p-6 sm:p-8 border-b border-slate-100">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="verified" fill className="text-[#006a6a] text-sm" />
                            <span className="text-[10px] font-bold text-[#006a6a] uppercase tracking-[0.2em]">
                              {result ? "Prediction Verified" : "Awaiting Input"}
                            </span>
                          </div>
                          <h3
                            className="text-xl sm:text-2xl font-extrabold text-[#191c1e]"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            Analysis Results
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Confidence Score
                          </p>
                          <div
                            className="text-xl sm:text-2xl font-bold text-[#00426d]"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {result ? "98.4%" : "—"}
                          </div>
                        </div>
                      </div>

                      {/* Bento stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#f7f9fb] p-5 rounded-xl border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Predicted Category
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#cfe4ff] flex items-center justify-center text-[#00426d] flex-shrink-0">
                              <Icon name="cloud" className="text-sm" />
                            </div>
                            <span
                              className="font-bold text-[#191c1e] text-sm"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              {result?.category || "SaaS & Infrastructure"}
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#f7f9fb] p-5 rounded-xl border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Sentiment
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8cf3f3]/40 flex items-center justify-center text-[#006a6a] flex-shrink-0">
                              <Icon name="trending_up" className="text-sm" />
                            </div>
                            <span
                              className="font-bold text-[#191c1e] text-sm"
                              style={{ fontFamily: "Manrope, sans-serif" }}
                            >
                              {result?.sentiment || "Neutral / Planned"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visualization */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex flex-wrap justify-between items-end gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {forecastDays}-Day Forecast Impact
                          </p>
                          <h4
                            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] mt-1"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            -{formattedAmount}{" "}
                            <span className="text-sm font-medium text-slate-400">Projected</span>
                          </h4>
                        </div>
                        <div className="flex gap-2 items-end">
                          <div className="w-2 h-8  bg-[#00426d]      rounded-full" />
                          <div className="w-2 h-12 bg-[#00426d]/40   rounded-full" />
                          <div className="w-2 h-6  bg-[#00426d]/60   rounded-full" />
                          <div className="w-2 h-10 bg-[#00426d]/20   rounded-full" />
                        </div>
                      </div>
                      <Sparkline />
                    </div>

                    {/* AI recommendation */}
                    <div className="bg-[#8cf3f3]/20 p-5 sm:p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon name="auto_awesome" fill className="text-[#006a6a]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#004f4f] uppercase tracking-widest mb-1">
                          Strategic AI Recommendation
                        </p>
                        <p className="text-sm text-[#004f4f] font-medium leading-relaxed">
                          {result?.recommendation ? (
                            result.recommendation
                          ) : (
                            <>
                              This expenditure is recurring. Consider migrating to a reserved
                              instance contract to save approximately{" "}
                              <span className="font-bold">12% ($148.80/mo)</span> over the next
                              forecast horizon.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary data grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[#f2f4f6] p-6 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      Market Correlation
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="show_chart" className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]" style={{ fontFamily: "Manrope, sans-serif" }}>
                          Tech Index (IXIC)
                        </p>
                        <p className="text-xs text-slate-400">+1.2% Correlation</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f2f4f6] p-6 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      User Behavioral Pattern
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="bar_chart" className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]" style={{ fontFamily: "Manrope, sans-serif" }}>
                          Routine Ops
                        </p>
                        <p className="text-xs text-slate-400">
                          Matches 94% of {form.user_id || "USR-9921"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}