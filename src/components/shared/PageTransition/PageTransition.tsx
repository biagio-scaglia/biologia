import React, { useEffect } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Optimized page transition component with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 * Automatically scrolls to top on route change
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  const location = useLocation();

  // Scroll to top when route changes - immediate then smooth
  useEffect(() => {
    // Immediate scroll for instant feedback
    window.scrollTo(0, 0);
    
    // Then smooth scroll for better UX (if not reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 10);
    }
  }, [location.pathname]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const motionProps: MotionProps = prefersReducedMotion
    ? {
        // No animation if user prefers reduced motion
        initial: false,
        animate: false,
        exit: undefined,
      }
    : {
        // Smooth fade and slide animation
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1], // Custom easing
        },
      };

  return (
    <motion.div
      key={location.pathname}
      {...motionProps}
      className={className}
    >
      {children}
    </motion.div>
  );
};

