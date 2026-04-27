import React from 'react';

interface StepIndicatorProps {
  current: number;
  total: number;
  label?: string;
}

export function StepIndicator({ current, total, label }: StepIndicatorProps) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      fontSize: '12px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--color-text-muted)',
    }}>
      STEP {current} OF {total}{label ? ` — ${label}` : ''}
    </div>
  );
}
