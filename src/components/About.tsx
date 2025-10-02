'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Instagram, Code2, Palette, Smartphone, Layout, Award, Users, Briefcase, GraduationCap } from 'lucide-react';
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

const About: React.FC = () => {
  const services = [
    {
      Icon: Palette,
      title: 'Web Design',
      description: 'The most modern and high-quality design made at a professional level.',
    },
    {
      Icon: Code2,
      title: 'Web Development',
      description: 'High-quality development of sites at the professional level.',
    },
    {
      Icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Professional development of applications for iOS and Android.',
    },
    {
      Icon: Layout,
      title: 'Canva Designing',
      description: 'Creating visually appealing graphics, presentations, and social media content using Canva design tools.',
    },
  ];

  const expertise = [
    { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'AI/ML', skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'] },
    { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma'] },
  ];

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
            ABOUT ME<span className="text-red-600">.</span>
          </h2>
          <div className="w-20 h-1 bg-red-600" />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 sm:p-8 hover:border-red-600 transition-colors">
                {/* Avatar with Image */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-1 bg-gray-800 rounded-lg overflow-hidden">
                    {/* Replace the src with your imported image: src={avatarImage} */}

                    <Image
                      src="/assets/avatar.png"
                      alt="Sachin Manral"
                      width={400}      // set the desired width
                      height={400}     // set the desired height
                      className="object-cover w-full h-full"
                    />

                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="text-2xl font-bold text-center mb-2">Sachin Manral</h3>
                <p className="text-red-600 text-center mb-6">Software Engineer</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { Icon: Briefcase, value: '25+', label: 'Projects' },
                    { Icon: Award, value: '3+', label: 'Years' },
                    { Icon: Users, value: '15+', label: 'Clients' },
                    { Icon: GraduationCap, value: '5+', label: 'Certifications' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-800 p-3 hover:border-red-600 transition-colors group"
                    >
                      <stat.Icon className="w-6 h-6 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xl sm:text-2xl font-bold text-red-600">{stat.value}</div>
                      <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {[
                    { Icon: Github, url: 'https://github.com/SachinManral' },
                    { Icon: Linkedin, url: 'https://www.linkedin.com/in/sachin-manral/' },
                    { Icon: Twitter, url: 'https://x.com/sa_xhinn' },
                    { Icon: Instagram, url: 'https://www.instagram.com/x.sa_xhinn' },
                  ].map(({ Icon, url }, index) => (
                    <motion.a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Bio & Expertise */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 sm:p-8 hover:border-red-600 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
              <div className="text-gray-400 leading-relaxed space-y-4">
                <p>
                  I'm a Full Stack Developer and Artificial Intelligence & Machine Learning expert from Delhi, India,
                  with a deep passion for building innovative, scalable solutions that address real-world challenges.
                  I thrive on transforming complex problems into simple, elegant solutions. I enjoy developing intelligent,
                  user-friendly applications while continuously exploring advancements in the tech world.
                </p>
                <p>
                  I believe in writing clean, maintainable code and staying up to date with the latest innovations in
                  AI and software engineering. When I'm not coding, you'll find me exploring AI research, reading tech blogs,
                  or experimenting with new programming paradigms.
                </p>
              </div>
            </motion.div>

            {/* Technical Expertise */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 sm:p-8 hover:border-red-600 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6">Technical Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {expertise.map((area, index) => (
                  <motion.div
                    key={area.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-800 p-4 hover:border-red-600 transition-colors"
                  >
                    <h4 className="text-lg font-bold text-red-600 mb-3">{area.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-600 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            What I Do
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 hover:border-red-600 transition-all group"
              >
                <service.Icon className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;