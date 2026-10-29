import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2 } from 'lucide-react';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if user already booted this session
    const hasBooted = sessionStorage.getItem('lk-booted');
    if (hasBooted) {
      setShow(false);
      onComplete();
      return;
    }

    const bootSequence = [
      { text: '[  0.001 ] Initializing Latheesh K Portfolio Environment...', progress: 15 },
      { text: '[  0.042 ] Mounting developer modules: React, TypeScript, Tailwind, Python...', progress: 35 },
      { text: '[  0.089 ] Checking Academic Credentials: MCA Graduate (VCET Puttur)...', progress: 55 },
      { text: '[  0.134 ] Loading Internship Records: AI & ML @ Zephyr Technologies...', progress: 75 },
      { text: '[  0.182 ] Initializing Hardware & IoT interfaces (ESP32-CAM KSCST)...', progress: 90 },
      { text: '[  0.220 ] System Ready. Launching interactive workspace...', progress: 100 },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        setLogs((prev) => [...prev, bootSequence[currentStep].text]);
        setProgress(bootSequence[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('lk-booted', 'true');
          setShow(false);
          onComplete();
        }, 350);
      }
    }, 240);

    const handleSkip = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        sessionStorage.setItem('lk-booted', 'true');
        setShow(false);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleSkip);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleSkip);
    };
  }, [onComplete]);

  const handleManualSkip = () => {
    sessionStorage.setItem('lk-booted', 'true');
    setShow(false);
    onComplete();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080f] font-mono text-xs p-4 select-none"
      >
        <div className="w-full max-w-xl rounded-xl border border-cyan-500/30 bg-[#090d16] p-6 shadow-2xl shadow-cyan-950/60 relative overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-slate-300 font-semibold tracking-wider">SYSTEM_BOOT_SEQUENCE</span>
            </div>
            <button
              onClick={handleManualSkip}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-cyan-500/30 px-2.5 py-1 rounded transition-colors"
            >
              SKIP [ESC]
            </button>
          </div>

          {/* Log Stream */}
          <div className="space-y-1.5 min-h-[170px] text-slate-300">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="leading-relaxed">{log}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>BOOT PROGRESS</span>
              <span className="text-cyan-400 font-bold">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_12px_#06b6d4]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
