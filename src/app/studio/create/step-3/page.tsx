'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import { Card } from '@/components/ui/Card';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SelectionCard } from '@/components/ui/SelectionCard';
import { Button } from '@/components/ui/Button';
import { FRAMEWORKS } from '@/lib/frameworks';

export default function Step3Page() {
  const router = useRouter();
  const { state, dispatch } = useStudio();
  const { frameworkSelection } = state;
  const [error, setError] = useState('');

  const selectFramework = (id: number, name: string) => {
    dispatch({ type: 'UPDATE_FRAMEWORK', payload: { frameworkId: id, frameworkName: name } });
    setError('');
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 2 });
    router.push('/studio/create/step-2');
  };

  const handleNext = () => {
    if (!frameworkSelection.frameworkId) {
      setError('Please select a framework.');
      return;
    }
    dispatch({ type: 'SET_STEP', payload: 4 });
    router.push('/studio/create/step-4');
  };

  const selected = FRAMEWORKS.find(f => f.id === frameworkSelection.frameworkId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
      <Card style={{ maxWidth: '860px', width: '100%' }}>
        <SectionLabel>STEP 3 OF 4</SectionLabel>
        <h2 style={{ fontFamily: "'Sora', sans-serif", marginBottom: '8px' }}>Choose your framework</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
          Each framework follows a unique psychological structure. Choose the one that matches where your audience is mentally.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}>
          {FRAMEWORKS.map(fw => (
            <div
              key={fw.id}
              title={fw.bullets.join('\n')}
            >
              <SelectionCard
                title={fw.name}
                description={fw.hook}
                number={fw.id}
                selected={frameworkSelection.frameworkId === fw.id}
                onClick={() => selectFramework(fw.id, fw.name)}
              />
            </div>
          ))}
        </div>

        {/* Selection summary bar */}
        {selected && (
          <div style={{
            background: 'rgba(123,245,165,0.08)',
            border: '1px solid rgba(123,245,165,0.3)',
            borderRadius: '10px',
            padding: '14px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ color: 'var(--color-accent-mint)', fontWeight: 700 }}>✓</span>
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)' }}>Framework selected: </span>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '14px', color: 'var(--color-accent-mint)' }}>{selected.name}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--color-text-muted)' }}> — {selected.hook}</span>
            </div>
          </div>
        )}

        {error && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="ghost" onClick={handleBack}>← Back</Button>
          <Button variant="primary" size="lg" onClick={handleNext} disabled={!frameworkSelection.frameworkId}>NEXT →</Button>
        </div>
      </Card>
    </div>
  );
}
