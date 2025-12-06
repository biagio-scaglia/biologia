import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Theme, User, Notification } from '@/types';
import { appConfig } from '@/config/appConfig';
import { generateId } from '@/lib/utils/helpers';

interface AppContextType extends AppState {
  setTheme: (theme: Theme) => void;
  setUser: (user: User | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
}

type AppAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  theme: appConfig.defaultTheme,
  user: null,
  isLoading: false,
  notifications: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Forza sempre il tema light
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    theme: 'light',
  });

  // Sincronizza il tema con il DOM (sempre light)
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const setTheme = (theme: Theme) => {
    // Ignora i cambi di tema, mantieni sempre light
    // dispatch({ type: 'SET_THEME', payload: 'light' });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId('notification'),
      timestamp: Date.now(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    
    // Rimuovi automaticamente dopo 5 secondi
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: newNotification.id });
    }, 5000);
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const value: AppContextType = {
    ...state,
    setTheme,
    setUser,
    addNotification,
    removeNotification,
    clearNotifications,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve essere usato all\'interno di AppProvider');
  }
  return context;
}

