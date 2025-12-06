import React from 'react';
import { motion } from 'framer-motion';
import * as RadixIcons from '@radix-ui/react-icons';
import { Card } from '@/components/ui';
import { Typewriter } from '@/components/shared/Typewriter';
import diagnosticsData from '@/assets/data/lch/diagnostics.json';
import './Diagnostics.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  biopsy: RadixIcons.MagnifyingGlassIcon,
  imaging: RadixIcons.CameraIcon,
  laboratory: RadixIcons.MixerHorizontalIcon,
  genetic: RadixIcons.CodeIcon,
  endocrine: RadixIcons.HeartIcon,
};

export const Diagnostics: React.FC = () => {
  const { methods, diagnosticCriteria } = diagnosticsData;

  return (
    <section className="diagnostics">
      <div className="diagnostics-header">
        <h2 className="diagnostics-title">
          <Typewriter text={diagnosticsData.title} speed={50} delay={100} />
        </h2>
        <p className="diagnostics-subtitle">
          <Typewriter text={diagnosticsData.subtitle} speed={40} delay={600} />
        </p>
      </div>

      <div className="diagnostics-grid">
        {methods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={
                <div className="diagnostics-card-title">
                  {iconMap[method.id] && (() => {
                    const Icon = iconMap[method.id];
                    return (
                      <span className="diagnostics-icon">
                        <Icon />
                      </span>
                    );
                  })()}
                  <span>{method.name}</span>
                </div>
              }
              variant="elevated"
              className="diagnostics-card"
            >
              <div className="diagnostics-content">
                <p className="diagnostics-description">{method.description}</p>

                {method.procedure && (
                  <div className="diagnostics-section">
                    <h4 className="diagnostics-section-title">Procedura:</h4>
                    <p className="diagnostics-section-text">{method.procedure}</p>
                  </div>
                )}

                {method.analysis && (
                  <div className="diagnostics-section">
                    <h4 className="diagnostics-section-title">Analisi:</h4>
                    <ul className="diagnostics-list">
                      {method.analysis.map((item, idx) => (
                        <li key={idx} className="diagnostics-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {method.markers && (
                  <div className="diagnostics-section">
                    <h4 className="diagnostics-section-title">Marcatori:</h4>
                    <div className="diagnostics-markers">
                      <div className="diagnostics-marker-group">
                        <span className="diagnostics-marker-label">Richiesti:</span>
                        <div className="diagnostics-marker-tags">
                          {method.markers.required.map((marker, idx) => (
                            <span key={idx} className="diagnostics-marker-tag diagnostics-marker-tag--required">
                              {marker}
                            </span>
                          ))}
                        </div>
                      </div>
                      {method.markers.additional && (
                        <div className="diagnostics-marker-group">
                          <span className="diagnostics-marker-label">Aggiuntivi:</span>
                          <div className="diagnostics-marker-tags">
                            {method.markers.additional.map((marker, idx) => (
                              <span key={idx} className="diagnostics-marker-tag">
                                {marker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {method.techniques && (
                  <div className="diagnostics-section">
                    <h4 className="diagnostics-section-title">Tecniche:</h4>
                    <div className="diagnostics-techniques">
                      {method.techniques.map((technique, idx) => (
                        <div key={idx} className="diagnostics-technique">
                          <h5 className="diagnostics-technique-name">{technique.name}</h5>
                          <p className="diagnostics-technique-use">
                            <strong>Uso:</strong> {technique.use}
                          </p>
                          <p className="diagnostics-technique-findings">
                            <strong>Reperti:</strong> {technique.findings}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {method.tests && (
                  <div className="diagnostics-section">
                    <h4 className="diagnostics-section-title">Test:</h4>
                    <div className="diagnostics-tests">
                      {method.tests.map((test: string | { category?: string; tests?: string[]; significance?: string; name?: string; purpose?: string }, idx: number) => {
                        // Gestisce diversi formati di test
                        // Formato 1: test è una stringa (es. endocrine)
                        if (typeof test === 'string') {
                          return (
                            <div key={idx} className="diagnostics-test">
                              <p className="diagnostics-item">{test}</p>
                            </div>
                          );
                        }
                        
                        // Formato 2: test ha category e tests array (es. laboratory)
                        if ('category' in test && test.category && Array.isArray(test.tests)) {
                          return (
                            <div key={idx} className="diagnostics-test">
                              <h5 className="diagnostics-test-category">{test.category}</h5>
                              <ul className="diagnostics-list">
                                {test.tests.map((testItem: string, testIdx: number) => (
                                  <li key={testIdx} className="diagnostics-item">
                                    {testItem}
                                  </li>
                                ))}
                              </ul>
                              {test.significance && (
                                <p className="diagnostics-test-significance">
                                  <strong>Significato:</strong> {test.significance}
                                </p>
                              )}
                            </div>
                          );
                        }
                        
                        // Formato 3: test ha name, purpose, significance (es. genetic)
                        if ('name' in test && test.name) {
                          return (
                            <div key={idx} className="diagnostics-test">
                              <h5 className="diagnostics-test-category">{test.name}</h5>
                              {test.purpose && (
                                <p className="diagnostics-test-purpose">
                                  <strong>Scopo:</strong> {test.purpose}
                                </p>
                              )}
                              {test.significance && (
                                <p className="diagnostics-test-significance">
                                  <strong>Significato:</strong> {test.significance}
                                </p>
                              )}
                            </div>
                          );
                        }
                        
                        // Fallback per formati non riconosciuti
                        return null;
                      })}
                    </div>
                  </div>
                )}

                {method.significance && (
                  <div className="diagnostics-significance">
                    <p className="diagnostics-significance-text">{method.significance}</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="diagnostics-criteria"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card title="Criteri Diagnostici" variant="outlined">
          <div className="diagnostics-criteria-content">
            <div className="diagnostics-criteria-group">
              <h4 className="diagnostics-criteria-title">Definitivi:</h4>
              <ul className="diagnostics-list">
                {diagnosticCriteria.definitive.map((criterion, idx) => (
                  <li key={idx} className="diagnostics-item diagnostics-item--definitive">
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
            <div className="diagnostics-criteria-group">
              <h4 className="diagnostics-criteria-title">Supportivi:</h4>
              <ul className="diagnostics-list">
                {diagnosticCriteria.supportive.map((criterion, idx) => (
                  <li key={idx} className="diagnostics-item">
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

