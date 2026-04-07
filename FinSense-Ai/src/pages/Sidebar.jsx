import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const Icon = ({ name, className = "", filled = false }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

export const navItems = [
  { icon: "dashboard",       label: "Overview",             path: "/dashboard" },
  { icon: "payments",        label: "Cash Flow Prediction", path: "/cash-flow" },
  { icon: "account_balance", label: "Analyze Transaction",  path: "/analyze"   },
  { icon: "description",     label: "FinBot",               path: "/finbot"    },
];

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [signOutLoading, setSignOutLoading] = useState(false);

  // Read active businessId from localStorage (set by Dashboard)
  const activeBizId   = localStorage.getItem("businessId") || null;
  const activeBizName = activeBizId ? activeBizId.replace("_", " ") : null;

  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;

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
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "h-screen w-64 fixed left-0 top-0 z-50",
          "bg-slate-50 flex flex-col p-6 space-y-2",
          "border-r border-slate-200",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="mb-6 px-4">
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

        {/* Active Business Badge — read-only, set from Dashboard */}
        <div className="px-1 mb-4">
          <div className="w-full flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Icon name="business" className="text-[18px] text-sky-900 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Active Business
              </p>
              {activeBizName ? (
                <p className="text-xs font-bold text-sky-900 truncate uppercase">
                  {activeBizName}
                </p>
              ) : (
                <p className="text-xs font-medium text-slate-400 italic">
                  Select from Overview
                </p>
              )}
            </div>
            {/* Small hint arrow pointing to Overview nav item */}
            {!activeBizName && (
              <Icon name="arrow_downward" className="text-[14px] text-slate-300 ml-auto shrink-0" />
            )}
          </div>
        </div>

        {/* Mobile close */}
        <div className="md:hidden mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200/50 text-slate-500"
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
          <Link
            to="/new-entry"
            onClick={onClose}
            className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
          >
            New Entry
          </Link>

          <Link
            to="/help"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg"
          >
            <Icon name="help_outline" className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">
              Help Center
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            disabled={signOutLoading}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-lg text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signOutLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="uppercase tracking-widest text-[10px] font-bold">Signing Out...</span>
              </>
            ) : (
              <>
                <Icon name="logout" className="text-[20px]" />
                <span className="uppercase tracking-widest text-[10px] font-bold">Sign Out</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}