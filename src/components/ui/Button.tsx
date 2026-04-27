'use client';

import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '9999px',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  fontSize: '15px',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 150ms ease',
  whiteSpace: 'nowrap',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const padding =
    size === 'sm' ? '10px 20px' :
    size === 'lg' ? '20px 48px' :
    '16px 40px';

  const variantStyle: React.CSSProperties =
    variant === 'primary' ? {
      background: 'var(--color-brand)',
      color: '#fff',
    } :
    variant === 'secondary' ? {
      background: 'var(--color-card-dark-border)',
      color: '#fff',
    } :
    variant === 'ghost' ? {
      background: 'transparent',
      color: 'var(--color-brand)',
      border: '1px solid rgba(255,107,157,0.3)',
    } :
    /* icon */ {
      background: 'var(--color-card-dark-border)',
      borderRadius: '12px',
      padding: '10px 14px',
      color: '#fff',
    };

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...baseStyle,
        padding: variant === 'icon' ? undefined : padding,
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...variantStyle,
        ...style,
      }}
      onMouseEnter={e => {
        if (disabled) return;
        if (variant === 'primary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand-hover)';
        else if (variant === 'ghost') (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,107,157,0.08)';
        else if (variant === 'secondary' || variant === 'icon') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-card-dark)';
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        if (disabled) return;
        if (variant === 'primary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
        else if (variant === 'ghost') (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        else if (variant === 'secondary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-card-dark-border)';
        else if (variant === 'icon') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-card-dark-border)';
        props.onMouseLeave?.(e);
      }}
    >
      {children}
    </button>
  );
}
