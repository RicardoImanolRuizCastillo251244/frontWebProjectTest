/**
 * Tipos específicos de la página principal
 */

import { Match } from '../../../types/match.types';

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
