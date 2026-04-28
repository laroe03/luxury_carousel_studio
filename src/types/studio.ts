export interface ProductInfo {
  productType: 'physical' | 'digital' | null;
  productDescription: string;
  priceTier: 'affordable' | 'contemporary' | 'heritage' | null;
  desiredCTA: string;
  slideCount: number;
}

export interface BrandAudience {
  brandGuidelines: string;
  audienceDefinition: string;
  painPoints: string;
  funnelStage: 'top' | 'middle' | 'bottom' | null;
  buyerStatus: 'cold' | 'warm' | 'hot' | 'vip' | 'launch' | 'evergreen' | null;
}

export interface FrameworkSelection {
  frameworkId: number | null;
  frameworkName: string;
}

export interface ToneSelection {
  tone: string | null;
  styleModifier: string | null;
  conversionBoost: boolean;
}

export interface ViralRecreate {
  originalCarousel: string;
  brandName: string;
  niche: string;
  productDetails: string;
  targetAudience: string;
  desiredCTA: string;
  tone: string | null;
  slideCount: number;
  viralOptimization: boolean;
}

export interface CarouselSlide {
  slide_number: number;
  slide_type: string;
  headline: string;
  body: string;
  design_note: string;
}

export interface CarouselOutput {
  carousel_title: string;
  framework: string;
  tone: string;
  slides: CarouselSlide[];
  layout_suggestion: string;
  font_suggestion: string;
  color_palette: string[];
  background_suggestion: string;
  short_caption: string;
  seo_caption: string;
  hook_alternatives: string[];
  cta_variations: string[];
}

export interface DesignPreviewState {
  theme: string;
  fontPairing: string;
  layout: string;
  titleSizePercent: number;
  subSizePercent: number;
}

export interface StudioState {
  mode: 'create' | 'recreate' | null;
  provider: 'anthropic' | 'openai';
  currentStep: 1 | 2 | 3 | 4;
  productInfo: ProductInfo;
  brandAudience: BrandAudience;
  frameworkSelection: FrameworkSelection;
  toneSelection: ToneSelection;
  viralRecreate: ViralRecreate;
  isGenerating: boolean;
  output: CarouselOutput | null;
  designPreview: DesignPreviewState;
  error: string | null;
}

export type StudioAction =
  | { type: 'SET_MODE'; payload: 'create' | 'recreate' }
  | { type: 'SET_STEP'; payload: 1 | 2 | 3 | 4 }
  | { type: 'UPDATE_PRODUCT_INFO'; payload: Partial<ProductInfo> }
  | { type: 'UPDATE_BRAND_AUDIENCE'; payload: Partial<BrandAudience> }
  | { type: 'UPDATE_FRAMEWORK'; payload: Partial<FrameworkSelection> }
  | { type: 'UPDATE_TONE'; payload: Partial<ToneSelection> }
  | { type: 'UPDATE_VIRAL_RECREATE'; payload: Partial<ViralRecreate> }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_OUTPUT'; payload: CarouselOutput }
  | { type: 'UPDATE_OUTPUT_SLIDE'; payload: { index: number; fields: Partial<CarouselSlide> } }
  | { type: 'UPDATE_DESIGN_PREVIEW'; payload: Partial<DesignPreviewState> }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROVIDER'; payload: 'anthropic' | 'openai' }
  | { type: 'RESET' };
