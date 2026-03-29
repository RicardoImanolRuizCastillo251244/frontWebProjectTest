import { UserProfile } from '../types/profile.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/jugadores/perfil'; // Ajusta a tu URL

export const getUserProfile = async (): Promise<UserProfile> => {
  // 1. Obtenemos el token del LocalStorage para la autenticación
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/usuarios/perfil`, { // Ajusta el endpoint de tu API
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Enviamos el token en el header
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
       // Opcional: manejar sesión expirada
       console.error("Sesión expirada");
    }
    throw new Error('Error al obtener los datos del servidor');
  }

  const data = await response.json();

  // 2. Mapeamos la respuesta de tu API al formato que usa tu Frontend
  // Si tu API devuelve 'nombreUsuario', lo pasamos a 'username'
  return {
    id: data.id,
    username: data.nombreUsuario || data.username, 
    email: data.email,
    stats: data.stats || { played: 0, won: 0, lost: 0 } // Por si tu API aún no tiene stats
  };
};