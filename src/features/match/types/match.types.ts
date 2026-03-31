/**
 * Shape returned by GET /api/partidos/ and GET /api/jugadores/:id/partidos
 */
export interface MatchCreator {
  idUser: number;
  nombreUsuario?: string;
  correo?: string;
}

export interface MatchParticipantUser {
  idUser: number;
  nombreUsuario?: string;
  correo?: string;
}

export interface MatchParticipant {
  idParticipacion: number;
  nombreEquipo?: 'A' | 'B' | string | null;
  usuario: MatchParticipantUser;
  esCreador?: boolean;
}

export type MatchStatus = 'programado' | 'en_curso' | 'finalizado' | 'cancelado' | string;

export interface Match {
  idMatch: number;
  idDeporte: number;
  idlugar?: number;
  idLugar?: number;
  idCreador?: number;
  creador?: MatchCreator | null;
  deporte?: string;       // Enriched by the hook from the sports catalog
  fecha: string;          // YYYY-MM-DD
  hora: string;           // HH:mm:ss
  lugar?: string;         // Enriched by the hook from idlugar
  maxJugadores: number;
  estado?: MatchStatus;
  motivoCancelacion?: string | null;
  participantesActuales?: number;
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