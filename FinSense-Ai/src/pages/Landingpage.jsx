import { Link } from "react-router-dom";

/* ─── Icons (inline SVG to avoid extra deps) ─── */
const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);
const ReceiptIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const BankIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l9-4 9 4M3 6v14a1 1 0 001 1h5v-5h4v5h5a1 1 0 001-1V6M3 6h18" />
  </svg>
);
const ChartIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const BrainIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const WalletIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

/* ─── Navbar ─── */
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <span
            className="text-xl font-bold tracking-tighter text-[#00426d]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            FinSense-AI
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["Solutions", "Pricing", "Insights", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-500 hover:text-[#005a92] transition-colors text-sm font-medium"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 text-slate-600 hover:text-[#005a92] font-medium transition-colors text-sm"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-[#005a92] text-white rounded-lg font-semibold hover:bg-[#00426d] transition-all shadow-sm text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative px-8 py-20 lg:py-32 overflow-hidden bg-[#f7f9fb]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* Left copy */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8cf3f3] text-[#007070] text-xs font-bold tracking-widest uppercase">
            <SparkleIcon />
            AI-Powered Accounting
          </div>

          <h1
            className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-[#191c1e] leading-[1.1]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Automate Your <br />
            <span className="text-[#00426d]">Finances</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
            The architectural approach to small business accounting. FinSense-AI uses advanced AI to transform complex cash flows into clear, actionable insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 text-white rounded-md font-bold text-lg hover:opacity-90 transition-all shadow-xl"
              style={{ background: "linear-gradient(135deg, #00426d 0%, #005a92 100%)" }}
            >
              Get Started Free
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 text-[#00426d] font-bold hover:bg-slate-100 transition-all rounded-md">
              View Demo
            </button>
          </div>
        </div>

        {/* Right — Bento mockup */}
        <div className="w-full lg:w-1/2 relative">
          <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[500px]">

            {/* Cash Flow card */}
            <div className="col-span-4 row-span-3 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-t-4 border-[#006a6a]">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Total Cash Flow</span>
                <div
                  className="text-4xl font-extrabold text-[#191c1e] mt-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  $142,850.00
                </div>
              </div>
              <div className="flex items-end gap-2 text-[#006a6a] font-bold text-sm">
                <TrendingUpIcon />
                +12.4% from last month
              </div>
            </div>

            {/* Wallet card */}
            <div className="col-span-2 row-span-4 bg-[#005a92] rounded-xl p-6 text-white flex flex-col justify-between">
              <WalletIcon />
              <div>
                <div className="text-xs uppercase tracking-widest opacity-80">Quick Entry</div>
                <div className="font-bold mt-1">Ready for scan</div>
              </div>
            </div>

            {/* Expenses card */}
            <div className="col-span-3 row-span-3 bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#00426d]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Expenses</span>
              <div className="mt-4 space-y-3">
                <div className="h-2 w-full bg-slate-100 rounded-full">
                  <div className="h-full w-[65%] bg-[#00426d] rounded-full" />
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full">
                  <div className="h-full w-[40%] bg-[#006a6a] rounded-full" />
                </div>
              </div>
            </div>

            {/* AI Insight card */}
            <div className="col-span-3 row-span-2 bg-[#8cf3f3] rounded-xl p-6 flex items-center justify-center gap-3">
              <BrainIcon />
              <span className="text-sm font-bold text-[#007070] leading-tight">
                AI Insight: You can save $400/mo on SaaS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#9acbff]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8cf3f3]/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}

/* ─── Trusted By ─── */
function TrustedBy() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
        {["VANGUARD", "ELEMENTAL", "MERCURY", "STRIKE"].map((name) => (
          <div
            key={name}
            className="font-black text-2xl tracking-tighter text-[#191c1e]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features ─── */
function Features() {
  return (
    <section className="py-24 lg:py-40 px-8 bg-[#f7f9fb]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2
            className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[#191c1e]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Precision at every layer
          </h2>
          <p className="mt-6 text-slate-500 text-lg">
            We've stripped away the noise of traditional accounting tools to focus on what drives your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Feature 1 — Expense Tracking */}
          <div className="md:col-span-7 bg-slate-50 rounded-xl p-10 flex flex-col justify-between group hover:bg-slate-100 transition-colors">
            <div className="max-w-md">
              <div className="text-[#00426d] mb-6"><ReceiptIcon /></div>
              <h3
                className="text-2xl font-bold mb-4 text-[#191c1e]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Automated Expense Tracking with 99.9% AI Accuracy
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Stop wasting hours on manual data entry. FinSense-AI automatically categorizes every transaction in real-time, saving business owners an average of 10 hours per month while maintaining near-perfect accuracy.
              </p>
            </div>
            <div className="mt-12 flex gap-4 overflow-hidden">
              <div className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-sm p-4 border-t-2 border-[#00426d]">
                <div className="w-8 h-8 rounded-full bg-[#00426d]/10 flex items-center justify-center mb-4 text-[#00426d]">☕</div>
                <div className="font-bold text-sm">Starbucks</div>
                <div className="text-xs text-slate-400">$4.50 • Office Supply</div>
              </div>
              <div className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-sm p-4 border-t-2 border-[#006a6a]">
                <div className="w-8 h-8 rounded-full bg-[#006a6a]/10 flex items-center justify-center mb-4 text-[#006a6a]">⚡</div>
                <div className="font-bold text-sm">AWS Cloud</div>
                <div className="text-xs text-slate-400">$1,240 • Software</div>
              </div>
              <div className="flex-shrink-0 w-48 h-32 bg-[#00426d] text-white rounded-lg shadow-xl p-4 flex flex-col justify-center items-center text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>10+ Hours</div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">Saved Monthly</div>
              </div>
            </div>
          </div>

          {/* Feature 2 — Income Management */}
          <div className="md:col-span-5 bg-white rounded-xl p-10 shadow-sm border-b-4 border-[#00426d] hover:shadow-xl transition-all">
            <div className="text-[#006a6a] mb-6"><BankIcon /></div>
            <h3
              className="text-2xl font-bold mb-4 text-[#191c1e]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Smart Income Management
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Manage invoices, track payments, and get alerted when a client is likely to pay late before it happens.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm font-medium">Pending Invoices</span>
                <span className="px-2 py-1 bg-[#8cf3f3] text-[#007070] text-[10px] font-bold rounded">3 ACTIVE</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium">Average Pay-Cycle</span>
                <span className="text-sm font-bold text-[#00426d]">12 Days</span>
              </div>
            </div>
          </div>

          {/* Feature 3 — Cash Flow Prediction */}
          <div className="md:col-span-5 bg-[#00426d] text-white rounded-xl p-10 flex flex-col justify-between">
            <div>
              <div className="text-[#8cf3f3] mb-6"><ChartIcon /></div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Cash Flow Prediction
              </h3>
              <p className="opacity-80 leading-relaxed">
                Our AI looks 90 days into the future of your ledger, identifying potential gaps and growth opportunities.
              </p>
            </div>
            <div className="mt-12">
              <div className="flex items-end gap-1 h-20">
                {[
                  "h-1/2 bg-white/20",
                  "h-3/4 bg-white/30",
                  "h-2/3 bg-white/40",
                  "h-full bg-white/60",
                  "h-5/6 bg-[#8cf3f3]",
                ].map((cls, i) => (
                  <div key={i} className={`w-full rounded-t-sm ${cls}`} />
                ))}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-60">Projected Q4 Runway</div>
            </div>
          </div>

          {/* Feature 4 — Architectural Clarity */}
          <div className="md:col-span-7 bg-slate-50 rounded-xl p-10 flex items-center gap-8">
            <div className="flex-1">
              <h3
                className="text-2xl font-bold mb-4 text-[#191c1e]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Architectural Clarity
              </h3>
              <p className="text-slate-500 leading-relaxed">
                No clutter. No confusing financial jargon. Just the data you need to make decisions that grow your bottom line.
              </p>
              <button className="mt-6 flex items-center gap-2 text-[#00426d] font-bold hover:gap-4 transition-all">
                Explore all features <ArrowRightIcon />
              </button>
            </div>
            {/* Decorative spinner ring */}
            <div
              className="hidden lg:block w-48 h-48 rounded-full border-8 border-slate-200 border-t-[#00426d] flex-shrink-0"
              style={{ animation: "spin 8s linear infinite" }}
            />
          </div>

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-24 px-8">
      <div
        className="max-w-5xl mx-auto rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #00426d 0%, #005a92 100%)" }}
      >
        <div className="relative z-10 space-y-8">
          <h2
            className="text-3xl lg:text-6xl font-extrabold tracking-tighter text-white"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Ready to master your ledger?
          </h2>
          <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto">
            Join over 12,000 small businesses who have traded spreadsheets for structural clarity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/signup"
              className="px-10 py-5 bg-white text-[#00426d] rounded-md font-extrabold text-lg hover:bg-[#8cf3f3] transition-colors"
            >
              Get Started Free
            </Link>
            <button className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-md font-bold text-lg hover:bg-white/10 transition-colors">
              Book a Strategy Call
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8cf3f3]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-white w-full py-12 border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span
            className="font-bold text-[#00426d] text-xl"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            FinSenseAi
          </span>
          <p className="text-slate-500 text-sm text-center md:text-left">
            Building the structural foundation for modern business.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {["Privacy Policy", "Terms of Service", "Security", "API Documentation"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-slate-500 hover:text-[#005a92] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-slate-400 text-sm">
          © 2024 FinSenseAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <div className="bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <main className="pt-24">
        <Hero />
        <TrustedBy />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}