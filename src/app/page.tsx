
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Hero />
      <About />
      <Resume />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
