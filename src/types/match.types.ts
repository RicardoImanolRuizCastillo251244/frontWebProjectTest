/**
 * Tipos e interfaces relacionados con partidos
 */

export interface Match {
  id: string;
  sport: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  location: Location;
  participants: number;
  maxParticipants: number;
  status: 'scheduled' | 'ongoing' | 'finished';
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  color?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface MatchFilters {
  sport?: string;
  location?: string;
  date?: string;
  status?: Match['status'];
}
