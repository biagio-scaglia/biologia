import React from 'react';
import { Container } from '@/components/layout';
import { Treatments as TreatmentsComponent } from '@/components/ICL';
import './Treatments.css';

export const Treatments: React.FC = () => {
  return (
    <div className="treatments-page">
      <Container>
        <TreatmentsComponent />
      </Container>
    </div>
  );
};

