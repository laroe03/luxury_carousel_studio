import React from 'react';

interface CardProps {
  variant?: 'dark' | 'light';
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}

export function Card({ variant = 'dark', style, className, children }: CardProps) {
  const base: React.CSSProperties =
    variant === 'dark' ? {
      background: 'var(--color-card-dark)',
      border: '1px solid var(--color-card-dark-border)',
      borderRadius: '16px',
      padding: '40px',
      color: 'var(--color-text-on-dark)',
    } : {
      background: 'var(--color-card-light)',
      border: '1px solid var(--color-card-light-border)',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      color: 'var(--color-text-on-light)',
    };

  return (
    <div className={className} style={{ ...base, ...style }}>
      {children}
    </div>
  );
}
