import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Loader2
} from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { sendEmailMessage, openMailtoDraft } from '../../lib/emailService';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isHtml?: boolean;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userEmailInput, setUserEmailInput] = useState('');
  const [askingForEmail, setAskingForEmail] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm Latheesh's virtual developer assistant. Ask me anything about his skills, projects, or internship, or leave a message that I will deliver directly to his email!",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const quickQuestions = [
    { label: 'Skills', query: 'What are your skills?' },
    { label: 'Education', query: 'Where did you study?' },
    { label: 'Projects', query: 'Show me your projects' },
    { label: 'Internship', query: 'Tell me about your internship' },
    { label: 'Leave Message', query: 'I want to send Latheesh a message' },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    // 1. Add User message
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // If currently waiting for user email to deliver a pending message:
    if (askingForEmail && pendingMessage) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: 'bot',
              text: "Please provide a valid email address so Latheesh can respond to your message (e.g. yourname@company.com).",
              timestamp: 'Just now',
            },
          ]);
        }, 500);
        return;
      }

      const emailToUse = text;
      setIsTyping(true);

      try {
        const result = await sendEmailMessage({
          name: 'Portfolio Chat Visitor',
          email: emailToUse,
          subject: 'New Message from Portfolio Chat Widget',
          message: pendingMessage,
          source: 'chat_assistant',
        });

        setIsTyping(false);
        setAskingForEmail(false);
        setPendingMessage(null);

        if (result.method === 'mailto') {
          openMailtoDraft({
            name: 'Portfolio Chat Visitor',
            email: emailToUse,
            subject: 'New Message from Portfolio Chat Widget',
            message: pendingMessage,
            source: 'chat_assistant',
          });
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: 'bot',
              text: `Your message draft has been prepared to deliver directly to ${portfolioData.personal.email}!<br><br>💬 <em>"Thanks for contacting Latheesh K. We have received your message and will get back to you shortly. Keep in touch with us!"</em>`,
              isHtml: true,
              timestamp: 'Just now',
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `b-${Date.now()}`,
              sender: 'bot',
              text: `✔ <strong>Message Transmitted to ${portfolioData.personal.email}!</strong><br><br>💬 <em>"Thanks for contacting Latheesh K. We have received your message and will get back to you shortly. Keep in touch with us!"</em>`,
              isHtml: true,
              timestamp: 'Just now',
            },
          ]);
        }
      } catch (err) {
        setIsTyping(false);
        openMailtoDraft({
          name: 'Portfolio Chat Visitor',
          email: emailToUse,
          subject: 'New Message from Portfolio Chat Widget',
          message: pendingMessage,
          source: 'chat_assistant',
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: `I've opened an email draft to send your message directly to ${portfolioData.personal.email}.`,
            timestamp: 'Just now',
          },
        ]);
        setAskingForEmail(false);
        setPendingMessage(null);
      }
      return;
    }

    // 2. Process query
    setIsTyping(true);
    const lower = text.toLowerCase();

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';

      if (lower.includes('skill') || lower.includes('stack') || lower.includes('technology')) {
        reply = "Latheesh specializes in <strong>Web Development</strong> (React.js, JavaScript, HTML5, CSS3, PHP) and <strong>IT Support</strong> (System Troubleshooting, LAN/Wi-Fi Diagnostics, Windows & Linux). He also works with MySQL, PostgreSQL, MongoDB, and Python for ML.";
      } else if (lower.includes('study') || lower.includes('college') || lower.includes('education') || lower.includes('degree') || lower.includes('mca') || lower.includes('bca')) {
        reply = "He completed his <strong>Master of Computer Applications (MCA)</strong> (2023–2025) and <strong>BCA</strong> (2020–2023) at Vivekananda College of Engineering and Technology (VCET), Puttur, graduating with foundations in enterprise software, databases, and networks.";
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('github')) {
        reply = "Latheesh has engineered 8 featured projects, including the <strong>Smart PPE Compliance Camera</strong> (IoT, selected for KSCST state demonstration), <strong>Cricket Score Prediction</strong> (Machine Learning), and the <strong>Travel Expense Split App</strong> (Winner of VCET CODE-A-THON). Click any card in the Projects section to inspect code and architecture!";
      } else if (lower.includes('intern') || lower.includes('zephyr') || lower.includes('experience')) {
        reply = "He completed an intensive <strong>3-Month AI & ML Internship</strong> at Zephyr Technologies in Mangalore (Nov 2024 – Jan 2025), building predictive regression models, cleaning real-world datasets, and managing model versioning workflows.";
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('hire') || lower.includes('reach')) {
        reply = `You can email Latheesh at <strong>${portfolioData.personal.email}</strong>, call <strong>${portfolioData.personal.phone}</strong>, or type your message right here in this chat to forward it to him!`;
      } else {
        // Assume user wants to send a custom message / inquiry to Latheesh!
        setPendingMessage(text);
        setAskingForEmail(true);
        reply = "I would be happy to forward this message directly to Latheesh's inbox! Please enter your <strong>email address</strong> so he knows where to reply.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: reply,
          isHtml: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-300 transition-all"
        aria-label="Ask Chatbot Assistant About Me"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close Assistant</span>
          </>
        ) : (
          <>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950" />
            </span>
            <Bot className="w-4 h-4" />
            <span>Chat Assistant</span>
          </>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-96 max-h-[560px] h-[520px] rounded-2xl border border-cyan-500/40 bg-[#080d17] shadow-2xl shadow-cyan-950/70 flex flex-col overflow-hidden font-mono text-xs text-slate-200"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#05080f] border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-400">
                  LK
                </div>
                <div>
                  <div className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span>Latheesh Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-cyan-400">Online • Routes to Inbox</div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#080d17]/95">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'bot' && (
                    <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed text-xs ${
                      m.sender === 'user'
                        ? 'bg-cyan-600 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none font-sans'
                    }`}
                  >
                    {m.isHtml ? (
                      <span dangerouslySetInnerHTML={{ __html: m.text }} />
                    ) : (
                      <span>{m.text}</span>
                    )}
                    <div
                      className={`text-[9px] mt-1 ${
                        m.sender === 'user' ? 'text-slate-900/80' : 'text-slate-500'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-8">
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Assistant is routing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2 bg-[#05080f] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickQuestions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSend(q.query)}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-[10px] text-slate-300 hover:text-cyan-300 flex-shrink-0 transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-[#060910] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={
                    askingForEmail
                      ? 'Type your email address...'
                      : 'Ask a question or leave message...'
                  }
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
