import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { HeroIntro } from '@/components/ICL';
import { Card } from '@/components/ui';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <Container>
        <HeroIntro />
        
        <motion.section
          id="chi-siamo"
          className="home-about-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card variant="outlined" className="home-about-card">
            <div className="home-about-content">
              <p className="home-about-text">
                L'istiocitosi a cellule di Langerhans (ICL) è una malattia che colpisce principalmente i bambini, ma si riscontra anche negli adulti di tutte le età. Le persone affette da ICL producono troppe cellule di Langerhans o istiociti, una forma di globuli bianchi presente nelle persone sane che dovrebbe proteggere l'organismo dalle infezioni. <sup>(1)</sup>
              </p>
              <p className="home-about-text">
                Nelle persone affette da ICL, queste cellule si moltiplicano eccessivamente e si accumulano in alcune aree del corpo, causando la formazione di tumori chiamati granulomi. I sintomi dell'ICL variano da persona a persona, a seconda delle aree del corpo colpite. <sup>(2)</sup>
              </p>
              <p className="home-about-text">
                L'ICL può essere riscontrata in molte aree del corpo, tra cui, a titolo esemplificativo ma non esaustivo, pelle e unghie, bocca, ossa, linfonodi, ipofisi e tiroide. Quando si riscontra in più aree del corpo, è nota come malattia multisistemica. <sup>(3)</sup>
              </p>
              <p className="home-about-text">
                La causa di questa malattia è sconosciuta, sebbene la maggior parte dei dati suggerisca che sia caratterizzata da una crescita di cellule di Langerhans immature che sembrano presentare alterazioni genetiche del gene BRAF in circa la metà dei casi. <sup>(4)</sup>
              </p>
              <p className="home-about-text">
                L'LCH non è causata da un'infezione nota, non è contagiosa e non si ritiene che sia ereditaria. <sup>(5)</sup>
              </p>
            </div>
          </Card>
        </motion.section>
      </Container>
    </div>
  );
};
