import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < strength ? colors[strength - 1] : "bg-slate-200"}`} />
      ))}
    </div>
  );
};

// ✅ Change this to your actual backend URL
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

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
      <nav className="flex items-center justify-between px-10 py-4">
        <span className="text-[#0d2d5e] font-bold text-lg tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
          FinSense-AI
        </span>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Security", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-slate-500 text-sm hover:text-[#0d2d5e] transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-slate-600 text-sm hover:text-[#0d2d5e] transition-colors px-3 py-1.5">Login</Link>
          <Link to="/signup" className="bg-[#0d2d5e] text-white text-sm px-5 py-2 rounded-lg hover:bg-[#1a4a8a] transition-all shadow-md shadow-[#0d2d5e]/20">Sign Up</Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden flex">

          {/* Left Panel */}
          <div
            className="w-[42%] flex-shrink-0 flex flex-col justify-between p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #0d2d5e 0%, #1a4a8a 100%)" }}
          >
            <div className="absolute inset-0 opacity-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border border-white rounded-full"
                  style={{ width: `${(i + 1) * 80}px`, height: `${(i + 1) * 80}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <h1 className="text-white text-3xl font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Architectural<br />Precision in<br />Finance.
              </h1>
              <p className="text-blue-200/80 text-sm leading-relaxed">
                Join the digital vault where small business owners find structural clarity and AI-driven insights.
              </p>
            </div>
            <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
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

          {/* Right Panel */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <div className="mb-7">
              <h2 className="text-[#0d2d5e] text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>Create Account</h2>
              <p className="text-slate-400 text-sm">Start your journey toward financial clarity.</p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <span>⚠</span> {error}
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
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
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
                  className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${agreed ? "bg-[#0d2d5e] border-[#0d2d5e]" : "border-slate-300 group-hover:border-[#1a4a8a]"}`}
                >
                  {agreed && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className="text-slate-500 text-xs leading-relaxed">
                  I agree to the <a href="#" className="text-[#1a4a8a] underline underline-offset-2">Terms of Service</a> and <a href="#" className="text-[#1a4a8a] underline underline-offset-2">Privacy Policy</a>
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
                <span className="text-slate-400 text-xs uppercase tracking-widest">or sign up with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Social */}
              
           <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 text-sm font-medium">
            <GoogleIcon /> Google
             </button>
              
              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#0d2d5e] font-semibold hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-10 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
        <div className="flex items-center gap-5">
          <span className="text-[#0d2d5e] text-xs font-bold uppercase tracking-widest">FinSense-AI</span>
          {["Privacy Policy", "Terms of Service", "Support", "Security Standards"].map((link) => (
            <a key={link} href="#" className="text-slate-400 text-[10px] uppercase tracking-widest hover:text-[#0d2d5e] transition-colors hidden sm:inline">{link}</a>
          ))}
        </div>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest">© 2024 FinSense-AI. Architectural Precision in Finance.</p>
      </footer>
    </div>
  );
}