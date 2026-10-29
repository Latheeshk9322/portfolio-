import { useState, useEffect, useCallback } from 'react';

const CHARS = 'ABCDEF0123456789!@#$%^&*<>[]{}~/\\+=';

export function useHackerScramble(targetText: string, speed = 35) {
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    setIsScrambling(true);

    const interval = setInterval(() => {
      setDisplayText(() =>
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return { displayText, isScrambling, triggerScramble: scramble };
}
