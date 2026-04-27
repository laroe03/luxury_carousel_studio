'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { StudioState, StudioAction } from '@/types/studio';

const initialState: StudioState = {
  mode: null,
  currentStep: 1,
  productInfo: {
    productType: null,
    productDescription: '',
    priceTier: null,
    desiredCTA: '',
    slideCount: 7,
  },
  brandAudience: {
    brandGuidelines: '',
    audienceDefinition: '',
    painPoints: '',
    funnelStage: null,
    buyerStatus: null,
  },
  frameworkSelection: {
    frameworkId: null,
    frameworkName: '',
  },
  toneSelection: {
    tone: null,
    styleModifier: null,
    conversionBoost: false,
  },
  viralRecreate: {
    originalCarousel: '',
    brandName: '',
    niche: '',
    productDetails: '',
    targetAudience: '',
    desiredCTA: '',
    tone: null,
    slideCount: 7,
    viralOptimization: false,
  },
  isGenerating: false,
  output: null,
  designPreview: {
    theme: 'Bold Contrast',
    fontPairing: 'Playfair + Inter',
    layout: 'Centered',
    titleSizePercent: 100,
    subSizePercent: 100,
  },
  error: null,
};

function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PRODUCT_INFO':
      return { ...state, productInfo: { ...state.productInfo, ...action.payload } };
    case 'UPDATE_BRAND_AUDIENCE':
      return { ...state, brandAudience: { ...state.brandAudience, ...action.payload } };
    case 'UPDATE_FRAMEWORK':
      return { ...state, frameworkSelection: { ...state.frameworkSelection, ...action.payload } };
    case 'UPDATE_TONE':
      return { ...state, toneSelection: { ...state.toneSelection, ...action.payload } };
    case 'UPDATE_VIRAL_RECREATE':
      return { ...state, viralRecreate: { ...state.viralRecreate, ...action.payload } };
    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'SET_OUTPUT':
      return { ...state, output: action.payload, isGenerating: false, error: null };
    case 'UPDATE_DESIGN_PREVIEW':
      return { ...state, designPreview: { ...state.designPreview, ...action.payload } };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isGenerating: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface StudioContextValue {
  state: StudioState;
  dispatch: React.Dispatch<StudioAction>;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(studioReducer, initialState);
  return (
    <StudioContext.Provider value={{ state, dispatch }}>
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used within StudioProvider');
  return ctx;
}
