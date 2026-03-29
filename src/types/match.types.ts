/**
 * Tipos e interfaces sincronizados con Sequelize (Base de Datos)
 */

export interface Match {
  // Identificadores de Sequelize
  idMatch: number;      
  idDeporte: number;
  
  // Datos del encuentro
  deporte?: string;      // Viene de la tabla 'deportes' vía JOIN
  fecha: string;        // DATEONLY (YYYY-MM-DD)
  hora: string;         // TIME (HH:mm:ss)
  lugar: string;        // STRING
  
  // Jugadores y Cupos
  numJugadores: number;  // Calculado con COUNT en participaciones
  maxJugadores: number;  // INTEGER
  
  // Información extra
  descripcion: string | null;
  
  // Estado de UI (Calculado en el service o backend)
  isJoined?: boolean;    
}

export interface MatchesApiResponse {
  disponibles: Match[];
  mis_partidos: Match[];
}

export interface Participacion {
  idParticipacion: number;
  nombreEquipo: string | null;
  idUser: number;
  idMatch: number;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
}