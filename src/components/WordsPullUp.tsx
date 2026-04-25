import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delayOffset?: number;
  style?: React.CSSProperties;
}

const WordsPullUp = ({ text, className, showAsterisk, delayOffset = 0, style }: WordsPullUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const words = text.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: delayOffset + i * 0.08,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block mr-[0.25em] relative"
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
              *
            </span>
          )}
        </motion.span>
      ))}
    </div>
  );
};

export default WordsPullUp;
