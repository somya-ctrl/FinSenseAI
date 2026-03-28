import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3000/api";

function useMaterialSymbols() {
  useEffect(() => {
    const id = "material-symbols-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block";
    document.head.appendChild(link);
    const manrope = document.createElement("link");
    manrope.rel = "stylesheet";
    manrope.href =
      "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap";
    document.head.appendChild(manrope);
  }, []);
}

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

const navItems = [
  { icon: "grid_view",       label: "Overview",             path: "/overview" },
  { icon: "payments",        label: "Cash Flow Prediction", path: "/cashflow" },
  { icon: "account_balance", label: "Analyze Transaction",  path: "/analyze" },
  { icon: "smart_toy",       label: "FinBot",               path: "/finbot" },
  { icon: "bar_chart",       label: "Reports",              path: "/reports" },
  { icon: "settings",        label: "Settings",             path: "/settings" },
];

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (!window.confirm("Are you sure you want to sign out?")) return;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/25 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={[
          "h-screen w-72 fixed left-0 top-0 bg-[#f0f2f5] flex flex-col p-8 z-50",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="mb-10">
          <h1 className="text-2xl font-normal text-[#005183] tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            FINSENSE<span className="font-bold">AI</span>
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 mt-1">
            SMALL BIZ EDITION
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ icon, label, path }) => (
            <a
              key={label}
              href={path}
              onClick={onClose}
              className="flex items-center gap-4 px-6 py-4 text-slate-500 hover:text-[#005183] transition-colors rounded-xl"
            >
              <Icon name={icon} className="text-[22px]" />
              <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <a
            href="/new-entry"
            className="block w-full bg-[#005183] text-white rounded-xl py-5 text-center font-bold text-sm tracking-widest shadow-lg shadow-[#005183]/20 active:scale-95 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            NEW ENTRY
          </a>
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <a href="/help" className="flex items-center gap-4 text-slate-500 hover:text-[#005183] transition-colors">
              <Icon name="help_outline" className="text-[20px]" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Help Center</span>
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-4 text-slate-500 hover:text-red-500 transition-colors w-full text-left"
            >
              <Icon name="logout" className="text-[20px]" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuClick, userName }) {
  return (
    <header className="h-16 flex justify-between items-center px-6 sm:px-10 border-b border-slate-100 bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Icon name="menu" className="text-xl" />
        </button>
        <h2 className="text-base font-bold text-[#005183]">
          {userName ? `${userName} — Account Details` : "Account Details"}
        </h2>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Icon name="notifications" className="text-[24px]" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#005183] rounded-full" />
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Icon name="account_circle" fill className="text-[28px] text-[#005183]" />
        </button>
      </div>
    </header>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="text-[11px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1">
      {children}
      {required && <span className="text-[#f37a20]">*</span>}
    </label>
  );
}

function TextInput({ name, value, onChange, placeholder, type = "text", prefix, error }) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={[
          "w-full border rounded-md px-5 py-4 font-medium text-sm outline-none transition-all",
          prefix ? "pl-9" : "",
          error
            ? "border-red-300 bg-red-50 text-slate-800 focus:ring-1 focus:ring-red-400"
            : "border-slate-200 text-slate-700 bg-white focus:ring-1 focus:ring-[#005183] focus:border-[#005183] hover:border-slate-300",
        ].join(" ")}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-sm font-semibold",
        type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white",
      ].join(" ")}
      style={{ animation: "slideUp 0.3s ease-out" }}
    >
      <Icon name={type === "success" ? "check_circle" : "error"} fill className="text-[20px] flex-shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
        <Icon name="close" className="text-[16px]" />
      </button>
    </div>
  );
}

export default function NewEntry() {
  useMaterialSymbols();

  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  })();

  const [form, setForm] = useState({
    business_name:   storedUser.business_name || "",
    business_id:     storedUser.business_id   || localStorage.getItem("businessId") || "",
    user_id:         storedUser.user_id        || localStorage.getItem("userId")     || "",
    description:     "",
    amount:          "",
    balance:         "",
    category:        "",
    forecast_days:   "7",
    business_type:   "SaaS",
    monthly_revenue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!form.business_name.trim()) errors.business_name  = "Business name is required";
    if (!form.business_id.trim())   errors.business_id    = "Business ID is required";
    if (!form.user_id.trim())       errors.user_id        = "User ID is required";
    if (!form.description.trim())   errors.description    = "Description is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errors.amount = "Enter a valid amount";
    if (!form.balance || isNaN(Number(form.balance)))
      errors.balance = "Enter a valid balance";
    if (!form.forecast_days || isNaN(Number(form.forecast_days)) || Number(form.forecast_days) < 1)
      errors.forecast_days = "Enter a valid number of days";
    if (!form.monthly_revenue || isNaN(Number(form.monthly_revenue)))
      errors.monthly_revenue = "Enter a valid monthly revenue";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }

    setLoading(true);
    setFieldErrors({});

    const payload = {
      business_name:   form.business_name.trim(),
      business_id:     form.business_id.trim(),
      user_id:         form.user_id.trim(),
      description:     form.description.trim(),
      amount:          Number(form.amount),
      balance:         Number(form.balance),
      category:        form.category.trim(),
      forecast_days:   Number(form.forecast_days),
      business_type:   form.business_type,
      monthly_revenue: Number(form.monthly_revenue),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/transactions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const rawText = await res.text();
      let data;
      try { data = JSON.parse(rawText); } catch { throw new Error("Server returned invalid JSON"); }
      if (!res.ok) throw new Error(data?.message || data?.detail || `Request failed (${res.status})`);

      // Save IDs to localStorage for FinBot and other features
      localStorage.setItem("businessId", form.business_id.trim());
      localStorage.setItem("userId",     form.user_id.trim());

      setToast({ message: "Transaction created successfully!", type: "success" });

      // Reset all fields after save
      setForm({
        business_name:   "",
        business_id:     "",
        user_id:         "",
        description:     "",
        amount:          "",
        balance:         "",
        category:        "",
        forecast_days:   "7",
        business_type:   "SaaS",
        monthly_revenue: "",
      });
    } catch (err) {
      setToast({ message: err.message || "Failed to create transaction.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const isFormDirty = Object.values(form).some((v) => v !== "" && v !== "7" && v !== "SaaS");

  return (
    <div className="min-h-screen bg-[#f0f2f5]" style={{ fontFamily: "Manrope, sans-serif" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-72 flex flex-col min-h-screen bg-white">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          userName={storedUser.name || storedUser.user_id || ""}
        />

        <main className="flex-1 p-6 sm:p-10 pb-24 lg:pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                  {/* Business Name */}
                  <div className="space-y-3">
                    <FieldLabel required>Business Name</FieldLabel>
                    <TextInput
                      name="business_name"
                      value={form.business_name}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      error={fieldErrors.business_name}
                    />
                  </div>

                  {/* Business ID */}
                  <div className="space-y-3">
                    <FieldLabel required>Business ID</FieldLabel>
                    <TextInput
                      name="business_id"
                      value={form.business_id}
                      onChange={handleChange}
                      placeholder="e.g. BIZ_001"
                      error={fieldErrors.business_id}
                    />
                  </div>

                  {/* User ID */}
                  <div className="space-y-3">
                    <FieldLabel required>User ID</FieldLabel>
                    <TextInput
                      name="user_id"
                      value={form.user_id}
                      onChange={handleChange}
                      placeholder="e.g. U001"
                      error={fieldErrors.user_id}
                    />
                  </div>

                  {/* Description — full width */}
                  <div className="md:col-span-2 space-y-3">
                    <FieldLabel required>Description</FieldLabel>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="e.g. Paid ₹500 for food"
                      className={[
                        "w-full border rounded-md px-5 py-6 font-medium text-sm outline-none transition-all",
                        fieldErrors.description
                          ? "border-red-300 bg-red-50 text-slate-800 focus:ring-1 focus:ring-red-400"
                          : "border-slate-200 text-slate-700 bg-white focus:ring-1 focus:ring-[#005183] focus:border-[#005183] hover:border-slate-300",
                      ].join(" ")}
                    />
                    {fieldErrors.description && (
                      <p className="mt-1.5 text-[11px] text-red-500 font-medium">{fieldErrors.description}</p>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <FieldLabel required>Amount</FieldLabel>
                    <TextInput
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="e.g. 500"
                      type="number"
                      prefix="₹"
                      error={fieldErrors.amount}
                    />
                  </div>

                  {/* Balance */}
                  <div className="space-y-3">
                    <FieldLabel required>Balance</FieldLabel>
                    <TextInput
                      name="balance"
                      value={form.balance}
                      onChange={handleChange}
                      placeholder="e.g. 25000"
                      type="number"
                      prefix="₹"
                      error={fieldErrors.balance}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <FieldLabel>Category</FieldLabel>
                    <TextInput
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g. Technology"
                    />
                  </div>

                  {/* Forecast Days */}
                  <div className="space-y-3">
                    <FieldLabel required>Forecast Days</FieldLabel>
                    <TextInput
                      name="forecast_days"
                      value={form.forecast_days}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      type="number"
                      error={fieldErrors.forecast_days}
                    />
                  </div>

                  {/* Business Type */}
                  <div className="space-y-3">
                    <FieldLabel>Business Type</FieldLabel>
                    <div className="relative">
                      <select
                        name="business_type"
                        value={form.business_type}
                        onChange={handleChange}
                        className="w-full border border-slate-200 rounded-md px-5 py-4 text-slate-700 font-medium text-sm appearance-none outline-none bg-white focus:ring-1 focus:ring-[#005183] focus:border-[#005183] hover:border-slate-300 transition-all cursor-pointer"
                      >
                        <option value="SaaS">SaaS</option>
                        <option value="Retail">Retail</option>
                        <option value="Service">Service</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other</option>
                      </select>
                      <Icon name="expand_more" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]" />
                    </div>
                  </div>

                  {/* Monthly Revenue — full width */}
                  <div className="md:col-span-2 space-y-3">
                    <FieldLabel required>Monthly Revenue</FieldLabel>
                    <TextInput
                      name="monthly_revenue"
                      value={form.monthly_revenue}
                      onChange={handleChange}
                      placeholder="e.g. 150000"
                      type="number"
                      prefix="₹"
                      error={fieldErrors.monthly_revenue}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 my-10" />

                {/* Submit row */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={[
                      "w-full sm:flex-1 text-white rounded-md py-6 font-bold text-sm tracking-widest shadow-xl transition-all uppercase flex items-center justify-center gap-2",
                      loading
                        ? "bg-slate-400 cursor-not-allowed shadow-none"
                        : "bg-[#005183] hover:bg-[#004070] active:scale-[0.98] shadow-[#005183]/20",
                    ].join(" ")}
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Icon name="save" className="text-[18px]" />
                        Save Changes
                      </>
                    )}
                  </button>

                  {isFormDirty && (
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          business_name: "", business_id: "", user_id: "",
                          description: "", amount: "", balance: "",
                          category: "", forecast_days: "7",
                          business_type: "SaaS", monthly_revenue: "",
                        })
                      }
                      className="w-full sm:w-auto px-8 py-5 border border-slate-200 rounded-md text-slate-500 hover:text-slate-700 hover:border-slate-300 font-bold text-sm tracking-widest uppercase transition-all"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-white border-t border-slate-100 h-16">
          {[
            { icon: "grid_view",  path: "/overview" },
            { icon: "payments",   path: "/cashflow" },
            { icon: "settings",   path: "/settings", active: true },
            { icon: "bar_chart",  path: "/reports" },
          ].map(({ icon, path, active }) => (
            <a key={path} href={path} className={active ? "text-[#005183]" : "text-slate-400"}>
              <Icon name={icon} fill={active} className="text-[26px]" />
            </a>
          ))}
        </nav>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}