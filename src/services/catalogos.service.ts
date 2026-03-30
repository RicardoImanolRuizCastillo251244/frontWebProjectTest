import { apiFetchJson } from './api';

// GET /api/deportes/ → returns Deporte[] directly
type Deporte = {
  idDeporte: number;
  nombreDeporte: string;
};

// GET /api/lugares/listar → returns { idLugar, nombre, ... }[]
export type Lugar = {
  idLugar: number;
  nombre: string;
  ubicacion?: string;
};

export const catalogosService = {
  getDeportes: async (): Promise<Deporte[]> => {
    return apiFetchJson<Deporte[]>('/deportes');
  },

  getLugares: async (): Promise<Lugar[]> => {
    return apiFetchJson<Lugar[]>('/lugares/listar');
  }
};