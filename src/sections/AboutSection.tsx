import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Sparkles, Terminal, Copy, Check, Users, Brain, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

export const AboutSection: React.FC = () => {
  const { personal } = portfolioData;
  const [activeTab, setActiveTab] = useState<'json' | 'editorial' | 'attributes'>('json');
  const [copied, setCopied] = useState(false);

  const { displayText: titleText } = useHackerScramble('ABOUT THE DEVELOPER', 30);

  const jsonCodeString = JSON.stringify(
    {
      name: personal.name,
      degree: "Master of Computer Applications (MCA)",
      institution: "Vivekananda College of Engineering and Technology (VCET), Puttur",
      completionYear: 2025,
      targetRoles: [
        "IT Executive",
        "Web Developer",
        "Software Support Executive"
      ],
      internship: {
        role: "AI & ML Intern",
        organization: "Zephyr Technologies & Solutions Pvt Ltd, Mangalore",
        tenure: "3 Months (Nov 2024 – Jan 2025)",
        focus: ["Regression Models", "Feature Sanitation", "Cloud Deployment Pipelines"]
      },
      infrastructureKnowledge: [
        "LAN/Wi-Fi Diagnostics",
        "Hardware Troubleshooting",
        "Database Administration (SQL/NoSQL)",
        "Windows & Linux OS"
      ],
      availability: "IMMEDIATE_JOINING",
      location: personal.location,
      contact: {
        email: personal.email,
        phone: personal.phone
      }
    },
    null,
    2
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonCodeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const attributes = [
    { name: "Technical Communication", icon: <MessageSquare className="w-4 h-4 text-cyan-400" />, desc: "Clear liaison between engineering teams and non-technical stakeholders" },
    { name: "Analytical Problem Solving", icon: <Brain className="w-4 h-4 text-amber-400" />, desc: "Rapid root-cause isolation across network, database, and code layers" },
    { name: "Team Collaboration", icon: <Users className="w-4 h-4 text-emerald-400" />, desc: "Active contributor in sprint deliverables and academic hackathons" },
    { name: "Time Management", icon: <Clock className="w-4 h-4 text-purple-400" />, desc: "Dependable milestone execution under strict submission deadlines" },
    { name: "User Support & Coordination", icon: <ShieldCheck className="w-4 h-4 text-sky-400" />, desc: "Patient and empathetic guidance through system configuration and triage" }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#070b13]/60">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // BACKGROUND &amp; PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
        </div>

        {/* VS Code Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-cyan-500/30 bg-[#090e1a] shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-xs sm:text-sm"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#050810] border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-400 text-xs hidden sm:inline">VS Code — Latheesh Profile Workspace</span>
            </div>

            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Object</span>
                </>
              )}
            </button>
          </div>

          {/* Editor Tabs Strip */}
          <div className="flex items-center px-2 bg-[#080c16] border-b border-slate-800/80 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 px-4 py-2 border-r border-slate-800/80 transition-all ${
                activeTab === 'json'
                  ? 'bg-[#090e1a] text-cyan-300 border-t-2 border-t-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>profile.json</span>
            </button>

            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-2 px-4 py-2 border-r border-slate-800/80 transition-all ${
                activeTab === 'editorial'
                  ? 'bg-[#090e1a] text-amber-300 border-t-2 border-t-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span>biography.md</span>
            </button>

            <button
              onClick={() => setActiveTab('attributes')}
              className={`flex items-center gap-2 px-4 py-2 border-r border-slate-800/80 transition-all ${
                activeTab === 'attributes'
                  ? 'bg-[#090e1a] text-emerald-300 border-t-2 border-t-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border-t-2 border-t-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>attributes.ts</span>
            </button>
          </div>

          {/* Editor Body */}
          <div className="p-4 sm:p-6 bg-[#090e1a] min-h-[380px] overflow-x-auto">
            {activeTab === 'json' && (
              <div className="flex font-mono leading-relaxed">
                {/* Line numbers column */}
                <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800 space-y-0.5 text-xs">
                  {jsonCodeString.split('\n').map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>

                {/* Highlighted JSON code */}
                <pre className="pl-4 text-cyan-200 text-xs sm:text-sm font-mono overflow-x-auto">
                  <code>{jsonCodeString}</code>
                </pre>
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4 font-sans text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>// Narrative Overview</span>
                </div>
                {personal.bioLong.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                  <div>
                    <span className="text-cyan-400">STATUS:</span> {personal.availability}
                  </div>
                  <div>
                    <span className="text-cyan-400">LOCATION:</span> {personal.location}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attributes' && (
              <div className="space-y-4">
                <div className="text-xs text-emerald-400 font-mono uppercase tracking-wider">
                  // Professional &amp; Interpersonal Attributes
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {attributes.map((attr, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-1.5"
                    >
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-xs sm:text-sm">
                        {attr.icon}
                        <span>{attr.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {attr.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* VS Code Status Bar */}
          <div className="px-4 py-1.5 bg-[#050810] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                UTF-8
              </span>
              <span>JSON / TypeScript</span>
            </div>
            <span>Ln 1, Col 1</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
