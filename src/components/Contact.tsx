'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, MapPin, Github, Linkedin, Twitter, Instagram, Send, Loader2 } from 'lucide-react';

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

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sachinmanral2431@gmail.com',
    link: 'mailto:sachinmanral2431@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9548904582',
    link: 'tel:+919548904582',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New Delhi, India',
    link: '#',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    Icon: Github,
    url: 'https://github.com/SachinManral',
    color: 'hover:bg-gray-700',
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    url: 'https://www.linkedin.com/in/sachin-manral/',
    color: 'hover:bg-blue-600',
  },
  {
    name: 'Twitter',
    Icon: Twitter,
    url: 'https://x.com/sa_xhinn',
    color: 'hover:bg-sky-500',
  },
  {
    name: 'Instagram',
    Icon: Instagram,
    url: 'https://www.instagram.com/x.sa_xhinn',
    color: 'hover:bg-pink-600',
  },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xkgjzaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 relative w-full min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <FloatingGeometry />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            GET IN TOUCH<span className="text-red-600">.</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mb-4" />
          <p className="text-gray-400 text-lg max-w-3xl">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.link}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="block bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 hover:border-red-600 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {info.label}
                    </div>
                    <div className="font-semibold text-sm sm:text-base group-hover:text-red-600 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 hover:border-red-600 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-600">▸</span>
                Follow Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`border border-gray-700 py-4 flex flex-col items-center justify-center gap-2 ${social.color} transition-all group`}
                  >
                    <social.Icon className="w-6 h-6" />
                    <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center gap-3">
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
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <div>
                  <div className="font-bold">Available for Work</div>
                  <div className="text-sm text-gray-400">
                    Open to freelance and full-time opportunities
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-6 sm:p-8 hover:border-red-600 transition-colors">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-red-600">▸</span>
                Send a Message
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none transition-colors text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none transition-colors text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none transition-colors text-white"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-400">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none transition-colors text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                  className={`w-full py-4 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    status === 'submitting'
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-green-900/30 border border-green-600 flex items-center gap-3"
                  >
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="font-bold text-green-500">Message Sent Successfully!</div>
                      <div className="text-sm text-gray-400">I'll get back to you as soon as possible.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-red-900/30 border border-red-600 flex items-center gap-3"
                  >
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <div className="font-bold text-red-500">Error</div>
                      <div className="text-sm text-gray-400">Failed to send message. Please try again.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm">
            © 2025 Sachin Manral. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;