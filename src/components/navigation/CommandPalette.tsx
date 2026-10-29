import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  FileCode2, 
  Download, 
  Mail, 
  Sun, 
  Moon, 
  ArrowRight,
  FolderGit2,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenTerminal: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown listeners for Ctrl+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Predefined commands and search items
  const baseCommands: CommandItem[] = [
    {
      id: 'sec-hero',
      title: 'Navigate: Home / Terminal Hero',
      category: 'Navigation',
      icon: <FileCode2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-about',
      title: 'Navigate: About & VS Code Bio',
      category: 'Navigation',
      icon: <FileCode2 className="w-4 h-4 text-amber-400" />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-skills',
      title: 'Navigate: Technical Skills Terminal',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-timeline',
      title: 'Navigate: Git Commit Timeline & Education',
      category: 'Navigation',
      icon: <FileCode2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-projects',
      title: 'Navigate: Projects Directory',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-sky-400" />,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-certs',
      title: 'Navigate: Certifications Gallery',
      category: 'Navigation',
      icon: <FileCode2 className="w-4 h-4 text-yellow-400" />,
      action: () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sec-contact',
      title: 'Navigate: Contact Form & Socials',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'act-terminal',
      title: 'Action: Open Developer Terminal (&gt;_ CLI Shell)',
      category: 'Developer Tools',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'act-resume',
      title: 'Action: Download Latheesh K Resume (PDF)',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-green-400" />,
      action: () => {
        window.open(portfolioData.personal.resumePdf, '_blank');
        onClose();
      },
    },
    {
      id: 'act-email',
      title: `Action: Send Email (${portfolioData.personal.email})`,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      action: () => {
        window.location.href = `mailto:${portfolioData.personal.email}`;
        onClose();
      },
    },
    {
      id: 'act-theme',
      title: `Action: Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
  ];

  // Project commands
  const projectCommands: CommandItem[] = portfolioData.projects.map((proj) => ({
    id: `proj-${proj.id}`,
    title: `Project: ${proj.title}`,
    category: 'Projects',
    icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
    badge: proj.categoryLabel,
    action: () => {
      onSelectProject(proj.id);
      onClose();
    },
  }));

  const allCommands = [...baseCommands, ...projectCommands];

  const filteredCommands = allCommands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation through search list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl rounded-xl border border-cyan-500/40 bg-[#090d16] shadow-2xl shadow-cyan-950/50 overflow-hidden font-mono z-50"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-[#060910]">
              <Search className="w-4 h-4 text-cyan-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command, section, or project..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded ml-2">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No matching command found for &quot;{query}&quot;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-900/60 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                          {cmd.icon}
                        </span>
                        <div>
                          <div className="font-medium">{cmd.title}</div>
                          <div className="text-[10px] text-slate-500">{cmd.category}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {cmd.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
                            {cmd.badge}
                          </span>
                        )}
                        <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'} transition-transform`} />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-[#060910] text-[10px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="text-slate-400">↑↓</kbd></span>
                <span>Select: <kbd className="text-slate-400">↵</kbd></span>
              </div>
              <span className="text-cyan-400/80">&lt;Latheesh_OS v2.4/&gt;</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
