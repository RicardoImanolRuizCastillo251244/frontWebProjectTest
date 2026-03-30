/**
 * Shape returned by GET /api/partidos/ and GET /api/jugadores/:id/partidos
 */
export interface Match {
  idMatch: number;
  idDeporte: number;
  deporte?: string;       // Enriched by the hook from the sports catalog
  fecha: string;          // YYYY-MM-DD
  hora: string;           // HH:mm:ss
  lugar: string;
  maxJugadores: number;
  numJugadores?: number;  // Not returned by API; kept for UI display (shows 0 if absent)
  descripcion?: string | null; // Optional; not always present in API response
  isJoined?: boolean;     // Computed by the hook
}

/**
 * What the hook exposes to the UI (two tabs)
 */
export interface MatchesState {
  disponibles: Match[];
  mis_partidos: Match[];
}

/**
 * Raw API response type for GET /api/partidos/ → flat array
 */
export type MatchesApiResponse = Match[];

export interface Participacion {
  idParticipacion: number;
  idUser: number;
  idMatch: number;
  nombreEquipo?: string | null;
}