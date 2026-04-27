'use client';

import React from 'react';

interface SelectionCardProps {
  title: string;
  description?: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
  number?: number;
  recommended?: boolean;
  style?: React.CSSProperties;
}

export function SelectionCard({
  title,
  description,
  subtitle,
  selected = false,
  onClick,
  number,
  recommended = false,
  style,
}: SelectionCardProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') onClick?.(); }}
      style={{
        position: 'relative',
        background: selected
          ? 'linear-gradient(135deg, rgba(255,107,157,0.06) 0%, var(--color-card-dark) 100%)'
          : 'var(--color-card-dark)',
        border: selected
          ? '1px solid var(--color-brand)'
          : '1px solid var(--color-card-dark-border)',
        boxShadow: selected ? '0 0 0 1px rgba(255,107,157,0.2) inset' : undefined,
        borderRadius: '12px',
        padding: '16px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        transition: 'all 200ms ease',
        ...style,
      }}
      onMouseEnter={e => {
        if (!selected) {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,169,232,0.4)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        if (!selected) (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-card-dark-border)';
      }}
    >
      {/* Selection dot */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: selected ? 'var(--color-brand)' : 'var(--color-card-dark-border)',
        transition: 'background 200ms ease',
      }} />

      {/* Number badge */}
      {number !== undefined && (
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'var(--color-text-muted)',
          marginBottom: '4px',
        }}>
          {String(number).padStart(2, '0')}
        </span>
      )}

      {/* Recommended badge */}
      {recommended && (
        <span style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: '10px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-mint)',
          background: 'rgba(123,245,165,0.12)',
          border: '1px solid rgba(123,245,165,0.25)',
          borderRadius: '9999px',
          padding: '2px 8px',
        }}>Recommended</span>
      )}

      <p style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: '16px',
        color: 'var(--color-text-on-dark)',
        paddingRight: '16px',
      }}>{title}</p>

      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          fontWeight: 400,
        }}>{subtitle}</p>
      )}

      {description && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          fontWeight: 400,
          marginTop: '2px',
        }}>{description}</p>
      )}
    </div>
  );
}
