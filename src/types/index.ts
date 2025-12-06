// Tipi base dell'applicazione

export type Theme = 'light' | 'dark';

export interface RouteConfig {
  path: string;
  name: string;
  component: string;
  layout?: string;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    icon?: string;
  };
}

export interface AppConfig {
  appName: string;
  version: string;
  defaultTheme: Theme;
  apiEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppState {
  theme: Theme;
  user: User | null;
  isLoading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

export interface LayoutConfig {
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  headerTitle?: string;
}

