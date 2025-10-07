// Paleta de colores de PHITECA
export const COLORS = {
  // Colores principales
  primary: '#00303f',      // Azul marino corporativo
  accent: '#ffb41e',       // Naranja dorado
  secondary: '#cae4db',    // Verde menta claro
  tertiary: '#bd7e00',     // Marrón dorado
  complement: '#7a9e96',   // Verde azulado
  neutral: '#66868c',      // Gris azulado
  dark: '#001a23',         // Azul muy oscuro
  
  // Colores adicionales
  white: '#ffffff',
  black: '#000000',
  
  // Variantes de hover
  primaryHover: '#001a23',
  accentHover: '#bd7e00',
  secondaryHover: '#7a9e96',
} as const;

// Tipos para TypeScript
export type ColorKey = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];
