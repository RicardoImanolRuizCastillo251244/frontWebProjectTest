import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { isValidStoredToken } from '../utils/token';

export const useLoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mainpage', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiamos errores previos y activamos el estado de carga
    setError(null);
    setIsLoading(true);

    try {
      // Real API returns { mensaje, token, idUser }
      const data = await authService.login(usuario, password);

      const token =
        data.session?.token ??
        data.data?.token ??
        data.token ??
        data.accessToken ??
        null;

      const idUser =
        data.session?.user?.idUser ??
        data.data?.idUser ??
        data.idUser ??
        data.user?.idUser ??
        data.id ??
        data.user?.id;

      const nombreUsuario =
        data.session?.user?.nombreUsuario ??
        data.data?.nombreUsuario ??
        data.nombreUsuario ??
        data.user?.nombreUsuario ??
        data.session?.user?.correo ??
        data.data?.correo ??
        data.correo ??
        data.user?.correo ??
        usuario;

      if (!isValidStoredToken(token) || typeof idUser !== 'number') {
        throw new Error('No se recibió una sesión válida del servidor');
      }

      login({ idUser, nombreUsuario }, token);

      // Fallback inmediato; la redirección principal ocurre al detectar isAuthenticated.
      navigate('/mainpage', { replace: true });
      
    } catch (err: any) {
      // Manejo de errores (el mensaje viene de nuestro handleResponse en el servicio)
      setError(err.message || 'Error al iniciar sesión');
      console.error('Error en el proceso de Login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    usuario, 
    password, 
    setUsuario, 
    setPassword, 
    handleSubmit, 
    error, 
    isLoading 
  };
};