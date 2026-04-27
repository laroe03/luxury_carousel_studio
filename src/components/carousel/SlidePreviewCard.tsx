'use client';

import React, { useRef, useState, memo } from 'react';
import { CarouselSlide, DesignPreviewState } from '@/types/studio';
import { SlideRenderer } from './SlideRenderer';
import { downloadSlideAsPng } from '@/lib/download';

interface SlidePreviewCardProps {
  slide: CarouselSlide;
  total: number;
  designPreview: DesignPreviewState;
  onRef?: (el: HTMLDivElement | null) => void;
}

export const SlidePreviewCard = memo(function SlidePreviewCard({
  slide,
  total,
  designPreview,
  onRef,
}: SlidePreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleRef = (el: HTMLDivElement | null) => {
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    onRef?.(el);
  };

  const handleDownload = async () => {
    if (!ref.current || downloading) return;
    setDownloading(true);
    try {
      await downloadSlideAsPng(ref.current, slide.slide_number, designPreview.theme);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SlideRenderer
        ref={handleRef}
        slide={slide}
        total={total}
        designPreview={designPreview}
      />
      {hovered && (
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            cursor: downloading ? 'wait' : 'pointer',
            zIndex: 5,
          }}
        >
          {downloading ? 'Saving...' : '↓ Download'}
        </button>
      )}
    </div>
  );
});
