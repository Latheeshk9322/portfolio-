import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Send, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight,
  MapPin
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { MatrixBackground } from '../components/common/MatrixBackground';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const { personal, stats } = portfolioData;

  // Typewriter effect for developer roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = personal.roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedRole.length < currentFullRole.length) {
        timer = setTimeout(() => {
          setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayedRole.length > 0) {
        timer = setTimeout(() => {
          setDisplayedRole(displayedRole.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personal.roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, personal.roles]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      {/* Matrix rain canvas background */}
      <MatrixBackground />

      {/* Subtle ambient neon glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Terminal Bio & Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Terminal prompt pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>&gt; whoami</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-semibold">{personal.availability}</span>
            </motion.div>

            {/* Name & Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-mono text-slate-100"
              >
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">{personal.name}</span>
              </motion.h1>

              {/* Dynamic Typewriter Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-mono text-cyan-300 min-h-[36px]"
              >
                <span className="text-slate-500">&gt;</span>
                <span>{displayedRole}</span>
                <span className="inline-block w-2.5 h-6 bg-cyan-400 animate-terminal-blink" />
              </motion.div>
            </div>

            {/* Short Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans"
            >
              {personal.bioShort}
            </motion.p>

            {/* Location Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personal.location}</span>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={personal.resumePdf}
                download="Latheesh_K_Resume.pdf"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-sm hover:border-cyan-400 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-colors"
                title="Launch developer interactive terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>&gt;_ Launch CLI</span>
              </button>
            </motion.div>

            {/* Social Link Strip */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                aria-label="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Developer Photo / Holographic Terminal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              {/* Outer decorative glowing circuit border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 opacity-30 group-hover:opacity-75 blur-md transition duration-500" />

              {/* IDE Styled Window Container for Photo */}
              <div className="relative rounded-2xl bg-[#090e1a] border border-cyan-500/30 overflow-hidden shadow-2xl p-3 w-72 sm:w-80">
                {/* Window header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span>latheesh_k.profile</span>
                  <span className="text-cyan-400">200 OK</span>
                </div>

                {/* Profile Image with scanline overlay */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={personal.profilePhoto}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-transparent opacity-60" />
                </div>

                {/* Badge underneath */}
                <div className="mt-3 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">ROLE_TARGET</span>
                  <span className="text-cyan-400 font-bold">IT Exec / Web Dev</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Counter Metric Chips Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all hover:bg-slate-900/90 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-slate-400 font-sans mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
