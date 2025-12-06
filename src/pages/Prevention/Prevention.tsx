import React from 'react';
import { Container } from '@/components/layout';
import { Prevention as PreventionComponent } from '@/components/ICL';
import './Prevention.css';

export const Prevention: React.FC = () => {
  return (
    <div className="prevention-page">
      <Container>
        <PreventionComponent />
      </Container>
    </div>
  );
};

