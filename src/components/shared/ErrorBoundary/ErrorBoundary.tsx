import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary per catturare errori di rendering e prevenire schermo bianco
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Component stack:', errorInfo.componentStack);
  }

  private handleClearStorage = () => {
    try {
      // Pulisci tutte le chiavi dell'app dal localStorage
      const appKeys = ['app-theme'];
      appKeys.forEach(key => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
          }
        } catch (e) {
          // Ignora errori
        }
      });
      // Ricarica la pagina
      window.location.reload();
    } catch (error) {
      console.error('Errore nel pulire localStorage:', error);
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'Si è verificato un errore imprevisto';
      const errorName = this.state.error?.name || '';
      const isStorageError = errorMessage.toLowerCase().includes('string') || 
                             errorMessage.toLowerCase().includes('localstorage') ||
                             errorMessage.toLowerCase().includes('convert') ||
                             errorName.toLowerCase().includes('typeerror');

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--color-bg, #ffffff)',
          color: 'var(--color-text, #1e293b)',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Oops! Qualcosa è andato storto
          </h1>
          <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-muted, #64748b)' }}>
            {errorName && <strong>{errorName}: </strong>}
            {errorMessage}
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
            <details style={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              backgroundColor: 'rgba(0,0,0,0.1)', 
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              maxWidth: '600px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Stack trace (dev only)</summary>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
          {isStorageError && (
            <p style={{ 
              marginBottom: '2rem', 
              color: 'var(--color-warning, #f59e0b)',
              fontSize: '0.9rem',
              maxWidth: '500px'
            }}>
              Sembra che ci sia un problema con i dati salvati. Prova a pulire i dati dell'app.
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--color-primary, #2563eb)',
                color: 'var(--color-primary-foreground, #ffffff)',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Ricarica la pagina
            </button>
            {isStorageError && (
              <button
                onClick={this.handleClearStorage}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--color-warning, #f59e0b)',
                  color: 'var(--color-warning-foreground, #ffffff)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 500,
                }}
              >
                Pulisci dati e ricarica
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

