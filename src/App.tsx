import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from '@/context/AppContext';
import { Header, Footer } from '@/components/layout';
import { Notifications, BiologyBackground } from '@/components/shared';
import { PageTransition } from '@/components/shared/PageTransition';
import { routes, routeComponents } from '@/config/routes';
import './App.css';

// Loading component with skeleton
const LoadingFallback: React.FC = () => (
  <div className="app-loading">
    <div className="loading-spinner" aria-label="Caricamento in corso">
      <div className="spinner" />
    </div>
    <p>Caricamento...</p>
  </div>
);

// Routes with animations
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => {
          const Component = routeComponents[route.component];
          if (!Component) {
            console.warn(`Componente ${route.component} non trovato`);
            return null;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PageTransition>
                  <Component />
                </PageTransition>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

// App content that uses context
const AppContent: React.FC = () => {
  // Basename per Vercel (usa BASE_URL se definito, altrimenti root)
  const basename = import.meta.env.BASE_URL || '/';
  
  return (
    <BrowserRouter basename={basename}>
      <div className="app">
        <BiologyBackground intensity="low" />
        <Header />
        <main className="app-main">
          <Suspense fallback={<LoadingFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
        <Notifications />
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

