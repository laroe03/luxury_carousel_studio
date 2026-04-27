import React from 'react';

interface LoginPageProps {
  searchParams: Promise<{ error?: string; from?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === '1';
  const from = params.from ?? '/studio';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-page-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: 'var(--color-card-dark)',
        border: '1px solid var(--color-card-dark-border)',
        borderRadius: '16px',
        padding: '48px 40px',
        maxWidth: '440px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '20px', height: '20px', background: 'var(--color-brand)', borderRadius: '4px' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Luxury Carousel Studio
          </span>
        </div>

        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>
            Welcome back.
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Enter your access password to continue.
          </p>
        </div>

        <form
          action="/api/authenticate"
          method="POST"
          encType="application/x-www-form-urlencoded"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <input type="hidden" name="from" value={from} />

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              autoFocus
              autoComplete="current-password"
              style={{
                width: '100%',
                background: 'var(--color-input-bg)',
                color: '#fff',
                border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--color-card-dark-border)'}`,
                borderRadius: '12px',
                padding: '14px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                outline: 'none',
              }}
            />
            {hasError && (
              <div style={{
                marginTop: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                display: 'inline-flex',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '12px', color: 'var(--color-error)', letterSpacing: '0.03em' }}>
                  Incorrect password. Try again.
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '9999px',
              background: 'var(--color-brand)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              transition: 'background 150ms ease',
            }}
          >
            ENTER →
          </button>
        </form>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Access is restricted to authorized users only.
        </p>
      </div>
    </div>
  );
}
