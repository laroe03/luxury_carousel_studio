import React from 'react';

type BadgeColor = 'mint' | 'lavender' | 'pink' | 'gray' | 'success' | 'warning' | 'error';

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const COLOR_MAP: Record<BadgeColor, string> = {
  mint:     'var(--color-accent-mint)',
  lavender: 'var(--color-accent-lavender)',
  pink:     'var(--color-brand)',
  gray:     'var(--color-text-muted)',
  success:  'var(--color-success)',
  warning:  'var(--color-warning)',
  error:    'var(--color-error)',
};

export function Badge({ color = 'gray', children, style }: BadgeProps) {
  const c = COLOR_MAP[color];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 14px',
      borderRadius: '9999px',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      background: `color-mix(in srgb, ${c} 15%, transparent)`,
      border: `1px solid color-mix(in srgb, ${c} 25%, transparent)`,
      color: c,
      ...style,
    }}>
      {children}
    </span>
  );
}
