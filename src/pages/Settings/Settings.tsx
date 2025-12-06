import React from 'react';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { FormBuilder } from '@/components/shared';
import { useApp } from '@/context/AppContext';
import { FormConfig } from '@/types';
import './Settings.css';

export const Settings: React.FC = () => {
  const { theme, setTheme, setUser, user } = useApp();

  const themeFormConfig: FormConfig = {
    id: 'theme-form',
    title: 'Impostazioni Tema',
    fields: [
      {
        id: 'theme',
        type: 'select',
        label: 'Tema',
        required: true,
        defaultValue: theme,
        options: [
          { value: 'light', label: 'Chiaro' },
          { value: 'dark', label: 'Scuro' },
        ],
      },
    ],
    submitLabel: 'Salva Tema',
    onSubmit: (data) => {
      setTheme(data.theme as 'light' | 'dark');
    },
  };

  const userFormConfig: FormConfig = {
    id: 'user-form',
    title: 'Profilo Utente',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Nome',
        placeholder: 'Inserisci il tuo nome',
        required: true,
        defaultValue: user?.name || '',
        validation: {
          min: 2,
          message: 'Il nome deve essere di almeno 2 caratteri',
        },
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'nome@esempio.com',
        required: true,
        defaultValue: user?.email || '',
      },
    ],
    submitLabel: 'Salva Profilo',
    onSubmit: (data) => {
      setUser({
        id: user?.id || '1',
        name: data.name,
        email: data.email,
      });
    },
  };

  const handleFormSubmit = (formId: string, data: Record<string, any>) => {
    if (formId === 'theme-form') {
      setTheme(data.theme as 'light' | 'dark');
    } else if (formId === 'user-form') {
      setUser({
        id: user?.id || '1',
        name: data.name,
        email: data.email,
      });
    }
  };

  return (
    <div className="settings">
      <Container>
        <h1 className="settings-title">Impostazioni</h1>

        <div className="settings-grid">
          <FormBuilder
            config={themeFormConfig}
            onSubmit={(data) => handleFormSubmit('theme-form', data)}
          />

          <FormBuilder
            config={userFormConfig}
            onSubmit={(data) => handleFormSubmit('user-form', data)}
          />

          <Card title="Informazioni App" className="settings-info">
            <div className="settings-info-item">
              <strong>Tema Attuale:</strong> {theme === 'light' ? 'Chiaro' : 'Scuro'}
            </div>
            <div className="settings-info-item">
              <strong>Utente:</strong> {user ? `${user.name} (${user.email})` : 'Nessun utente'}
            </div>
            <div className="settings-info-item">
              <strong>Storage:</strong> I dati vengono salvati in localStorage
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

