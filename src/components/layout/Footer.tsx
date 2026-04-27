import React from 'react';

export function Footer() {
  return (
    <footer style={{
      background: 'var(--color-card-dark)',
      borderTop: '1px solid var(--color-card-dark-border)',
      padding: '24px',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.7,
      }}>
        © 2026{' '}
        <a href="https://lolobailey.com" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-brand)' }}>Lolo Bailey</a>
        {' '}·{' '}
        <a href="https://opulence.studio" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-brand)' }}>Opulence Studio</a>
        {' '}· All rights reserved.
      </p>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        color: 'var(--color-text-muted)',
        marginTop: '4px',
        lineHeight: 1.7,
      }}>
        Unauthorized redistribution, resale, or copyright claims of this site, its infrastructure,
        data, and tools are strictly prohibited.{' '}
        <a href="/legal" style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>Legal</a>
      </p>
    </footer>
  );
}
