import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode2, 
  FileJson, 
  FileTerminal, 
  GitBranch, 
  FolderGit2, 
  Award, 
  Send, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X,
  Terminal,
  Circle
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface NavTab {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navTabs: NavTab[] = [
  { id: 'hero', name: 'home.tsx', href: '#hero', icon: <FileCode2 className="w-3.5 h-3.5 text-cyan-400" /> },
  { id: 'about', name: 'about.json', href: '#about', icon: <FileJson className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'skills', name: 'skills.sh', href: '#skills', icon: <FileTerminal className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'timeline', name: 'git-log.diff', href: '#timeline', icon: <GitBranch className="w-3.5 h-3.5 text-purple-400" /> },
  { id: 'projects', name: 'projects/', href: '#projects', icon: <FolderGit2 className="w-3.5 h-3.5 text-sky-400" /> },
  { id: 'certifications', name: 'certs.pem', href: '#certifications', icon: <Award className="w-3.5 h-3.5 text-yellow-400" /> },
  { id: 'contact', name: 'contact.env', href: '#contact', icon: <Send className="w-3.5 h-3.5 text-rose-400" /> },
];

interface EditorTabBarNavProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export const EditorTabBarNav: React.FC<EditorTabBarNavProps> = ({ 
  onOpenCommandPalette, 
  onOpenTerminal 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navTabs.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navTabs[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-30 w-full transition-all duration-200 ${
      scrolled 
        ? 'bg-[#070b13]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-black/40' 
        : 'bg-[#0a0f1d]/75 backdrop-blur-sm border-b border-slate-800/80'
    }`}>
      {/* Top IDE Window Header Bar */}
      <div className="flex items-center justify-between px-3 lg:px-6 h-12 border-b border-slate-800/60 bg-[#060910]">
        {/* Left Window Traffic Lights & Workspace Label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block hover:opacity-100 transition-opacity" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block hover:opacity-100 transition-opacity" />
          </div>

          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-2 text-xs font-mono font-bold tracking-tight text-slate-200 hover:text-cyan-400 transition-colors"
          >
            <span className="text-cyan-400">&lt;LK/&gt;</span>
            <span className="hidden sm:inline text-slate-400">latheesh-portfolio</span>
            <span className="hidden md:inline px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/50">
              main*
            </span>
          </a>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 text-xs font-mono transition-all group"
            title="Search portfolio (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-cyan-400 transition-colors" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.2 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Terminal Easter Egg Trigger */}
          <button
            onClick={onOpenTerminal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-all"
            title="Launch Terminal Shell"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[11px]">&gt;_ CLI</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all"
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Editor File Tabs Strip */}
      <nav className="hidden lg:flex items-center overflow-x-auto no-scrollbar px-2 bg-[#070b13]/90 border-t border-slate-900">
        {navTabs.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => scrollToSection(e, tab.href)}
              className={`group relative flex items-center gap-2 px-3.5 py-2 text-xs font-mono border-r border-slate-800/80 transition-all ${
                isActive
                  ? 'bg-[#0f172a] text-cyan-300 border-t-2 border-t-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-t-2 border-t-transparent'
              }`}
            >
              <span className="opacity-90">{tab.icon}</span>
              <span>{tab.name}</span>
              {isActive && (
                <Circle className="w-1.5 h-1.5 fill-cyan-400 text-cyan-400 ml-1" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0f1d] border-b border-cyan-500/30 overflow-hidden"
          >
            <div className="p-3 space-y-1 font-mono text-sm">
              <div className="text-[11px] text-slate-500 uppercase px-2 py-1 tracking-wider">
                EXPLORER // OPEN EDITORS
              </div>
              {navTabs.map((tab) => {
                const isActive = activeSection === tab.id;
                return (
                  <a
                    key={tab.id}
                    href={tab.href}
                    onClick={(e) => scrollToSection(e, tab.href)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                      isActive
                        ? 'bg-cyan-950/60 text-cyan-300 border-l-2 border-cyan-400 font-semibold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {tab.icon}
                      <span>{tab.name}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] text-cyan-400 bg-cyan-900/40 px-1.5 py-0.5 rounded">
                        ACTIVE
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded bg-slate-900 text-cyan-400 text-xs border border-cyan-500/30"
                >
                  <Terminal className="w-4 h-4" />
                  Launch Terminal Shell (&gt;_)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
