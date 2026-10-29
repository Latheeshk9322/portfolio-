import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  Terminal, 
  ExternalLink, 
  Github, 
  Award, 
  Sparkles,
  ChevronRight,
  Code2,
  Video,
  TrendingUp,
  Calculator,
  Plane,
  Sun,
  GraduationCap,
  HeartHandshake,
  Utensils
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Project } from '../types/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<'all' | 'web-dev' | 'ml-ai' | 'iot' | 'software'>('all');

  const { displayText: titleText } = useHackerScramble('ENGINEERED PROJECTS', 25);

  const filterButtons = [
    { id: 'all', label: 'All Repositories', count: projects.length },
    { id: 'web-dev', label: 'Web Dev', count: projects.filter(p => p.category === 'web-dev').length },
    { id: 'ml-ai', label: 'ML / AI', count: projects.filter(p => p.category === 'ml-ai').length },
    { id: 'iot', label: 'IoT / Hardware', count: projects.filter(p => p.category === 'iot').length },
    { id: 'software', label: 'Software', count: projects.filter(p => p.category === 'software').length },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'Plane': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-orange-400" />;
      default: return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>04 // PORTFOLIO CODEBASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; ls -la ~/projects --sort=relevance
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeFilter === btn.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/40 hover:text-slate-200'
              }`}
            >
              {btn.label} <span className="opacity-70">({btn.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-xl border border-cyan-500/20 bg-[#090e1a]/95 backdrop-blur-md p-5 flex flex-col justify-between space-y-5 hover:border-cyan-400/60 transition-all shadow-xl hover:shadow-cyan-950/50 group relative overflow-hidden cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              {/* Top Card Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Category icon and Badge */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                    {getProjectIcon(project.icon)}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                      {project.categoryLabel}
                    </span>
                    {project.award && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                        <Award className="w-3 h-3" />
                        {project.award}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-mono font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom: Tech stack + Open IDE prompt */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-cyan-950/40">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pt-1 group-hover:text-cyan-300">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    <span>inspect project</span>
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
