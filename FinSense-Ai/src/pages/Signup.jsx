import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400"];
  return (
    <div className="flex gap-1 mt-1.5">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? colors[strength - 1] : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }
      if (data.token) localStorage.setItem("token", data.token);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #e8edf5 0%, #f0f4fa 50%, #e4eaf4 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4">
        <span className="text-[#0d2d5e] font-bold text-base sm:text-lg tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
          FinSense-AI
        </span>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Features", "Security", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-slate-500 text-sm hover:text-[#0d2d5e] transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="text-slate-600 text-xs sm:text-sm hover:text-[#0d2d5e] transition-colors px-2 sm:px-3 py-1.5">
            Login
          </Link>
          <Link to="/signup" className="bg-[#0d2d5e] text-white text-xs sm:text-sm px-3 sm:px-5 py-2 rounded-lg hover:bg-[#1a4a8a] transition-all shadow-md shadow-[#0d2d5e]/20">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col md:flex-row">

          {/* Left Panel — desktop only */}
          <div
            className="hidden md:flex w-full md:w-[42%] flex-shrink-0 flex-col justify-between p-8 lg:p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0d2d5e 0%, #1a4a8a 100%)" }}
          >
            <div className="absolute inset-0 opacity-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-white rounded-full"
                  style={{ width: `${(i + 1) * 80}px`, height: `${(i + 1) * 80}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <h1 className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Architectural<br />Precision in<br />Finance.
              </h1>
              <p className="text-blue-200/80 text-sm leading-relaxed">
                Join the digital vault where small business owners find structural clarity and AI-driven insights.
              </p>
            </div>
            <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 lg:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center">
                  <span className="text-emerald-300 text-xs">✦</span>
                </div>
                <span className="text-white/70 text-xs uppercase tracking-widest">Insight of the day</span>
              </div>
              <p className="text-white/85 text-sm italic leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                "Precision is the foundation of scale. Your ledger isn't just a record, it's your blueprint for growth."
              </p>
            </div>
          </div>

          {/* Mobile top banner — mobile only */}
          <div
            className="flex md:hidden flex-col items-center justify-center px-6 py-7 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0d2d5e 0%, #1a4a8a 100%)" }}
          >
            <h1 className="text-white text-xl font-bold text-center mb-1.5" style={{ fontFamily: "Georgia, serif" }}>
              Architectural Precision in Finance.
            </h1>
            <p className="text-blue-200/80 text-xs text-center">
              AI-driven insights for small business owners.
            </p>
          </div>

          {/* Right Panel */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-5 sm:mb-7">
              <h2 className="text-[#0d2d5e] text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Create Account
              </h2>
              <p className="text-slate-400 text-sm">Start your journey toward financial clarity.</p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠</span> {error}
              </div>
            )}
            {success && (
              <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-600 text-sm flex items-center gap-2">
                <span>✓</span> {success}
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-[#1a4a8a] focus:ring-2 focus:ring-[#1a4a8a]/10 transition-all placeholder-slate-300"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Work Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@business.com"
                  className="w-full px-3.5 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-[#1a4a8a] focus:ring-2 focus:ring-[#1a4a8a]/10 transition-all placeholder-slate-300"
                  style={{ fontFamily: "Georgia, serif" }}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pr-10 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-[#1a4a8a] focus:ring-2 focus:ring-[#1a4a8a]/10 transition-all placeholder-slate-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <EyeIcon />
                  </button>
                </div>
                {form.password && <PasswordStrength password={form.password} />}
                <p className="text-slate-400 text-[11px] mt-1.5 flex items-center gap-1">
                  <span className="text-[#1a4a8a]">ⓘ</span> Must be at least 8 characters with a symbol.
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                    agreed ? "bg-[#0d2d5e] border-[#0d2d5e]" : "border-slate-300 group-hover:border-[#1a4a8a]"
                  }`}
                >
                  {agreed && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className="text-slate-500 text-xs leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#1a4a8a] underline underline-offset-2">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#1a4a8a] underline underline-offset-2">Privacy Policy</a>
                </span>
              </label>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition-all duration-200 tracking-wide shadow-md flex items-center justify-center gap-2
                  ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[#0d2d5e] hover:bg-[#1a4a8a] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"}`}
                style={{ fontFamily: "Georgia, serif" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Account...
                  </>
                ) : "Create Account"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-xs uppercase tracking-widest whitespace-nowrap">or sign up with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Google Login */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await axios.post(`${API_BASE}/auth/google`, {
                        credential: credentialResponse.credential,
                      });
                      if (res.data.token) localStorage.setItem("token", res.data.token);
                      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
                      navigate("/dashboard");
                    } catch (err) {
                      console.error("Google login failed", err);
                      setError("Google login failed. Please try again.");
                    }
                  }}
                  onError={() => setError("Google login failed. Please try again.")}
                  width="100%"
                />
              </div>

              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0d2d5e] font-semibold hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <span className="text-[#0d2d5e] text-xs font-bold uppercase tracking-widest">FinSense-AI</span>
          {["Privacy Policy", "Terms of Service", "Support", "Security Standards"].map((link) => (
            <a key={link} href="#" className="text-slate-400 text-[10px] uppercase tracking-widest hover:text-[#0d2d5e] transition-colors hidden sm:inline">
              {link}
            </a>
          ))}
        </div>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">© 2024 FinSense-AI. Architectural Precision in Finance.</p>
      </footer>
    </div>
  );
}