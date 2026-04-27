import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  labels?: string[];
}

export function ProgressBar({ current, total, labels }: ProgressBarProps) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        width: '100%',
        height: '4px',
        background: 'var(--color-card-dark-border)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'var(--color-brand)',
          borderRadius: '2px',
          transition: 'width 300ms ease-out',
        }} />
      </div>
      {labels && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
        }}>
          {labels.map((label, i) => {
            const step = i + 1;
            const isActive = step === current;
            const isComplete = step < current;
            return (
              <span key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isComplete
                  ? 'var(--color-accent-mint)'
                  : isActive
                  ? 'var(--color-brand)'
                  : 'var(--color-text-muted)',
              }}>
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
