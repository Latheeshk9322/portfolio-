import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal, 
  ArrowUp, 
  Heart, 
  Github, 
  Linkedin, 
  Mail, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface FooterSectionProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  onOpenTerminal,
  onOpenCommandPalette 
}) => {
  const [footerCmd, setFooterCmd] = useState('');
  const [footerResponse, setFooterResponse] = useState<string | null>(null);

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = footerCmd.trim().toLowerCase();

    if (cmd === 'help') {
      setFooterResponse('Available: whoami, projects, contact, resume, clear, terminal');
    } else if (cmd === 'whoami') {
      setFooterResponse(`Latheesh K — ${portfolioData.personal.headline}`);
    } else if (cmd === 'projects') {
      setFooterResponse(`8 projects ready. Click terminal button for interactive browser!`);
    } else if (cmd === 'contact') {
      setFooterResponse(`Email: ${portfolioData.personal.email} | Phone: ${portfolioData.personal.phone}`);
    } else if (cmd === 'terminal' || cmd === 'cli') {
      onOpenTerminal();
      setFooterResponse(null);
    } else if (cmd === 'clear') {
      setFooterResponse(null);
    } else if (cmd) {
      setFooterResponse(`Command '${cmd}' recognized. Type 'terminal' to launch full shell.`);
    }
    setFooterCmd('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#05080f] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Footer Strip: Mini Easter Egg Shell */}
        <div className="p-4 rounded-xl border border-slate-800 bg-[#080d17] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-cyan-400 text-xs w-full sm:w-auto">
            <Terminal className="w-4 h-4 flex-shrink-0" />
            <form onSubmit={handleFooterSubmit} className="flex items-center gap-2 flex-1">
              <span className="text-emerald-400 font-bold select-none">&gt;</span>
              <input
                type="text"
                value={footerCmd}
                onChange={(e) => setFooterCmd(e.target.value)}
                placeholder="type 'help', 'whoami', or 'terminal'..."
                className="bg-transparent text-slate-200 placeholder:text-slate-600 focus:outline-none w-full sm:w-72 text-xs font-mono"
              />
            </form>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Open Interactive CLI
            </button>
            <button
              onClick={onOpenCommandPalette}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-slate-200 transition-colors"
            >
              Command Palette (Ctrl+K)
            </button>
          </div>
        </div>

        {footerResponse && (
          <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-200 text-xs font-mono">
            {footerResponse}
          </div>
        )}

        {/* Middle Footer: Links & Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-bold text-sm">
              <span className="text-cyan-400">&lt;LK/&gt;</span>
              <span>{portfolioData.personal.name}</span>
            </div>
            <p className="text-slate-500 text-xs font-sans">
              MCA Graduate • Full-Stack Web Developer • IT Systems Specialist
            </p>
          </div>

          {/* Socials & Git status */}
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>branch: origin/main</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Build 2.5.0: Passing
            </span>
          </div>

          <div>
            &copy; 2026 {portfolioData.personal.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
