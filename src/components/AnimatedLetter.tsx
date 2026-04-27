import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface LetterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Letter = ({ char, progress, range }: LetterProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

const AnimatedLetter = ({ text, className }: AnimatedLetterProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const letters = text.split("");
  const totalChars = letters.length;

  return (
    <p ref={ref} className={`relative flex flex-wrap ${className}`}>
      {letters.map((char, i) => {
        const charProgress = i / totalChars;
        const start = charProgress - 0.1;
        const end = charProgress + 0.05;
        
        return (
          <Letter 
            key={i} 
            char={char} 
            progress={scrollYProgress} 
            range={[Math.max(0, start), Math.min(1, end)]} 
          />
        );
      })}
    </p>
  );
};

export default AnimatedLetter;
