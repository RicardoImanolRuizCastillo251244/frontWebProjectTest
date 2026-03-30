/**
 * Shape returned by the backend API (GET /api/partidos/)
 */
export interface MatchCreator {
  idUser: number;
  nombreUsuario?: string;
  correo?: string;
}

export interface Match {
  idMatch: number;
  idDeporte: number;
  idlugar?: number;
  idLugar?: number;
  idCreador?: number;
  creador?: MatchCreator | null;
  deporte?: string;       // Enriched on the frontend from the sports catalog
  fecha: string;          // YYYY-MM-DD
  hora: string;           // HH:mm:ss
  lugar?: string;
  maxJugadores: number;
  numJugadores?: number;  // Not returned by API; defaults to 0 in UI
  descripcion?: string | null;
  isJoined?: boolean;     // Computed by the hook
}

export interface MatchesState {
  disponibles: Match[];
  mis_partidos: Match[];
}

/** Raw flat array returned by GET /api/partidos/ */
export type MatchesApiResponse = Match[];

export interface Participacion {
  idParticipacion: number;
  nombreEquipo: string | null;
  idUser: number;
  idMatch: number;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
}