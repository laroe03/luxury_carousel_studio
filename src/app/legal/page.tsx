import React from 'react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function LegalPage() {
  const headingStyle: React.CSSProperties = {
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    color: '#1A1A1A',
    marginBottom: '12px',
    marginTop: '32px',
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    color: '#3A3A3A',
    lineHeight: 1.8,
    marginBottom: '12px',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
      <header style={{ height: '56px', background: 'var(--color-card-dark)', borderBottom: '1px solid var(--color-card-dark-border)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '10px' }}>
        <div style={{ width: '20px', height: '20px', background: 'var(--color-brand)', borderRadius: '4px' }} />
        <Link href="/studio" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
          Luxury Carousel Studio
        </Link>
      </header>

      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ background: 'var(--color-card-light)', border: '1px solid var(--color-card-light-border)', borderRadius: '16px', padding: '48px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '32px', color: '#1A1A1A', marginBottom: '8px' }}>Legal & Copyright</h1>
          <p style={{ ...bodyStyle, color: '#888' }}>Last updated: 2026</p>

          <h2 style={headingStyle}>Copyright Notice</h2>
          <p style={bodyStyle}>
            © 2026 Lolo Bailey (<a href="https://lolobailey.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)' }}>lolobailey.com</a>) · Opulence Studio (<a href="https://opulence.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)' }}>opulence.studio</a>). All rights reserved.
          </p>
          <p style={bodyStyle}>
            This site, its infrastructure, data, tools, and generated outputs are the intellectual property of Opulence Studio LLC. Unauthorized claims of ownership, redistribution, resale, or copyright claims of this site's infrastructure are strictly prohibited.
          </p>

          <h2 style={headingStyle}>Permitted Use</h2>
          <p style={bodyStyle}>
            Authorized users may use this tool and its outputs for personal and commercial purposes related to their own brand and business. Generated carousel copy may be used in your own marketing materials.
          </p>

          <h2 style={headingStyle}>Prohibited Use</h2>
          <p style={bodyStyle}>
            The following are strictly prohibited without express written consent from Opulence Studio LLC:
          </p>
          <ul style={{ ...bodyStyle, paddingLeft: '24px' }}>
            <li>Reselling or white-labeling this tool or its infrastructure</li>
            <li>Claiming ownership of the tool, codebase, or brand</li>
            <li>Redistributing access to unauthorized users</li>
            <li>Reverse engineering the underlying system</li>
          </ul>

          <h2 style={headingStyle}>Data & Privacy</h2>
          <p style={bodyStyle}>
            This tool does not store any user data, form inputs, or generated outputs. All state is session-only and cleared when you close the browser tab. No personally identifiable information is collected.
          </p>
          <p style={bodyStyle}>
            Content submitted to generate carousels is processed by Anthropic's Claude API subject to their privacy policy and terms of service.
          </p>

          <h2 style={headingStyle}>Contact</h2>
          <p style={bodyStyle}>
            For licensing inquiries or legal questions, contact{' '}
            <a href="https://opulence.studio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)' }}>opulence.studio</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
