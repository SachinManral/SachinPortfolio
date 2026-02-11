'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Download, ExternalLink } from 'lucide-react';

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

const resumeData = [
  {
    year: '2023 — 2027',
    title: 'Bachelor of Technology in Computer Science',
    company: 'Galgotias University',
    description: 'Specializing in Artificial Intelligence and Machine Learning. Focusing on deep learning, computer vision, and natural language processing.',
    achievements: ['AI & ML Specialization', 'Deep Learning', 'Computer Vision', 'Natural Language Processing'],
    type: 'education',
  },
  {
    year: '2023 — 2024',
    title: 'CS50\'s Introduction to Computer Science',
    company: 'Harvard University (Online)',
    description: 'Completed comprehensive course covering algorithms, data structures, and software engineering principles with a final project in web development.',
    achievements: ['Data Structures & Algorithms', 'Software Engineering', 'Web Development Project'],
    type: 'education',
  },
  {
    year: '2021 — 2023',
    title: 'High School & Intermediate',
    company: 'Govt. Sarvodaya Bal Vidyalaya (Prem Chand)',
    description: 'Focus on Physics, Chemistry, and Mathematics (PCM) with strong academic performance.',
    achievements: ['PCM Stream', 'Strong Foundation in Mathematics'],
    type: 'education',
  },
  {
    year: '2025',
    title: 'F1 Streetwear E-Commerce Platform',
    company: 'Throttle Theory (Internship)',
    description: 'Built F1-inspired streetwear e-commerce platform in Framer, featuring racing-themed visuals, dynamic layouts, smooth animations, and mobile-first design. Focused on delivering a premium, fast-paced user experience.',
    achievements: ['Racing-themed UI', 'Dynamic Animations', 'Mobile-first Design', 'Premium UX'],
    type: 'work',
  },
  {
    year: '2024',
    title: 'KrishiSahaay - AI-Powered Agriculture Platform',
    company: 'Personal Project',
    description: 'Built a full-stack platform empowering Indian farmers with live weather insights, smart AI crop guidance, a digital marketplace, and streamlined logistics. Developed using React.js, Node.js, MongoDB, Google Gemini API, and OpenWeatherMap.',
    achievements: ['React.js & Node.js', 'MongoDB Integration', 'Google Gemini API', 'OpenWeatherMap API', 'Full-stack Development'],
    type: 'work',
  },
  {
    year: '2025',
    title: 'Netflix Clone',
    company: 'Personal Project',
    description: 'Developed a Netflix clone with features like user authentication, dynamic content display, and responsive design. Integrated movie database API for fetching real-time data and implemented smooth, interactive UI components.',
    achievements: ['User Authentication', 'API Integration', 'Responsive Design', 'Interactive UI'],
    type: 'work',
  },
];

const Resume: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D Background Animation */}
      <FloatingGeometry />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            RESUME<span className="text-red-600">.</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-4" />
          <p className="text-gray-400 text-lg max-w-3xl">
            My academic journey and professional experience in software development, AI/ML, and full-stack engineering
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-600 via-gray-800 to-transparent hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-20">
            {resumeData.map((item, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`flex flex-col md:flex-row gap-8 items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-full md:w-5/12 bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 sm:p-8 relative group hover:border-red-600 transition-all duration-300"
                    >
                      {/* Type badge */}
                      <div className={`absolute -top-3 ${isLeft ? 'md:right-8 right-4' : 'md:left-8 left-4'} px-4 py-1 text-xs font-bold uppercase tracking-wider ${
                        item.type === 'work' ? 'bg-blue-600' : 'bg-purple-600'
                      } flex items-center gap-2`}>
                        {item.type === 'work' ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                        {item.type}
                      </div>

                      {/* Year tag */}
                      <div className="text-red-600 font-bold mb-2 text-sm tracking-wider">
                        {item.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <div className="text-gray-400 font-semibold mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm sm:text-base">{item.company}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={hoveredIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-4 border-t border-gray-800">
                          {item.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ x: -10, opacity: 0 }}
                              animate={hoveredIndex === index ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-start gap-2 text-xs sm:text-sm text-gray-400"
                            >
                              <span className="text-red-600 mt-1 flex-shrink-0">▸</span>
                              <span>{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Bottom accent */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-red-600"
                        initial={{ width: 0 }}
                        animate={hoveredIndex === index ? { width: '100%' } : { width: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Center dot */}
                    <motion.div
                      animate={hoveredIndex === index ? { scale: 1.5 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hidden md:block relative z-10"
                    >
                      <div className={`w-6 h-6 rounded-full border-4 ${
                        hoveredIndex === index ? 'bg-red-600 border-red-600' : 'bg-gray-900 border-gray-600'
                      } transition-all duration-300`}>
                        <motion.div
                          animate={hoveredIndex === index ? { scale: [1, 1.5, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-red-600"
                          style={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                        />
                      </div>
                    </motion.div>

                    {/* Spacer for alignment */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="https://drive.google.com/file/d/1pFsUh_CC-hTJkqlq2z49OrviKk5912ZJ/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors group text-sm sm:text-base"
          >
            <Download className="w-5 h-5" />
            <span>Download Full Resume</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;