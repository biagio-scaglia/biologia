import React, { useCallback, useMemo } from 'react';
import { Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import './BiologyBackground.css';

interface BiologyBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * Biology-themed particle background component
 * Creates animated particles that resemble cells or biological molecules
 */
export const BiologyBackground: React.FC<BiologyBackgroundProps> = ({
  className = '',
  intensity = 'medium',
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particleCount = useMemo(() => {
    switch (intensity) {
      case 'low':
        return 30;
      case 'high':
        return 100;
      default:
        return 50;
    }
  }, [intensity]);

  const particlesLoaded = useCallback(async () => {
    // Optional: can add callback here
  }, []);

  return (
    <div className={`biology-background ${className}`}>
      <Particles
        id="biology-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60, // Reduced for better performance
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              // @ts-expect-error - tsparticles type definition issue
              resize: true,
            },
            modes: {
              push: {
                quantity: 2,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ['#2563eb', '#0ea5e9', '#06b6d4', '#10b981'],
            },
            links: {
              color: '#2563eb',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                // @ts-expect-error - tsparticles type definition issue
                area: 800,
              },
              value: particleCount,
            },
            opacity: {
              value: 0.4,
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                // @ts-expect-error - tsparticles type definition issue
                minimumValue: 0.2,
                sync: false,
              },
            },
            shape: {
              type: ['circle', 'triangle'],
            },
            size: {
              value: { min: 2, max: 5 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                // @ts-expect-error - tsparticles type definition issue
                minimumValue: 1,
                sync: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

