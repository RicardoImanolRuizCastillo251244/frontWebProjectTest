/**
 * Tipos específicos de la página principal
 */

export interface MainPageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaButtonText: string;
  features: Feature[];
  upcomingMatches: Match[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  fixed?: boolean;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButtonText: string;
  onCtaClick?: () => void;
}

export interface MediaSectionProps {
  features: Feature[];
  onFeatureClick?: (featureId: string) => void;
}

export interface MatchesVisualizationProps {
  matches: Match[];
  onMatchClick?: (matchId: string) => void;
  loading?: boolean;
  error?: string;
}

export interface FooterProps {
  brandName: string;
  year?: number;
}
export interface MediaStat {
  id: string;
  iconSrc: string;
  value?: string | number | null;
  label: string;
  altText: string;
}

export interface MediaSectionProps {
  className?: string;
}

export interface Match {
  idMatch: number;      // <--- Cambiado de 'id' a 'idMatch'
  idDeporte: number;    // <--- Agregado para que coincida con Sequelize
  deporte: string;
  fecha: string;
  hora: string;
  lugar: string;
  maxJugadores: number;
  numJugadores: number; // Ya no es opcional, lo necesitamos siempre
  descripcion: string | null;
  isJoined?: boolean;   // Agregado para la lógica de las pestañas
}

export interface MatchesApiResponse {
  disponibles: Match[];
  mis_partidos: Match[];
}