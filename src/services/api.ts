export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  'https://backcourtmatchproduction-production.up.railway.app/api'
).replace(/\/$/, '');

type ApiErrorShape = {
  error?: string;
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
};

const clearAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const notifyUnauthorized = () => {
  window.dispatchEvent(new Event('auth:unauthorized'));
};

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export const apiFetchJson = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const { auth = false, headers, ...rest } = options;

  const token = localStorage.getItem('token');
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has('Content-Type') && rest.body) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (auth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
  });

  if (response.status === 401) {
    clearAuthStorage();
    notifyUnauthorized();
    throw new Error('SESION_EXPIRADA');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({} as ApiErrorShape));
    const validationMessage = errorData.errors?.find((e: { field?: string; message?: string }) => e.message)?.message;
    throw new Error(validationMessage || errorData.error || errorData.message || 'Error en el servidor');
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};
