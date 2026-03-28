import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// ── Icon ──────────────────────────────────────────────────────────────────────
export const Icon = ({ name, className = "", filled = false }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

// ── Nav items — single source of truth ───────────────────────────────────────
export const navItems = [
  { icon: "dashboard",       label: "Overview",             path: "/dashboard" },
  { icon: "payments",        label: "Cash Flow Prediction", path: "/cash-flow" },
  { icon: "account_balance", label: "Analyze Transaction",  path: "/analyze"   },
  { icon: "description",     label: "FinBot",               path: "/finbot"    },
  { icon: "bar_chart",       label: "Reports",              path: "/reports"   },
  { icon: "settings",        label: "Settings",             path: "/settings"  },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
// Props:
//   mobileOpen  — boolean, controls mobile drawer visibility
//   onClose     — callback to close mobile drawer
//
// Sign-out is handled internally (matches DashboardPage logic exactly).
export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const location   = useLocation();
  const navigate   = useNavigate();
  const [signOutLoading, setSignOutLoading] = useState(false);

  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out? You'll need to log in again.")) return;

    setSignOutLoading(true);
    try {
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
    } catch (err) {
      console.error("Sign out error:", err);
      // Even if API fails, clear and redirect — same as DashboardPage
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("businessId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      sessionStorage.clear();
      setSignOutLoading(false);
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          // Desktop: always visible fixed sidebar
          "h-screen w-64 fixed left-0 top-0 z-50",
          "bg-slate-50 flex flex-col p-6 space-y-2",
          "border-r border-slate-200",
          // Mobile: slide in/out
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
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

        {/* Mobile close button */}
        <div className="md:hidden mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200/50 text-slate-500"
            aria-label="Close menu"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
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
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 space-y-1">
          {/* New Entry CTA */}
          <Link
            to="/new-entry"
            onClick={onClose}
            className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
          >
            New Entry
          </Link>

          {/* Help Center */}
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

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            disabled={signOutLoading}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-lg text-left disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Sign Out"
          >
            {signOutLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
    </>
  );
}