import { UserProfile } from '../types/profile.types';
import { apiFetchJson } from '@/services/api';

type ProfileApiResponse = {
  id: string;
  nombreUsuario?: string;
  username?: string;
  email: string;
  stats?: {
    played: number;
    won: number;
    lost: number;
  };
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const data = await apiFetchJson<ProfileApiResponse>('/usuarios/perfil', {
    auth: true,
  });

  // 2. Mapeamos la respuesta de tu API al formato que usa tu Frontend
  // Si tu API devuelve 'nombreUsuario', lo pasamos a 'username'
  return {
    id: data.id,
    username: data.nombreUsuario || data.username || 'Usuario',
    email: data.email,
    stats: data.stats || { played: 0, won: 0, lost: 0 } // Por si tu API aún no tiene stats
  };
};