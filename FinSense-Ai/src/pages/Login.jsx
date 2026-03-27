import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// const MailIcon = () => (
//   <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//   </svg>
// );
const MailIcon = () => (
  <svg
    className="w-4 h-4 block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#94a3b8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
    )}
  </svg>
);

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(150deg, #f0f2f7 0%, #e8ecf5 50%, #eef0f7 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 relative z-20">
        <span className="text-[#0d2d5e] font-bold text-lg tracking-tight">FinSense-AI</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Security", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-slate-500 text-sm hover:text-[#0d2d5e] transition-colors">{item}</a>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-slate-600 text-sm hover:text-[#0d2d5e] transition-colors px-3 py-1.5">Login</Link>
          <Link to="/signup" className="bg-[#0d2d5e] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#1a4a8a] transition-all shadow-md shadow-[#0d2d5e]/20">Sign Up</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-md text-slate-600 hover:text-[#0d2d5e] hover:bg-slate-100 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-slate-200 px-5 py-4 flex flex-col gap-3 shadow-sm z-10">
          {["Features", "Security", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-slate-600 text-sm hover:text-[#0d2d5e] transition-colors py-1.5 border-b border-slate-100 last:border-0">{item}</a>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <Link to="/login" className="text-slate-600 text-sm font-medium hover:text-[#0d2d5e]">Login</Link>
            <Link to="/signup" className="bg-[#0d2d5e] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#1a4a8a] transition-all">Sign Up</Link>
          </div>
        </div>
      )}

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-5 sm:px-8 lg:px-16 py-10 lg:py-0 relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="hidden lg:block absolute right-[13%] top-[8%] w-72 h-28 rounded-2xl opacity-30 blur-sm" style={{ background: "linear-gradient(135deg, #c9d6e8, #dde4f0)" }} />
        <div className="hidden lg:block absolute right-[10%] bottom-[12%] w-56 h-20 rounded-2xl opacity-20 blur-sm" style={{ background: "linear-gradient(135deg, #b8c9e0, #cdd8ed)" }} />

        {/* Left — desktop brand copy */}
        <div className="hidden lg:flex flex-1 flex-col max-w-lg pr-10">
          <p className="text-[#1a6bbf] text-xs font-bold uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-[#1a6bbf]" />
            Security Protocol 4.0
          </p>
          <h1 className="text-[#0d2d5e] text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Enter the<br />
            <span className="text-[#1a6bbf]">Digital Vault.</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
            Architectural precision in finance. Access your insights with encrypted clarity and absolute structural integrity.
          </p>
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[#1a6bbf]" />
            <p className="text-slate-500 text-sm italic" style={{ fontFamily: "Georgia, serif" }}>Clarity over complexity.</p>
          </div>
        </div>

        {/* Mobile/tablet compact brand heading */}
        <div className="lg:hidden w-full max-w-sm text-center">
          <p className="text-[#1a6bbf] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-px bg-[#1a6bbf]" />
            Security Protocol 4.0
            <span className="inline-block w-5 h-px bg-[#1a6bbf]" />
          </p>
          <h1 className="text-[#0d2d5e] text-3xl sm:text-4xl font-bold leading-tight mb-1" style={{ fontFamily: "Georgia, serif" }}>
            Enter the <span className="text-[#1a6bbf]">Digital Vault.</span>
          </h1>
          <p className="text-slate-500 text-sm italic">Clarity over complexity.</p>
        </div>

        {/* ── Login Card ── */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-[#0d2d5e] text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>Welcome Back</h2>
              <p className="text-slate-400 text-sm">Please identify yourself to proceed.</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-2">
                <span className="mt-px flex-shrink-0">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Professional Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-4 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-[#1a6bbf] focus:ring-2 focus:ring-[#1a6bbf]/10 transition-all placeholder-slate-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vault Key</label>
                  <a href="#" className="text-[#1a6bbf] text-xs hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2"><LockIcon /></span>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-lg outline-none focus:border-[#1a6bbf] focus:ring-2 focus:ring-[#1a6bbf]/10 transition-all placeholder-slate-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    <EyeIcon open={showPass} />
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${remember ? "bg-[#0d2d5e] border-[#0d2d5e]" : "border-slate-300 group-hover:border-[#1a6bbf]"}`}
                >
                  {remember && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className="text-slate-500 text-sm">Maintain active session</span>
              </label>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md
                  ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[#0d2d5e] hover:bg-[#1a4a8a] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"}`}
                style={{ fontFamily: "Georgia, serif" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-[10px] uppercase tracking-widest whitespace-nowrap">External Identity</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* ✅ Fixed Google Login — correct env var + navigate + setError */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await axios.post(
                        `${API_BASE}/auth/google`,
                        { credential: credentialResponse.credential }
                      );
                      if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                      }
                      if (res.data.user) {
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                      }
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
                No credentials yet?{" "}
                <Link to="/signup" className="text-[#1a6bbf] font-semibold hover:underline">Establish an Account</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="px-5 sm:px-8 lg:px-10 py-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <span className="text-[#0d2d5e] text-xs font-bold uppercase tracking-widest">FinSense-AI</span>
          {["Privacy Policy", "Terms of Service", "Support", "Security Standards"].map((link) => (
            <a key={link} href="#" className="hidden sm:inline text-slate-400 text-[10px] uppercase tracking-widest hover:text-[#0d2d5e] transition-colors">{link}</a>
          ))}
        </div>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">
          <span className="hidden sm:inline">© 2024 FinSense-AI. Architectural Precision in Finance.</span>
          <span className="sm:hidden">© 2024 FinSense-AI</span>
        </p>
      </footer>
    </div>
  );
}