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

export interface FormFieldConfig {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string | number | boolean;
}

export interface FormConfig {
  id: string;
  title: string;
  fields: FormFieldConfig[];
  submitLabel?: string;
  onSubmit?: (data: Record<string, any>) => void;
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

