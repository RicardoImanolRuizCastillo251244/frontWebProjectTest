import { apiFetchJson } from '@/services/api';

// Matches the real API response: POST /api/auth/login
export interface LoginResponse {
  mensaje: string;
  token: string;
  idUser: number;
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