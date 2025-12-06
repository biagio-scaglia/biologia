import React from 'react';
import { Container } from '@/components/layout';
import { CellTypes, Mutations } from '@/components/ICL';
import './Cells.css';

export const Cells: React.FC = () => {
  return (
    <div className="cells-page">
      <Container>
        <CellTypes />
        <Mutations />
      </Container>
    </div>
  );
};

