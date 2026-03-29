/**
 * Definición exacta del modelo Partido en Sequelize
 */
export interface Match {
  idMatch: number;        // Primary Key (idMatch)
  idDeporte: number;      // Foreign Key (idDeporte)
  deporte?: string;       // Nombre del deporte (proviene de un JOIN en el back)
  fecha: string;          // Formato DATEONLY (YYYY-MM-DD)
  hora: string;           // Formato TIME (HH:mm:ss)
  lugar: string;          // STRING
  maxJugadores: number;   // INTEGER
  numJugadores: number;   // Calculado en el back (COUNT de participaciones)
  descripcion: string | null; // TEXT
  
  // Propiedad virtual para la lógica del Frontend
  isJoined?: boolean;     // Indica si el usuario actual ya está inscrito
}

/**
 * Interfaz para la respuesta del servicio de partidos
 * Divide los datos para las dos pestañas de la UI
 */
export interface MatchesApiResponse {
  disponibles: Match[];
  mis_partidos: Match[];
}

/**
 * Definición del modelo Participacion en Sequelize
 * (Opcional, por si necesitas tipar las inscripciones)
 */
export interface Participacion {
  idParticipacion: number;
  idUser: number;
  idMatch: number;
  nombreEquipo?: string | null;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
}