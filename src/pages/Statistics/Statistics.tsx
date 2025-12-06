import React from 'react';
import { Container } from '@/components/layout';
import { Statistics as StatisticsComponent } from '@/components/ICL';
import './Statistics.css';

export const Statistics: React.FC = () => {
  return (
    <div className="statistics-page">
      <Container>
        <StatisticsComponent />
      </Container>
    </div>
  );
};

