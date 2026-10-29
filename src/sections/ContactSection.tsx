import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';
import { sendEmailMessage, openMailtoDraft } from '../lib/emailService';

export const ContactSection: React.FC = () => {
  const { personal, emailConfig } = portfolioData;
  const { displayText: titleText } = useHackerScramble('INITIATE CONTACT PROTOCOL', 25);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [lastSentData, setLastSentData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [autoReplyText, setAutoReplyText] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    const currentPayload = { ...formData };
    setLastSentData(currentPayload);
    setStatus('sending');

    try {
      const result = await sendEmailMessage({
        name: currentPayload.name,
        email: currentPayload.email,
        subject: currentPayload.subject || 'Opportunity Inquiry',
        message: currentPayload.message,
        source: 'contact_form',
      });

      setAutoReplyText(
        result.autoReply ||
        `Thanks for contacting Latheesh K. We have received your message regarding "${currentPayload.subject || 'your project'}" and will get back to you shortly. Keep in touch with us!`
      );

      if (result.success) {
        setStatusMessage(result.message);
        setStatus('success');

        // Trigger developer neon confetti blast
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#38bdf8', '#10b981', '#a855f7'],
        });

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        // EmailJS returned an error
        setStatusMessage(result.message);
        setStatus('error');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatusMessage('Network transmission error. You can still transmit directly via your email client.');
      setStatus('error');
    }
  };

  const handleManualMailto = () => {
    if (lastSentData) {
      openMailtoDraft({
        name: lastSentData.name,
        email: lastSentData.email,
        subject: lastSentData.subject,
        message: lastSentData.message,
        source: 'contact_form',
      });
    } else {
      openMailtoDraft({
        name: formData.name || 'Visitor',
        email: formData.email || '',
        subject: formData.subject || 'Website Inquiry',
        message: formData.message || '',
        source: 'contact_form',
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#070b13]/85">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Send className="w-3.5 h-3.5" />
            <span>07 // TRANSMIT PACKETS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; curl -X POST https://api.emailjs.com/v1.0/email/send
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Recruiter Priority Notice */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-[#090e1a] space-y-2 font-mono text-xs shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
                <span>Recruiter &amp; Team Priority Note:</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Actively searching for <strong className="text-cyan-300 font-mono">IT Executive, Web Developer, Software Support</strong>, or database openings. Immediate joiner ready for on-site or hybrid positions.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a] flex items-center justify-between hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-slate-500">EMAIL ADDRESS</div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-xs sm:text-sm font-mono text-slate-200 hover:text-cyan-400 font-medium transition-colors"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a] flex items-center gap-3 hover:border-cyan-500/40 transition-colors">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-slate-500">DIRECT PHONE / WHATSAPP</div>
                <a
                  href={`tel:${personal.phone}`}
                  className="text-xs sm:text-sm font-mono text-slate-200 hover:text-emerald-400 font-medium transition-colors"
                >
                  {personal.phone}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#090e1a] flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono text-slate-500">BASE LOCATION</div>
                <div className="text-xs sm:text-sm font-mono text-slate-200">
                  {personal.location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-cyan-500/30 bg-[#090e1a] p-6 shadow-2xl font-mono text-xs relative overflow-hidden">
              {/* Form Window Titlebar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TRANSMISSION_FORM.POST</span>
                </div>
                <span className="text-emerald-400 font-semibold">ENCRYPTED_TLS</span>
              </div>

              {/* Success Notification & Auto-Reply Banner */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Packet Delivered to {personal.email}!</span>
                    </div>

                    <div className="p-3 rounded-lg bg-black/40 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wide">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Automated Response Receipt:</span>
                      </div>
                      <p className="text-xs text-slate-200 font-sans leading-relaxed">
                        &quot;{autoReplyText}&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-emerald-300/80">
                        Status: 200 OK • In Latheesh&apos;s Mailbox
                      </span>
                      <button
                        onClick={handleManualMailto}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/40 text-emerald-300 text-[11px] hover:bg-emerald-950/60"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open Email in Mailbox
                      </button>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 space-y-3"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{statusMessage}</span>
                    </div>

                    {statusMessage.toLowerCase().includes('template') && (
                      <div className="p-3 rounded-lg bg-black/60 border border-amber-500/30 space-y-2">
                        <div className="text-[11px] text-amber-200">
                          Paste your Template ID from{' '}
                          <a
                            href="https://dashboard.emailjs.com/admin/templates"
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-cyan-300 font-bold"
                          >
                            EmailJS Templates Dashboard
                          </a>:
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. template_xxxxxx"
                            id="quick-template-id"
                            className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('quick-template-id') as HTMLInputElement;
                              if (input && input.value.trim()) {
                                localStorage.setItem('lk_emailjs_template_id', input.value.trim());
                                alert(`Saved Template ID: ${input.value.trim()}! Retrying submission now...`);
                                const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
                                submitBtn?.click();
                              }
                            }}
                            className="px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
                          >
                            Save &amp; Send
                          </button>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-300 font-sans">
                      Or click below to send this message directly to Latheesh&apos;s mailbox using your default mail app:
                    </p>

                    <button
                      type="button"
                      onClick={handleManualMailto}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open &amp; Send via Email Client ({personal.email})
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="user1"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="user1@gmail.com"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">SUBJECT</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="build the travel website"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">MESSAGE BODY *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Latheesh, I want to build the travel website with dynamic booking, payment gateway, and user reviews..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                >
                  {status === 'sending' ? (
                    <>
                      <Terminal className="w-4 h-4 animate-spin" />
                      <span>Transmitting payload to latheeshacharya6456@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message (Send to Mailbox)</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
