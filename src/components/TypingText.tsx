'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
  cursorColor?: string;
  gradient?: boolean;
  showCursor?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pause = 2000,
  className = '',
  cursorColor = 'text-red-600',
  gradient = true,
  showCursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentWord = texts[wordIndex % texts.length];

    // Handle pause at the end of typing
    if (!isDeleting && charIndex === currentWord.length) {
      if (!isPaused) {
        setIsPaused(true);
        const pauseTimeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pause);
        return () => clearTimeout(pauseTimeout);
      }
      return;
    }

    // Skip if paused
    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          setDisplayedText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Deleting backward
          setDisplayedText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          
          // When fully deleted, move to next word
          if (charIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, texts, speed, deleteSpeed, pause, isPaused]);

  if (!texts || texts.length === 0) return null;

  return (
    <div className={`inline-flex items-center min-h-8 ${className}`}>
      <motion.span
        key={displayedText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`font-light tracking-wide ${
          gradient
            ? 'bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent'
            : 'text-gray-300'
        }`}
      >
        {displayedText}
      </motion.span>
      
      {/* Animated Cursor */}
      {showCursor && (
        <motion.span
          animate={{ 
            opacity: [1, 1, 0, 0],
            scaleY: [1, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1]
          }}
          className={`inline-block w-0.5 h-6 ml-1 ${cursorColor.replace('text-', 'bg-')}`}
        />
      )}
    </div>
  );
};

export default TypingText;