import { useState } from "react";

const NAV_ITEMS = [
  { icon: "account_balance_wallet", label: "Cash Flow" },
  { icon: "receipt_long", label: "Ledger" },
  { icon: "timeline", label: "Predictions", active: true },
  { icon: "lightbulb", label: "Insights" },
  { icon: "credit_card", label: "Accounts" },
];

const SCENARIOS = [
  {
    title: "New Logistics Hub",
    enabled: true,
    desc: "-$250k CapEx in Q3. Predicts 15% efficiency gain by year end.",
  },
  {
    title: "Q4 Seasonality Spike",
    enabled: false,
    desc: "Apply historical 20% revenue lift to predicted Q4 baseline.",
  },
  {
    title: "Loan Amortization",
    enabled: true,
    desc: "Include scheduled $12k monthly debt service payments.",
  },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function Toggle({ enabled }) {
  return (
    <div
      className={`w-10 h-5 rounded-full relative flex items-center px-1 transition-colors ${
        enabled ? "bg-[#005a92]" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-3.5 h-3.5 bg-white rounded-full shadow transition-transform ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </div>
  );
}

function Icon({ name, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontFamily: "'Material Symbols Outlined'" }}
    >
      {name}
    </span>
  );
}

function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-[#f2f4f6] flex flex-col py-6">
      {/* Logo */}
      <div className="px-8 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00426d] rounded-lg flex items-center justify-center">
            <Icon name="architecture" className="text-white text-sm" />
          </div>
          <div>
            <h1 className="font-extrabold text-[#191c1e] text-lg tracking-tighter" style={{ fontFamily: "Manrope" }}>
              FinSense<span className="text-[#006a6a]">Ai</span>
            </h1>
            <p className="font-medium uppercase tracking-widest text-[10px] text-[#717881]">
              Strategic Growth
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ icon, label, active }) =>
          active ? (
            <a
              key={label}
              href="#"
              className="bg-white text-[#005a92] rounded-r-full shadow-sm px-6 py-3 flex items-center gap-4"
            >
              <Icon name={icon} />
              <span className="font-medium uppercase tracking-widest text-[10px]">{label}</span>
            </a>
          ) : (
            <a
              key={label}
              href="#"
              className="text-[#717881] hover:text-[#005a92] px-6 py-3 flex items-center gap-4 transition-all"
            >
              <Icon name={icon} />
              <span className="font-medium uppercase tracking-widest text-[10px]">{label}</span>
            </a>
          )
        )}
      </nav>

      {/* Bottom */}
      <div className="px-6 mt-auto space-y-4">
        <button className="w-full bg-gradient-to-br from-[#00426d] to-[#005a92] text-white py-3 rounded-md font-bold text-sm tracking-tight flex items-center justify-center gap-2" style={{ fontFamily: "Manrope" }}>
          <Icon name="add" className="text-sm" />
          New Entry
        </button>
        <div className="pt-6 border-t border-gray-200 space-y-1">
          {[{ icon: "help_outline", label: "Help Center" }, { icon: "logout", label: "Logout" }].map(({ icon, label }) => (
            <a key={label} href="#" className="text-[#717881] hover:text-[#005a92] py-2 flex items-center gap-4 transition-all">
              <Icon name={icon} className="text-xl" />
              <span className="font-medium uppercase tracking-widest text-[10px]">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 right-0 left-64 z-50 bg-[#f7f9fb]/80 backdrop-blur-xl flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-8">
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717881] text-lg" />
          <input
            className="pl-10 pr-4 py-1.5 bg-[#f2f4f6] border-none rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#005a92]"
            placeholder="Search ledger..."
            type="text"
          />
        </div>
        <nav className="flex gap-6">
          {["Dashboard", "Analytics"].map((item) => (
            <a key={item} href="#" className="text-[#717881] hover:text-[#005a92] transition-colors text-sm" style={{ fontFamily: "Manrope" }}>
              {item}
            </a>
          ))}
          <a href="#" className="text-[#005a92] border-b-2 border-[#005a92] pb-1 text-sm" style={{ fontFamily: "Manrope" }}>
            Forecasting
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-gradient-to-r from-[#00426d] to-[#005a92] text-white px-4 py-2 rounded-md text-sm font-bold" style={{ fontFamily: "Manrope" }}>
          Generate Report
        </button>
        {["notifications", "settings"].map((icon) => (
          <button key={icon} className="p-2 text-[#717881] hover:bg-[#f2f4f6] rounded-full transition-colors">
            <Icon name={icon} />
          </button>
        ))}
        <div className="w-8 h-8 rounded-full bg-[#e0e3e5] overflow-hidden ml-2">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvuqgsOA27MalVbEZdvfCiKkywI1Z6WoLS_AkcP5hxkpmGFHwlOjo7tpt1sW7MoErDSxdPetchsmSZLOlYSMKY8-cditbO-MtxXPUwGYV03QU3eWP8SjLi4fOvHGVrswC0urGogDPc88tzcMegMhCZg-_YzH2ppFdthJ_aO8B-qbBBQ9RVr01hOz_BCKXzq27Is6pplKG1vZEvkIUq0ehTN5annTNjIfmnMZKjhJZmiHuPEKdBEc1TZT8i2wwkhk-iqlRCt68jVDLS"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}

function ForecastChart({ activeScenario, setActiveScenario }) {
  return (
    <div className="col-span-9 bg-white p-10 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#005a92]/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold" style={{ fontFamily: "Manrope" }}>Predicted Cash Balance</h3>
          <div className="flex items-center gap-2 bg-[#8cf3f3] text-[#002020] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Icon name="auto_awesome" className="text-xs" />
            Live Prediction
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-[#f2f4f6] rounded-lg">
          {["Scenario A", "Scenario B", "Historical"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveScenario(s)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeScenario === s
                  ? "bg-white shadow-sm text-[#00426d]"
                  : "text-[#717881] hover:text-[#00426d]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 w-full relative">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] font-bold text-gray-300 uppercase py-2">
          {["$2.0M", "$1.5M", "$1.0M", "$0.5M", "$0.0M"].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
        {/* Chart */}
        <div className="ml-12 h-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 300">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#005A92" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#005A92" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,250 Q100,240 200,260 T400,230 T600,240 T800,220"
              fill="none"
              stroke="#717881"
              strokeDasharray="8,4"
              strokeWidth="2"
              opacity="0.3"
            />
            <path
              d="M0,220 C100,210 200,180 300,190 S500,140 600,150 S700,100 800,80"
              fill="none"
              stroke="#005A92"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="M0,220 C100,210 200,180 300,190 S500,140 600,150 S700,100 800,80 V300 H0 Z"
              fill="url(#chartGradient)"
            />
            <circle cx="300" cy="190" r="4" fill="#005A92" />
            <circle cx="600" cy="150" r="4" fill="#005A92" />
          </svg>
        </div>
        {/* X-axis */}
        <div className="ml-12 mt-4 flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {MONTHS.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}

function ScenarioPanel({ scenarios, setScenarios }) {
  const toggle = (i) =>
    setScenarios((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, enabled: !s.enabled } : s))
    );

  return (
    <div className="col-span-3 bg-[#f2f4f6] p-8 rounded-xl flex flex-col">
      <h3 className="text-sm font-bold uppercase tracking-widest text-[#717881] mb-6" style={{ fontFamily: "Manrope" }}>
        What-If Scenarios
      </h3>
      <div className="space-y-6 flex-1">
        {scenarios.map((s, i) => (
          <div key={s.title} className="cursor-pointer" onClick={() => toggle(i)}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">{s.title}</span>
              <Toggle enabled={s.enabled} />
            </div>
            <p className="text-xs text-[#717881] leading-tight">{s.desc}</p>
          </div>
        ))}
      </div>
      <button className="mt-8 py-3 border border-gray-200 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
        Add Custom Variable
      </button>
    </div>
  );
}

function Indicators() {
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#717881] px-1">
        Predictive Indicators
      </h4>
      {/* Risk */}
      <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0">
          <Icon name="warning" className="text-red-600" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1 block">
            Low Liquidity Period
          </span>
          <h5 className="font-bold text-sm mb-1">June 12 – June 28</h5>
          <p className="text-xs text-[#717881]">
            Operating cash projected to drop below $45,000 safety threshold due to quarterly tax liability.
          </p>
        </div>
      </div>
      {/* Opportunity */}
      <div className="bg-white p-6 rounded-xl border-l-4 border-[#006a6a] flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#8cf3f3] flex items-center justify-center shrink-0">
          <Icon name="rocket_launch" className="text-[#006a6a]" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#006a6a] mb-1 block">
            Surplus Forecasted
          </span>
          <h5 className="font-bold text-sm mb-1">September Q3 Close</h5>
          <p className="text-xs text-[#717881]">
            Estimated $320k excess liquidity. Ideal window for reinvestment or high-yield sweep transition.
          </p>
        </div>
      </div>
    </div>
  );
}

function Advisory() {
  return (
    <div className="col-span-8 bg-gradient-to-br from-[#005a92] to-[#00426d] p-10 rounded-2xl relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Icon name="psychology" className="text-9xl" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <Icon name="lightbulb" />
          <h3 className="text-xl font-bold" style={{ fontFamily: "Manrope" }}>AI Strategic Advisory</h3>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8cf3f3] mb-4">
              Cash Position Optimization
            </h4>
            <ul className="space-y-4">
              {[
                "Negotiate Net-60 terms with Tier 1 suppliers starting in May to preserve Q2 liquidity.",
                "Accelerate Q3 receivables through early-payment incentives (1.5% discount) to mitigate June gap.",
              ].map((text, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#8cf3f3] font-bold">0{i + 1}.</span>
                  <p className="text-sm opacity-90">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l border-white/10 pl-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8cf3f3] mb-4">
              Investment Strategy
            </h4>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Based on your October surplus, FinSenseAi recommends allocating $150k to short-term T-bills to yield an estimated $4,200 in passive interest without compromising operational agility.
            </p>
            <button className="bg-white text-[#00426d] px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-[#8cf3f3] transition-colors">
              Execute Reallocation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightToast({ onClose }) {
  return (
    <div className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-xl border border-gray-200 p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-xs hover:scale-105 transition-transform">
      <div className="w-10 h-10 rounded-full bg-[#8cf3f3] flex items-center justify-center text-[#002020]">
        <Icon name="query_stats" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#717881]">Prediction Integrity</p>
        <p className="text-xs font-medium">Data updated 4 mins ago based on latest clearing house reconciliations.</p>
      </div>
      <button onClick={onClose} className="text-[#717881] hover:text-[#00426d]">
        <Icon name="close" className="text-sm" />
      </button>
    </div>
  );
}

export default function PrecisionLedger() {
  const [activeScenario, setActiveScenario] = useState("Scenario A");
  const [scenarios, setScenarios] = useState(SCENARIOS);
  const [toastVisible, setToastVisible] = useState(true);

  return (
    <>
      {/* Google Fonts + Material Symbols */}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen" style={{ fontFamily: "Inter" }}>
        <Sidebar />
        <TopBar />

        <main className="ml-64 min-h-screen pt-24 px-12 pb-12">
          {/* Hero Header */}
          <div className="grid grid-cols-12 gap-8 mb-16 items-end">
            <div className="col-span-8">
              <p className="uppercase tracking-widest text-xs text-[#006a6a] mb-2">
                Predictions &amp; Strategy
              </p>
              <h2
                className="text-5xl font-extrabold tracking-tighter mb-4"
                style={{ fontFamily: "Manrope" }}
              >
                12-Month Forecast
              </h2>
              <p className="text-[#717881] max-w-xl leading-relaxed">
                Our AI analyzes historical trends, market volatility, and seasonal cycles to project your liquidity with 98.4% accuracy.
              </p>
            </div>
            <div className="col-span-4 text-right">
              <div className="inline-flex flex-col items-end">
                <span className="text-xs uppercase tracking-widest text-[#717881] mb-1">
                  Total Predicted Liquidity (EOY)
                </span>
                <span
                  className="text-6xl font-extrabold text-[#005a92] tabular-nums"
                  style={{ fontFamily: "Manrope" }}
                >
                  $1,420,500
                </span>
                <div className="flex items-center gap-2 text-[#006a6a] mt-2">
                  <Icon name="trending_up" className="text-sm" />
                  <span className="text-sm font-bold">+12.4% vs Last Year</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-6 mb-12">
            <ForecastChart activeScenario={activeScenario} setActiveScenario={setActiveScenario} />
            <ScenarioPanel scenarios={scenarios} setScenarios={setScenarios} />
          </div>

          {/* Strategic Indicators */}
          <div className="grid grid-cols-12 gap-8">
            <Indicators />
            <Advisory />
          </div>
        </main>

        {toastVisible && <InsightToast onClose={() => setToastVisible(false)} />}
      </div>
    </>
  );
}