import React from 'react';
import { Container } from '@/components/layout';
import { HeroIntro } from '@/components/ICL';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <Container>
        <HeroIntro />
      </Container>
    </div>
  );
};
