'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Github, Filter } from 'lucide-react';
import Image from 'next/image';

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

const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    description: 'Full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard',
    link: 'https://echocartshop.netlify.app/',
    github: '',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'F1 Streetwear',
    category: 'Web Design',
    image: '/assets/f1-street.png',
    description: 'Modern streetwear brand website with immersive design and smooth animations',
    link: 'https://f1streetwear.framer.website/',
    github: '',
    tags: ['Framer', 'UI/UX', 'Design']
  },
  {
    id: 3,
    title: 'Krishi Sahaay',
    category: 'Web Development',
    image: '/assets/krishi-sahaay.jpeg',
    description: 'Agricultural assistance platform connecting farmers with resources and market information',
    link: 'https://github.com/SachinManral/KrishiSahaay.git',
    github: 'https://github.com/SachinManral/KrishiSahaay.git',
    tags: ['React', 'Firebase', 'API Integration']
  },
  {
    id: 4,
    title: 'Netflix Clone',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
    description: 'Netflix UI clone with movie browsing, trailers, and responsive design',
    link: '#',
    github: '',
    tags: ['React', 'TMDB API', 'CSS']
  },
  {
    id: 5,
    title: 'Personal Portfolio',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=800&h=600&fit=crop',
    description: 'Modern portfolio website showcasing projects and skills with interactive elements',
    link: 'https://sachinmanral.netlify.app/',
    github: '',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 6,
    title: 'Task Manager',
    category: 'Applications',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    description: 'Productivity app for managing tasks with drag-and-drop functionality',
    link: '#',
    github: '',
    tags: ['React', 'TypeScript', 'Local Storage']
  },
  {
    id: 7,
    title: 'Brawlhalla',
    category: 'Applications',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    description: 'Gaming companion app with stats tracking and player information',
    link: '#',
    github: '',
    tags: ['React Native', 'API', 'Mobile']
  },
  {
    id: 8,
    title: 'Fundo',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Financial dashboard with data visualization and analytics',
    link: '#',
    github: '',
    tags: ['Figma', 'UI/UX', 'Prototyping']
  }
];

const categories = ['All', 'Web Development', 'Web Design', 'Applications'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="scroll-mt-20 min-h-screen relative w-full bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            PORTFOLIO<span className="text-red-600">.</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-4" />
          <p className="text-gray-400 text-lg max-w-3xl">
            A collection of my recent projects showcasing expertise in web development, design, and application development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <Filter className="w-5 h-5 text-red-600 mt-2" />
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 font-semibold uppercase tracking-wider text-sm transition-all ${
                activeCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-red-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 overflow-hidden hover:border-red-600 transition-all"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full relative"
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: hoveredProject === project.id ? 0.9 : 0.7 }}
                  />

                  {/* Hover Actions */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 flex items-center justify-center gap-4"
                      >
                        {project.link && project.link !== '#' ? (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </motion.a>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-12 h-12 bg-gray-600/50 flex items-center justify-center cursor-not-allowed"
                          >
                            <Eye className="w-5 h-5 opacity-50" />
                          </motion.div>
                        )}
                        <motion.a
                          href="https://github.com/SachinManral"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors border border-gray-700"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-red-600"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredProject === project.id ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-8">
            <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Check out my GitHub for more projects and contributions to open-source.
            </p>
            <motion.a
              href="https://github.com/SachinManral"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Visit GitHub</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;