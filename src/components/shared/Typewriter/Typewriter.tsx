import React, { useState, useEffect } from 'react';
import './Typewriter.css';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorChar?: string;
}

/**
 * Typewriter effect component that types out text character by character
 * Respects prefers-reduced-motion for accessibility
 */
export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true,
  cursorChar = '|',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // If reduced motion, show all text immediately
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Reset state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);

    // Initial delay
    const delayTimeout = setTimeout(() => {
      if (text.length === 0) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Type out text character by character (optimized)
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            const newIndex = prevIndex + 1;
            setDisplayedText(text.slice(0, newIndex));
            
            if (newIndex === text.length) {
              setIsComplete(true);
              if (onComplete) {
                onComplete();
              }
              clearInterval(interval);
            }
            
            return newIndex;
          }
          clearInterval(interval);
          return prevIndex;
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay, onComplete, prefersReducedMotion]);

  return (
    <span className={`typewriter ${className}`}>
      <span className="typewriter-text">{displayedText}</span>
      {showCursor && !isComplete && (
        <span className="typewriter-cursor" aria-hidden="true">
          {cursorChar}
        </span>
      )}
    </span>
  );
};

