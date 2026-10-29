import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareCode, Quote, ChevronLeft, ChevronRight, CheckCircle, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useHackerScramble } from '../hooks/useHackerScramble';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = portfolioData;
  const [currentIdx, setCurrentIdx] = useState(0);

  const { displayText: titleText } = useHackerScramble('PEER REVIEWS & ENDORSEMENTS', 25);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[currentIdx];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Heading */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>06 // CODE REVIEW &amp; ACADEMIC FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-100">
            {titleText}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            &gt; git log --author=mentors --grep=&quot;feedback&quot;
          </p>
        </div>

        {/* Testimonial Card IDE Window */}
        <motion.div
          key={activeTestimonial.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-cyan-500/30 bg-[#090e1a] shadow-2xl p-6 sm:p-8 font-mono relative overflow-hidden"
        >
          {/* Top Review Metadata */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-bold">APPROVED // PR #2025</span>
              <span className="text-slate-500 hidden sm:inline">| Signed by Authorized Mentor</span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500 px-1">
                {currentIdx + 1}/{testimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quote Body */}
          <div className="space-y-4">
            <Quote className="w-8 h-8 text-cyan-500/40" />
            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed italic">
              &quot;{activeTestimonial.quote}&quot;
            </p>
          </div>

          {/* Author Details */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-300 text-sm">
              {activeTestimonial.avatarText}
            </div>

            <div>
              <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <span>{activeTestimonial.author}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs text-cyan-400">{activeTestimonial.role}</div>
              <div className="text-xs text-slate-500">{activeTestimonial.organization}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
