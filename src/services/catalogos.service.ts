import { apiFetchJson } from './api';

type Deporte = {
  idDeporte: number;
  nombreDeporte: string;
};

export type Lugar = {
  idLugar: number;
  nombre: string;
  ubicacion?: string;
};

type CatalogResponse<T> = {
  ok?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
};

const unwrapCatalogResponse = <T>(payload: T | CatalogResponse<T>): T => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload.data ?? []) as T;
  }

  return [] as T;
};

export const catalogosService = {
  getDeportes: async (): Promise<Deporte[]> => {
    const payload = await apiFetchJson<Deporte[] | CatalogResponse<Deporte[]>>('/deportes/');
    return unwrapCatalogResponse(payload);
  },

  getLugares: async (): Promise<Lugar[]> => {
    const payload = await apiFetchJson<Lugar[] | CatalogResponse<Lugar[]>>('/lugares/listar');
    return unwrapCatalogResponse(payload);
  }
};