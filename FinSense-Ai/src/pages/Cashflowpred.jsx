import { useState, useEffect, useCallback } from 'react';
import Sidebar, { Icon } from './Sidebar';

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:3000';
const DEFAULT_BUSINESS_ID = 'BIZ_003'; // change to match your data

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatINR(amount) {
  if (amount == null) return '—';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function dayLabel(index) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  d.setDate(d.getDate() + index);
  return days[d.getDay()];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TopAppBar({ onMenuClick, forecastDays, onForecastDaysChange, onRefresh, loading }) {
  return (
    <header className="flex items-center justify-between md:ml-64 px-6 md:px-8 py-4 fixed top-0 left-0 right-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 font-['Manrope'] text-sm font-medium border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
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
        {/* Forecast Days selector */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest">Days</span>
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              onClick={() => onForecastDaysChange(d)}
              className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter transition-colors ${
                forecastDays === d
                  ? 'bg-sky-900 dark:bg-sky-700 text-white shadow-sm'
                  : 'border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="material-symbols-outlined text-slate-500 hover:text-sky-900 dark:hover:text-sky-400 transition-colors disabled:opacity-40"
            style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}
          >
            refresh
          </button>
          <button className="material-symbols-outlined text-slate-500 hover:text-sky-900 dark:hover:text-sky-400 transition-colors">
            notifications
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

function MetricCard({ label, value, trend, trendIcon, trendColor, borderColor, loading }) {
  return (
    <div className={`bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 ${borderColor} transition-transform hover:-translate-y-1 shadow-sm`}>
      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-2">
        {label}
      </p>
      {loading ? (
        <div className="h-9 w-32 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse mb-4" />
      ) : (
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {value}
        </h3>
      )}
      <div className={`mt-4 flex items-center gap-1 text-[10px] font-semibold ${trendColor}`}>
        <Icon name={trendIcon} className="text-[14px]" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

function BarChart({ daily, loading }) {
  if (loading || !daily?.length) {
    return (
      <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 dark:border-slate-700">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-full flex flex-col items-center gap-2">
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg animate-pulse" style={{ height: `${60 + Math.random() * 30}%` }} />
            <div className="h-2 w-6 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const maxBalance = Math.max(...daily.map((d) => d.predicted_balance ?? d.balance ?? 0));

  return (
    <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 dark:border-slate-700">
      {daily.map((day, i) => {
        const balance = day.predicted_balance ?? day.balance ?? 0;
        const heightPct = maxBalance > 0 ? Math.max(10, (balance / maxBalance) * 100) : 10;
        return (
          <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {formatINR(balance)}
            </div>
            <div
              className="w-full bg-sky-200 dark:bg-sky-900/30 rounded-t-lg relative group-hover:bg-sky-300 dark:group-hover:bg-sky-800/30 transition-all"
              style={{ height: `${heightPct}%` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-sky-900 dark:bg-sky-400 rounded-t-full" />
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">
              {day.date ? new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' }) : `D${i + 1}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AIInsightCard({ insights, summary, minBalance, alert, loading }) {
  const insightText = insights?.[0]?.message || insights?.[0] || null;
  const runway = summary?.cash_runway_days ?? null;

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="psychology" className="text-emerald-600 dark:text-emerald-400" filled />
        <h5 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
          AI OBSERVATIONS
        </h5>
      </div>

      {loading ? (
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-full" />
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-4/5" />
          <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-3/5" />
        </div>
      ) : (
        <>
          {alert && (
            <div className="mb-3 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[16px] mt-0.5">warning</span>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{alert}</p>
            </div>
          )}
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
            {insightText
              ? `"${insightText}"`
              : '"No notable anomalies detected for the forecast period."'}
          </p>
        </>
      )}

      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg">
        <p className="text-[10px] font-bold text-emerald-900 dark:text-emerald-400 uppercase tracking-widest mb-1">
          CASH RUNWAY
        </p>
        {loading ? (
          <div className="h-8 w-24 bg-emerald-200 dark:bg-emerald-800 rounded animate-pulse" />
        ) : (
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-emerald-900 dark:text-emerald-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {runway ?? '—'}
            </span>
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-1">
              {runway != null ? 'Days remaining' : 'Not available'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SentimentCard({ summary, loading }) {
  const sentiment = summary?.sentiment ?? 'Stable';
  const score = summary?.confidence_score ?? 0.72;

  const sentimentColor = {
    Positive: 'text-emerald-300',
    Stable: 'text-emerald-300',
    Negative: 'text-red-300',
    Critical: 'text-red-400',
  }[sentiment] ?? 'text-emerald-300';

  return (
    <div className="bg-sky-900 dark:bg-sky-950 text-white p-6 rounded-2xl shadow-xl">
      <h5 className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-4">
        Net Forecast Sentiment
      </h5>
      {loading ? (
        <div className="h-8 w-24 bg-white/20 rounded animate-pulse" />
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{sentiment}</span>
          <Icon name="shield_with_heart" className={`text-4xl ${sentimentColor}`} filled />
        </div>
      )}
      <div className="mt-4 w-full bg-white/20 h-1 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-300 transition-all duration-700"
          style={{ width: loading ? '0%' : `${Math.round(score * 100)}%` }}
        />
      </div>
    </div>
  );
}

function DailyBreakdownTable({ daily, loading, forecastDays }) {
  const handleExport = () => {
    if (!daily?.length) return;
    const rows = [['Day', 'Date', 'Projected Inflow', 'Planned Outflow', 'Daily Net', 'Closing Balance']];
    daily.forEach((d, i) => {
      rows.push([
        dayLabel(i),
        d.date ?? '',
        d.inflow ?? 0,
        d.outflow ?? 0,
        (d.inflow ?? 0) - (d.outflow ?? 0),
        d.predicted_balance ?? d.balance ?? 0,
      ]);
    });
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cashflow_forecast_${forecastDays}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const skeletonRows = Array.from({ length: forecastDays || 7 });

  const rows = loading
    ? skeletonRows.map((_, i) => ({
        day: dayLabel(i),
        inflow: null,
        outflow: null,
        net: 0,
        balance: null,
        _loading: true,
      }))
    : (daily ?? []).map((d, i) => {
        const inflow = d.inflow ?? 0;
        const outflow = d.outflow ?? 0;
        const net = inflow - outflow;
        const maxAbsNet = Math.max(1, ...daily.map((x) => Math.abs((x.inflow ?? 0) - (x.outflow ?? 0))));
        return {
          day: d.date ? new Date(d.date).toLocaleDateString('en-IN', { weekday: 'long' }) : dayLabel(i),
          inflow,
          outflow,
          net,
          netWidth: Math.round((Math.abs(net) / maxAbsNet) * 100),
          netColor: net >= 0 ? 'bg-emerald-600' : 'bg-red-500',
          balance: d.predicted_balance ?? d.balance ?? null,
        };
      });

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-50 dark:border-slate-700">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-bold text-sky-950 dark:text-sky-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Daily Breakdown
        </h4>
        <button
          onClick={handleExport}
          disabled={loading || !daily?.length}
          className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-400 hover:underline transition-colors disabled:opacity-40"
        >
          <Icon name="download" className="text-sm" />
          EXPORT CSV
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
            {rows.map((row, i) => (
              <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-5 font-bold text-sm text-sky-900 dark:text-sky-300">{row.day}</td>
                <td className="py-5 text-sm text-emerald-600 dark:text-emerald-400">
                  {row._loading
                    ? <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    : row.inflow > 0 ? `+ ${formatINR(row.inflow)}` : '+ ₹0'}
                </td>
                <td className="py-5 text-sm text-red-600 dark:text-red-400">
                  {row._loading
                    ? <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    : `- ${formatINR(row.outflow)}`}
                </td>
                <td className="py-5">
                  {row._loading
                    ? <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse" />
                    : (
                      <div className="w-24 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${row.netColor}`} style={{ width: `${row.netWidth}%` }} />
                      </div>
                    )}
                </td>
                <td className="py-5 text-sm font-bold text-right text-slate-900 dark:text-white">
                  {row._loading
                    ? <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded animate-pulse ml-auto" />
                    : formatINR(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="mb-6 flex items-center gap-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
      <span className="material-symbols-outlined text-red-500 text-[22px]">error</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Forecast failed to load</p>
        <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="text-xs font-bold text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
      >
        RETRY
      </button>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function CashFlowForecast({ businessId = DEFAULT_BUSINESS_ID }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forecastDays, setForecastDays] = useState(7);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/cashflow/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_id: businessId, forecast_days: forecastDays }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Server error ${res.status}`);
      }

      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Unknown error');
      setData(json.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [businessId, forecastDays]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  // ── Derived metrics ──────────────────────────────────────────────────────
  const daily = data?.forecast?.daily ?? [];
  const minBalance = data?.forecast?.min_balance;
  const alert = data?.forecast?.alert;
  const insights = data?.insights ?? [];
  const summary = data?.summary ?? {};
  const startingBalance = data?.transaction?.balance;
  const projectedBalance = daily.length ? (daily[daily.length - 1]?.predicted_balance ?? daily[daily.length - 1]?.balance) : null;
  const pctChange = startingBalance && projectedBalance
    ? (((projectedBalance - startingBalance) / startingBalance) * 100).toFixed(1)
    : null;
  const totalOutflow = daily.reduce((acc, d) => acc + (d.outflow ?? 0), 0);
  const burnRate = daily.length ? Math.round(totalOutflow / daily.length) : null;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopAppBar
          onMenuClick={() => setMobileOpen(true)}
          forecastDays={forecastDays}
          onForecastDaysChange={setForecastDays}
          onRefresh={fetchForecast}
          loading={loading}
        />

        <main className="pt-24 pb-12 px-4 md:px-8 min-h-screen">

          {error && <ErrorBanner message={error} onRetry={fetchForecast} />}

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <MetricCard
              label="Starting Balance"
              value={formatINR(startingBalance)}
              trend={data?.transaction?.created_at ? `As of ${new Date(data.transaction.created_at).toLocaleDateString('en-IN')}` : 'Last synced transaction'}
              trendIcon="trending_up"
              trendColor="text-emerald-600 dark:text-emerald-400"
              borderColor="border-sky-900 dark:border-sky-400"
              loading={loading}
            />
            <MetricCard
              label={`Projected Day ${forecastDays}`}
              value={formatINR(projectedBalance)}
              trend={pctChange != null ? `${pctChange > 0 ? '+' : ''}${pctChange}% vs Current` : 'Calculating...'}
              trendIcon={pctChange >= 0 ? 'trending_up' : 'trending_down'}
              trendColor={pctChange >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}
              borderColor="border-emerald-600 dark:border-emerald-400"
              loading={loading}
            />
            <MetricCard
              label="Daily Burn Rate"
              value={formatINR(burnRate)}
              trend="Predictive Average"
              trendIcon="bolt"
              trendColor="text-slate-500 dark:text-slate-400"
              borderColor="border-purple-600 dark:border-purple-400"
              loading={loading}
            />
            <MetricCard
              label="Min. Balance Found"
              value={formatINR(minBalance)}
              trend="Safe liquidity threshold"
              trendIcon="verified_user"
              trendColor="text-teal-600 dark:text-teal-400"
              borderColor="border-sky-600 dark:border-sky-400"
              loading={loading}
            />
          </div>

          {/* Chart + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h4 className="text-lg font-bold text-sky-950 dark:text-sky-400" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {forecastDays}-Day Balance Projection
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visualizing upcoming inflows and mandatory payouts
                  </p>
                </div>
                {/* Mobile day switcher */}
                <div className="flex gap-2 md:hidden">
                  {[7, 14, 30].map((d) => (
                    <button
                      key={d}
                      onClick={() => setForecastDays(d)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter transition-colors ${
                        forecastDays === d
                          ? 'bg-sky-900 dark:bg-sky-700 text-white'
                          : 'border border-slate-300 dark:border-slate-600 text-slate-500'
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>
              <BarChart daily={daily} loading={loading} />
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <AIInsightCard
                insights={insights}
                summary={summary}
                minBalance={minBalance}
                alert={alert}
                loading={loading}
              />
              <SentimentCard summary={summary} loading={loading} />
            </div>
          </div>

          {/* Breakdown Table */}
          <DailyBreakdownTable daily={daily} loading={loading} forecastDays={forecastDays} />
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-sky-900 dark:bg-sky-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 hover:bg-sky-800 dark:hover:bg-sky-600">
        <Icon name="add" className="text-[28px]" filled />
      </button>
    </div>
  );
}