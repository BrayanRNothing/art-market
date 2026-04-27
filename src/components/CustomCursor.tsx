import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

interface CustomCursorProps {
  status?: 'default' | 'success' | 'error' | 'loading';
}

const CustomCursor = ({ status = 'default' }: CustomCursorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const velocityX = useVelocity(cursorX);
  const tiltX = useTransform(velocityX, [-1000, 1000], [-15, 15]);
  const rotateSpring = useSpring(0, { damping: 15, stiffness: 100 });

  // Status colors - Green for success, Red for error
  const statusColors = {
    default: '#E1E0CC',
    success: '#10B981', // Emerald Green
    error: '#FF4444',   // Red
    loading: '#FFFFFF'
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .group') || window.getComputedStyle(target).cursor === 'pointer') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const unsubscribeX = tiltX.on("change", (v) => rotateSpring.set(v));
    return () => unsubscribeX();
  }, [tiltX, rotateSpring]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-10%',
        translateY: '-10%',
        rotate: rotateSpring,
      }}
    >
      {/* Container for the shake animation to avoid conflict with X/Y positioning */}
      <motion.div
        animate={status === 'error' ? {
          x: [0, -3, 3, -3, 3, 0],
          transition: { duration: 0.4 }
        } : { x: 0 }}
        style={{
            filter: `drop-shadow(0px 0px ${status !== 'default' ? '12px' : '4px'} ${statusColors[status]}aa)`,
        }}
      >
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          animate={{
            scale: isClicked ? 0.85 : isHovered ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <motion.path
            d="M3 3L10 21L13 13L21 10L3 3Z"
            fill="black"
            stroke={statusColors[status]}
            strokeWidth="1.2"
            animate={{ stroke: statusColors[status] }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {status === 'success' && (
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              stroke={statusColors.success}
              strokeWidth="0.8"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
