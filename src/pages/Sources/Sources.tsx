import React from 'react';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import sourcesData from '@/assets/data/lch/sources.json';
import './Sources.css';

export const Sources: React.FC = () => {
  const { sources, disclaimer, medicalDisclaimer, note } = sourcesData;

  return (
    <div className="sources-page">
      <Container>
        <div className="sources-header">
          <h1 className="sources-title">{sourcesData.title}</h1>
          <p className="sources-subtitle">{sourcesData.subtitle}</p>
        </div>

        <div className="sources-content">
          <Card title="Fonti Utilizzate" variant="elevated">
            <div className="sources-list">
              {sources.map((source, index) => (
                <div key={index} className="sources-item">
                  <h3 className="sources-item-title">{source.title}</h3>
                  <div className="sources-item-details">
                    <p><strong>Tipo:</strong> {source.type}</p>
                    <p><strong>Formato:</strong> {source.format}</p>
                    <p><strong>Posizione:</strong> {source.location}</p>
                    <p className="sources-item-description">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Note Importanti" variant="outlined">
            <div className="sources-notes">
              <div className="sources-note">
                <h4 className="sources-note-title">Disclaimer Generale</h4>
                <p className="sources-note-text">{disclaimer}</p>
              </div>
              <div className="sources-note">
                <h4 className="sources-note-title">Disclaimer Medico</h4>
                <p className="sources-note-text">{medicalDisclaimer}</p>
              </div>
              <div className="sources-note">
                <h4 className="sources-note-title">Nota</h4>
                <p className="sources-note-text">{note}</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

