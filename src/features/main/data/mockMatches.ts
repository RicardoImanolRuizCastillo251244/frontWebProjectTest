/**
 * Datos mock de partidos para desarrollo y pruebas
 */

import { Match } from '../../../types/match.types';

export const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'Fútbol',
    homeTeam: {
      id: '1',
      name: 'Los Imbatibles',
      color: '#FF6B6B',
    },
    awayTeam: {
      id: '2',
      name: 'Dragones FC',
      color: '#4ECDC4',
    },
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: '18:00',
    location: {
      id: '1',
      name: 'Cancha Central',
      address: 'Calle Principal 123',
      city: 'Ciudad',
    },
    participants: 10,
    maxParticipants: 22,
    status: 'scheduled',
    description: 'Partido amistoso de fútbol profesional nivel intermedio',
  },
  {
    id: '2',
    sport: 'Basquetbol',
    homeTeam: {
      id: '3',
      name: 'Flash Attack',
      color: '#95E1D3',
    },
    awayTeam: {
      id: '4',
      name: 'Thunder Team',
      color: '#F38181',
    },
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    time: '20:00',
    location: {
      id: '2',
      name: 'Polideportivo Sur',
      address: 'Av. Deportiva 456',
      city: 'Ciudad',
    },
    participants: 8,
    maxParticipants: 10,
    status: 'scheduled',
  },
  {
    id: '3',
    sport: 'Tenis',
    homeTeam: {
      id: '5',
      name: 'Net Warriors',
      color: '#FFE66D',
    },
    awayTeam: {
      id: '6',
      name: 'Ace Masters',
      color: '#A8E6CF',
    },
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    time: '17:00',
    location: {
      id: '3',
      name: 'Club de Tenis Elite',
      address: 'Residencial 789',
      city: 'Ciudad',
    },
    participants: 2,
    maxParticipants: 4,
    status: 'scheduled',
  },
  {
    id: '4',
    sport: 'Voleibol',
    homeTeam: {
      id: '7',
      name: 'Spike Masters',
      color: '#FF85A2',
    },
    awayTeam: {
      id: '8',
      name: 'Net Legends',
      color: '#74B9FF',
    },
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    time: '19:30',
    location: {
      id: '4',
      name: 'Gimnasio Municipal',
      address: 'Parque Central',
      city: 'Ciudad',
    },
    participants: 12,
    maxParticipants: 12,
    status: 'scheduled',
  },
  {
    id: '5',
    sport: 'Fútbol',
    homeTeam: {
      id: '9',
      name: 'Phoenix Rising',
      color: '#FFB347',
    },
    awayTeam: {
      id: '10',
      name: 'Cosmic FC',
      color: '#87CEEB',
    },
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '18:45',
    location: {
      id: '5',
      name: 'Estadio Verde',
      address: 'Zona Norte',
      city: 'Ciudad',
    },
    participants: 15,
    maxParticipants: 22,
    status: 'scheduled',
  },
  {
    id: '6',
    sport: 'Badminton',
    homeTeam: {
      id: '11',
      name: 'Shuttle Pro',
      color: '#98D8C8',
    },
    awayTeam: {
      id: '12',
      name: 'Court Kings',
      color: '#F7DC6F',
    },
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    time: '16:00',
    location: {
      id: '6',
      name: 'Centro Recreativo',
      address: 'Av. Principal 321',
      city: 'Ciudad',
    },
    participants: 4,
    maxParticipants: 6,
    status: 'scheduled',
  },
];

/**
 * Función para filtrar partidos por criterios
 */
export const filterMatches = (
  matches: Match[],
  filters: {
    sport?: string;
    status?: Match['status'];
    city?: string;
  }
): Match[] => {
  return matches.filter((match) => {
    if (filters.sport && match.sport !== filters.sport) return false;
    if (filters.status && match.status !== filters.status) return false;
    if (filters.city && match.location.city !== filters.city) return false;
    return true;
  });
};

/**
 * Función para ordenar partidos por fecha
 */
export const sortMatchesByDate = (matches: Match[]): Match[] => {
  return [...matches].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
