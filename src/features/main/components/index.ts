/**
 * Exportaciones de componentes de la página principal
 */

// NO exportar Header desde aquí para evitar duplicidad
export { default as Hero } from './Hero';
export { default as HeroButton } from './HeroButton';
export { default as MediaSection } from './MediaSection';
export { default as HeroMediaSection } from './HeroMediaSection';
export { default as MatchesVisualization } from './MatchesVisualization';
export { default as Footer } from './Footer';

// Re-exportar tipos si es necesario desde aquí
export * from '../types/main.types';
