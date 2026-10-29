import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Terminal, Calendar, MapPin, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

export const ExperienceSection: React.FC = () => {
  const { timeline } = portfolioData;
  const { displayText: titleText } = useHackerScramble('GIT LOG: EXPERIENCE & EDUCATION', 25);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#070b13]/80">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <GitBranch className="w-3.5 h-3.5" />
            <span>03 // COMMIT HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; git log --oneline --graph --decorate
          </p>
        </div>

        {/* Vertical Commit Line & Items */}
        <div className="relative pl-6 sm:pl-10 space-y-12 font-mono">
          {/* Vertical dynamic commit branch line */}
          <div className="absolute left-[13px] sm:left-[21px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-sky-500 opacity-60" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative space-y-3"
            >
              {/* Node Commit Dot */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full bg-[#070b13] border-2 border-cyan-400 shadow-[0_0_12px_#06b6d4]">
                <GitCommit className="w-3.5 h-3.5 text-cyan-300" />
              </div>

              {/* Commit Header Strip */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Commit Hash badge */}
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-bold">
                  {item.commitHash}
                </span>

                {/* Branch / Tag */}
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  item.type === 'experience'
                    ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                }`}>
                  {item.badge}
                </span>

                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Commit Message Box (Card) */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#090e1a] p-5 shadow-xl hover:border-cyan-500/50 transition-all space-y-4">
                {/* Role and Organization */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {item.type === 'experience' ? (
                      <Briefcase className="w-4 h-4 text-purple-400" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 font-sans">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="text-cyan-400 font-medium">{item.organization}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Commit Message */}
                <div className="text-xs text-amber-300 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-500 select-none mr-2">$ git commit -m</span>
                  &quot;{item.commitMessage}&quot;
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {item.description}
                </p>

                {/* Key Bullet Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-1 text-xs text-slate-300 font-sans">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech tags used in this role */}
                {item.techUsed && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {item.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
