'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SlideCard } from '@/components/carousel/SlideCard';
import { CopyBlock } from '@/components/carousel/CopyBlock';
import { ContextCards } from '@/components/carousel/ContextCards';
import { DesignControlPanel } from '@/components/carousel/DesignControlPanel';
import { SlidePreviewCard } from '@/components/carousel/SlidePreviewCard';
import { CAROUSEL_FONTS, buildFontUrl } from '@/lib/fontPairings';
import { downloadAllSlidesAsZip } from '@/lib/download';

export default function ResultsPage() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { output, designPreview } = state;
  const [copyOpen, setCopyOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Redirect if no output
  useEffect(() => {
    if (!output) router.replace('/studio');
  }, [output, router]);

  // Load carousel fonts when design panel opens
  useEffect(() => {
    if (designOpen && !fontsLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = buildFontUrl(CAROUSEL_FONTS);
      document.head.appendChild(link);
      link.onload = () => setFontsLoaded(true);
    }
  }, [designOpen, fontsLoaded]);

  if (!output) return null;

  const handleNewCarousel = () => {
    dispatch({ type: 'RESET' });
    router.push('/studio');
  };

  const handleDownloadAll = async () => {
    const els = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    setDownloadProgress('Preparing...');
    try {
      await downloadAllSlidesAsZip(
        els,
        designPreview.theme,
        (curr, total) => setDownloadProgress(`Downloading ${curr} of ${total}...`)
      );
    } finally {
      setDownloadProgress(null);
    }
  };

  const metaBadges = [
    output.framework,
    output.tone,
    state.brandAudience.buyerStatus ?? state.viralRecreate.tone ?? '',
    `${output.slides.length} Slides`,
  ].filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
      <AppHeader showStartOver />

      <main style={{ flex: 1, paddingTop: '80px', paddingBottom: '60px' }}>
        {/* Header Section */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 0', textAlign: 'center' }}>
          <SectionLabel style={{ textAlign: 'center' }}>YOUR CAROUSEL IS READY</SectionLabel>
          <h1 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '16px', color: 'var(--color-text-on-light)' }}>
            {output.carousel_title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
            {metaBadges.map(b => (
              <Badge key={b} color="lavender">{b}</Badge>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="primary" onClick={() => setCopyOpen(p => !p)}>
                {copyOpen ? '▲ COPY & PASTE' : '▼ COPY & PASTE'}
              </Button>
              <Button variant="secondary" onClick={() => setDesignOpen(p => !p)}>
                {designOpen ? '▲ DESIGN PREVIEW' : '▼ DESIGN PREVIEW'}
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={handleNewCarousel}>
              ✦ New Carousel
            </Button>
          </div>
        </div>

        {/* Copy Panel */}
        {copyOpen && (
          <div style={{ maxWidth: '860px', margin: '32px auto 0', padding: '0 24px', animation: 'fadeIn 200ms ease' }}>
            <div style={{
              background: 'var(--color-card-dark)',
              border: '1px solid var(--color-card-dark-border)',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}>
              <div>
                <SectionLabel>SLIDE CONTENT</SectionLabel>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                  Each slide includes copy and design notes. Use these in Canva exactly as written.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {output.slides.map((slide, i) => (
                    <SlideCard key={slide.slide_number} slide={slide} index={i} total={output.slides.length} />
                  ))}
                </div>
              </div>

              <CopyBlock slides={output.slides} />
              <ContextCards output={output} />
            </div>
          </div>
        )}

        {/* Design Preview Panel */}
        {designOpen && (
          <div style={{ maxWidth: '1100px', margin: '32px auto 0', padding: '0 24px', animation: 'fadeIn 200ms ease' }}>
            <div style={{
              background: 'var(--color-card-dark)',
              border: '1px solid var(--color-card-dark-border)',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}>
              {/* Controls */}
              <DesignControlPanel
                value={designPreview}
                onChange={updates => dispatch({ type: 'UPDATE_DESIGN_PREVIEW', payload: updates })}
              />

              {/* Slide Grid */}
              <div>
                <SectionLabel style={{ marginBottom: '16px' }}>SLIDE PREVIEWS</SectionLabel>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '16px',
                }}>
                  {output.slides.map((slide, i) => (
                    <SlidePreviewCard
                      key={slide.slide_number}
                      slide={slide}
                      total={output.slides.length}
                      designPreview={designPreview}
                      onRef={el => { slideRefs.current[i] = el; }}
                    />
                  ))}
                </div>
              </div>

              {/* Download All */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownloadAll}
                  disabled={!!downloadProgress}
                  style={{ minWidth: '360px' }}
                >
                  {downloadProgress ?? '↓ DOWNLOAD ALL SLIDES'}
                </Button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Downloads all slides as a ZIP of PNGs (1080×1080px)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom new carousel CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button variant="ghost" onClick={handleNewCarousel}>✦ Create Another Carousel</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
