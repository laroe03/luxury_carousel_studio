export interface FontPairing {
  name: string;
  headingFont: string;
  bodyFont: string;
  previewFont: string; // font to render the button label in
}

export const FONT_PAIRINGS: FontPairing[] = [
  { name: 'Playfair + Inter',       headingFont: 'Playfair Display', bodyFont: 'Inter',          previewFont: 'Playfair Display' },
  { name: 'Montserrat + Open Sans', headingFont: 'Montserrat',       bodyFont: 'Open Sans',       previewFont: 'Montserrat' },
  { name: 'Poppins + Lato',         headingFont: 'Poppins',          bodyFont: 'Lato',            previewFont: 'Poppins' },
  { name: 'DM Serif + DM Sans',     headingFont: 'DM Serif Display', bodyFont: 'DM Sans',         previewFont: 'DM Serif Display' },
  { name: 'Raleway + Roboto',       headingFont: 'Raleway',          bodyFont: 'Roboto',          previewFont: 'Raleway' },
  { name: 'Lora + Source Sans',     headingFont: 'Lora',             bodyFont: 'Source Sans 3',   previewFont: 'Lora' },
  { name: 'Bebas Neue + Barlow',    headingFont: 'Bebas Neue',       bodyFont: 'Barlow',          previewFont: 'Bebas Neue' },
  { name: 'Space Grotesk',          headingFont: 'Space Grotesk',    bodyFont: 'Space Grotesk',   previewFont: 'Space Grotesk' },
];

export function getFontPairing(name: string): FontPairing {
  return FONT_PAIRINGS.find(f => f.name === name) ?? FONT_PAIRINGS[0];
}

export const CAROUSEL_FONTS = [
  'Playfair Display', 'Montserrat', 'Poppins', 'DM Serif Display',
  'Raleway', 'Lora', 'Bebas Neue', 'Space Grotesk',
  'Inter', 'Open Sans', 'Lato', 'Roboto', 'Source Sans 3', 'Barlow',
];

export function buildFontUrl(fonts: string[]): string {
  const families = fonts.map(f => {
    const encoded = encodeURIComponent(f);
    return `family=${encoded}:wght@400;600;700`;
  });
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}
