import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, X, ExternalLink, ZoomIn, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Certificate } from '../types/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

export const CertificationsSection: React.FC = () => {
  const { certificates } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const { displayText: titleText } = useHackerScramble('VERIFIED CREDENTIALS & AWARDS', 25);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#070b13]/70">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>05 // CERTIFICATES &amp; ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; openssl verify -CAfile vcet-root-ca.pem certs/*.pem
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-xl border border-cyan-500/20 bg-[#090e1a] p-4 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition-all shadow-xl hover:shadow-cyan-950/40 group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Image Thumbnail with zoom overlay */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-500 text-cyan-300 font-mono text-xs shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Preview Certificate
                  </span>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-400 font-semibold">{cert.category}</span>
                  <span className="text-slate-500">{cert.year}</span>
                </div>

                <h3 className="font-mono font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 font-sans">
                  {cert.institution}
                </p>
              </div>

              {/* Verified badge */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  SHA256: VERIFIED
                </span>
                {cert.awardBadge && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-amber-300">
                    {cert.awardBadge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-xl border border-cyan-500/40 bg-[#080d17] shadow-2xl overflow-hidden font-mono z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#05080f] border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{selectedCert.title}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Certificate Image View */}
                <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center bg-black/40">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-h-[70vh] w-auto rounded-lg object-contain border border-slate-800 shadow-2xl"
                  />
                </div>

                {/* Footer details */}
                <div className="p-4 bg-[#05080f] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Awarded by: </span>
                    <span className="text-slate-200 font-semibold">{selectedCert.institution} ({selectedCert.year})</span>
                  </div>
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Full Image
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
