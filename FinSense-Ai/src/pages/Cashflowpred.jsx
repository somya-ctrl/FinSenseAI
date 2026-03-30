import { useState, useEffect, useCallback } from 'react';
import Sidebar, { Icon } from './Sidebar';

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:3000';
const DEFAULT_BUSINESS_ID = 'BIZ_001'; // fallback if localStorage is empty

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatINR(amount) {
  if (amount == null) return '—';
  const abs = Math.abs(Number(amount));
  const formatted = abs.toLocaleString('en-IN');
  return (Number(amount) < 0 ? '-₹' : '₹') + formatted;
}

function dayLabel(index) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  d.setDate(d.getDate() + index);
  return days[d.getDay()];
}

/**
 * Normalise one daily entry from the API into the shape the UI expects.
 *
 * API shape:  { day, net_cashflow, balance }
 * UI shape:   { day, inflow, outflow, net, predicted_balance }
 *
 * The API does not return separate inflow/outflow, so we derive them from
 * net_cashflow:  positive net → inflow, zero outflow
 *                negative net → outflow, zero inflow
 */
function normaliseDay(d, index) {
  const net = d.net_cashflow ?? 0;
  return {
    day: d.day ?? index + 1,
    inflow: net > 0 ? net : 0,
    outflow: net < 0 ? Math.abs(net) : 0,
    net,
    predicted_balance: d.balance ?? d.predicted_balance ?? null,
    // keep originals for debugging
    _raw: d,
  };
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
            <div
              className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg animate-pulse"
              style={{ height: `${60 + Math.random() * 30}%` }}
            />
            <div className="h-2 w-6 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // Use absolute balance for bar height; negative balances still render as
  // a minimum-height bar so the chart doesn't look empty.
  const balances = daily.map((d) => d.predicted_balance ?? 0);
  const maxAbs = Math.max(...balances.map(Math.abs), 1);

  return (
    <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-slate-100 dark:border-slate-700">
      {daily.map((day, i) => {
        const balance = day.predicted_balance ?? 0;
        const isNegative = balance < 0;
        const heightPct = Math.max(8, (Math.abs(balance) / maxAbs) * 100);
        return (
          <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Day {day.day}: {formatINR(balance)}
            </div>
            <div
              className={`w-full rounded-t-lg relative transition-all ${
                isNegative
                  ? 'bg-red-200 dark:bg-red-900/30 group-hover:bg-red-300 dark:group-hover:bg-red-800/30'
                  : 'bg-sky-200 dark:bg-sky-900/30 group-hover:bg-sky-300 dark:group-hover:bg-sky-800/30'
              }`}
              style={{ height: `${heightPct}%` }}
            >
              <div className={`absolute inset-x-0 top-0 h-1 rounded-t-full ${isNegative ? 'bg-red-500' : 'bg-sky-900 dark:bg-sky-400'}`} />
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">
              D{day.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AIInsightCard({ insights, summary, alert, runway, loading }) {
  // Pick highest-severity insight message
  const primaryInsight =
    insights?.find((i) => i.severity === 'warning')?.message ??
    insights?.[0]?.message ??
    null;

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
          {/* Forecast alert (from forecast.alert) */}
          {alert && (
            <div className="mb-3 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[16px] mt-0.5">warning</span>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{alert}</p>
            </div>
          )}

          {/* All insight pills */}
          {insights?.length > 0 && (
            <div className="space-y-2 mb-4">
              {insights.map((ins, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 rounded-lg p-2 text-xs leading-relaxed ${
                    ins.severity === 'warning'
                      ? 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300'
                      : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px] mt-0.5 shrink-0">
                    {ins.severity === 'warning' ? 'report' : 'info'}
                  </span>
                  {ins.message}
                </div>
              ))}
            </div>
          )}

          {!insights?.length && !alert && (
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
              "No notable anomalies detected for the forecast period."
            </p>
          )}
        </>
      )}

      {/* Cash Runway — derived: startingBalance / avgDailyOutflow */}
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
              {runway != null ? 'days remaining' : 'not available'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SentimentCard({ confidencePct, forecastSummaryText, loading }) {
  // Derive a simple sentiment label from the forecast summary string or confidence
  const pct = confidencePct ?? 0;
  const sentiment =
    pct >= 75 ? 'Positive' :
    pct >= 50 ? 'Stable'   :
    pct >= 30 ? 'Cautious' : 'Critical';

  const sentimentColor = {
    Positive: 'text-emerald-300',
    Stable:   'text-emerald-300',
    Cautious: 'text-amber-300',
    Critical: 'text-red-400',
  }[sentiment];

  return (
    <div className="bg-sky-900 dark:bg-sky-950 text-white p-6 rounded-2xl shadow-xl">
      <h5 className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-1">
        Net Forecast Sentiment
      </h5>
      {forecastSummaryText && (
        <p className="text-[10px] opacity-50 mb-3 leading-relaxed">{forecastSummaryText}</p>
      )}
      {loading ? (
        <div className="h-8 w-24 bg-white/20 rounded animate-pulse" />
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{sentiment}</span>
          <Icon name="shield_with_heart" className={`text-4xl ${sentimentColor}`} filled />
        </div>
      )}
      <p className="text-[10px] opacity-50 mt-2">Model confidence: {pct.toFixed(1)}%</p>
      <div className="mt-3 w-full bg-white/20 h-1 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-300 transition-all duration-700"
          style={{ width: loading ? '0%' : `${pct}%` }}
        />
      </div>
    </div>
  );
}

function DailyBreakdownTable({ daily, loading, forecastDays }) {
  const handleExport = () => {
    if (!daily?.length) return;
    const rows = [['Day', 'Net Cashflow', 'Inflow (derived)', 'Outflow (derived)', 'Closing Balance']];
    daily.forEach((d) => {
      rows.push([
        `Day ${d.day}`,
        d.net,
        d.inflow,
        d.outflow,
        d.predicted_balance ?? '',
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
  const maxAbsNet = daily?.length
    ? Math.max(1, ...daily.map((d) => Math.abs(d.net ?? 0)))
    : 1;

  const rows = loading
    ? skeletonRows.map((_, i) => ({ day: `Day ${i + 1}`, _loading: true }))
    : (daily ?? []).map((d) => ({
        day: `Day ${d.day}`,
        inflow: d.inflow,
        outflow: d.outflow,
        net: d.net,
        netWidth: Math.round((Math.abs(d.net ?? 0) / maxAbsNet) * 100),
        netColor: (d.net ?? 0) >= 0 ? 'bg-emerald-600' : 'bg-red-500',
        balance: d.predicted_balance,
      }));

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
              {['Day', 'Est. Inflow', 'Est. Outflow', 'Net Cashflow', 'Closing Balance'].map((h, i) => (
                <th
                  key={h}
                  className={`py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {rows.map((row, i) => (
              <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-5 font-bold text-sm text-sky-900 dark:text-sky-300">{row.day}</td>

                {/* Inflow */}
                <td className="py-5 text-sm text-emerald-600 dark:text-emerald-400">
                  {row._loading
                    ? <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    : row.inflow > 0 ? `+ ${formatINR(row.inflow)}` : '—'}
                </td>

                {/* Outflow */}
                <td className="py-5 text-sm text-red-600 dark:text-red-400">
                  {row._loading
                    ? <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
                    : row.outflow > 0 ? `- ${formatINR(row.outflow)}` : '—'}
                </td>

                {/* Net bar */}
                <td className="py-5">
                  {row._loading
                    ? <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse" />
                    : (
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${row.netColor}`} style={{ width: `${row.netWidth}%` }} />
                        </div>
                        <span className={`text-xs font-semibold ${(row.net ?? 0) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {formatINR(row.net)}
                        </span>
                      </div>
                    )}
                </td>

                {/* Closing balance */}
                <td className="py-5 text-sm font-bold text-right text-slate-900 dark:text-white">
                  {row._loading
                    ? <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded animate-pulse ml-auto" />
                    : (
                      <span className={(row.balance ?? 0) < 0 ? 'text-red-500' : ''}>
                        {formatINR(row.balance)}
                      </span>
                    )}
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
export default function CashFlowForecast() {
  const businessId = localStorage.getItem('businessId') || DEFAULT_BUSINESS_ID;

  const [mobileOpen, setMobileOpen]   = useState(false);
  const [forecastDays, setForecastDays] = useState(7);
  const [data, setData]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Load fonts
  useEffect(() => {
    const fonts = document.createElement('link');
    fonts.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap';
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
      if (!json.success) throw new Error(json.message || 'Unknown error from server');
      setData(json.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [businessId, forecastDays]);

  useEffect(() => { fetchForecast(); }, [fetchForecast]);

  // ── Derived / normalised values from API ─────────────────────────────────

  // Normalise daily entries to the shape the UI expects
  const rawDaily  = data?.forecast?.daily ?? [];
  const daily     = rawDaily.map(normaliseDay);

  // Forecast-level fields
  const minBalance        = data?.forecast?.min_balance ?? null;
  const forecastAlert     = data?.forecast?.alert ?? null;
  const forecastSummaryTx = data?.forecast?.summary ?? null;   // plain string from API

  // Insights array
  const insights  = data?.insights ?? [];

  // Summary object (confidence_pct, key_insight, forecast_alert…)
  const summary   = data?.summary ?? {};
  const confidencePct = summary.confidence_pct ?? null;

  // Starting balance from the most recent transaction
  const startingBalance   = data?.transaction?.balance ?? null;

  // Projected balance = last day's closing balance
  const projectedBalance  = daily.length
    ? daily[daily.length - 1]?.predicted_balance ?? null
    : null;

  // Percentage change over the forecast window
  const pctChange = startingBalance && projectedBalance
    ? (((projectedBalance - startingBalance) / Math.abs(startingBalance)) * 100).toFixed(1)
    : null;

  // Daily burn rate = average |net_cashflow| over negative days
  const negativeDays  = daily.filter((d) => d.net < 0);
  const totalOutflow  = daily.reduce((acc, d) => acc + d.outflow, 0);
  const burnRate      = daily.length ? Math.round(totalOutflow / daily.length) : null;

  // Rough cash runway: how many days at burn rate before balance hits 0
  const runway = (startingBalance != null && burnRate && burnRate > 0)
    ? Math.max(0, Math.floor(startingBalance / burnRate))
    : null;

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
              trend={data?.transaction?.description ?? 'Last synced transaction'}
              trendIcon="account_balance_wallet"
              trendColor="text-emerald-600 dark:text-emerald-400"
              borderColor="border-sky-900 dark:border-sky-400"
              loading={loading}
            />
            <MetricCard
              label={`Projected Day ${forecastDays}`}
              value={formatINR(projectedBalance)}
              trend={
                pctChange != null
                  ? `${pctChange > 0 ? '+' : ''}${pctChange}% vs current`
                  : 'Calculating…'
              }
              trendIcon={pctChange >= 0 ? 'trending_up' : 'trending_down'}
              trendColor={
                pctChange >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }
              borderColor="border-emerald-600 dark:border-emerald-400"
              loading={loading}
            />
            <MetricCard
              label="Daily Burn Rate"
              value={formatINR(burnRate)}
              trend="Average daily outflow"
              trendIcon="bolt"
              trendColor="text-slate-500 dark:text-slate-400"
              borderColor="border-purple-600 dark:border-purple-400"
              loading={loading}
            />
            <MetricCard
              label="Min. Balance Found"
              value={formatINR(minBalance)}
              trend="Lowest projected point"
              trendIcon="verified_user"
              trendColor={
                (minBalance ?? 0) < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-teal-600 dark:text-teal-400'
              }
              borderColor={
                (minBalance ?? 0) < 0
                  ? 'border-red-500'
                  : 'border-sky-600 dark:border-sky-400'
              }
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
                    Closing balance trajectory over the forecast window
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

              {/* Legend */}
              {!loading && daily.length > 0 && (
                <div className="flex items-center gap-6 mt-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-sky-900 dark:bg-sky-400 inline-block" /> Positive balance
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Negative balance
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <AIInsightCard
                insights={insights}
                summary={summary}
                alert={forecastAlert}
                runway={runway}
                loading={loading}
              />
              <SentimentCard
                confidencePct={confidencePct}
                forecastSummaryText={forecastSummaryTx}
                loading={loading}
              />
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