'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CodeXml,
  Cpu,
  Database,
  GitBranch,
  LayoutDashboard,
  Network,
  Sparkles,
  Terminal,
} from 'lucide-react';

const skillsData = [
  {
    title: 'Data Structures & Algorithms',
    icon: Terminal,
  },
  {
    title: 'React & Web Development',
    icon: LayoutDashboard,
  },
  {
    title: 'Python & AI/ML',
    icon: Sparkles,
  },
  {
    title: 'System Design',
    icon: Network,
  },
  {
    title: 'Node.js & Backend',
    icon: CodeXml,
  },
  {
    title: 'MongoDB & Databases',
    icon: Database,
  },
  {
    title: 'Git & DevOps',
    icon: GitBranch,
  },
  {
    title: 'GenAI & LLM Pipelines',
    icon: Cpu,
  },
];

const Skills: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-950/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1740px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-24 text-center"
        >
          <p className="mb-5 text-[13px] font-medium uppercase tracking-[0.55em] text-red-600">
            Current Tech Stack
          </p>
          <h2 className="font-serif text-6xl font-black uppercase leading-none tracking-normal text-white sm:text-7xl md:text-8xl">
            Arsenal
          </h2>
          <div className="mx-auto mt-8 h-px w-56 bg-white/85 sm:w-80 md:w-[350px]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {skillsData.map((skill, index) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: 'easeOut' }}
              className="group min-h-[200px] rounded-2xl border border-white/10 bg-[#0b0b0b]/80 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.5)] transition duration-300 hover:-translate-y-1 hover:border-red-600/60 hover:bg-[#101010]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.055] text-red-500 transition duration-300 group-hover:border-red-600/50 group-hover:text-red-400 group-hover:shadow-[0_0_26px_rgba(220,38,38,0.22)]">
                <skill.icon className="h-7 w-7" strokeWidth={2.25} />
              </div>
              <h3 className="max-w-[300px] font-serif text-xl font-bold uppercase leading-snug tracking-normal text-white sm:text-[21px]">
                {skill.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
