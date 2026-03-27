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

// ── Sidebar with Sign Out Handler ────────────────────────────────────────────
const navItems = [
  { icon: "dashboard", label: "Overview", path: "/dashboard", active: true },
  { icon: "payments", label: "Cash Flow Prediction", path: "/cash-flow" },
  { icon: "account_balance", label: "Analyze Transaction", path: "/analyze" },
  { icon: "description", label: "FinBot", path: "/finbot" },
  { icon: "bar_chart", label: "Reports", path: "/reports" },
  { icon: "settings", label: "Settings", path: "/settings" },
];

function Sidebar({ onSignOut, signOutLoading }) {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40 border-r border-slate-200">
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
            aria-current={active ? "page" : undefined}
          >
            <Icon name={icon} className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <Link
          to="/new-entry"
          className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
        >
          New Entry
        </Link>

        {/* Help Center Link */}
        <a
          href="/help"
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg"
          aria-label="Help Center"
        >
          <Icon name="help_outline" className="text-[20px]" />
          <span className="uppercase tracking-widest text-[10px] font-bold">
            Help Center
          </span>
        </a>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          disabled={signOutLoading}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-lg text-left disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sign Out"
        >
          {signOutLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <span className="uppercase tracking-widest text-[10px] font-bold">
                Signing Out...
              </span>
            </>
          ) : (
            <>
              <Icon name="logout" className="text-[20px]" />
              <span className="uppercase tracking-widest text-[10px] font-bold">
                Sign Out
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount))
    return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ── Skeleton Loading Component ────────────────────────────────────────────────
function SkeletonBar() {
  return (
    <div className="h-full bg-gradient-to-b from-slate-200 to-slate-100 rounded-t-lg animate-pulse" />
  );
}

function SkeletonLine() {
  return <div className="h-4 bg-slate-200 rounded animate-pulse" />;
}

function SkeletonCircle() {
  return <div className="w-32 h-32 bg-slate-200 rounded-full animate-pulse" />;
}

// ── Business ID Input Bar ─────────────────────────────────────────────────────
function BusinessIdInput({ onFetch, loading, initialValue = "" }) {
  const [businessId, setBusinessId] = useState(initialValue);

  const handleFetch = () => {
    if (!businessId.trim()) return;
    onFetch(businessId.trim().toUpperCase());
  };

  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm flex-1 max-w-sm">
        <span className="text-[#717881] text-sm font-bold uppercase tracking-wider">
          BIZ ID
        </span>
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
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
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
function Sparkline({ bars, activeColor, inactiveColor, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-8 h-12 flex items-end gap-1">
        {[...Array(6)].map((_, i) => (
          <SkeletonBar key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 h-12 flex items-end gap-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t-sm ${
            i === bars.length - 1 ? activeColor : inactiveColor
          }`}
          style={{ height: `${h}%`, opacity: 0.2 + i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  trend,
  trendUp,
  trendColor,
  bg,
  sparkBars,
  activeColor,
  inactiveColor,
  isLoading,
}) {
  return (
    <div
      className={`${bg} p-8 rounded-xl`}
      style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
    >
      <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-400 mb-4">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        {isLoading ? (
          <>
            <div className="h-12 w-48 bg-slate-200 rounded animate-pulse" />
          </>
        ) : (
          <>
            <span
              className="text-5xl font-extrabold text-[#00426d]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {value}
            </span>
            <span className={`${trendColor} text-sm font-bold flex items-center gap-0.5`}>
              <Icon
                name={trendUp ? "trending_up" : "trending_down"}
                className="text-sm"
              />
              {trend}
            </span>
          </>
        )}
      </div>
      <Sparkline
        bars={sparkBars}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        isLoading={isLoading}
      />
    </div>
  );
}

// ── Income vs Expense Chart ───────────────────────────────────────────────────
function IncomeVsExpenseChart({ totalIncome, totalExpense, isLoading }) {
  const maxValue = Math.max(totalIncome || 0, totalExpense || 0);
  const incomeHeight = maxValue > 0 ? ((totalIncome || 0) / maxValue) * 100 : 0;
  const expenseHeight = maxValue > 0 ? ((totalExpense || 0) / maxValue) * 100 : 0;

  return (
    <div
      className="col-span-2 bg-white p-8 rounded-xl"
      style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3
            className="text-lg font-bold text-[#191c1e]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Income vs Expenses
          </h3>
          <p className="text-xs text-slate-400">Monthly comparison</p>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00426d]">
            <span className="w-2 h-2 rounded-full bg-[#00426d] inline-block" />{" "}
            Income
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
            Expense
          </span>
        </div>
      </div>
      <div className="h-64 relative flex items-end justify-around px-4 pb-8">
        {/* Income Bar */}
        <div className="relative w-24 flex flex-col items-center">
          {isLoading ? (
            <SkeletonBar />
          ) : (
            <>
              <div
                className="w-full rounded-t-lg bg-[#00426d] transition-all duration-500"
                style={{ height: `${incomeHeight}%` }}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-[#00426d]">
                Income
              </span>
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">
                {isLoading ? "—" : formatCurrency(totalIncome)}
              </span>
            </>
          )}
        </div>

        {/* Expense Bar */}
        <div className="relative w-24 flex flex-col items-center">
          {isLoading ? (
            <SkeletonBar />
          ) : (
            <>
              <div
                className="w-full rounded-t-lg bg-red-500 transition-all duration-500"
                style={{ height: `${expenseHeight}%` }}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-red-500">
                Expense
              </span>
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">
                {isLoading ? "—" : formatCurrency(totalExpense)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Key Metrics Cards ─────────────────────────────────────────────────────────
function KeyMetricsCards({ netBalance, profitMargin, savingsRate, isLoading }) {
  const metrics = [
    {
      label: "Net Profit",
      value: formatCurrency(netBalance),
      icon: "trending_up",
      color: (netBalance || 0) >= 0 ? "text-[#006a6a]" : "text-red-500",
      bgColor: (netBalance || 0) >= 0 ? "bg-[#006a6a]/10" : "bg-red-500/10",
    },
    {
      label: "Profit Margin",
      value: `${profitMargin ?? 0}%`,
      icon: "percent",
      color: (profitMargin || 0) >= 0 ? "text-[#00426d]" : "text-red-500",
      bgColor: (profitMargin || 0) >= 0 ? "bg-[#00426d]/10" : "bg-red-500/10",
    },
    {
      label: "Savings Rate",
      value: `${savingsRate ?? 0}%`,
      icon: "savings",
      color: (savingsRate || 0) >= 0 ? "text-green-600" : "text-orange-500",
      bgColor: (savingsRate || 0) >= 0 ? "bg-green-600/10" : "bg-orange-500/10",
    },
  ];

  return (
    <div className="col-span-2 grid grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`${metric.bgColor} p-6 rounded-xl border border-slate-200`}
          style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
        >
          {isLoading ? (
            <>
              <SkeletonLine />
              <div className="mt-4 h-8 w-24 bg-slate-200 rounded animate-pulse" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-400">
                  {metric.label}
                </p>
                <Icon
                  name={metric.icon}
                  className={`text-xl ${metric.color}`}
                  filled
                />
              </div>
              <p className={`text-2xl font-extrabold ${metric.color}`}>
                {metric.value}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Top Expense Categories ────────────────────────────────────────────────────
function TopExpenseCategories({ categoryBreakdown, totalExpense, isLoading }) {
  const topCategories = categoryBreakdown
    ? Object.entries(categoryBreakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : [];

  const colors = [
    "#00426d",
    "#005a92",
    "#006a6a",
    "#9acbff",
    "#c9e4ff",
  ];

  return (
    <div
      className="col-span-2 bg-white p-8 rounded-xl"
      style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
    >
      <h3
        className="text-lg font-bold text-[#191c1e] mb-8"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Top Expense Categories
      </h3>
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i}>
              <SkeletonLine />
              <div className="h-2 w-full bg-[#eceef0] rounded-full mt-2" />
            </div>
          ))
        ) : topCategories.length > 0 ? (
          topCategories.map(([cat, amt], idx) => {
            const pct = Math.round((amt / totalExpense) * 100);
            return (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#414750] capitalize">
                    {cat}
                  </span>
                  <span className="font-bold text-[#00426d]">
                    {pct}% • ₹{amt.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: colors[idx] }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-400">No expense data available</p>
        )}
      </div>
    </div>
  );
}

// ── AI Insights ───────────────────────────────────────────────────────────────
function AIInsights({
  summaryText,
  recommendation,
  financialHealth,
  profitMargin,
  anomalies,
  isLoading,
}) {
  const healthColor =
    financialHealth === "good"
      ? "text-green-600"
      : financialHealth === "average"
      ? "text-yellow-600"
      : "text-red-500";

  return (
    <div className="bg-[#8cf3f3]/30 backdrop-blur-xl p-8 rounded-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Icon
          name="insights"
          className="text-[#006a6a]"
          filled
        />
        <h3 className="font-bold text-[#007070] tracking-tight">
          Priority Insights
        </h3>
      </div>
      <ul className="space-y-6">
        {isLoading ? (
          <>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-red-500 rounded-full block flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#191c1e] mb-2">
                  Business Summary
                </p>
                <SkeletonLine />
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-[#006a6a] rounded-full block flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#191c1e] mb-2">
                  Financial Health
                </p>
                <SkeletonLine />
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-yellow-500 rounded-full block flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#191c1e] mb-2">
                  Recommendation
                </p>
                <SkeletonLine />
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-red-500 rounded-full block flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#191c1e]">
                  Business Summary
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {summaryText ||
                    `Profit Margin: ${profitMargin ?? "—"}%`}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-[#006a6a] rounded-full block flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#191c1e]">
                  Financial Health
                </p>
                <p
                  className={`text-xs mt-1 font-semibold capitalize ${healthColor}`}
                >
                  {financialHealth ||
                    (profitMargin > 0 ? "✅ Profitable" : "⚠️ Running at a loss")}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-1 h-12 bg-yellow-500 rounded-full block flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#191c1e]">
                  Recommendation
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {recommendation || "No recommendation available."}
                </p>
              </div>
            </li>
            {anomalies?.length > 0 && (
              <li className="flex gap-4">
                <span className="w-1 h-12 bg-orange-400 rounded-full block flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#191c1e]">
                    Anomalies Detected
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {anomalies.length} unusual transaction(s) flagged by AI
                  </p>
                </div>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

// ── Category Breakdown (Full) ─────────────────────────────────────────────────
function CategoryBreakdown({
  categoryBreakdown,
  totalExpense,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div
        className="bg-white p-8 rounded-xl"
        style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
      >
        <h3 className="text-sm font-bold text-[#00426d] mb-6">
          Complete Expense Breakdown
        </h3>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <SkeletonLine />
              <div className="h-2 w-full bg-[#eceef0] rounded-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categoryBreakdown) return null;

  return (
    <div
      className="bg-white p-8 rounded-xl"
      style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
    >
      <h3 className="text-sm font-bold text-[#00426d] mb-6">
        Complete Expense Breakdown
      </h3>
      <div className="space-y-4">
        {Object.entries(categoryBreakdown).map(([cat, amt]) => {
          const pct = Math.round((amt / totalExpense) * 100);
          return (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#414750] capitalize">
                  {cat}
                </span>
                <span className="font-bold text-[#00426d]">
                  ₹{amt.toLocaleString("en-IN")}
                </span>
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
function RecentActivity({
  totalTransactions,
  anomalyCount,
  isLoading,
}) {
  return (
    <div
      className="bg-white p-8 rounded-xl"
      style={{ boxShadow: "0 40px 40px -20px rgba(25,28,30,0.06)" }}
    >
      <h3
        className="text-lg font-bold text-[#191c1e] mb-6"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Recent Activity
      </h3>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#191c1e]">
              Total Transactions
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Imported from overview API
            </p>
          </div>
          <span className="text-lg font-bold text-[#00426d]">
            {isLoading ? (
              <div className="w-12 h-6 bg-slate-200 rounded animate-pulse" />
            ) : (
              totalTransactions ?? "—"
            )}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-sm font-bold text-[#191c1e]">Total Anomalies</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Detected by AI
            </p>
          </div>
          <span className="text-lg font-bold text-[#00426d]">
            {isLoading ? (
              <div className="w-12 h-6 bg-slate-200 rounded animate-pulse" />
            ) : (
              anomalyCount ?? 0
            )}
          </span>
        </div>
      </div>
      <button className="w-full mt-8 py-3 border border-slate-200 text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:bg-slate-50 transition-colors rounded-lg">
        Go to Ledger
      </button>
    </div>
  );
}

// ── Dashboard Page (Main Export) ──────────────────────────────────────────────
export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchedId, setFetchedId] = useState("");
  const [signOutLoading, setSignOutLoading] = useState(false);
  const navigate = useNavigate();

  // ── SIGN OUT HANDLER ──
  const handleSignOut = async () => {
    if (
      window.confirm(
        "Are you sure you want to sign out? You'll need to log in again."
      )
    ) {
      setSignOutLoading(true);
      try {
        // Call sign out API endpoint
        // Adjust the endpoint and headers based on your backend requirements
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Clear all local storage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("businessId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");

        // Clear session storage if used
        sessionStorage.clear();

        console.log("User signed out successfully");

        // Redirect to login page
        navigate("/login");
      } catch (err) {
        console.error("Sign out error:", err);

        // Even if API fails, clear local data and redirect
        // This ensures user is logged out on the frontend
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } finally {
        setSignOutLoading(false);
      }
    }
  };

  const handleFetch = async (id) => {
    setLoading(true);
    setError("");
    setSummary(null);
    setFetchedId(id);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/overview/summary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSummary(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Business ID not found. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-[#f7f9fb] text-[#191c1e]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Sidebar onSignOut={handleSignOut} signOutLoading={signOutLoading} />

      <main className="ml-64 flex-1 p-12 min-h-screen">
        {/* ── Header ── */}
        <header className="flex justify-between items-end mb-10">
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
          {summary && !loading && (
            <div className="bg-slate-50 px-6 py-3 flex items-center gap-3 rounded-xl border-l-4 border-[#006a6a] animate-in fade-in slide-in-from-right duration-500">
              <Icon
                name="auto_awesome"
                className="text-[#006a6a]"
                filled
              />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                  AI Financial Advisor
                </p>
                <p className="text-sm font-semibold text-[#191c1e]">
                  {summary?.recommendation ||
                    "Cash flow looks optimal for Q4 reinvestment."}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* ── Business ID Input ── */}
        <BusinessIdInput
          onFetch={handleFetch}
          loading={loading}
          initialValue={fetchedId}
        />

        {/* ── Error ── */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top duration-300">
            ⚠️ {error}
          </div>
        )}

        {/* ── Dashboard Layout (Always Visible) ── */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Stats + Charts */}
          <section className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-8">
            <StatCard
              label="Total Revenue (MTD)"
              value={
                loading || !summary
                  ? "—"
                  : formatCurrency(summary.total_income)
              }
              trend={`${Math.abs(summary?.savings_rate_pct ?? 0)}%`}
              trendUp={(summary?.savings_rate_pct ?? 0) >= 0}
              trendColor={
                (summary?.savings_rate_pct ?? 0) >= 0
                  ? "text-[#006a6a]"
                  : "text-red-500"
              }
              bg="bg-white"
              sparkBars={[40, 60, 50, 80, 70, 100]}
              activeColor="bg-[#00426d]"
              inactiveColor="bg-[#9acbff]"
              isLoading={loading}
            />
            <StatCard
              label="Total Expenses (MTD)"
              value={
                loading || !summary
                  ? "—"
                  : formatCurrency(summary.total_expense)
              }
              trend={`${Math.abs(summary?.savings_rate_pct ?? 0)}%`}
              trendUp={(summary?.savings_rate_pct ?? 0) < 0}
              trendColor={
                (summary?.savings_rate_pct ?? 0) < 0
                  ? "text-red-500"
                  : "text-[#006a6a]"
              }
              bg="bg-slate-50"
              sparkBars={[30, 45, 35, 20, 55, 65]}
              activeColor="bg-slate-500"
              inactiveColor="bg-slate-300"
              isLoading={loading}
            />

            {/* Income vs Expense Chart */}
            <IncomeVsExpenseChart
              totalIncome={summary?.total_income}
              totalExpense={summary?.total_expense}
              isLoading={loading}
            />

            {/* Key Metrics Cards */}
            <KeyMetricsCards
              netBalance={summary?.net_balance}
              profitMargin={summary?.profit_margin}
              savingsRate={summary?.savings_rate_pct}
              isLoading={loading}
            />

            {/* Top Expense Categories */}
            <TopExpenseCategories
              categoryBreakdown={summary?.category_breakdown}
              totalExpense={summary?.total_expense}
              isLoading={loading}
            />

            {/* Full Category Breakdown */}
            <CategoryBreakdown
              categoryBreakdown={summary?.category_breakdown}
              totalExpense={summary?.total_expense}
              isLoading={loading}
            />
          </section>

          {/* Right: Insights + Activity */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <AIInsights
              summaryText={summary?.summary}
              recommendation={summary?.recommendation}
              financialHealth={summary?.financial_health}
              profitMargin={summary?.profit_margin}
              anomalies={summary?.anomalies}
              isLoading={loading}
            />
            <RecentActivity
              totalTransactions={summary?.total_transactions}
              anomalyCount={summary?.anomalies?.length}
              isLoading={loading}
            />
          </aside>
        </div>

        {/* ── Footer ── */}
        {summary && !loading && (
          <footer className="mt-20 border-t border-slate-200/50 pt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 animate-in fade-in duration-500">
            <div className="flex gap-12">
              <span>
                Net Balance:
                <span
                  className={`ml-2 ${
                    (summary.net_balance ?? 0) >= 0
                      ? "text-[#006a6a]"
                      : "text-red-500"
                  }`}
                >
                  {formatCurrency(summary.net_balance)}
                </span>
              </span>
              <span>
                Savings Rate:
                <span
                  className={`ml-2 ${
                    (summary.savings_rate_pct ?? 0) >= 0
                      ? "text-[#006a6a]"
                      : "text-red-500"
                  }`}
                >
                  {summary.savings_rate_pct}%
                </span>
              </span>
              <span>
                Financial Health:
                <span className="text-[#191c1e] ml-2 capitalize">
                  {summary.financial_health}
                </span>
              </span>
            </div>
            <div>© 2024 FinSenseAi. All rights reserved.</div>
          </footer>
        )}
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