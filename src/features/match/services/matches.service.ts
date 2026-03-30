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
  idMatch: number;
  equipo?: 'A' | 'B';
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
  payload:
    | Match[]
    | PlayerMatchesResponse
    | MatchesEnvelope<PlayerMatchesResponse>
    | MatchesEnvelope<Match[]>
): Match[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if ('data' in payload && payload.data) {
    return normalizePlayerMatchesResponse(payload.data as Match[] | PlayerMatchesResponse);
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

// 2. GET /api/partidos/usuario/:idUser/participando → matches where the user participates
export const getPlayerMatches = async (idUser: number): Promise<Match[]> => {
  try {
    const payload = await apiFetchJson<
      Match[] | PlayerMatchesResponse | MatchesEnvelope<PlayerMatchesResponse> | MatchesEnvelope<Match[]>
    >(
      `/partidos/usuario/${idUser}/participando`,
      { auth: true }
    );
    return normalizePlayerMatchesResponse(payload);
  } catch (error: any) {
    if (error?.message === 'SESION_EXPIRADA') {
      throw error;
    }

    // Backward-compatible fallback for environments where the new endpoint is unstable.
    const fallbackPayload = await apiFetchJson<
      Match[] | PlayerMatchesResponse | MatchesEnvelope<PlayerMatchesResponse> | MatchesEnvelope<Match[]>
    >(
      `/jugadores/${idUser}/partidos`,
      { auth: true }
    );

    return normalizePlayerMatchesResponse(fallbackPayload);
  }
};

// 3. POST /api/partidos/programar → create new match (auth required)
export const createMatch = async (matchData: MatchCreateData) => {
  return apiFetchJson('/partidos/programar', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(matchData)
  });
};

// 4. POST /api/partidos/:idMatch/unirse → join a match (auth required)
export const joinMatch = async (joinData: JoinMatchData) => {
  return apiFetchJson(`/partidos/${joinData.idMatch}/unirse`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify({
      equipo: joinData.equipo ?? 'A'
    })
  });
};

// 5. DELETE /api/partidos/:idMatch/participantes/:idParticipante → leave match (self) or remove participant
export const leaveMatch = async (idMatch: number, idParticipante: number): Promise<void> => {
  await apiFetchJson(`/partidos/${idMatch}/participantes/${idParticipante}`, {
    method: 'DELETE',
    auth: true,
  });
};

// 6. DELETE /api/partidos/:idMatch → cancel match (creator only)
export const cancelMatch = async (idMatch: number, motivoCancelacion?: string): Promise<void> => {
  await apiFetchJson(`/partidos/${idMatch}`, {
    method: 'DELETE',
    auth: true,
    body: JSON.stringify({
      motivoCancelacion: motivoCancelacion ?? 'Cancelado desde la app',
    }),
  });
};
