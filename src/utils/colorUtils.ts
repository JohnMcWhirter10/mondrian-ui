// utils/colorUtils.ts

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
};

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
};

const hslToHex = (h: number, s: number, l: number) => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hexToHSL = (hex: string) => {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

export const calculateColors = (color: string) => {
  const { r, g, b } = hexToRgb(color);
  const hsl = rgbToHsl({ r, g, b });
  const lightColor = hslToHex(hsl[0], hsl[1], Math.min(hsl[2] + 0.25, 1));
  const darkColor = hslToHex(hsl[0], hsl[1], Math.max(hsl[2] - 0.25, 0));
  return { lightColor, darkColor };
};

export const generateStyles = (primaryColor: string, darkMode: boolean) => {
  const { h, s, l } = hexToHSL(primaryColor); // Assuming you have this function
  return `
        :root {
            --primary-hue: ${h};
            --primary-saturation: ${s}%;
            --primary-lightness: ${l}%;
            --light-lightness: calc(var(--primary-lightness) + 20%);
            --dark-lightness: calc(var(--primary-lightness) - 20%);
            --primary-color: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness));
            --light-color: hsl(var(--primary-hue), var(--primary-saturation), var(--light-lightness));
            --dark-color: hsl(var(--primary-hue), var(--primary-saturation), var(--dark-lightness));
            --error-color: #FF6F61;
            --success-color: #3CB371;
            --font-size-tiny: 0.75rem;
            --font-size-small: 0.875rem;
            --font-size-medium: 1rem;
            --font-size-large: 1.125rem;
            --font-size-x-large: 1.25rem;
            --spacing-small: 4px;
            --spacing-medium: 8px;
            --spacing-large: 16px;
            --font-family: 'Roboto', sans-serif;
            --neutral-color: ${darkMode ? '#000' : '#fff'};
            --text-color: ${darkMode ? '#fff' : '#000'};
        }

        body {
            background-color: var(--neutral-color);
            font-family: var(--font-family);
        }
    `;
};
