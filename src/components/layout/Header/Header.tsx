import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as RadixIcons from '@radix-ui/react-icons';
import { appConfig } from '@/config/appConfig';
import { useToggle } from '@/hooks/useToggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import './Header.css';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Close menu when switching to desktop or when route changes
  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop, setMenuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isDesktop]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isMenuOpen, setMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Home', icon: RadixIcons.HomeIcon },
    { to: '/cells', label: 'Cellule', icon: RadixIcons.CubeIcon },
    { to: '/symptoms', label: 'Sintomi', icon: RadixIcons.HeartIcon },
    { to: '/diagnostics', label: 'Diagnostica', icon: RadixIcons.MagnifyingGlassIcon },
    { to: '/treatments', label: 'Trattamenti', icon: RadixIcons.Crosshair2Icon },
    { to: '/statistics', label: 'Statistiche', icon: RadixIcons.BarChartIcon },
    { to: '/prevention', label: 'Prevenzione', icon: RadixIcons.LockClosedIcon },
    { to: '/sources', label: 'Fonti', icon: RadixIcons.BookmarkIcon },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <h1>{appConfig.appName}</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`header-nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                <Icon className="header-nav-icon" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`header-menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <RadixIcons.Cross2Icon className="header-menu-icon" aria-hidden="true" />
          ) : (
            <RadixIcons.HamburgerMenuIcon className="header-menu-icon" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`header-mobile-overlay ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      <nav
        id="mobile-menu"
        className={`header-mobile-nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
      >
        <button
          className="header-mobile-nav-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Chiudi menu"
        >
          <RadixIcons.Cross2Icon className="header-mobile-nav-close-icon" aria-hidden="true" />
        </button>
        <div className="header-mobile-nav-content">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`header-mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
                style={{ '--delay': `${index * 50}ms` } as React.CSSProperties}
                onClick={() => setMenuOpen(false)}
              >
                <Icon className="header-mobile-nav-icon" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

