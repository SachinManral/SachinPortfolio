'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// 3D Floating Geometric Animation
const FloatingGeometry = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.z -= this.speedZ;

        if (this.z <= 0) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        const scale = 1000 / (1000 + this.z);
        const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size2d = this.size * scale;

        const opacity = Math.max(0, 1 - this.z / 1000);
        
        ctx!.fillStyle = `rgba(220, 38, 38, ${opacity * 0.6})`;
        ctx!.beginPath();
        ctx!.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = Math.max(0, 1 - distance / 150) * 0.2;
            ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(
              (particle.x - canvas.width / 2) * (1000 / (1000 + particle.z)) + canvas.width / 2,
              (particle.y - canvas.height / 2) * (1000 / (1000 + particle.z)) + canvas.height / 2
            );
            ctx.lineTo(
              (particles[j].x - canvas.width / 2) * (1000 / (1000 + particles[j].z)) + canvas.width / 2,
              (particles[j].y - canvas.height / 2) * (1000 / (1000 + particles[j].z)) + canvas.height / 2
            );
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.4 }}
    />
  );
};

const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="text-lg md:text-2xl font-light tracking-wide text-gray-400">
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-red-600"
      >
        |
      </motion.span>
    </span>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      {/* 3D Background Animation */}
      <FloatingGeometry />

      {/* Top Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-px"
      >
        <div className="relative w-full h-full bg-gradient-to-r from-transparent via-red-600 to-transparent">
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-red-600"
          />
          <span className="text-red-600 text-xs font-bold tracking-[0.3em] uppercase">
            Creative Software Engineer
          </span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-red-600"
          />
        </motion.div>

        {/* Name */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tight leading-none"
          >
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-white mb-2"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            >
              SACHIN
            </motion.span>
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block relative"
            >
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                MANRAL
              </span>
              <motion.div
                animate={{ width: ['0%', '100%', '100%', '0%'] }}
                transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 h-1 bg-red-600"
              />
            </motion.span>
          </motion.h1>
        </div>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12 min-h-8"
        >
          <TypingText
            texts={[
              'Full Stack Developer',
              'AI & ML Expert',
              'Web Developer',
              'UI/UX Designer',
              'Mobile Developer',
            ]}
          />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-8 mb-12 text-sm px-4"
        >
          {[
            { label: 'STATUS', value: 'AVAILABLE', dot: true },
            { label: 'LOCATION', value: 'NEW DELHI' },
            { label: 'EXPERIENCE', value: '3+ YEARS' },
            { label: 'AGE', value: '21 YRS' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.15, duration: 0.5, type: 'spring' }}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-red-600/50 transition-all group"
            >
              {stat.dot && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      '0 0 0 8px rgba(34, 197, 94, 0)',
                      '0 0 0 0 rgba(34, 197, 94, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              )}
              <span className="text-gray-500 text-xs tracking-wider">{stat.label}:</span>
              <span className="text-white font-bold group-hover:text-red-600 transition-colors text-xs sm:text-sm">
                {stat.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-red-600 text-white font-bold uppercase tracking-wider overflow-hidden text-sm sm:text-base cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('projects');
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold uppercase tracking-wider overflow-hidden text-sm sm:text-base cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-red-500 transition-colors">
              Contact Me
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute top-8 right-8 hidden md:block"
      >
        <div className="flex flex-col gap-1">
          {[40, 25, 10].map((height, i) => (
            <motion.div
              key={i}
              className="w-px bg-red-600"
              style={{ height: `${height}px`, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-8 hidden md:block"
      >
        <div className="flex flex-col gap-1">
          {[10, 25, 40].map((height, i) => (
            <motion.div
              key={i}
              className="w-px bg-red-600"
              style={{ height: `${height}px`, boxShadow: '0 0 8px rgba(220, 38, 38, 0.5)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px"
      >
        <div className="relative w-full h-full bg-gradient-to-r from-transparent via-red-600 to-transparent">
          <motion.div
            animate={{ x: ['200%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-600 cursor-pointer hover:text-red-600 transition-colors group"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-bold">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1 group-hover:border-red-600 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;