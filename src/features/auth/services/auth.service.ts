import { apiFetchJson } from '@/services/api';

// Matches the real API response: POST /api/auth/login
export interface LoginResponse {
  ok?: boolean;
  statusCode?: number;
  message?: string;
  session?: {
    token?: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: {
      idUser?: number;
      correo?: string;
      nombreUsuario?: string;
    };
  };
  data?: {
    token?: string;
    refreshToken?: string;
    expiresIn?: number;
    idUser?: number;
    correo?: string;
    nombreUsuario?: string;
  };
  // Legacy/alternative fields to keep compatibility with previous backend variants
  token?: string;
  accessToken?: string;
  idUser?: number;
  id?: number;
  correo?: string;
  nombreUsuario?: string;
  user?: {
    idUser?: number;
    id?: number;
    correo?: string;
    nombreUsuario?: string;
  };
}

interface RegisterPayload {
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  idUbicacion: number;     // API expects idUbicacion, not idLugar
  idDeporteFavorito: number;
}

export const authService = {
  login: async (correo: string, contrasena: string) => {
    return apiFetchJson<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, contrasena }),
    });
  },

  register: async (userData: RegisterPayload) => {
    return apiFetchJson('/jugadores/registro', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
};