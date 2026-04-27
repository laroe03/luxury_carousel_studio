'use client';

export async function downloadSlideAsPng(
  element: HTMLElement,
  slideNum: number,
  theme: string
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');
  const date = new Date().toISOString().slice(0, 10);
  const canvas = await html2canvas(element, {
    width: 1080,
    height: 1080,
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  });
  const link = document.createElement('a');
  link.download = `carousel-slide-${slideNum}-${theme.toLowerCase().replace(/\s+/g, '-')}-${date}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function downloadAllSlidesAsZip(
  elements: HTMLElement[],
  theme: string,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');
  const { default: JSZip } = await import('jszip');

  const zip = new JSZip();
  const date = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < elements.length; i++) {
    onProgress?.(i + 1, elements.length);
    const canvas = await html2canvas(elements[i], {
      width: 1080,
      height: 1080,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });
    const dataUrl = canvas.toDataURL('image/png');
    const base64 = dataUrl.split(',')[1];
    zip.file(`slide-${i + 1}.png`, base64, { base64: true });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const link = document.createElement('a');
  link.download = `luxury-carousel-${date}.zip`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}
