import React from 'react';
import { appConfig } from '@/config/appConfig';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} {appConfig.appName}
        </p>
        <p className="footer-text footer-text--muted">
          Guida educativa e informativa
        </p>
      </div>
    </footer>
  );
};

