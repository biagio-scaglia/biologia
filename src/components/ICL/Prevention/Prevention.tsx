import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import preventionData from '@/assets/data/lch/prevention.json';
import './Prevention.css';

export const Prevention: React.FC = () => {
  const { prevention, research, clinicalTrials, awareness } = preventionData;

  return (
    <section className="prevention">
      <div className="prevention-header">
        <h2 className="prevention-title">{preventionData.title}</h2>
        <p className="prevention-subtitle">{preventionData.subtitle}</p>
      </div>

      <div className="prevention-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card title="Prevenzione" variant="elevated">
            <div className="prevention-content">
              <p className="prevention-description">{prevention.description}</p>

              <div className="prevention-section">
                <h4 className="prevention-section-title">Fattori noti:</h4>
                <ul className="prevention-list">
                  {prevention.factors.known.map((factor, idx) => (
                    <li key={idx} className="prevention-item">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="prevention-section">
                <h4 className="prevention-section-title">In fase di studio:</h4>
                <ul className="prevention-list">
                  {prevention.factors.underInvestigation.map((factor, idx) => (
                    <li key={idx} className="prevention-item prevention-item--investigation">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="prevention-smoking">
                <h4 className="prevention-smoking-title">Fumo:</h4>
                <p className="prevention-smoking-description">{prevention.smoking.description}</p>
                <p className="prevention-smoking-recommendation">
                  <strong>Raccomandazione:</strong> {prevention.smoking.recommendation}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card title="Ricerca Attuale" variant="elevated">
            <div className="prevention-research">
              {research.current.map((area, idx) => (
                <div key={idx} className="prevention-research-item">
                  <h4 className="prevention-research-title">{area.area}</h4>
                  <p className="prevention-research-description">{area.description}</p>
                  <div className="prevention-research-focus">
                    <strong>Focus:</strong> {area.focus}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card title="Prospettive Future" variant="elevated">
            <ul className="prevention-future-list">
              {research.future.map((item, idx) => (
                <li key={idx} className="prevention-future-item">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card title="Studi Clinici" variant="elevated">
            <div className="prevention-trials">
              <p className="prevention-trials-description">{clinicalTrials.description}</p>
              <div className="prevention-trials-types">
                <h4 className="prevention-trials-title">Tipi di studi:</h4>
                <ul className="prevention-list">
                  {clinicalTrials.types.map((type, idx) => (
                    <li key={idx} className="prevention-item">
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="prevention-trials-resources">
                <h4 className="prevention-trials-title">Risorse:</h4>
                <ul className="prevention-list">
                  {clinicalTrials.resources.map((resource, idx) => (
                    <li key={idx} className="prevention-item">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card title="Consapevolezza e Educazione" variant="elevated">
            <div className="prevention-awareness">
              <p className="prevention-awareness-description">{awareness.importance}</p>
              <div className="prevention-awareness-education">
                <h4 className="prevention-awareness-title">Educazione:</h4>
                <ul className="prevention-list">
                  {awareness.education.map((item, idx) => (
                    <li key={idx} className="prevention-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

