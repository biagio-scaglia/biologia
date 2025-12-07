import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const ExpandableSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ 
  title, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="treatments-expandable-section">
      <button
        className="treatments-expandable-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="treatments-section-title">{title}</h4>
        <RadixIcons.ChevronDownIcon 
          className={`treatments-expandable-icon ${isOpen ? 'is-open' : ''}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="treatments-expandable-content"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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

                <div className="treatments-expandable-sections">
                  {treatment.procedures && (
                    <ExpandableSection title="Procedure">
                      <ul className="treatments-list">
                        {treatment.procedures.map((procedure, idx) => (
                          <li key={idx} className="treatments-item">
                            {procedure}
                          </li>
                        ))}
                      </ul>
                    </ExpandableSection>
                  )}

                  {treatment.regimens && (
                    <ExpandableSection title="Regimi">
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
                    </ExpandableSection>
                  )}

                  {treatment.administration && (
                    <ExpandableSection title="Somministrazione">
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
                    </ExpandableSection>
                  )}

                  {treatment.dose && (
                    <ExpandableSection title="Dose">
                      <p className="treatments-dose">{treatment.dose}</p>
                    </ExpandableSection>
                  )}

                  {treatment.mechanism && (
                    <ExpandableSection title="Meccanismo">
                      <p className="treatments-mechanism">{treatment.mechanism}</p>
                    </ExpandableSection>
                  )}

                  {treatment.efficacy && (
                    <ExpandableSection title="Efficacia">
                      <p className="treatments-efficacy">{treatment.efficacy}</p>
                    </ExpandableSection>
                  )}

                  {treatment.sideEffects && (
                    <ExpandableSection title="Effetti collaterali">
                      <ul className="treatments-list">
                        {treatment.sideEffects.map((effect, idx) => (
                          <li key={idx} className="treatments-item treatments-item--side-effect">
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </ExpandableSection>
                  )}

                  {treatment.monitoring && (
                    <ExpandableSection title="Monitoraggio">
                      <p className="treatments-monitoring-text">{treatment.monitoring}</p>
                    </ExpandableSection>
                  )}

                  {treatment.outcomes && (
                    <ExpandableSection title="Risultati">
                      <p className="treatments-outcomes-text">{treatment.outcomes}</p>
                    </ExpandableSection>
                  )}
                </div>
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

