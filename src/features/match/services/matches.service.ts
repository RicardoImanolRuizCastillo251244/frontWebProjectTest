const API_URL = 'https://backcourtmatchproduction-production.up.railway.app/api';

export interface MatchData {
  idDeporte: number;
  fecha: string;
  hora: string;
  idLugar: number;
  maxJugadores: number;
}

// 1. Obtener todos los partidos
export const getMatches = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/partidos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (response.status === 401) {
    localStorage.clear();
    window.location.replace('/auth/login');
    throw new Error('SESION_EXPIRADA');
  }

  if (!response.ok) throw new Error('Error al obtener partidos');
  return await response.json();
};

// 2. Crear un nuevo partido
export const createMatch = async (matchData: MatchData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/partidos/programar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(matchData)
  });

  if (response.status === 401) {
    localStorage.clear();
    window.location.replace('/auth/login');
    throw new Error('SESION_EXPIRADA');
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear el partido');
  }
  return await response.json();
};

// 3. Unirse a un partido (IMPORTANTE: Debe llamarse joinMatch)
export const joinMatch = async (idMatch: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/partidos/unirse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ idMatch })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'No se pudo unir al partido');
  }
  return await response.json();
};

// 4. Salir de un partido (IMPORTANTE: Debe llamarse leaveMatch)
export const leaveMatch = async (idMatch: number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/partidos/salir`, {
    method: 'DELETE', // O POST, según lo tengas en tu backend
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ idMatch })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'No se pudo salir del partido');
  }
  return await response.json();
};