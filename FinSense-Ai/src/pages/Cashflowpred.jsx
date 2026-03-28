import { useState, useEffect } from 'react';
import Sidebar, { Icon } from './Sidebar';

// ── Sub-components ────────────────────────────────────────────────────────────

function TopAppBar({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between md:ml-64 px-6 md:px-8 py-4 fixed top-0 left-0 right-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 font-['Manrope'] text-sm font-medium border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Icon name="menu" className="text-[22px]" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-sky-900 dark:text-sky-400 tracking-tight uppercase">
          Cash Flow Forecast
        </h2>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden md:block">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-sky-900 w-64 transition-all dark:bg-slate-800 dark:text-white"
            placeholder="Search insights..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="material-symbols-outlined text-slate-500 hover:text-sky-900 dark:hover:text-sky-400 transition-colors">
            notifications
          </button>
          <button className="material-symbols-outlined text-slate-500 hover:text-sky-900 dark:hover:text-sky-400 transition-colors">
            history_edu
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
            <div className="w-full h-full bg-[#00426d]/20 flex items-center justify-center">
              <Icon name="person" className="text-[#00426d] text-[18px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MetricCard({ label, value, trend, trendIcon, trendColor, borderColor }) {
  return (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 ${borderColor} transition-transform hover:-translate-y-1 shadow-sm`}>
      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
        {label}
      </p>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {value}
      </h3>
      <div className={`mt-4 flex items-center gap-1 text-[10px] font-semibold ${trendColor}`}>
        <Icon name={trendIcon} className="text-[14px]" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

function BarChart() {
  const days = [
    { label: 'Mon', height: 95 },
    { label: 'Tue', height: 88 },
    { label: 'Wed', height: 82 },
    { label: 'Thu', height: 92 },
    { label: 'Fri', height: 85 },
    { label: 'Sat', height: 78 },
    { label: 'Sun', height: 75 },
  ];

  return (
    <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 dark:border-slate-700">
      {days.map((day) => (
        <div key={day.label} className="w-full flex flex-col items-center gap-2 group">
          <div
            className="w-full bg-sky-200 dark:bg-sky-900/30 rounded-t-lg relative group-hover:bg-sky-300 dark:group-hover:bg-sky-800/30 transition-all"
            style={{ height: `${day.height}%` }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-sky-900 dark:bg-sky-400 rounded-t-full" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{day.label}</span>
        </div>
      ))}
    </div>
  );
}

function AIInsightCard() {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="psychology" className="text-emerald-600 dark:text-emerald-400" filled />
        <h5 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
          AI OBSERVATIONS
        </h5>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
        "Multiple subscriptions (₹12,400) are scheduled for Day 4. Inflow from invoice #2401 is delayed by 2 days
        based on client history."
      </p>
      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg">
        <p className="text-[10px] font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-widest mb-1">
          CASH RUNWAY
        </p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-emerald-900 dark:text-emerald-400" style={{ fontFamily: 'Manrope, sans-serif' }}>87</span>
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">Days remaining</span>
        </div>
      </div>
    </div>
  );
}

function SentimentCard() {
  return (
    <div className="bg-sky-900 dark:bg-sky-950 text-white p-6 rounded-2xl shadow-xl">
      <h5 className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-4">
        Net Forecast Sentiment
      </h5>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Stable</span>
        <Icon name="shield_with_heart" className="text-4xl text-emerald-300" filled />
      </div>
      <div className="mt-4 w-full bg-white/20 h-1 rounded-full overflow-hidden">
        <div className="w-[72%] h-full bg-emerald-300" />
      </div>
    </div>
  );
}

function DailyBreakdownTable() {
  const dailyData = [
    { day: 'Monday',    inflow: '+ ₹45,000', outflow: '- ₹12,000', netWidth: 65, netColor: 'bg-emerald-600', balance: '₹1,91,200' },
    { day: 'Tuesday',   inflow: '+ ₹0',      outflow: '- ₹24,500', netWidth: 30, netColor: 'bg-red-500',     balance: '₹1,66,700' },
    { day: 'Wednesday', inflow: '+ ₹12,000', outflow: '- ₹18,400', netWidth: 45, netColor: 'bg-amber-500',   balance: '₹1,60,300' },
    { day: 'Thursday',  inflow: '+ ₹4,500',  outflow: '- ₹2,100',  netWidth: 55, netColor: 'bg-emerald-600', balance: '₹1,62,700' },
    { day: 'Friday',    inflow: '+ ₹0',      outflow: '- ₹8,400',  netWidth: 20, netColor: 'bg-red-500',     balance: '₹1,54,300' },
    { day: 'Saturday',  inflow: '+ ₹0',      outflow: '- ₹4,200',  netWidth: 15, netColor: 'bg-red-500',     balance: '₹1,50,100' },
    { day: 'Sunday',    inflow: '+ ₹0',      outflow: '- ₹4,669',  netWidth: 10, netColor: 'bg-red-500',     balance: '₹1,45,431' },
  ];

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-50 dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-bold text-sky-950 dark:text-sky-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Daily Breakdown
        </h4>
        <button className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-400 hover:underline transition-colors">
          <Icon name="download" className="text-sm" />
          EXPORT REPORT
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              {['Day', 'Projected Inflow', 'Planned Outflow', 'Daily Net', 'Closing Balance'].map((h, i) => (
                <th key={h} className={`py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {dailyData.map((row) => (
              <tr key={row.day} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-5 font-bold text-sm text-sky-900 dark:text-sky-300">{row.day}</td>
                <td className="py-5 text-sm text-emerald-600 dark:text-emerald-400">{row.inflow}</td>
                <td className="py-5 text-sm text-red-600 dark:text-red-400">{row.outflow}</td>
                <td className="py-5">
                  <div className="w-24 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${row.netColor}`} style={{ width: `${row.netWidth}%` }} />
                  </div>
                </td>
                <td className="py-5 text-sm font-bold text-right text-slate-900 dark:text-white">{row.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function CashFlowForecast() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load fonts
  useEffect(() => {
    const fonts = document.createElement('link');
    fonts.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    fonts.rel = 'stylesheet';
    document.head.appendChild(fonts);

    const symbols = document.createElement('link');
    symbols.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    symbols.rel = 'stylesheet';
    document.head.appendChild(symbols);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">

      {/* ── Shared Sidebar (same as Dashboard/Analyze/NewEntry) ── */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopAppBar onMenuClick={() => setMobileOpen(true)} />

        <main className="pt-24 pb-12 px-4 md:px-8 min-h-screen">

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard
              label="Starting Balance"
              value="₹1,58,200"
              trend="Last updated 2h ago"
              trendIcon="trending_up"
              trendColor="text-emerald-600 dark:text-emerald-400"
              borderColor="border-sky-900 dark:border-sky-400"
            />
            <MetricCard
              label="Projected Day 7"
              value="₹1,45,431"
              trend="-8.1% vs Current"
              trendIcon="trending_down"
              trendColor="text-red-600 dark:text-red-400"
              borderColor="border-emerald-600 dark:border-emerald-400"
            />
            <MetricCard
              label="Daily Burn Rate"
              value="₹1,806"
              trend="Predictive Average"
              trendIcon="bolt"
              trendColor="text-slate-500 dark:text-slate-400"
              borderColor="border-purple-600 dark:border-purple-400"
            />
            <MetricCard
              label="Min. Balance Found"
              value="₹1,45,431"
              trend="Safe liquidity threshold"
              trendIcon="verified_user"
              trendColor="text-teal-600 dark:text-teal-400"
              borderColor="border-sky-600 dark:border-sky-400"
            />
          </div>

          {/* Chart + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h4 className="text-lg font-bold text-sky-950 dark:text-sky-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    7-Day Balance Projection
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visualizing upcoming inflows and mandatory payouts
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-[10px] font-bold border border-slate-300 dark:border-slate-600 rounded-full text-slate-500 dark:text-slate-400 uppercase tracking-tighter hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    Daily
                  </button>
                  <button className="px-3 py-1 text-[10px] font-bold bg-sky-900 dark:bg-sky-700 text-white rounded-full uppercase tracking-tighter shadow-sm hover:bg-sky-800 dark:hover:bg-sky-600">
                    Weekly
                  </button>
                </div>
              </div>
              <BarChart />
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <AIInsightCard />
              <SentimentCard />
            </div>
          </div>

          {/* Breakdown Table */}
          <DailyBreakdownTable />
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-sky-900 dark:bg-sky-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 hover:bg-sky-800 dark:hover:bg-sky-600">
        <Icon name="add" className="text-[28px]" filled />
      </button>
    </div>
  );
}