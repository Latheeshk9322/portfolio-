import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Database, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

export const SkillsSection: React.FC = () => {
  const { skillsCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { displayText: titleText } = useHackerScramble('TECHNICAL SKILL MATRIX', 25);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages-web':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'databases-tools':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'it-support-os':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      default:
        return <Cpu className="w-4 h-4 text-purple-400" />;
    }
  };

  const displayedCategories =
    selectedCategory === 'all'
      ? skillsCategories
      : skillsCategories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // CAPABILITIES &amp; ENVIRONMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; npm install @latheesh/tech-stack --production
          </p>
        </div>

        {/* CLI Command Simulated Output Bar */}
        <div className="rounded-xl border border-cyan-500/20 bg-[#080d17] p-4 font-mono text-xs text-slate-300 shadow-xl space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TERMINAL // PACKAGE_INSTALL_LOG</span>
            </div>
            <span className="text-cyan-400">Node v22.12.0</span>
          </div>

          <div className="space-y-1 text-slate-300">
            <div className="text-cyan-300 font-semibold">
              $ pnpm add @skills/web-dev @skills/database @skills/it-support
            </div>
            <div className="text-slate-400">
              ✔ Verified 15 production competencies across front-end, back-end, and enterprise networks.
            </div>
            <div className="text-emerald-400 font-semibold">
              ✔ 0 vulnerabilities | 100% test coverage | Ready to deploy into production environments
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/50 hover:text-slate-200'
            }`}
          >
            All Packages [3]
          </button>
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-cyan-500/50 hover:text-slate-200'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="rounded-xl border border-cyan-500/20 bg-[#090e1a]/90 backdrop-blur-md p-5 flex flex-col justify-between space-y-5 hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-cyan-950/40 group"
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-slate-100">
                        {category.name}
                      </h3>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        {category.command}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="space-y-3.5 font-mono">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-200 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-bold">{skill.level}%</span>
                      </div>
                      {/* Bar outer */}
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full shadow-[0_0_8px_#06b6d4]"
                        />
                      </div>
                      {skill.description && (
                        <div className="text-[10px] text-slate-500 font-sans">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tool Chips Strip */}
              {category.chips && (
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] text-slate-500 font-mono uppercase mb-2">
                    Key Tools &amp; Ecosystem:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
