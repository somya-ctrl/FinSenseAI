

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdownn from "react-markdown";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const Icon = ({ name, fill = false, className = '' }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={fill ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

const navItems = [
  { icon: 'dashboard', label: 'Overview', href: '#', path: '/overview' },
  { icon: 'account_balance_wallet', label: 'Cash Flow Prediction', href: '#', path: '/cash-flow' },
  { icon: 'description', label: 'Analyze Transaction', href: '#', path: '/analyze' },
  { icon: 'psychology', label: 'FinBot', href: '#', path: '/finbot', active: true },
  { icon: 'payments', label: 'Reports', href: '#', path: '/reports' },
  { icon: 'settings', label: 'Settings', href: '#', path: '/settings' },
];

function Sidebar({ onSignOut }) {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col p-4 z-40 w-64 border-r-0 bg-slate-100 dark:bg-slate-900 font-['Manrope'] antialiased tracking-tight">
      <div className="mb-8 px-2">
        <h1 className="text-lg tracking-tighter text-sky-950 dark:text-sky-100 uppercase">
          <span className="font-normal">FINSENSE</span>
          <span className="font-bold">AI</span>
        </h1>
        <p className="text-[10px] font-bold tracking-[0.1em] text-slate-500 uppercase mt-0.5">
          Small Biz Edition
        </p>
      </div>

      <button className="w-full py-3 mb-8 bg-sky-900 dark:bg-sky-700 text-white font-bold rounded-lg text-xs tracking-widest transition-transform active:scale-95 shadow-sm hover:bg-sky-800 dark:hover:bg-sky-600">
        NEW ENTRY
      </button>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
              item.active
                ? 'bg-white dark:bg-slate-800 text-sky-900 dark:text-sky-300 font-semibold shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Icon name={item.icon} className="text-[20px]" />
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="pt-4 mt-auto border-t border-slate-200 dark:border-slate-800 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:text-sky-800 dark:hover:text-sky-200 transition-colors duration-200 rounded-lg"
        >
          <Icon name="help" className="text-[20px]" />
          <span className="text-sm font-medium">Help Center</span>
        </a>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 rounded-lg text-left"
        >
          <Icon name="logout" className="text-[20px]" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function TopAppBar() {
  return (
    <header className="flex items-center justify-between ml-64 px-8 py-4 w-[calc(100%-16rem)] fixed top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl z-30 font-['Manrope'] text-sm font-medium border-b border-slate-200 dark:border-slate-800">
      <div>
        <h2 className="text-xl font-bold text-sky-900 dark:text-sky-400 tracking-tight uppercase">
          FinBot AI Assistant
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-slate-500 hover:text-sky-900 dark:hover:text-sky-400 transition-colors">
          notifications
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img
            alt="User Avatar"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4xQLQCjCXetnQVXHIzM-4UrbaX5BQuLpqXtDQT5v7ssDa3InN8pzZem158vda-shPCSDqwOC3zTamxs_uY6R1F_Ec0YxG2pfbkPkwWvlt21KJO7UcUk83jEo0zD0WctJX8lvIkWO33jtn9M7tGCeM7DxrLQw2bSf60KjMCXJSRv7sTGaebNN-hM1khGmGrTpCgEioErO0wX_HyWzIwLQ0rP62OG3MfQPfSBTTpyTJd4EYCoqHnI0RtJobUVrg2X3TkSXSPbrq5B1g"
          />
        </div>
      </div>
    </header>
  );
}

function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-sky-900 dark:bg-sky-700 text-white rounded-br-none'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed"><ReactMarkdownn>{message.content}</ReactMarkdownn></p>
        <p className={`text-xs mt-2 ${isUser ? 'text-sky-200' : 'text-slate-500 dark:text-slate-400'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 mb-4">
      <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 flex items-start justify-between">
      <div className="flex items-start gap-3 flex-1">
        <Icon name="error" className="text-red-600 dark:text-red-400 mt-1" />
        <div>
          <p className="font-semibold text-red-800 dark:text-red-300">Error</p>
          <p className="text-sm text-red-700 dark:text-red-400 mt-1">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 text-xs font-bold text-red-600 dark:text-red-400 hover:underline whitespace-nowrap"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default function FinBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Hi! I'm FinBot, your AI financial assistant. I can help you with cash flow analysis, expense tracking, financial advice, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryMessage, setRetryMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const symbolsLink = document.createElement('link');
    symbolsLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
    symbolsLink.rel = 'stylesheet';
    document.head.appendChild(symbolsLink);
  }, []);

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    setError('');
    const userMessage = {
      id: Date.now(),
      content: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setRetryMessage(messageText);

    try {
      const token = localStorage.getItem('token');
      const businessId = localStorage.getItem('businessId');
      const userId = localStorage.getItem('userId');

      // Validate required data
      if (!businessId || !userId) {
        throw new Error('Missing business ID or user ID. Please log in again.');
      }

      const response = await fetch(`${API_BASE_URL}/finbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify({
          message: messageText,
          business_id: businessId,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific error codes
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        } else if (response.status === 404) {
          throw new Error('FinBot service is unavailable. Please try again later.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(
            errorData?.message ||
              errorData?.detail ||
              `Failed to send message (${response.status})`
          );
        }
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        content: data?.reply || data?.response || data?.message || 'I understood your message but couldn\'t generate a response.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setRetryMessage(null);
    } catch (err) {
      console.error('FinBot Error:', err);
      
      let errorMessage = err.message;
      
      // Provide helpful error messages
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Check your connection and try again.';
      } else if (err.message.includes('JSON')) {
        errorMessage = 'Invalid response from server. Please try again.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).catch(() => {
            // Continue logout even if API call fails
          });
        }
      } finally {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const handleRetry = () => {
    if (retryMessage) {
      handleSendMessage(retryMessage);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen">
      <Sidebar onSignOut={handleSignOut} />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <TopAppBar />

        <main className="pt-24 pb-24 px-4 md:px-8 flex-1 flex flex-col">
          {/* Chat Container */}
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} isUser={msg.isUser} />
              ))}

              {loading && <TypingIndicator />}

              {error && (
                <ErrorMessage message={error} onRetry={handleRetry} />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Buttons */}
            {messages.length === 1 && !loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() =>
                    handleSendMessage('Can you analyze my recent transactions?')
                  }
                  className="p-4 rounded-lg bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors text-left border border-sky-200 dark:border-sky-800"
                >
                  <p className="font-semibold text-sky-900 dark:text-sky-400 text-sm">
                    Analyze Transactions
                  </p>
                  <p className="text-xs text-sky-700 dark:text-sky-300 mt-1">
                    Get insights into your spending patterns
                  </p>
                </button>
                <button
                  onClick={() =>
                    handleSendMessage('What\'s my cash flow forecast for next week?')
                  }
                  className="p-4 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors text-left border border-emerald-200 dark:border-emerald-800"
                >
                  <p className="font-semibold text-emerald-900 dark:text-emerald-400 text-sm">
                    Cash Flow Forecast
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                    Get predicted cash flow insights
                  </p>
                </button>
                <button
                  onClick={() =>
                    handleSendMessage('Help me create a budget for this month')
                  }
                  className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-left border border-purple-200 dark:border-purple-800"
                >
                  <p className="font-semibold text-purple-900 dark:text-purple-400 text-sm">
                    Create Budget
                  </p>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    Get personalized budget recommendations
                  </p>
                </button>
                <button
                  onClick={() =>
                    handleSendMessage('What are my top spending categories?')
                  }
                  className="p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors text-left border border-amber-200 dark:border-amber-800"
                >
                  <p className="font-semibold text-amber-900 dark:text-amber-400 text-sm">
                    Spending Analysis
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    Understand where your money goes
                  </p>
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !loading) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything about your finances..."
                  disabled={loading}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-sky-900 dark:focus:ring-sky-400 outline-none disabled:opacity-50 transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading || !input.trim()}
                  className="bg-sky-900 dark:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-sky-800 dark:hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="text-lg" />
                      Send
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-sky-900 dark:bg-sky-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 hover:bg-sky-800 dark:hover:bg-sky-600">
        <Icon name="add" fill className="text-[28px]" />
      </button>
    </div>
  );
}