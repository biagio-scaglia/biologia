import React from 'react';
import { Container } from '@/components/layout';
import { Diagnostics as DiagnosticsComponent } from '@/components/ICL';
import './Diagnostics.css';

export const Diagnostics: React.FC = () => {
  return (
    <div className="diagnostics-page">
      <Container>
        <DiagnosticsComponent />
      </Container>
    </div>
  );
};

