import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';

export const useLoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiamos errores previos y activamos el estado de carga
    setError(null);
    setIsLoading(true);

    try {
      // Real API returns { mensaje, token, idUser }
      const data = await authService.login(usuario, password);
      
      // Construct AuthUser from login response + form input (API doesn't return nombreUsuario on login)
      login({ idUser: data.idUser, nombreUsuario: usuario }, data.token);
      
      // 3. Redirección Controlada
      // Siempre llevamos al usuario a la página principal
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