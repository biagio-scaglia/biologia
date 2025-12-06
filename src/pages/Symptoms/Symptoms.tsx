import React from 'react';
import { Container } from '@/components/layout';
import { AffectedSystems } from '@/components/ICL';
import './Symptoms.css';

export const Symptoms: React.FC = () => {
  return (
    <div className="symptoms-page">
      <Container>
        <AffectedSystems />
      </Container>
    </div>
  );
};

