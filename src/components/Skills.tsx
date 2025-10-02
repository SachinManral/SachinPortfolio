'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Wrench, Brain, Award, TrendingUp } from 'lucide-react';

// 3D Floating Geometric Animation (same as Hero & About)
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

const skillsData = [
  {
    category: 'Programming Languages',
    icon: Code2,
    color: 'from-blue-600 to-cyan-600',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 88 },
      { name: 'Java', level: 80 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    category: 'Frontend Development',
    icon: Code2,
    color: 'from-purple-600 to-pink-600',
    skills: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'React Native', level: 82 },
      { name: 'Tailwind CSS', level: 87 },
    ],
  },
  {
    category: 'Backend Development',
    icon: Database,
    color: 'from-green-600 to-emerald-600',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'REST API', level: 87 },
      { name: 'WebSockets', level: 78 },
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'from-orange-600 to-red-600',
    skills: [
      { name: 'MongoDB', level: 83 },
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 78 },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: Wrench,
    color: 'from-indigo-600 to-purple-600',
    skills: [
      { name: 'PyCharm', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'IntelliJ IDEA', level: 78 },
      { name: 'Git & GitHub', level: 87 },
    ],
  },
  {
    category: 'Soft Skills',
    icon: Brain,
    color: 'from-red-600 to-pink-600',
    skills: [
      { name: 'Analytical Thinking', level: 85 },
      { name: 'Collaboration', level: 88 },
      { name: 'Communication', level: 83 },
      { name: 'Rapid Learning', level: 90 },
    ],
  },
];

const certifications = [
  { 
    name: 'Oracle Cloud Infrastructure Generative AI Professional', 
    year: 'Aug 2025', 
    issuer: 'Oracle University',
    description: 'Expertise in LLMs, Prompt Engineering, Fine-tuning, RAG, and building intelligent chatbots'
  },
  { 
    name: 'JPMorgan Chase Quantitative Research Virtual Experience', 
    year: 'Apr 2025', 
    issuer: 'Forage',
    description: 'Applied quantitative methods for loan portfolio analysis and default prediction modeling'
  },
  { 
    name: 'AWS Cloud Virtual Internship', 
    year: 'Jul-Sep 2024', 
    issuer: 'AWS Academy',
    description: '10-week intensive program on cloud infrastructure and services'
  },
  { 
    name: 'Advanced React & TypeScript Development', 
    year: '2024', 
    issuer: 'Meta',
    description: 'Mastered advanced patterns, performance optimization, and production-ready applications'
  },
  { 
    name: 'MongoDB Certified Developer Associate', 
    year: '2024', 
    issuer: 'MongoDB University',
    description: 'Database design, aggregation framework, and performance optimization'
  },
];

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
            SKILLS & EXPERTISE<span className="text-red-600">.</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-4" />
          <p className="text-gray-400 text-lg max-w-3xl">
            A comprehensive overview of my technical skills and proficiency levels across various technologies, 
            tools, and soft skills that enable me to deliver exceptional results.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 hover:border-red-600 transition-all group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-red-600 font-semibold text-sm">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: skillIndex * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${category.color} relative`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: skillIndex * 0.2 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications & Learning Journey */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-8 hover:border-red-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="border-l-2 border-red-600 pl-4 py-3 hover:bg-gray-800/50 transition-all cursor-pointer group"
                >
                  <div className="font-bold text-white group-hover:text-red-600 transition-colors">
                    {cert.name}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {cert.issuer} • {cert.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Continuous Learning */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-8 hover:border-red-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold">Growth Mindset</h3>
            </div>
            <div className="space-y-4 text-gray-400">
              <p className="leading-relaxed">
                I believe in continuous learning and staying updated with the latest technologies. 
                My approach combines hands-on project work with structured learning through courses and certifications.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-white">Currently Learning</p>
                    <p className="text-sm">Advanced AI/ML algorithms and Cloud Architecture</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-white">Focus Areas</p>
                    <p className="text-sm">Scalable systems, Performance optimization, User experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-white">Learning Philosophy</p>
                    <p className="text-sm">Build, break, learn, iterate - practical experience drives expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-white">Problem-Solving Approach</p>
                    <p className="text-sm">Breaking complex challenges into simple, elegant solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-semibold text-white">Tech Community</p>
                    <p className="text-sm">Active contributor to open-source projects and tech discussions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;