import React from 'react';
import { motion } from 'framer-motion';
import * as RadixIcons from '@radix-ui/react-icons';
import { Card } from '@/components/ui';
import { Typewriter } from '@/components/shared/Typewriter';
import treatmentsData from '@/assets/data/lch/treatments.json';
import './Treatments.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  observation: RadixIcons.EyeOpenIcon,
  surgery: RadixIcons.ScissorsIcon,
  corticosteroids: RadixIcons.DotIcon,
  chemotherapy: RadixIcons.Crosshair2Icon,
  radiotherapy: RadixIcons.LightningBoltIcon,
  vemurafenib: RadixIcons.MixerHorizontalIcon,
  trametinib: RadixIcons.MixerHorizontalIcon,
  'stem-cell': RadixIcons.CubeIcon,
};

export const Treatments: React.FC = () => {
  const { treatments, treatmentStrategy } = treatmentsData;

  return (
    <section className="treatments">
      <div className="treatments-header">
        <h2 className="treatments-title">
          <Typewriter text={treatmentsData.title} speed={50} delay={100} />
        </h2>
        <p className="treatments-subtitle">
          <Typewriter text={treatmentsData.subtitle} speed={40} delay={600} />
        </p>
      </div>

      <div className="treatments-grid">
        {treatments.map((treatment, index) => (
          <motion.div
            key={treatment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={
                <div className="treatments-card-title">
                  {iconMap[treatment.id] && (() => {
                    const Icon = iconMap[treatment.id];
                    return (
                      <span className="treatments-icon">
                        <Icon />
                      </span>
                    );
                  })()}
                  <span>{treatment.name}</span>
                </div>
              }
              subtitle={`Tipo: ${treatment.type}`}
              variant="elevated"
              className="treatments-card"
            >
              <div className="treatments-content">
                <div className="treatments-indication">
                  <span className="treatments-indication-label">Indicazione:</span>
                  <span className="treatments-indication-value">{treatment.indication}</span>
                </div>

                <p className="treatments-description">{treatment.description}</p>

                {treatment.procedures && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Procedure:</h4>
                    <ul className="treatments-list">
                      {treatment.procedures.map((procedure, idx) => (
                        <li key={idx} className="treatments-item">
                          {procedure}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {treatment.regimens && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Regimi:</h4>
                    <div className="treatments-regimens">
                      {treatment.regimens.map((regimen, idx) => (
                        <div key={idx} className="treatments-regimen">
                          <h5 className="treatments-regimen-name">{regimen.name}</h5>
                          <p className="treatments-regimen-description">{regimen.description}</p>
                          {regimen.duration && (
                            <p className="treatments-regimen-duration">
                              <strong>Durata:</strong> {regimen.duration}
                            </p>
                          )}
                          {regimen.administration && (
                            <p className="treatments-regimen-admin">
                              <strong>Somministrazione:</strong> {regimen.administration}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {treatment.administration && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Somministrazione:</h4>
                    <ul className="treatments-list">
                      {Array.isArray(treatment.administration) ? (
                        treatment.administration.map((admin, idx) => (
                          <li key={idx} className="treatments-item">
                            {admin}
                          </li>
                        ))
                      ) : (
                        <li className="treatments-item">{treatment.administration}</li>
                      )}
                    </ul>
                  </div>
                )}

                {treatment.dose && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Dose:</h4>
                    <p className="treatments-dose">{treatment.dose}</p>
                  </div>
                )}

                {treatment.mechanism && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Meccanismo:</h4>
                    <p className="treatments-mechanism">{treatment.mechanism}</p>
                  </div>
                )}

                {treatment.efficacy && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Efficacia:</h4>
                    <p className="treatments-efficacy">{treatment.efficacy}</p>
                  </div>
                )}

                {treatment.sideEffects && (
                  <div className="treatments-section">
                    <h4 className="treatments-section-title">Effetti collaterali:</h4>
                    <ul className="treatments-list">
                      {treatment.sideEffects.map((effect, idx) => (
                        <li key={idx} className="treatments-item treatments-item--side-effect">
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {treatment.monitoring && (
                  <div className="treatments-monitoring">
                    <p className="treatments-monitoring-text">
                      <strong>Monitoraggio:</strong> {treatment.monitoring}
                    </p>
                  </div>
                )}

                {treatment.outcomes && (
                  <div className="treatments-outcomes">
                    <p className="treatments-outcomes-text">
                      <strong>Risultati:</strong> {treatment.outcomes}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="treatments-strategy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card title="Strategia Terapeutica" variant="outlined">
          <div className="treatments-strategy-content">
            <div className="treatments-strategy-item">
              <h4 className="treatments-strategy-title">ICL Unifocale:</h4>
              <p className="treatments-strategy-text">{treatmentStrategy.unifocal}</p>
            </div>
            <div className="treatments-strategy-item">
              <h4 className="treatments-strategy-title">ICL Multifocale:</h4>
              <p className="treatments-strategy-text">{treatmentStrategy.multifocal}</p>
            </div>
            <div className="treatments-strategy-item">
              <h4 className="treatments-strategy-title">ICL Sistemica:</h4>
              <p className="treatments-strategy-text">{treatmentStrategy.systemic}</p>
            </div>
            <div className="treatments-strategy-item">
              <h4 className="treatments-strategy-title">ICL Refrattaria:</h4>
              <p className="treatments-strategy-text">{treatmentStrategy.refractory}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

