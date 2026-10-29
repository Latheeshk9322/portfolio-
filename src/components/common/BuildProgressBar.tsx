import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

export const BuildProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.min(100, Math.round(latest * 100)));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Background track line */}
      <div className="h-1 w-full bg-slate-900/80 backdrop-blur-sm">
        {/* Animated build indicator progress */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ scaleX, transformOrigin: '0%' }}
        />
      </div>

      {/* Mini status pill in top right corner on desktop */}
      <div className="hidden lg:flex absolute top-2 right-4 items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-lg backdrop-blur-md">
        {percentage >= 99 ? (
          <>
            <CheckCircle2 className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">BUILD: READY</span>
          </>
        ) : (
          <>
            <Terminal className="w-3 h-3 text-cyan-400 animate-spin" />
            <span>BUILD: {percentage}%</span>
            <span className="text-slate-500">[{'='.repeat(Math.max(1, Math.floor(percentage / 10)))}{'>'}]</span>
          </>
        )}
      </div>
    </div>
  );
};
