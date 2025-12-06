import { RouteConfig } from '@/types';
import { lazy } from 'react';

// Helper per gestire errori nei lazy imports e convertire named exports in default
const lazyWithErrorHandling = (importFn: () => Promise<any>, componentName: string) => {
  return lazy(async () => {
    try {
      const module = await importFn();
      // Se c'è un default export, usalo
      if (module.default && typeof module.default === 'function') {
        return module;
      }
      // Altrimenti, usa il named export e convertilo in default
      const Component = module[componentName];
      if (Component && typeof Component === 'function') {
        return { default: Component };
      }
      throw new Error(`Component ${componentName} not found or invalid`);
    } catch (error) {
      console.error(`Error loading lazy component ${componentName}:`, error);
      throw error;
    }
  });
};

const Home = lazyWithErrorHandling(() => import('@/pages/Home'), 'Home');
const Cells = lazyWithErrorHandling(() => import('@/pages/Cells'), 'Cells');
const Symptoms = lazyWithErrorHandling(() => import('@/pages/Symptoms'), 'Symptoms');
const Diagnostics = lazyWithErrorHandling(() => import('@/pages/Diagnostics'), 'Diagnostics');
const Treatments = lazyWithErrorHandling(() => import('@/pages/Treatments'), 'Treatments');
const Statistics = lazyWithErrorHandling(() => import('@/pages/Statistics'), 'Statistics');
const Prevention = lazyWithErrorHandling(() => import('@/pages/Prevention'), 'Prevention');
const Sources = lazyWithErrorHandling(() => import('@/pages/Sources'), 'Sources');

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: 'Home',
    meta: {
      title: 'Home - Istiocitosi a Cellule di Langerhans',
      icon: '🏠',
    },
  },
  {
    path: '/cells',
    name: 'cells',
    component: 'Cells',
    meta: {
      title: 'Cellule e Mutazioni - ICL',
      icon: '🧬',
    },
  },
  {
    path: '/symptoms',
    name: 'symptoms',
    component: 'Symptoms',
    meta: {
      title: 'Sintomi e Organi Colpiti - ICL',
      icon: '🫁',
    },
  },
  {
    path: '/diagnostics',
    name: 'diagnostics',
    component: 'Diagnostics',
    meta: {
      title: 'Diagnostica - ICL',
      icon: '🔬',
    },
  },
  {
    path: '/treatments',
    name: 'treatments',
    component: 'Treatments',
    meta: {
      title: 'Trattamenti - ICL',
      icon: '💊',
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: 'Statistics',
    meta: {
      title: 'Statistiche ed Epidemiologia - ICL',
      icon: '📊',
    },
  },
  {
    path: '/prevention',
    name: 'prevention',
    component: 'Prevention',
    meta: {
      title: 'Prevenzione e Ricerca - ICL',
      icon: '🔬',
    },
  },
  {
    path: '/sources',
    name: 'sources',
    component: 'Sources',
    meta: {
      title: 'Fonti e Riferimenti - ICL',
      icon: '📚',
    },
  },
];

export const routeComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  Home,
  Cells,
  Symptoms,
  Diagnostics,
  Treatments,
  Statistics,
  Prevention,
  Sources,
};

