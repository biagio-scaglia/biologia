import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { Typewriter } from '@/components/shared/Typewriter';
import introductionData from '@/assets/data/lch/introduction.json';
import './HeroIntro.css';

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export const HeroIntro: React.FC = () => {
  // Validazione e conversione sicura dei dati
  const safeData = {
    title: String(introductionData?.title || ''),
    subtitle: String(introductionData?.subtitle || ''),
    content: {
      definition: String(introductionData?.content?.definition || ''),
      overview: String(introductionData?.content?.overview || ''),
      keyPoints: Array.isArray(introductionData?.content?.keyPoints) 
        ? introductionData.content.keyPoints.map(p => String(p || ''))
        : [],
      epidemiology: {
        incidence: String(introductionData?.content?.epidemiology?.incidence || ''),
        ageRange: String(introductionData?.content?.epidemiology?.ageRange || ''),
        gender: String(introductionData?.content?.epidemiology?.gender || ''),
      }
    }
  };
  
  const { title, subtitle, content } = safeData;

  // Animation props that respect reduced motion
  const getAnimationProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: false,
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
    };
  };

  return (
    <section className="hero-intro" aria-labelledby="hero-title">
      <Container>
        <motion.div
          className="hero-intro-content"
          {...getAnimationProps()}
        >
          <h1 id="hero-title" className="hero-intro-title">
            <Typewriter text={title} speed={60} delay={200} />
          </h1>
          <p className="hero-intro-subtitle" role="doc-subtitle">
            <Typewriter text={subtitle} speed={40} delay={800} />
          </p>
          
          <div className="hero-intro-main">
            <motion.article
              className="hero-intro-definition"
              {...getAnimationProps(0.2)}
              aria-labelledby="definition-heading"
            >
              <h2 id="definition-heading" className="sr-only">Definizione</h2>
              <p className="hero-intro-text">{content.definition}</p>
            </motion.article>

            <motion.article
              className="hero-intro-overview"
              {...getAnimationProps(0.3)}
              aria-labelledby="overview-heading"
            >
              <h2 id="overview-heading" className="sr-only">Panoramica</h2>
              <p className="hero-intro-text">{content.overview}</p>
            </motion.article>

            <motion.section
              {...getAnimationProps(0.4)}
              aria-labelledby="keypoints-heading"
            >
              <h2 id="keypoints-heading" className="sr-only">Punti chiave</h2>
              <ul className="hero-intro-keypoints">
                {content.keyPoints.map((point, index) => (
                  <li key={index} className="hero-intro-keypoint">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              className="hero-intro-epidemiology"
              {...getAnimationProps(0.5)}
              aria-labelledby="epidemiology-heading"
            >
              <h2 id="epidemiology-heading" className="hero-intro-section-title">
                Epidemiologia
              </h2>
              <div className="hero-intro-stats" role="list">
                <div className="hero-intro-stat" role="listitem">
                  <span className="hero-intro-stat-label">Incidenza:</span>
                  <span className="hero-intro-stat-value" aria-label={`Incidenza: ${content.epidemiology.incidence}`}>
                    {content.epidemiology.incidence}
                  </span>
                </div>
                <div className="hero-intro-stat" role="listitem">
                  <span className="hero-intro-stat-label">Fascia d'età:</span>
                  <span className="hero-intro-stat-value" aria-label={`Fascia d'età: ${content.epidemiology.ageRange}`}>
                    {content.epidemiology.ageRange}
                  </span>
                </div>
                <div className="hero-intro-stat" role="listitem">
                  <span className="hero-intro-stat-label">Genere:</span>
                  <span className="hero-intro-stat-value" aria-label={`Genere: ${content.epidemiology.gender}`}>
                    {content.epidemiology.gender}
                  </span>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

