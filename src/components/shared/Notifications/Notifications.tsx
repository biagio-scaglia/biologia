import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';
import './Notifications.css';

export const Notifications: React.FC = () => {
  const { notifications, removeNotification, clearNotifications } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="notifications" role="region" aria-live="polite" aria-label="Notifiche">
      {notifications.length > 1 && (
        <div className="notifications-header">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearNotifications}
            className="notifications-clear"
          >
            Chiudi tutte
          </Button>
        </div>
      )}
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification notification--${notification.type}`}
            role="alert"
          >
            <div className="notification-content">
              <span className="notification-icon">
                {notification.type === 'success' && '✓'}
                {notification.type === 'error' && '✕'}
                {notification.type === 'warning' && '⚠'}
                {notification.type === 'info' && 'ℹ'}
              </span>
              <span className="notification-message">{notification.message}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeNotification(notification.id)}
              className="notification-close"
              aria-label="Chiudi notifica"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

