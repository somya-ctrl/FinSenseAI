import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"
const API_BASE_URL = "http://localhost:3000/api"; // ✅ backend URL
const user = JSON.parse(localStorage.getItem("user") || "{}");
const BUSINESS_ID = localStorage.getItem("business_id") || "BIZ_001";
const USER_ID = user?.id || user?._id || user?.user_id || "";

function Icon({ name, filled = false, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24"
          : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24",
        verticalAlign: "middle",
      }}
    >
      {name}
    </span>
  );
}

const QUICK_ACTIONS = [
  "Summarize financials",
  "Top expenses?",
  "Export P&L Statement",
  "Tax projection Q3",
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "bot",
    icon: "smart_toy",
    content: (
      <p>
        Good morning. I've analyzed your ledgers for{" "}
        <span className="font-bold text-[#00426d]">{BUSINESS_ID}</span>. How can I
        help you today?
      </p>
    ),
  },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("business_id");
    window.location.href = "/login";
  };

  return (
    <aside className="w-[260px] shrink-0 flex flex-col h-full bg-[#f2f4f6]/90 backdrop-blur-xl shadow-[40px_0_40px_-20px_rgba(25,28,30,0.06)] z-40">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#00426d] flex items-center justify-center rounded-lg shadow-lg">
              <Icon name="account_balance" filled className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#00426d] tracking-tight" style={{ fontFamily: "Manrope" }}>
                FinSense<span className="text-[#006a6a]">Ai</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#717881]">AI Financial Vault</p>
            </div>
          </div>
          <div className="px-3 py-1.5 bg-white rounded-full inline-flex items-center gap-2 border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-[#006a6a]" />
            <span className="text-[11px] font-bold text-[#00426d]">BIZ_001</span>
          </div>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#717881] mb-3">Snapshot</p>
        <div className="space-y-3 flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-medium uppercase text-[#717881]">Total Income</span>
            <h3 className="text-lg font-bold text-[#00426d] mt-1" style={{ fontFamily: "Manrope" }}>$142,850.00</h3>
            <div className="mt-2 h-1 w-full bg-[#eceef0] rounded-full overflow-hidden">
              <div className="h-full bg-[#006a6a] w-3/4" />
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-medium uppercase text-[#717881]">Total Expense</span>
            <h3 className="text-lg font-bold text-[#00426d] mt-1" style={{ fontFamily: "Manrope" }}>$68,210.45</h3>
            <div className="mt-3">
              <span className="px-2 py-0.5 bg-[#ffdad6] text-[#93000a] text-[9px] font-bold rounded-full">
                TOP: SALARIES
              </span>
            </div>
          </div>
          <div className="p-4 bg-[#00426d] text-white rounded-xl shadow-lg hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-medium uppercase opacity-80">Net Profit</span>
            <h3 className="text-xl font-bold mt-1" style={{ fontFamily: "Manrope" }}>$74,639.55</h3>
            <div className="mt-2 flex items-center gap-1">
              <Icon name="trending_up" className="text-sm" />
              <span className="text-[10px] font-bold">+12% vs LY</span>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:translate-x-1 transition-transform">
            <span className="text-[10px] font-medium uppercase text-[#717881]">Current Balance</span>
            <h3 className="text-lg font-bold text-[#00426d] mt-1" style={{ fontFamily: "Manrope" }}>$31,120.00</h3>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#e6e8ea] hover:bg-[#e0e3e5] text-[#00426d] font-bold text-xs rounded-xl transition-all active:scale-95"
          >
            <Icon name="logout" className="text-sm" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ onClear }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#f2f4f6] sticky top-0 z-30 border-b border-gray-200/60">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[#00426d] tracking-tight" style={{ fontFamily: "Manrope" }}>
          FinBot AI
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200">
          <span className="text-[11px] font-bold text-[#717881] uppercase tracking-wider">Llama 3.1 · 8B</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#006a6a] animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onClear}
          className="p-2 text-[#717881] hover:bg-[#e6e8ea] rounded-full transition-colors flex items-center gap-2 text-sm font-bold"
        >
          <Icon name="delete_sweep" className="text-lg" />
          Clear Chat
        </button>
      </div>
    </header>
  );
}

// ── Message bubbles ───────────────────────────────────────────────────────────
function BotMessage({ icon, children, isTyping = false }) {
  return (
    <div className="flex gap-4 max-w-4xl">
      <div className="w-10 h-10 rounded-lg bg-[#005a92] flex-shrink-0 flex items-center justify-center shadow-md">
        <Icon name={icon} filled className="text-[#a6d0ff]" />
      </div>
      {isTyping ? (
        <div className="flex items-center gap-3 px-6 py-4 bg-white/80 backdrop-blur-md rounded-2xl rounded-tl-none border-l-4 border-[#006a6a] shadow-sm">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 rounded-full bg-[#717881]/40 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
          <span className="text-[10px] font-bold text-[#717881] uppercase tracking-widest ml-1">
            FinBot is crunching numbers...
          </span>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl rounded-tl-none border-l-4 border-[#006a6a] shadow-sm text-[#414750] leading-relaxed w-full">
          {children}
        </div>
      )}
    </div>
  );
}

function UserMessage({ children }) {
  return (
    <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
      <div className="w-10 h-10 rounded-lg bg-[#e6e8ea] flex-shrink-0 flex items-center justify-center">
        <Icon name="person" className="text-[#00426d]" />
      </div>
      <div className="bg-[#00426d] p-6 rounded-2xl rounded-tr-none shadow-xl text-white leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ── Chat input ────────────────────────────────────────────────────────────────
function ChatInput({ onSend, isTyping }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!text.trim() || isTyping) return;
    onSend(text.trim());
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <footer className="absolute bottom-0 left-0 w-full px-8 pt-6 pb-8 bg-gradient-to-t from-[#f7f9fb] via-[#f7f9fb]/95 to-transparent">
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_ACTIONS.map((label) => (
          <button
            key={label}
            onClick={() => onSend(label)}
            disabled={isTyping}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-[#00426d] hover:bg-[#00426d] hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex items-end gap-3 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-gray-200/60">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={autoResize}
            onKeyDown={handleKey}
            placeholder="Ask FinBot anything..."
            disabled={isTyping}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 py-4 px-6 text-[#191c1e] placeholder:text-[#717881]/60 resize-none font-medium text-sm disabled:opacity-50"
            style={{ maxHeight: "160px" }}
          />
        </div>
        <div className="flex items-center gap-2 p-2">
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="w-12 h-12 bg-[#00426d] flex items-center justify-center text-white rounded-xl shadow-lg hover:shadow-[#00426d]/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Icon name="arrow_forward" filled />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function FinBotAI() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: <p>{text}</p>,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/finbot/chat`,
        {
          business_id: BUSINESS_ID,
          message: text,
           user_id:USER_ID ,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.reply;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          icon: "auto_awesome",
          content: <p>{reply}</p>,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          icon: "error",
          content: (
            <p className="text-red-500">
              ⚠️ Unable to connect to FinBot. Please try again.
            </p>
          ),
           
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_BASE_URL}/finbot/chat/reset`,
        {
             user_id: USER_ID,
          business_id: BUSINESS_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Reset error:", error.message);
    }

    setMessages(INITIAL_MESSAGES);
    setIsTyping(false);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <div className="flex h-screen overflow-hidden bg-[#f7f9fb] text-[#191c1e]" style={{ fontFamily: "Inter" }}>
        <Sidebar />

        <main className="flex-1 flex flex-col relative overflow-hidden">
          <TopBar onClear={handleClear} />

          <section className="flex-1 overflow-y-auto px-8 pt-8 pb-64 space-y-8" style={{ scrollbarWidth: "thin" }}>
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserMessage key={msg.id}>{msg.content}</UserMessage>
              ) : (
                <BotMessage key={msg.id} icon={msg.icon}>
                  {msg.content}
                </BotMessage>
              )
            )}
            {isTyping && <BotMessage icon="auto_awesome" isTyping />}
            <div ref={bottomRef} />
          </section>

          <ChatInput onSend={handleSend} isTyping={isTyping} />
        </main>
      </div>
    </>
  );
}