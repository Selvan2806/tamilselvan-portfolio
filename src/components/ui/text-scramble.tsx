import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  characterSet?: string;
}

export const TextScramble = ({
  text,
  className = '',
  scrambleDuration = 1500,
  characterSet = '!<>-_\\/[]{}—=+*^?#@$%&'
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasScrambled = useRef(false);

  const scramble = useCallback(() => {
    if (hasScrambled.current) return;
    hasScrambled.current = true;
    setIsScrambling(true);
    
    const chars = text.split('');
    const iterations = 3;
    const iterationDuration = scrambleDuration / (text.length * iterations);
    let currentIteration = 0;
    let revealedCount = 0;

    const interval = setInterval(() => {
      setDisplayText(
        chars
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < revealedCount) return char;
            return characterSet[Math.floor(Math.random() * characterSet.length)];
          })
          .join('')
      );

      currentIteration++;
      
      if (currentIteration % iterations === 0) {
        revealedCount++;
      }

      if (revealedCount >= chars.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, iterationDuration);

    return () => clearInterval(interval);
  }, [text, scrambleDuration, characterSet]);

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <motion.span
      ref={ref}
      className={`${className} ${isScrambling ? 'font-mono' : ''}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
};
