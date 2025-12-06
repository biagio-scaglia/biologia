import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import cellsData from '@/assets/data/lch/cells.json';
import './CellTypes.css';

export const CellTypes: React.FC = () => {
  const { cells, pathology } = cellsData;

  return (
    <section className="cell-types">
      <div className="cell-types-header">
        <h2 className="cell-types-title">{cellsData.title}</h2>
        <p className="cell-types-subtitle">{cellsData.subtitle}</p>
      </div>

      <div className="cell-types-grid">
        {cells.map((cell, index) => (
          <motion.div
            key={cell.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={cell.name}
              subtitle={cell.fullName}
              variant="elevated"
              className="cell-types-card"
            >
              <div className="cell-types-content">
                <p className="cell-types-description">{cell.description}</p>
                
                <div className="cell-types-details">
                  <div className="cell-types-detail">
                    <span className="cell-types-detail-label">Funzione:</span>
                    <span className="cell-types-detail-value">{cell.function}</span>
                  </div>
                  <div className="cell-types-detail">
                    <span className="cell-types-detail-label">Significato:</span>
                    <span className="cell-types-detail-value">{cell.significance}</span>
                  </div>
                  <div className="cell-types-detail">
                    <span className="cell-types-detail-label">Localizzazione:</span>
                    <span className="cell-types-detail-value">{cell.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="cell-types-pathology"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card title="Patologia" variant="outlined">
          <p className="cell-types-pathology-text">{pathology.description}</p>
          <p className="cell-types-pathology-text">{pathology.granules}</p>
        </Card>
      </motion.div>
    </section>
  );
};

