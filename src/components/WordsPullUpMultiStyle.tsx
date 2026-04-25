import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  containerClassName?: string;
}

const WordsPullUpMultiStyle = ({ segments, className, containerClassName }: WordsPullUpMultiStyleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  let wordIndex = 0;

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {segments.map((segment, segmentIdx) => {
        const words = segment.text.split(' ');
        return (
          <div key={segmentIdx} className={`inline-flex flex-wrap ${segment.className || ''}`}>
            {words.map((word, i) => {
              const currentIdx = wordIndex++;
              return (
                <motion.span
                  key={`${segmentIdx}-${i}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: currentIdx * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block mr-[0.25em] ${className || ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordsPullUpMultiStyle;
