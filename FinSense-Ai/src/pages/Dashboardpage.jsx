import { Link } from "react-router-dom";

/* ─── Icons ─── */
const Icon = ({ name, className = "", filled = false }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

/* ─── Sidebar ─── */
const navItems = [
  { icon: "dashboard", label: "Overview", path: "/dashboard", active: true },
  { icon: "payments", label: "Cash Flow Prediction", path: "/cashflow" },
  { icon: "account_balance", label: "Analyze transaction", path: "/analyze", active: true},
  { icon: "description", label: "Invoices", path: "#" },
  { icon: "bar_chart", label: "Reports", path: "#" },
  { icon: "settings", label: "Settings", path: "#" },
];

function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40">
      {/* Brand */}
      <div className="mb-10 px-4">
        <h1
          className="text-lg font-black text-[#00426d] uppercase tracking-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          FinSense-AI
        </h1>
        <p className="uppercase tracking-widest text-[10px] font-bold text-slate-500 mt-0.5">
          Small Biz Edition
        </p>
      </div>

      {/* Nav links */}
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
            <span className="uppercase tracking-widest text-[10px] font-bold">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto pt-6 space-y-1">
        <button
          className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
          style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
        >
          New Entry
        </button>
        {[
          { icon: "help_outline", label: "Help Center" },
          { icon: "logout", label: "Sign Out" },
        ].map(({ icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg"
          >
            <Icon name={icon} className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">
              {label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}

/* ─── Sparkline ─── */
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

/* ─── Stat Card ─── */
function StatCard({ label, value, trend, trendUp, trendColor, bg, sparkBars, activeColor, inactiveColor }) {
  return (
    <div className={`${bg} p-8 rounded-xl`} style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-400 mb-4">{label}</p>
      <div className="flex items-baseline gap-2">
        <span
          className="text-5xl font-extrabold text-[#00426d]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
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

/* ─── Cash Flow Chart ─── */
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

/* ─── AI Insights ─── */
function AIInsights() {
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
            <p className="text-sm font-semibold text-[#191c1e]">Subscription spike detected</p>
            <p className="text-xs text-slate-500 mt-1">
              Your subscription costs increased by 15% this month. Review unused seats.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="w-1 h-12 bg-[#006a6a] rounded-full block flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#191c1e]">Early payment discount</p>
            <p className="text-xs text-slate-500 mt-1">
              Paying vendor 'Global Logistics' by Friday saves you $420.00.
            </p>
          </div>
        </li>
      </ul>
      <button className="mt-8 text-xs font-bold uppercase tracking-widest text-[#006a6a] hover:underline underline-offset-4">
        View All Analysis
      </button>
    </div>
  );
}

/* ─── Recent Transactions ─── */
const transactions = [
  { icon: "shopping_bag", bg: "bg-slate-100", iconColor: "text-slate-400", name: "Amazon Web Services", time: "2 hours ago", amount: "-$1,240.00", amountColor: "text-[#191c1e]" },
  { icon: "payments", bg: "bg-[#cfe4ff]", iconColor: "text-[#00426d]", name: "Client: Zenith Corp", time: "Yesterday", amount: "+$12,500.00", amountColor: "text-[#006a6a]" },
  { icon: "restaurant", bg: "bg-slate-100", iconColor: "text-slate-400", name: "Blue Door Catering", time: "Sep 22", amount: "-$450.20", amountColor: "text-[#191c1e]" },
  { icon: "directions_car", bg: "bg-slate-100", iconColor: "text-slate-400", name: "Shell Oil", time: "Sep 21", amount: "-$85.00", amountColor: "text-[#191c1e]" },
];

function RecentActivity() {
  return (
    <div className="bg-white p-8 rounded-xl" style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}>
      <h3 className="text-lg font-bold text-[#191c1e] mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
        Recent Activity
      </h3>
      <div className="space-y-6">
        {transactions.map(({ icon, bg, iconColor, name, time, amount, amountColor }) => (
          <div key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
                <Icon name={icon} className={`${iconColor} text-sm`} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#191c1e]">{name}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{time}</p>
              </div>
            </div>
            <span className={`text-sm font-bold ${amountColor}`}>{amount}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-8 py-3 border border-slate-200 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:bg-slate-50 transition-colors rounded-lg">
        Go to Ledger
      </button>
    </div>
  );
}

/* ─── Dashboard Page ─── */
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Sidebar />

      {/* Main Canvas */}
      <main className="ml-64 flex-1 p-12 min-h-screen">

        {/* Header */}
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-slate-400 mb-2 block">
              Executive Summary
            </span>
            <h2
              className="text-4xl font-extrabold text-[#191c1e] tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Business Overview
            </h2>
          </div>
          <div className="bg-slate-50 px-6 py-3 flex items-center gap-3 rounded-xl border-l-4 border-[#006a6a]">
            <Icon name="auto_awesome" className="text-[#006a6a]" filled />
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">AI Financial Advisor</p>
              <p className="text-sm font-semibold text-[#191c1e]">Cash flow looks optimal for Q4 reinvestment.</p>
            </div>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-8">

          {/* Left — Stats + Chart */}
          <section className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-8">
            <StatCard
              label="Total Revenue (MTD)"
              value="$142,850"
              trend="12%"
              trendUp
              trendColor="text-[#006a6a]"
              bg="bg-white"
              sparkBars={[40, 60, 50, 80, 70, 100]}
              activeColor="bg-[#00426d]"
              inactiveColor="bg-[#9acbff]"
            />
            <StatCard
              label="Total Expenses (MTD)"
              value="$54,200"
              trend="4%"
              trendUp
              trendColor="text-red-500"
              bg="bg-slate-50"
              sparkBars={[30, 45, 35, 20, 55, 65]}
              activeColor="bg-slate-500"
              inactiveColor="bg-slate-300"
            />
            <CashFlowChart />
          </section>

          {/* Right — Insights + Transactions */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <AIInsights />
            <RecentActivity />
          </aside>
        </div>

        {/* Footer Ticker */}
        <footer className="mt-20 border-t border-slate-200/50 pt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <div className="flex gap-12">
            <span>
              Account Balance:{" "}
              <span className="text-[#191c1e] ml-2">$241,080.42</span>
            </span>
            <span>
              Pending Receivables:{" "}
              <span className="text-[#006a6a] ml-2">$42,100.00</span>
            </span>
            <span>
              Open Payables:{" "}
              <span className="text-red-500 ml-2">$12,850.00</span>
            </span>
          </div>
          <div>© 2024 FinSense-AI. All rights reserved.</div>
        </footer>
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