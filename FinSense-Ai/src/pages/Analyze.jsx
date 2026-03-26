import { useMemo, useState } from "react";

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

function Sidebar({ open, onClose }) {
  const NAV_ITEMS = [
    { icon: "dashboard", label: "Overview", path: "/overview" },
    { icon: "payments", label: "Cash Flow Prediction", path: "/cashflow" },
    { icon: "account_balance", label: "Analyze Transaction", path: "/analyze", active: true },
    { icon: "description", label: "FinBot", path: "/finbot" },
    { icon: "bar_chart", label: "Reports", path: "/reports" },
    { icon: "settings", label: "Settings", path: "/settings" },
  ];

  const FOOTER_ITEMS = [
    { icon: "help", label: "Help Center", path: "/help" },
    { icon: "logout", label: "Sign Out", path: "/logout" },
  ];

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
          "fixed left-0 top-0 h-screen w-[300px] z-50",
          "bg-[#f2f4f6] border-r border-slate-200/80",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="h-full flex flex-col px-8 py-6">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-[17px] font-extrabold tracking-tight text-[#005A92] uppercase leading-none">
              FINSENSE AI
            </h1>
            <p className="mt-3 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
              The Precision Ledger
            </p>
          </div>

          {/* Mobile Close */}
          <div className="lg:hidden mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white text-slate-500"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>

          {/* Main Nav */}
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map(({ icon, label, path, active }) => (
              <a
                key={path}
                href={path}
                onClick={onClose}
                className={[
                  "flex items-center gap-4 rounded-2xl px-5 py-5 transition-all duration-200",
                  active
                    ? "bg-white shadow-sm border border-slate-200/70 text-[#005A92]"
                    : "text-slate-500 hover:bg-white/70",
                ].join(" ")}
              >
                <Icon
                  name={icon}
                  className={`text-[30px] ${active ? "text-[#005A92]" : "text-slate-500"}`}
                />
                <span className="text-[13px] font-bold uppercase tracking-[0.14em] leading-snug">
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-auto pt-10">
            <button className="w-full rounded-xl bg-[#005A92] hover:bg-[#004a78] text-white font-extrabold tracking-[0.08em] uppercase py-5 shadow-[0_12px_24px_rgba(0,90,146,0.18)] transition-all">
              New Entry
            </button>

            {/* Footer */}
            <div className="mt-10 flex flex-col gap-3">
              {FOOTER_ITEMS.map(({ icon, label, path }) => (
                <a
                  key={label}
                  href={path}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-slate-500 hover:bg-white/70 transition-all"
                >
                  <Icon name={icon} className="text-[30px]" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.14em]">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-[#f7f9fb]/90 backdrop-blur-md border-b border-slate-100 flex justify-between items-center px-4 sm:px-8 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-white/80 transition-colors"
        >
          <Icon name="menu" className="text-xl" />
        </button>

        <h1 className="text-xl font-bold tracking-tight text-[#005A92]">
          Aeon Ledger
        </h1>

        <div className="hidden sm:block h-5 w-px bg-slate-200" />
        <span className="hidden sm:block text-[11px] font-bold text-slate-400 uppercase tracking-[0.16em]">
          Transaction Intelligence
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative items-center">
          <Icon name="search" className="absolute left-3 text-slate-400 text-[18px]" />
          <input
            className="bg-[#f2f4f6] border-none rounded-full py-2.5 pl-9 pr-4 text-xs w-44 lg:w-64 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search entries..."
            type="text"
          />
        </div>

        <button className="p-2 rounded-full hover:bg-white/60 text-slate-500 transition-colors">
          <Icon name="notifications" className="text-xl" />
        </button>

        <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/60 border border-slate-200/60 transition-colors">
          <Icon name="account_circle" className="text-[32px] text-[#005A92]" />
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
    <div className="h-28 w-full">
      <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path
          d="M0,82 Q50,78 100,65 T200,42 T300,52 T400,18"
          fill="none"
          stroke={positive ? "#0f766e" : "#006a6a"}
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <circle cx="400" cy="18" fill={positive ? "#0f766e" : "#006a6a"} r="4" />
        <line
          stroke="#e0e3e5"
          strokeDasharray="4"
          strokeWidth="1"
          x1="0"
          x2="400"
          y1="88"
          y2="88"
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: form.description,
          amount: parseFloat(form.amount),
          current_balance: form.current_balance
            ? parseFloat(form.current_balance)
            : null,
          user_id: form.user_id,
          business_id: form.business_id,
          forecast_days: forecastDays,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || data?.message || "API request failed");
      }

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
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-[300px] flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* LEFT */}
              <section className="w-full lg:w-5/12 space-y-6">
                <header>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191c1e]">
                    Analyze Transaction
                  </h2>
                  <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-md">
                    Input transaction metadata to leverage Aeon’s predictive modeling for categorization and cash flow forecasting.
                  </p>
                </header>

                <div className="bg-[#f2f4f6] p-5 sm:p-7 rounded-2xl space-y-5 border border-slate-200/40">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm border border-slate-100"
                      type="text"
                      placeholder="e.g. Office Supplies"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        Amount ($) <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm border border-slate-100"
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
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm border border-slate-100"
                        type="number"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block ml-1">
                        User ID <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm border border-slate-100"
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
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 shadow-sm border border-slate-100"
                        type="text"
                        placeholder="BSN-042"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                        Forecast Horizon
                      </label>
                      <span className="text-[11px] font-bold text-[#00426d]">
                        {forecastDays} DAYS
                      </span>
                    </div>

                    <input
                      className="w-full h-1.5 bg-[#d8dde2] rounded-lg appearance-none cursor-pointer accent-[#00426d]"
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

                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
                    <span className="mt-px">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={[
                    "w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg",
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#005A92] hover:bg-[#004a78] active:scale-[0.98] shadow-[#00426d]/20",
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

              {/* RIGHT */}
              <section className="w-full lg:w-7/12 space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-[#00426d]/5 rounded-[2rem] blur-2xl group-hover:bg-[#00426d]/10 transition-colors duration-700" />
                  <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden">

                    <div className="p-6 sm:p-8 border-b border-slate-100">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon name="verified" fill className="text-[#006a6a] text-sm" />
                            <span className="text-[10px] font-bold text-[#006a6a] uppercase tracking-[0.2em]">
                              {result ? "Prediction Verified" : "Awaiting Input"}
                            </span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
                            Analysis Results
                          </h3>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Confidence Score
                          </p>
                          <div className="text-2xl sm:text-3xl font-bold text-[#00426d]">
                            {confidence}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#f7f9fb] p-5 rounded-2xl border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Predicted Category
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#cfe4ff] flex items-center justify-center text-[#00426d] flex-shrink-0">
                              <Icon name="cloud" className="text-sm" />
                            </div>
                            <span className="font-bold text-[#191c1e] text-sm">
                              {result?.category || "Awaiting analysis"}
                            </span>
                          </div>
                        </div>

                        <div className="bg-[#f7f9fb] p-5 rounded-2xl border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                            Sentiment
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#8cf3f3]/40 flex items-center justify-center text-[#006a6a] flex-shrink-0">
                              <Icon name="trending_up" className="text-sm" />
                            </div>
                            <span className="font-bold text-[#191c1e] text-sm">
                              {result?.sentiment || "Awaiting analysis"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex flex-wrap justify-between items-end gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {forecastDays}-Day Forecast Impact
                          </p>
                          <h4 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191c1e] mt-1">
                            {forecastImpact < 0 ? "-" : "+"}
                            {formatCurrency(Math.abs(forecastImpact))}
                            <span className="text-sm font-medium text-slate-400 ml-2">Projected</span>
                          </h4>
                        </div>

                        <div className="flex gap-2 items-end">
                          <div className="w-2 h-8 bg-[#00426d] rounded-full" />
                          <div className="w-2 h-12 bg-[#00426d]/40 rounded-full" />
                          <div className="w-2 h-6 bg-[#00426d]/60 rounded-full" />
                          <div className="w-2 h-10 bg-[#00426d]/20 rounded-full" />
                        </div>
                      </div>

                      <Sparkline positive={isPositiveImpact} />
                    </div>

                    <div className="bg-[#dff6f6] p-5 sm:p-6 flex gap-4">
                      <div className="flex-shrink-0">
                        <Icon name="auto_awesome" fill className="text-[#006a6a]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#004f4f] uppercase tracking-widest mb-1">
                          Strategic AI Recommendation
                        </p>
                        <p className="text-sm text-[#004f4f] font-medium leading-relaxed">
                          {result?.recommendation ||
                            "Run an analysis to generate an AI recommendation for this transaction."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-[#f2f4f6] p-6 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      Market Correlation
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="show_chart" className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {result?.market_correlation || "Tech Index (IXIC)"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {result?.correlation_pct !== undefined
                            ? `${result.correlation_pct}% Correlation`
                            : "No live data yet"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f2f4f6] p-6 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      User Behavioral Pattern
                    </h5>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="bar_chart" className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#191c1e]">
                          {result?.behavior_pattern || "Routine Ops"}
                        </p>
                        <p className="text-xs text-slate-400">
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