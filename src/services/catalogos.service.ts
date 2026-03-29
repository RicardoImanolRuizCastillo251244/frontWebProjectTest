// src/services/catalogos.service.ts
const API_URL = 'https://backcourtmatchproduction-production.up.railway.app/api';

export const catalogosService = {
  // GET /api/deportes -> Responde con { data: [...] }
  getDeportes: async () => {
    const response = await fetch(`${API_URL}/deportes`);
    if (!response.ok) throw new Error('Error al obtener deportes');
    const json = await response.json();
    return json.data; // Extraemos el array de la propiedad 'data'
  },

  // GET /api/lugares/listar -> Responde con [...]
  getLugares: async () => {
    const response = await fetch(`${API_URL}/lugares/listar`);
    if (!response.ok) throw new Error('Error al obtener lugares');
    return await response.json(); // Array directo
  }
};