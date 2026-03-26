import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Icon component using Material Symbols Outlined
function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

const navItems = [
  { icon: "dashboard",    label: "Overview",             path: "/dashboard" },
  { icon: "trending_up",  label: "Cash Flow Prediction", path: "/cash-flow" },
  { icon: "query_stats",  label: "Analyze Transaction",  path: "/analyze" },
  { icon: "smart_toy",    label: "Finbot",                path: "/finbot" },
  { icon: "description",  label: "Reports",              path: "/reports" },
  { icon: "settings",     label: "Settings",             path: "/settings" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-6 space-y-2 z-40">
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
        {navItems.map(({ icon, label, path }) => {
          const active = location.pathname === path;
          return (
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
              <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 space-y-1">
        <Link
          to="/new-entry"
          className="w-full mb-6 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #00426d, #005a92)" }}
        >
          New Entry
        </Link>
        {[
          { icon: "help_outline", label: "Help Center", path: "/help" },
          { icon: "logout",       label: "Sign Out",    path: "/signout" },
        ].map(({ icon, label, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-200/50 transition-all duration-300 rounded-lg"
          >
            <Icon name={icon} className="text-[20px]" />
            <span className="uppercase tracking-widest text-[10px] font-bold">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function RequiredBadge() {
  return (
    <span className="bg-orange-50 text-orange-600 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter border border-orange-100">
      Required
    </span>
  );
}

function FieldLabel({ label }) {
  return (
    <label className="flex items-center justify-between">
      <span
        className="font-bold text-[11px] tracking-[0.2em] uppercase text-[#0A1929]"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {label}
      </span>
      <RequiredBadge />
    </label>
  );
}

const inputClass =
  "w-full bg-white border border-slate-200 focus:border-[#005A92] focus:ring-0 focus:outline-none rounded-none py-4 px-4 text-[#0A1929] placeholder:text-slate-300 text-sm font-medium transition-all";

export default function NewEntry() {
  const [formData, setFormData] = useState({
    business_id: "",
    user_id: "",
    description: "",
    amount: "",
    current_balance: "",
    forecast_days: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/analyze-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
          current_balance: Number(formData.current_balance),
          forecast_days: Number(formData.forecast_days),
        }),
      });
      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setSuccess(true);
      setFormData({
        business_id: "",
        user_id: "",
        description: "",
        amount: "",
        current_balance: "",
        forecast_days: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#f0f2f5]" style={{ fontFamily: "Manrope, sans-serif" }}>
        <Sidebar />

        <main className="ml-64 min-h-screen bg-[#f0f2f5] flex items-center justify-center p-12">
          <div className="max-w-3xl w-full">

            {/* Header */}
            <div className="mb-10">
              <h2
                className="text-4xl font-extrabold tracking-tight text-[#0A1929]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                New Transaction Entry
              </h2>
              <p className="text-[#64748b] font-medium mt-2 text-sm">
                Populate the architectural fields below to analyze your ledger with Aeon AI.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-[#e2e8f0] p-10 md:p-14 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Row 1: business_id + user_id */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <FieldLabel label="Business ID" />
                    <input
                      className={inputClass}
                      type="text"
                      name="business_id"
                      placeholder="e.g. BIZ_001"
                      value={formData.business_id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <FieldLabel label="User ID" />
                    <input
                      className={inputClass}
                      type="text"
                      name="user_id"
                      placeholder="e.g. U001"
                      value={formData.user_id}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: description */}
                <div className="space-y-3">
                  <FieldLabel label="Description" />
                  <input
                    className={inputClass}
                    type="text"
                    name="description"
                    placeholder="e.g. Paid ₹500 for food"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Row 3: amount + current_balance + forecast_days */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <FieldLabel label="Amount" />
                    <input
                      className={inputClass}
                      type="number"
                      name="amount"
                      placeholder="e.g. 500"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <FieldLabel label="Balance" />
                    <input
                      className={inputClass}
                      type="number"
                      name="current_balance"
                      placeholder="e.g. 25000"
                      value={formData.current_balance}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <FieldLabel label="Forecast Days" />
                    <input
                      className={inputClass}
                      type="number"
                      name="forecast_days"
                      placeholder="e.g. 7"
                      value={formData.forecast_days}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Error / Success */}
                {error && (
                  <p className="text-red-500 text-xs font-semibold tracking-wide">{error}</p>
                )}
                {success && (
                  <p className="text-green-600 text-xs font-semibold tracking-wide uppercase">
                    Entry submitted successfully!
                  </p>
                )}

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#005A92] hover:bg-[#0A1929] text-white py-5 px-6 uppercase font-extrabold tracking-[0.3em] text-[10px] transition-all shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Submit Entry"}
                  </button>
                </div>
              </form>
            </div>

            {/* Insight Cards */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e2e8f0] p-5 flex items-start gap-4">
                <div className="h-10 w-10 bg-[#005A92]/5 flex items-center justify-center text-[#005A92] shrink-0">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                </div>
                <div>
                  <h4
                    className="text-[10px] font-bold uppercase tracking-widest text-[#0A1929] mb-1"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Architectural Security
                  </h4>
                  <p className="text-[11px] text-[#64748b] leading-relaxed">
                    Encrypted entries processed via the proprietary Aeon Ledger model.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-5 flex items-start gap-4">
                <div className="h-10 w-10 bg-[#005A92]/5 flex items-center justify-center text-[#005A92] shrink-0">
                  <span className="material-symbols-outlined text-lg">auto_graph</span>
                </div>
                <div>
                  <h4
                    className="text-[10px] font-bold uppercase tracking-widest text-[#0A1929] mb-1"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Precision Analytics
                  </h4>
                  <p className="text-[11px] text-[#64748b] leading-relaxed">
                    Analysis updates your financial trend immediately upon submission.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}