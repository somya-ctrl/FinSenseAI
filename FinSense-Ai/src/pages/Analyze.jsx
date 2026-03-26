import { useMemo, useState, useEffect } from "react";

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "https://finsense-project.onrender.com";

// ── Load Material Symbols font dynamically ────────────────────────────────────
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
  { icon: "dashboard",       label: "Overview",             path: "/overview" },
  { icon: "payments",        label: "Cash Flow Prediction", path: "/cashflow" },
  { icon: "account_balance", label: "Analyze Transaction",  path: "/analyze", active: true },
  { icon: "smart_toy",       label: "FinBot",               path: "/finbot" },
  { icon: "bar_chart",       label: "Reports",              path: "/reports" },
  { icon: "settings",        label: "Settings",             path: "/settings" },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/25 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
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

        {/* Mobile close */}
        <div className="lg:hidden mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200/50 text-slate-500"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, path, active }) => (
            <a
              key={label}
              href={path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-white text-[#00426d] shadow-sm"
                  : "text-slate-500 hover:bg-slate-200/50"
              }`}
            >
              <Icon name={icon} className="text-[20px]" />
              <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
            </a>
          ))}
        </nav>

        {/* Footer CTA + links */}
        <div className="mt-auto pt-6 space-y-1">
          <a
            href="/new-entry"
            className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
          >
            New Entry
          </a>
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
    </>
  );
}

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-4 sm:px-8 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Icon name="menu" className="text-xl" />
        </button>

        <h1 className="text-lg font-bold tracking-tight text-[#005A92]">
          Aeon Ledger
        </h1>

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
          <span className="hidden sm:block text-[12px] font-bold text-slate-700">
            DR. FINN
          </span>
        </button>
      </div>
    </header>
  );
}

function Sparkline({ positive = false }) {
  return (
    <div className="h-24 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={positive ? "#0f766e" : "#005A92"} stopOpacity="0.15" />
            <stop offset="100%" stopColor={positive ? "#0f766e" : "#005A92"} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,82 Q50,78 100,65 T200,42 T300,52 T400,18"
          fill="url(#sparkGrad)"
          stroke="none"
        />
        <path
          d="M0,82 Q50,78 100,65 T200,42 T300,52 T400,18"
          fill="none"
          stroke={positive ? "#0f766e" : "#005A92"}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="400" cy="18" fill={positive ? "#0f766e" : "#005A92"} r="4" />
        <line
          stroke="#e0e3e5"
          strokeDasharray="4 3"
          strokeWidth="1"
          x1="0" x2="400" y1="90" y2="90"
        />
      </svg>
    </div>
  );
}

const formatCurrency = (value) => {
  const num = Number(value || 0);
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
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
    current_balance: "45230.12",
    user_id: "",
    business_id: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          description: form.description,
          amount: parseFloat(form.amount),
          current_balance: form.current_balance ? parseFloat(form.current_balance) : null,
          user_id: form.user_id,
          business_id: form.business_id,
          forecast_days: forecastDays,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || data?.message || "API request failed");
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong while analyzing transaction.");
    } finally {
      setLoading(false);
    }
  };

  const confidence = useMemo(() => {
    if (!result?.confidence_score) return "—";
    return `${Number(result.confidence_score).toFixed(1)}%`;
  }, [result]);

  const forecastImpact = useMemo(() => {
    if (result?.forecast_impact !== undefined && result?.forecast_impact !== null) {
      return Number(result.forecast_impact);
    }
    return -Number(form.amount || 0);
  }, [result, form.amount]);

  const isPositiveImpact = forecastImpact >= 0;

  return (
    <div
      className="min-h-screen bg-[#f7f9fb] text-[#191c1e]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* ── LEFT PANEL ─────────────────────────────────────────── */}
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
                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                      type="text"
                      placeholder="e.g. Office Supplies"
                    />
                  </div>

                  {/* Amount + Balance */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Amount ($) <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                        type="number"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Current Balance ($)
                      </label>
                      <input
                        name="current_balance"
                        value={form.current_balance}
                        onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                        type="number"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* User ID + Business ID */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        User ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                        type="text"
                        placeholder="USR-9921"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                        Business ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="business_id"
                        value={form.business_id}
                        onChange={handleChange}
                        className="w-full bg-[#f7f9fb] border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#005A92]/20 focus:border-[#005A92]/40 transition-all"
                        type="text"
                        placeholder="BSN-042"
                      />
                    </div>
                  </div>

                  {/* Forecast Horizon */}
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Forecast Horizon
                      </label>
                      <span className="text-[11px] font-bold text-[#005A92] bg-[#005A92]/10 px-2.5 py-0.5 rounded-full">
                        {forecastDays} DAYS
                      </span>
                    </div>
                    <input
                      className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#005A92]"
                      max="90"
                      min="7"
                      step="1"
                      type="range"
                      value={forecastDays}
                      onChange={(e) => setForecastDays(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                      <span>7d</span>
                      <span>30d</span>
                      <span>60d</span>
                      <span>90d</span>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
                    <Icon name="warning" className="text-base mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
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
              </section>

              {/* ── RIGHT PANEL ────────────────────────────────────────── */}
              <section className="w-full lg:w-7/12 space-y-5">
                <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">

                  {/* Header row */}
                  <div className="p-6 sm:p-8 border-b border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon name="verified" fill className="text-[#006a6a] text-[16px]" />
                          <span className="text-[10px] font-bold text-[#006a6a] uppercase tracking-[0.2em]">
                            {result ? "Prediction Verified" : "Awaiting Input"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-[#191c1e]">
                          Analysis Results
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          Confidence Score
                        </p>
                        <div className={`text-3xl font-bold ${result ? "text-[#005A92]" : "text-slate-300"}`}>
                          {confidence}
                        </div>
                      </div>
                    </div>

                    {/* Category + Sentiment */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#f7f9fb] p-4 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Predicted Category
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#cfe4ff] flex items-center justify-center flex-shrink-0">
                            <Icon name="cloud" fill className="text-[#005A92] text-[18px]" />
                          </div>
                          <span className="font-bold text-[#191c1e] text-sm leading-snug">
                            {result?.category || (
                              <span className="text-slate-400 font-normal">Awaiting analysis</span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#f7f9fb] p-4 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Sentiment
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#8cf3f3]/40 flex items-center justify-center flex-shrink-0">
                            <Icon name="trending_up" className="text-[#006a6a] text-[18px]" />
                          </div>
                          <span className="font-bold text-[#191c1e] text-sm leading-snug">
                            {result?.sentiment || (
                              <span className="text-slate-400 font-normal">Awaiting analysis</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forecast Impact */}
                  <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
                    <div className="flex flex-wrap justify-between items-end gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {forecastDays}-Day Forecast Impact
                        </p>
                        <h4 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191c1e]">
                          {forecastImpact < 0 ? "−" : "+"}
                          {formatCurrency(Math.abs(forecastImpact))}
                          <span className="text-sm font-medium text-slate-400 ml-2">Projected</span>
                        </h4>
                      </div>
                      <div className="flex gap-1.5 items-end pb-1">
                        <div className="w-2 h-8 bg-[#005A92] rounded-sm" />
                        <div className="w-2 h-12 bg-[#005A92]/40 rounded-sm" />
                        <div className="w-2 h-5 bg-[#005A92]/60 rounded-sm" />
                        <div className="w-2 h-10 bg-[#005A92]/20 rounded-sm" />
                      </div>
                    </div>
                    <Sparkline positive={isPositiveImpact} />
                  </div>

                  {/* AI Recommendation */}
                  <div className="bg-[#e8f7f7] p-5 sm:p-6 flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon name="auto_awesome" fill className="text-[#006a6a] text-[20px]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#004f4f] uppercase tracking-widest mb-1.5">
                        Strategic AI Recommendation
                      </p>
                      <p className="text-sm text-[#004f4f] font-medium leading-relaxed">
                        {result?.recommendation ||
                          "Run an analysis to generate an AI recommendation for this transaction."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                      Market Correlation
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#f2f4f6] border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="show_chart" className="text-slate-400 text-[20px]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {result?.market_correlation || "Tech Index (IXIC)"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {result?.correlation_pct !== undefined
                            ? `${result.correlation_pct}% Correlation`
                            : "No live data yet"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                      User Behavioral Pattern
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#f2f4f6] border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="bar_chart" className="text-slate-400 text-[20px]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {result?.behavior_pattern || "Routine Ops"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Matches historical pattern for {form.user_id || "selected user"}
                        </p>
                      </div>
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