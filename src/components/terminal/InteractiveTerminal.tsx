import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'system.boot()',
      output: (
        <div className="text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold">
            LATHEESH_OS (x86_64-pc-linux-gnu) v2.5.0-release
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-amber-300 font-semibold">&apos;help&apos;</span> to inspect available developer commands, or <span className="text-amber-300 font-semibold">&apos;whoami&apos;</span>.
          </div>
        </div>
      ),
    },
  ]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setPastCommands((prev) => [...prev, cmd]);
    setCommandHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'exit') {
      onClose();
      return;
    }

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="text-slate-300 text-xs space-y-1 py-1">
            <div className="text-cyan-400 font-semibold">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-2">
              <div><span className="text-amber-400 font-mono">whoami</span> - Display developer profile</div>
              <div><span className="text-amber-400 font-mono">skills</span> - List all tech competencies</div>
              <div><span className="text-amber-400 font-mono">projects</span> - View all 8 featured projects</div>
              <div><span className="text-amber-400 font-mono">experience</span> - Show internship at Zephyr</div>
              <div><span className="text-amber-400 font-mono">education</span> - Display MCA & BCA degrees</div>
              <div><span className="text-amber-400 font-mono">contact</span> - Show email, phone & location</div>
              <div><span className="text-amber-400 font-mono">resume</span> - Download Latheesh Resume (PDF)</div>
              <div><span className="text-amber-400 font-mono">certs</span> - List verified certifications</div>
              <div><span className="text-amber-400 font-mono">clear</span> - Clear terminal buffer</div>
              <div><span className="text-amber-400 font-mono">exit</span> - Close terminal shell</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-xs space-y-1 text-slate-300 border-l-2 border-cyan-500 pl-3 py-1">
            <div className="text-cyan-300 font-bold">{portfolioData.personal.name}</div>
            <div className="text-amber-300">{portfolioData.personal.headline}</div>
            <div className="text-slate-400">{portfolioData.personal.bioShort}</div>
            <div className="text-emerald-400 font-mono text-[11px]">STATUS: {portfolioData.personal.availability}</div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-2 py-1">
            {portfolioData.skillsCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="text-cyan-400 font-semibold">{cat.name}:</div>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  {cat.skills.map((s) => (
                    <span key={s.name} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-mono border border-slate-700">
                      {s.name} ({s.level}%)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs space-y-1.5 py-1">
            <div className="text-cyan-400 font-semibold">Featured Projects (8 completed):</div>
            {portfolioData.projects.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-slate-300 hover:text-cyan-300 pl-2">
                <span>
                  <span className="text-amber-400 font-mono">{idx + 1}.</span> {p.title}
                  <span className="text-slate-500 ml-2">[{p.categoryLabel}]</span>
                  {p.award && <span className="text-emerald-400 ml-2 font-bold font-mono">★ {p.award}</span>}
                </span>
                <button
                  onClick={() => {
                    onSelectProject?.(p.id);
                    onClose();
                  }}
                  className="px-2 py-0.5 text-[10px] rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900"
                >
                  open
                </button>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="text-xs space-y-1.5 py-1">
            <div className="text-cyan-400 font-semibold">Industry Experience:</div>
            {portfolioData.timeline.filter((t) => t.type === 'experience').map((item) => (
              <div key={item.id} className="border-l-2 border-purple-500 pl-3 space-y-0.5">
                <div className="text-purple-300 font-bold">{item.title} @ {item.organization}</div>
                <div className="text-slate-400 text-[11px]">{item.period} | {item.location}</div>
                <div className="text-slate-300">{item.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="text-xs space-y-2 py-1">
            <div className="text-cyan-400 font-semibold">Academic Education:</div>
            {portfolioData.timeline.filter((t) => t.type === 'education').map((item) => (
              <div key={item.id} className="border-l-2 border-cyan-500 pl-3 space-y-0.5">
                <div className="text-cyan-300 font-bold">{item.title}</div>
                <div className="text-slate-400 text-[11px]">{item.organization} ({item.period})</div>
                <div className="text-slate-300">{item.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 py-1 text-slate-300">
            <div><span className="text-cyan-400">Email:</span> <a href={`mailto:${portfolioData.personal.email}`} className="text-amber-300 hover:underline">{portfolioData.personal.email}</a></div>
            <div><span className="text-cyan-400">Phone:</span> <a href={`tel:${portfolioData.personal.phone}`} className="text-amber-300 hover:underline">{portfolioData.personal.phone}</a></div>
            <div><span className="text-cyan-400">Location:</span> {portfolioData.personal.location}</div>
            <div><span className="text-cyan-400">GitHub:</span> <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">{portfolioData.personal.github}</a></div>
          </div>
        );
        break;

      case 'resume':
        window.open(portfolioData.personal.resumePdf, '_blank');
        outputNode = <div className="text-xs text-emerald-400 font-mono">Opening resume PDF in new tab...</div>;
        break;

      case 'certs':
        outputNode = (
          <div className="text-xs space-y-1 py-1">
            <div className="text-cyan-400 font-semibold">Certifications & Wins:</div>
            {portfolioData.certificates.map((c) => (
              <div key={c.id} className="text-slate-300 pl-2">
                - <span className="text-amber-300">{c.title}</span> ({c.institution}, {c.year})
              </div>
            ))}
          </div>
        );
        break;

      case 'sudo':
        outputNode = <div className="text-xs text-rose-400 font-mono">Permission denied: user &apos;guest&apos; is not in the sudoers file. This incident will be reported.</div>;
        break;

      default:
        outputNode = (
          <div className="text-xs text-rose-400 font-mono">
            bash: {trimmed}: command not found. Type <span className="text-amber-300">&apos;help&apos;</span> for a list of commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputVal.trim()) return;
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = commandHistoryIndex === -1 ? pastCommands.length - 1 : Math.max(0, commandHistoryIndex - 1);
        setCommandHistoryIndex(nextIndex);
        setInputVal(pastCommands[nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex !== -1) {
        const nextIndex = commandHistoryIndex + 1;
        if (nextIndex < pastCommands.length) {
          setCommandHistoryIndex(nextIndex);
          setInputVal(pastCommands[nextIndex]);
        } else {
          setCommandHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.2 }}
            className={`w-full ${
              isMaximized ? 'h-[94vh] max-w-7xl' : 'h-[620px] max-w-3xl'
            } rounded-xl border border-cyan-500/40 bg-[#070b13] shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden font-mono text-sm`}
          >
            {/* Terminal Window Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0f1d] border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">guest@latheesh-system:~ (bash)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  aria-label="Maximize terminal"
                >
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-950/40"
                  aria-label="Close terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Content Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#070b13]/95 relative scanlines">
              {history.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-400 font-semibold">guest@latheesh:~$</span>
                    <span className="text-slate-100">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Input */}
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-emerald-400 font-semibold">guest@latheesh:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono caret-cyan-400"
                  autoFocus
                />
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Terminal Footer Bar */}
            <div className="px-4 py-2 border-t border-slate-800 bg-[#0a0f1d] flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Type <code className="text-amber-400">&apos;help&apos;</code></span>
                <span><code className="text-amber-400">&apos;projects&apos;</code></span>
                <span><code className="text-amber-400">&apos;clear&apos;</code></span>
              </div>
              <span className="text-cyan-500/80">LATHEESH_CLI v2.5</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
