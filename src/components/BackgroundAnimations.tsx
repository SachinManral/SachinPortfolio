'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundAnimationsProps {
  variant?: 'default' | 'particles' | 'grid' | 'waves';
}

export const BackgroundAnimations: React.FC<BackgroundAnimationsProps> = ({ 
  variant = 'default' 
}) => {
  return (
    <>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0"
        />
      </div>

      {variant === 'default' && (
        <>
          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"
                style={{
                  width: '200%',
                  top: `${i * 16.66}%`,
                  left: '-50%',
                }}
                animate={{
                  x: ['0%', '50%'],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-3">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-red-600/30"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${15 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 25 + i * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </>
      )}

      {variant === 'particles' && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-600 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {variant === 'grid' && (
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {[...Array(144)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-red-600/20"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (i % 12) * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {variant === 'waves' && (
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-32 bg-gradient-to-b from-red-600/20 to-transparent"
              style={{
                bottom: `${i * 20}%`,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BackgroundAnimations;