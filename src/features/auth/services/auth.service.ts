const API_URL = 'http://localhost:3000/api/auth';

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    // Si el token expiró, borramos todo rastro físico inmediatamente
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Lanzamos error para que los Hooks (como useMatches) detengan su lógica
    throw new Error('SESION_EXPIRADA');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error en el servidor');
  }
  return response.json();
};

export const authService = {
  login: async (nombreUsuario: string, contrasena: string) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreUsuario, contrasena }),
    });
    return handleResponse(response);
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_URL}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
};