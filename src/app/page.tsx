import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';

// Server-side metadata - Google will see this immediately
export const metadata: Metadata = {
  title: 'Sachin Manral | Freelance Web & AI/ML Developer',
  description: 'Hire Sachin Manral — expert freelance web developer skilled in React, Node.js, full-stack apps, and AI/ML projects. Get custom solutions that elevate your business.',
  robots: 'index, follow',
  openGraph: {
    title: 'Sachin Manral — Tech Freelancer & Developer',
    description: 'Hire Sachin Manral for freelance web development, full-stack apps, and AI/ML solutions.',
    url: 'https://sachinmanral.com',
    siteName: 'Sachin Manral Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sachin Manral — Tech Freelancer',
    description: 'Freelance developer specializing in React, Node.js, and AI/ML',
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sachin Manral",
            "url": "https://sachinmanral.com",
            "jobTitle": "Software Developer & Tech Freelancer",
            "image": "https://sachinmanral.com/path/to/avatar.jpg",
            "sameAs": [
              "https://github.com/SachinManral",
              "https://www.linkedin.com/in/sachin-manral/"
            ],
            "knowsAbout": ["Web Development","React","Node.js","AI","Machine Learning"]
          })
        }}
      />

      {/* JSON-LD Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "headline": "E-commerce Dashboard — React + Node.js Case Study",
              "description": "Built a real-time e-commerce dashboard using React, Node.js, and MongoDB. Architecture, code snippets, and performance improvements included.",
              "url": "https://sachinmanral.com/#projects",
              "creator": {
                "@type": "Person",
                "name": "Sachin Manral"
              },
              "datePublished": "2025-10-05"
            },
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "headline": "AI Image Classifier Deployment",
              "description": "Deployed an image classification ML model using Python, Flask, and AWS Lambda with REST API integration.",
              "url": "https://sachinmanral.com/#projects",
              "creator": {
                "@type": "Person",
                "name": "Sachin Manral"
              },
              "datePublished": "2025-10-05"
            }
          ])
        }}
      />

      <main className="w-full min-h-screen">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about">
          <h2 className="sr-only">About Me — Freelance Full-Stack & AI/ML Developer</h2>
          <About />
        </section>

        {/* Resume Section */}
        <section id="resume">
          <h2 className="sr-only">Resume & Experience</h2>
          <Resume />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <h2 className="sr-only">Skills & Technologies</h2>
          <Skills />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="sr-only">Portfolio / Case Studies — React, Node.js, AI/ML Projects</h2>
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="sr-only">Contact Me — Hire Freelance Developer</h2>
          <Contact />
        </section>
      </main>
    </>
  );
}