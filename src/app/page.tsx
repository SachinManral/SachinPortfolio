import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Resume from '@/components/Resume';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  metadataBase: new URL('https://sachinmanral.com'),

  title: 'Sachin Manral | Freelance Web & AI/ML Developer for Scalable Apps & Smart Systems',
  description:
    "Sachin Manral — Freelance Full-Stack & AI/ML Developer. I craft scalable React/Node apps & intelligent ML solutions to boost startup growth.",

  keywords: [
    'Sachin Manral',
    'freelance web developer',
    'React developer',
    'Node.js developer',
    'AI developer',
    'Machine Learning developer',
    'full-stack developer',
    'portfolio',
    'software engineer freelancer',
    'MERN developer',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  authors: [{ name: 'Sachin Manral', url: 'https://sachinmanral.com' }],

  alternates: {
    canonical: 'https://sachinmanral.com',
  },

  openGraph: {
    title: 'Sachin Manral | Freelance Web & AI/ML Developer for Scalable Apps',
    description:
      'Expert freelance developer offering full-stack web development, React, Node.js, and AI/ML solutions to elevate your business.',
    url: 'https://sachinmanral.com',
    siteName: 'Sachin Manral Portfolio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://sachinmanral.com/assets/avatarImg.png',
        width: 500,
        height: 500,
        alt: 'Sachin Manral — Full-Stack Web & AI/ML Developer',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'Sachin Manral | Freelance Web & AI/ML Developer',
    description:
      'Freelance developer specializing in React, Node.js, full-stack apps, and AI/ML solutions.',
    images: ['https://sachinmanral.com/assets/avatar.png'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0f172a',
};


export default function Home() {
  return (
    <>
      {/* JSON-LD: WebSite Schema with SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://sachinmanral.com',
            name: 'Sachin Manral Portfolio',
            description: 'Portfolio of Sachin Manral — freelance full-stack web and AI/ML developer',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://sachinmanral.com/?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* JSON-LD: Enhanced Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Sachin Manral',
            url: 'https://sachinmanral.com',
            image: 'https://sachinmanral.com/assets/avatar.png',
            jobTitle: 'Full-Stack Web & AI/ML Developer',
            email: 'mailto:contact@sachinmanral.com',
            sameAs: [
              'https://github.com/SachinManral',
              'https://www.linkedin.com/in/sachin-manral/',
              'https://leetcode.com/u/SachinManral/',
              'https://www.instagram.com/x.sa_xhinn/',
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Freelance',
              url: 'https://sachinmanral.com',
            },
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Graphic Era Hill University',
            },
            knowsAbout: [
              'React',
              'Node.js',
              'AI',
              'Machine Learning',
              'MERN Stack',
              'Full-Stack Development',
              'Python',
              'TypeScript',
            ],
            description:
              'Freelance full-stack web & AI/ML developer specializing in building intelligent, scalable software systems for startups and businesses.',
          }),
        }}
      />

      {/* JSON-LD: Projects as Individual Articles */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'E-commerce Dashboard — React + Node.js Case Study',
            description:
              'Built a real-time e-commerce dashboard using React, Node.js, and MongoDB. Architecture, code snippets, and performance improvements included.',
            url: 'https://sachinmanral.com/#projects',
            author: { '@type': 'Person', name: 'Sachin Manral', url: 'https://sachinmanral.com' },
            publisher: { '@type': 'Person', name: 'Sachin Manral' },
            datePublished: '2025-10-05',
            dateModified: '2025-10-05',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'AI Image Classifier Deployment',
            description:
              'Deployed an image classification ML model using Python, Flask, and AWS Lambda with REST API integration.',
            url: 'https://sachinmanral.com/#projects',
            author: { '@type': 'Person', name: 'Sachin Manral', url: 'https://sachinmanral.com' },
            publisher: { '@type': 'Person', name: 'Sachin Manral' },
            datePublished: '2025-10-05',
            dateModified: '2025-10-05',
          }),
        }}
      />

      <main className="w-full min-h-screen">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Resume Section */}
        <section id="resume">
          <Resume />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}