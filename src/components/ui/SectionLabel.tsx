import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export function SectionLabel({ children, color, style }: SectionLabelProps) {
  return (
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: color ?? 'var(--color-text-muted)',
      marginBottom: '8px',
      ...style,
    }}>
      {children}
    </p>
  );
}
