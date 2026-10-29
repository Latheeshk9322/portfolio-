import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Terminal, 
  FolderTree, 
  FileCode, 
  FileText, 
  Layers, 
  Github, 
  ExternalLink, 
  Check, 
  Copy, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { Project } from '../../types/portfolio';
import { portfolioData } from '../../data/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'code' | 'tree' | 'stack'>('readme');
  const [isCompiling, setIsCompiling] = useState(true);
  const [copied, setCopied] = useState(false);

  // Play short 0.9s terminal boot sequence whenever project opens
  useEffect(() => {
    if (project) {
      setIsCompiling(true);
      setActiveTab('readme');
      const timer = setTimeout(() => {
        setIsCompiling(false);
      }, 700);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNavigate('next');
        if (e.key === 'ArrowLeft') onNavigate('prev');
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [project, onClose, onNavigate]);

  if (!project) return null;

  const currentIdx = portfolioData.projects.findIndex((p) => p.id === project.id);
  const totalProjects = portfolioData.projects.length;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          layoutId={`project-card-${project.id}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-cyan-500/40 bg-[#080d17] shadow-2xl shadow-cyan-950/70 overflow-hidden font-mono z-50 text-slate-200"
        >
          {/* Top IDE Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080f] border-b border-slate-800 select-none">
            {/* Left Traffic Lights & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>projects/{project.id}</span>
                <span className="text-slate-500">[{currentIdx + 1}/{totalProjects}]</span>
              </div>
            </div>

            {/* Next / Previous and Close buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onNavigate('prev')}
                className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Previous Project (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('next')}
                className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                title="Next Project (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded bg-slate-900 border border-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 transition-colors ml-2"
                title="Close (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* IDE Tabs Strip */}
          <div className="flex items-center px-2 bg-[#0a0f1d] border-b border-slate-800 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-2 px-3.5 py-2 border-r border-slate-800/80 transition-all ${
                activeTab === 'readme'
                  ? 'bg-[#080d17] text-cyan-300 border-t-2 border-t-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>README.md</span>
            </button>

            {project.codeSnippet && (
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3.5 py-2 border-r border-slate-800/80 transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#080d17] text-amber-300 border-t-2 border-t-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.codeSnippet.filename}</span>
              </button>
            )}

            {project.fileTree && (
              <button
                onClick={() => setActiveTab('tree')}
                className={`flex items-center gap-2 px-3.5 py-2 border-r border-slate-800/80 transition-all ${
                  activeTab === 'tree'
                    ? 'bg-[#080d17] text-emerald-300 border-t-2 border-t-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
                }`}
              >
                <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
                <span>file-tree.dir</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('stack')}
              className={`flex items-center gap-2 px-3.5 py-2 border-r border-slate-800/80 transition-all ${
                activeTab === 'stack'
                  ? 'bg-[#080d17] text-purple-300 border-t-2 border-t-purple-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>stack.json</span>
            </button>
          </div>

          {/* Modal Body / Compilation sequence or Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#080d17]">
            {isCompiling ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Terminal className="w-8 h-8 text-cyan-400 animate-spin" />
                <div className="text-sm text-cyan-300 font-mono tracking-wide">
                  &gt; git checkout {project.id}...
                </div>
                <div className="text-xs text-slate-500">
                  Compiling AST &amp; initializing project sandbox...
                </div>
              </div>
            ) : (
              <div>
                {/* 1. README TAB */}
                {activeTab === 'readme' && (
                  <div className="space-y-6">
                    {/* Header info */}
                    <div className="space-y-2 border-b border-slate-800 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded text-xs bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
                          {project.categoryLabel}
                        </span>
                        {project.award && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold">
                            <Award className="w-3.5 h-3.5" />
                            {project.award}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-xs sm:text-sm text-cyan-400/90 font-mono">
                          // {project.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Overview & Architecture */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Project Architecture &amp; System Purpose
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {project.fullOverview}
                      </p>
                    </div>

                    {/* Architectural Bullet Points */}
                    {project.architectureDetails && (
                      <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                          Key Architecture Highlights:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                          {project.architectureDetails.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        Functional Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2.5 rounded bg-slate-900/40 border border-slate-800 text-xs text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CODE SNIPPET TAB */}
                {activeTab === 'code' && project.codeSnippet && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-amber-400">{project.codeSnippet.filename}</span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Snippet</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="relative rounded-lg border border-slate-800 bg-[#04070e] p-4 overflow-x-auto text-xs leading-relaxed font-mono">
                      <pre className="text-cyan-200">
                        <code>{project.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* 3. FILE TREE TAB */}
                {activeTab === 'tree' && project.fileTree && (
                  <div className="space-y-3">
                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      Module Hierarchy &amp; Components:
                    </div>
                    <div className="p-4 rounded-lg bg-[#04070e] border border-slate-800 text-xs font-mono space-y-1">
                      {project.fileTree.map((line, idx) => (
                        <div key={idx} className="text-slate-300 hover:text-emerald-300">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. STACK.JSON TAB */}
                {activeTab === 'stack' && (
                  <div className="space-y-3">
                    <div className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                      Dependencies &amp; Environment Metadata:
                    </div>
                    <div className="p-4 rounded-lg bg-[#04070e] border border-slate-800 text-xs font-mono">
                      <pre className="text-purple-200">
                        <code>
{JSON.stringify(
  {
    projectId: project.id,
    title: project.title,
    category: project.category,
    techStack: project.techStack,
    award: project.award || null,
    author: portfolioData.personal.name,
    status: 'PRODUCTION_VERIFIED',
    repository: project.githubUrl,
  },
  null,
  2
)}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer with Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#05080f] border-t border-slate-800">
            {/* Tech stack badge strip */}
            <div className="flex flex-wrap items-center gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all"
              >
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>git clone / repo</span>
              </a>

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition-all"
                >
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
