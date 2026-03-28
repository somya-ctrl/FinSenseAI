import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Icon = ({ name, className = '' }) => {
  const icons = {
    email: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="#0F7173" strokeWidth="1.4"/>
        <path d="M2 8l9 6 9-6" stroke="#0F7173" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    phone: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 3h4.5l2.5 6-3 1.8a12 12 0 005.2 5.2L16 13l6 2.5V20a2 2 0 01-2 2C8 22 0 14 0 4a2 2 0 012-2h3z" 
          stroke="#0B2545" strokeWidth="1.3" strokeLinejoin="round" fill="none" transform="scale(0.9) translate(1,1)"/>
      </svg>
    ),
    chat: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M3 3h20v16H15l-5 4v-4H3V3z" stroke="#14A89B" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <circle cx="9" cy="11" r="1.5" fill="#14A89B"/>
        <circle cx="13" cy="11" r="1.5" fill="#14A89B"/>
        <circle cx="17" cy="11" r="1.5" fill="#14A89B"/>
      </svg>
    ),
    send: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    clock: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="#0F7173" strokeWidth="1.2"/>
        <path d="M6 3.5V6l1.5 1.5" stroke="#0F7173" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  };
  
  return <span className={className}>{icons[name]}</span>;
};

export default function HelpSupport() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-50/94 backdrop-blur-md border-b border-black/10 flex items-center h-15 px-12 gap-8">
        <div className="text-lg font-bold text-slate-900">
          FinSense<span className="text-teal-600">-AI</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs text-slate-500 hover:text-slate-900 transition-colors ml-auto"
        >
          Back to Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 md:py-24 text-center overflow-hidden">
        {/* Curved bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50"
          style={{
            clipPath: 'ellipse(55% 100% at 50% 100%)',
          }}
        />
        
        <div className="relative z-10">
          <p className="text-xs font-medium tracking-widest text-teal-400 uppercase mb-4">
            Help & Support
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            We're here to help
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
            Reach our support team by email or phone, or use our AI assistant — coming soon.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">

        {/* Contact Section */}
        <div>
          <p className="text-xs font-medium tracking-widest text-teal-600 uppercase mb-6">
            Contact us
          </p>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {/* Email Card */}
            <a
              href="mailto:support@finsense.ai"
              onMouseEnter={() => setHoveredCard('email')}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white border border-black/10 rounded-2xl p-8 flex flex-col gap-3 no-underline text-inherit
                hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Icon name="email" />
              </div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Email support
              </p>
              <h3 className="text-2xl font-bold text-slate-900">Write to us</h3>
              <p className="text-base font-medium text-teal-600">support@finsense.ai</p>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Send us a detailed message anytime. We respond within 24 hours on business days.
              </p>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+911800123456"
              onMouseEnter={() => setHoveredCard('phone')}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white border border-black/10 rounded-2xl p-8 flex flex-col gap-3 no-underline text-inherit
                hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                <Icon name="phone" />
              </div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Phone support
              </p>
              <h3 className="text-2xl font-bold text-slate-900">Call us</h3>
              <p className="text-base font-medium text-teal-600">1800-123-4567</p>
              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Toll free. Available Monday to Saturday, 9 AM – 6 PM IST.
              </p>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-black/10 mb-16" />

        {/* FinBot Feature Section */}
        <div>
          <p className="text-xs font-medium tracking-widest text-teal-600 uppercase mb-6">
            Upcoming feature
          </p>

          {/* Feature Card */}
          <div className="bg-white border border-black/10 rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-200/30 flex items-center justify-center flex-shrink-0">
                <Icon name="chat" />
              </div>
              
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 bg-green-500/15 text-teal-500 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  In development
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  AI Help Assistant — FinBot
                </h2>
                <p className="text-sm text-slate-400 font-light leading-relaxed max-w-lg">
                  An intelligent chatbot that answers your support questions using your actual business data — not generic responses.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10">
              <p className="text-sm font-medium text-slate-900 mb-6">
                What FinBot will be able to do
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    title: 'Answer support questions 24/7',
                    desc: 'Ask anything about how FinSense works — categorization, forecasting, anomaly detection — and get instant answers, any time of day.',
                  },
                  {
                    title: 'Explain your financial data',
                    desc: 'Ask "Why was this transaction flagged?" or "What is my biggest expense?" and get answers grounded in your actual business data.',
                  },
                  {
                    title: 'Guide new users through setup',
                    desc: 'FinBot will walk new businesses through onboarding, explain each feature, and help them get their first insights quickly.',
                  },
                  {
                    title: 'Escalate to human support',
                    desc: 'When FinBot cannot resolve an issue, it will automatically create a support ticket and route it to our team on your behalf.',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-slate-100/60 rounded-2xl p-5 flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 mb-1">
                        {feature.title}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <p className="text-sm font-medium text-slate-900 mb-4">Preview</p>

              {/* Mock Chat */}
              <div className="bg-slate-100 border border-black/10 rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-slate-900 px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold">
                    F
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">FinBot</p>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    AI Assistant
                  </p>
                </div>

                {/* Messages */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Bot Message */}
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-white border border-black/10 rounded-2xl rounded-tl-sm p-3 text-sm leading-relaxed text-slate-900">
                      Hello! I'm FinBot, your AI financial assistant. How can I help you today?
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-teal-600 rounded-2xl rounded-tr-sm p-3 text-sm leading-relaxed text-white">
                      Why was my ₹4,200 travel expense flagged as an anomaly?
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="max-w-md bg-white border border-black/10 rounded-2xl rounded-tl-sm p-3 text-sm leading-relaxed text-slate-900">
                      Your average travel expense is ₹820 per transaction. The ₹4,200 entry is 5.1× above that average, which triggers our anomaly threshold of 3×. It's not blocked — just flagged for your review. If this was a planned trip, you can dismiss the alert.
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-black/10 p-4 flex gap-2 bg-white">
                  <input
                    type="text"
                    placeholder="Ask a question about your finances..."
                    disabled
                    className="flex-1 px-4 py-2 rounded-lg border border-black/10 bg-slate-100 text-sm
                      text-slate-600 placeholder-slate-500 disabled:opacity-50"
                  />
                  <button
                    disabled
                    className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white disabled:opacity-50"
                  >
                    <Icon name="send" />
                  </button>
                </div>

                {/* Coming Soon Banner */}
                <div className="bg-teal-100/50 border-t border-teal-200 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-teal-700 uppercase tracking-wide">
                    <Icon name="clock" className="w-3 h-3" />
                    Coming soon
                  </div>
                  <p className="text-xs text-slate-600">
                    FinBot will be available in the next release
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600 mt-12">
        <span>© 2026 FinSense AI. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors">
            Terms of Use
          </a>
          <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors">
            API Docs
          </a>
        </div>
      </footer>
    </div>
  );
}