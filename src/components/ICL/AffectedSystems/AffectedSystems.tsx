import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import symptomsData from '@/assets/data/lch/symptoms.json';
import './AffectedSystems.css';

export const AffectedSystems: React.FC = () => {
  const { organs, systemicSymptoms } = symptomsData;

  return (
    <section className="affected-systems">
      <div className="affected-systems-header">
        <h2 className="affected-systems-title">{symptomsData.title}</h2>
        <p className="affected-systems-subtitle">{symptomsData.subtitle}</p>
      </div>

      <div className="affected-systems-grid">
        {organs.map((organ, index) => (
          <motion.div
            key={organ.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={
                <div className="affected-systems-card-title">
                  <span className="affected-systems-icon">{organ.icon}</span>
                  <span>{organ.name}</span>
                </div>
              }
              subtitle={`Frequenza: ${organ.frequency}`}
              variant="elevated"
              className="affected-systems-card"
            >
              <div className="affected-systems-content">
                <p className="affected-systems-description">{organ.description}</p>

                <div className="affected-systems-section">
                  <h4 className="affected-systems-section-title">Sintomi:</h4>
                  <ul className="affected-systems-list">
                    {organ.symptoms.map((symptom, idx) => (
                      <li key={idx} className="affected-systems-item">
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="affected-systems-section">
                  <h4 className="affected-systems-section-title">Localizzazioni comuni:</h4>
                  <div className="affected-systems-locations">
                    {organ.commonLocations.map((location, idx) => (
                      <span key={idx} className="affected-systems-location">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="affected-systems-section">
                  <h4 className="affected-systems-section-title">Diagnosi:</h4>
                  <p className="affected-systems-diagnosis">{organ.diagnosis}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {systemicSymptoms.length > 0 && (
        <motion.div
          className="affected-systems-systemic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card title="Sintomi Sistemici" variant="outlined">
            <ul className="affected-systems-systemic-list">
              {systemicSymptoms.map((symptom, index) => (
                <li key={index} className="affected-systems-systemic-item">
                  {symptom}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </section>
  );
};

