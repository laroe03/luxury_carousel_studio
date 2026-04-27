'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'info' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++counter;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const borderColor =
    (type: ToastType) =>
      type === 'success' ? 'var(--color-accent-mint)' :
      type === 'info'    ? 'var(--color-accent-lavender)' :
                           'var(--color-error)';

  const icon = (type: ToastType) =>
    type === 'success' ? '✓' :
    type === 'info'    ? '→' : '!';

  const iconColor = (type: ToastType) =>
    type === 'success' ? 'var(--color-accent-mint)' :
    type === 'info'    ? 'var(--color-accent-lavender)' :
                         'var(--color-error)';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '14px 24px',
            background: 'var(--color-card-dark)',
            border: `1px solid ${borderColor(t.type)}`,
            borderRadius: '12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: 'var(--color-text-on-dark)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            animation: 'slideInRight 200ms ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{ color: iconColor(t.type), fontWeight: 700 }}>{icon(t.type)}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
