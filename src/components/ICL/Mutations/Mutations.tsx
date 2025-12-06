import React from 'react';
import { motion } from 'framer-motion';
import * as RadixIcons from '@radix-ui/react-icons';
import { Card } from '@/components/ui';
import mutationsData from '@/assets/data/lch/mutations.json';
import './Mutations.css';
import clsx from 'clsx';

export const Mutations: React.FC = () => {
  const { mutations, pathway, somaticMutations } = mutationsData;

  return (
    <section className="mutations">
      <div className="mutations-header">
        <h2 className="mutations-title">{mutationsData.title}</h2>
        <p className="mutations-subtitle">{mutationsData.subtitle}</p>
      </div>

      <div className="mutations-grid">
        {mutations.map((mutation, index) => (
          <motion.div
            key={mutation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={
                <div className="mutations-card-title">
                  <RadixIcons.CodeIcon className="mutations-icon" />
                  <span>{mutation.gene}</span>
                  {mutation.mutation && (
                    <span className="mutations-mutation-name">{mutation.mutation}</span>
                  )}
                </div>
              }
              variant="elevated"
              className={clsx('mutations-card', {
                'mutations-card--target': mutation.therapeuticTarget,
              })}
            >
              <div className="mutations-content">
                <div className="mutations-meta">
                  <span className="mutations-frequency">{mutation.frequency}</span>
                  <span className="mutations-type">{mutation.type}</span>
                </div>

                <p className="mutations-description">{mutation.description}</p>

                <div className="mutations-details">
                  <div className="mutations-detail">
                    <span className="mutations-detail-label">Meccanismo:</span>
                    <span className="mutations-detail-value">{mutation.mechanism}</span>
                  </div>
                  <div className="mutations-detail">
                    <span className="mutations-detail-label">Via di segnalazione:</span>
                    <span className="mutations-detail-value">{mutation.pathway}</span>
                  </div>
                  <div className="mutations-detail">
                    <span className="mutations-detail-label">Significato:</span>
                    <span className="mutations-detail-value">{mutation.significance}</span>
                  </div>
                </div>

                {mutation.therapeuticTarget && (
                  <div className="mutations-therapy">
                    <RadixIcons.MixerHorizontalIcon className="mutations-therapy-icon" />
                    <div className="mutations-therapy-content">
                      <span className="mutations-therapy-label">Bersaglio terapeutico:</span>
                      {mutation.targetedTherapy && (
                        <span className="mutations-therapy-drugs">
                          {Array.isArray(mutation.targetedTherapy)
                            ? mutation.targetedTherapy.join(', ')
                            : mutation.targetedTherapy}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mutations-pathway"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card title={pathway.name} variant="outlined">
          <p className="mutations-pathway-description">{pathway.description}</p>
          <div className="mutations-pathway-diagram">
            {pathway.components.map((component, index) => (
              <div key={index} className="mutations-pathway-component">
                {component}
              </div>
            ))}
          </div>
          <p className="mutations-pathway-consequence">{pathway.consequence}</p>
        </Card>
      </motion.div>

      <motion.div
        className="mutations-somatic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card title="Mutazioni Somatiche" variant="outlined">
          <p className="mutations-somatic-text">{somaticMutations.description}</p>
          <div className="mutations-somatic-details">
            <div className="mutations-somatic-detail">
              <span className="mutations-somatic-detail-label">Timing:</span>
              <span className="mutations-somatic-detail-value">{somaticMutations.timing}</span>
            </div>
            <div className="mutations-somatic-detail">
              <span className="mutations-somatic-detail-label">Clonalità:</span>
              <span className="mutations-somatic-detail-value">{somaticMutations.clonality}</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

