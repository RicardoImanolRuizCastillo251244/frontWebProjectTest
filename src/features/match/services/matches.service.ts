import { apiFetchJson } from '@/services/api';
import type { Match, MatchesApiResponse } from '../types/match.types';

type MatchesEnvelope<T> = {
  ok?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  partidos?: Match[];
  misPartidos?: Match[];
};

// POST /api/partidos/programar body shape
export interface MatchCreateData {
  idDeporte: number;
  fecha: string;
  hora: string;
  idLugar: number;
  maxJugadores: number;
  equipoCreador: 'A' | 'B';
}

// POST /api/participaciones/inscribir body shape
export interface JoinMatchData {
  idUser: number;
  idMatch: number;
  nombreEquipo?: string;
}

// Response shape for GET /api/jugadores/:id/partidos
interface PlayerMatchesResponse {
  jugador: string;
  misPartidos: Match[];
}

const normalizeMatchesArray = (
  payload: Match[] | MatchesEnvelope<Match[]>
): Match[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.partidos)) {
    return payload.partidos;
  }

  if (Array.isArray(payload.misPartidos)) {
    return payload.misPartidos;
  }

  return [];
};

const normalizePlayerMatchesResponse = (
  payload: PlayerMatchesResponse | MatchesEnvelope<PlayerMatchesResponse>
): Match[] => {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if ('data' in payload && payload.data) {
    return normalizePlayerMatchesResponse(payload.data);
  }

  return Array.isArray(payload.misPartidos) ? payload.misPartidos : [];
};

// 1. GET /api/partidos/ → flat Match[]
export const getMatches = async (): Promise<MatchesApiResponse> => {
  const payload = await apiFetchJson<MatchesApiResponse | MatchesEnvelope<Match[]>>('/partidos', {
    auth: true
  });
  return normalizeMatchesArray(payload);
};

// 2. GET /api/jugadores/:id/partidos → the matches a specific player has joined
export const getPlayerMatches = async (idUser: number): Promise<Match[]> => {
  const payload = await apiFetchJson<PlayerMatchesResponse | MatchesEnvelope<PlayerMatchesResponse>>(
    `/jugadores/${idUser}/partidos`,
    { auth: true }
  );
  return normalizePlayerMatchesResponse(payload);
};

// 3. POST /api/partidos/programar → create new match (auth required)
export const createMatch = async (matchData: MatchCreateData) => {
  return apiFetchJson('/partidos/programar', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(matchData)
  });
};

// 4. POST /api/participaciones/inscribir → join a match (no auth per docs)
export const joinMatch = async (joinData: JoinMatchData) => {
  return apiFetchJson('/participaciones/inscribir', {
    method: 'POST',
    body: JSON.stringify({
      idUser: joinData.idUser,
      idMatch: joinData.idMatch,
      nombreEquipo: joinData.nombreEquipo ?? ''
    })
  });
};

// 5. Leave match — endpoint not yet documented; throws a friendly error
export const leaveMatch = async (_idMatch: number): Promise<void> => {
  throw new Error('Salir de un partido no está disponible todavía.');
};