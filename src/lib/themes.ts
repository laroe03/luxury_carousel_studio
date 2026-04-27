export interface Theme {
  name: string;
  group: 'dark' | 'light';
  background: string;
  text: string;
  accent: string;
  vibe: string;
}

export const THEMES: Theme[] = [
  // Dark themes
  { name: 'Luxury/Beige',     group: 'dark',  background: '#F5EDD8', text: '#1A1A1A', accent: '#C9A96E', vibe: 'Warm editorial luxury' },
  { name: 'Soft Feminine',    group: 'dark',  background: '#FDF6F0', text: '#3D2B1F', accent: '#E8B4A0', vibe: 'Blush, soft brand' },
  { name: 'Bold Contrast',    group: 'dark',  background: '#000000', text: '#FFFFFF', accent: '#FF6B9D', vibe: 'Maximum impact' },
  { name: 'Minimal B&W',      group: 'dark',  background: '#FAFAFA', text: '#111111', accent: '#888888', vibe: 'Clean, timeless' },
  { name: 'Digital Neon',     group: 'dark',  background: '#0A0A0F', text: '#FFFFFF', accent: '#7BF5A5', vibe: 'Modern tech luxury' },
  { name: 'Midnight Purple',  group: 'dark',  background: '#0F0A1A', text: '#F0EDF8', accent: '#B8A9E8', vibe: 'Moody editorial' },
  // Light themes
  { name: 'Warm Neutral',     group: 'light', background: '#F9F5F0', text: '#2A2218', accent: '#A08060', vibe: 'Classic elegance' },
  { name: 'Cool Gray',        group: 'light', background: '#F5F5F7', text: '#1D1D1F', accent: '#6B6B6B', vibe: 'Apple-inspired minimal' },
  { name: 'Sage Green',       group: 'light', background: '#D5D9CB', text: '#1A1A1A', accent: '#4A6741', vibe: 'Organic, earthy luxury' },
  { name: 'Warm Coral',       group: 'light', background: '#FFF5F0', text: '#2A1A14', accent: '#E07050', vibe: 'Bold warmth' },
  { name: 'Soft Lavender',    group: 'light', background: '#F5F0FA', text: '#1A1228', accent: '#9B8CC4', vibe: 'Dreamy, feminine' },
  { name: 'Clean White',      group: 'light', background: '#FFFFFF', text: '#111111', accent: '#FF6B9D', vibe: 'Pure, fresh, modern' },
  { name: 'Sky Blue',         group: 'light', background: '#EEF4FC', text: '#0A1F3C', accent: '#3B82F6', vibe: 'Fresh, aspirational' },
];

export function getTheme(name: string): Theme {
  return THEMES.find(t => t.name === name) ?? THEMES[2];
}

export const DARK_THEMES = THEMES.filter(t => t.group === 'dark');
export const LIGHT_THEMES = THEMES.filter(t => t.group === 'light');
