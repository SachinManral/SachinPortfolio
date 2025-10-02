'use client';
import React, { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import { Engine, Container, Particles } from 'react-tsparticles';

const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: '#000000' } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'push' },
          },
          modes: { repulse: { distance: 150 }, push: { quantity: 4 } },
        },
        particles: {
          color: { value: '#ffffff' },
          links: { enable: true, distance: 150, color: '#ffffff', opacity: 0.3, width: 1 },
          collisions: { enable: false },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            outModes: 'bounce',
            straight: false,
          },
          number: { value: 100, density: { enable: true, area: 800 } },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
