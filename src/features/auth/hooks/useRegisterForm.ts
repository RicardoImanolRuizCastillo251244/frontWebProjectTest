import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { catalogosService } from '../../../services/catalogos.service';
import type { Deporte, Lugar } from '../types/register.types';

export const useRegisterForm = () => {
  const navigate = useNavigate();

  // Listas del Backend
  const [listaDeportes, setListaDeportes] = useState<Deporte[]>([]);
  const [listaLugares, setListaLugares] = useState<Lugar[]>([]);

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [idLugar, setIdLugar] = useState('');
  const [idDeporteFavorito, setIdDeporteFavorito] = useState('');

  // Control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const data = await catalogosService.getRegistroData();
        setListaDeportes(data.deportes);
        setListaLugares(data.lugares);
        
        if (data.deportes.length > 0) setIdDeporteFavorito(data.deportes[0].idDeporte.toString());
        if (data.lugares.length > 0) setIdLugar(data.lugares[0].idLugar.toString());
      } catch (err) {
        setError('No se pudieron cargar los datos del servidor');
      }
    };
    cargarCatalogos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      const userData = {
        nombreUsuario: nombre,
        correo: correo,
        contrasena: contrasena,
        idLugar: Number(idLugar),
        idDeporteFavorito: Number(idDeporteFavorito)
      };

      await authService.register(userData);
      navigate('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return {
    nombre, correo, contrasena, confirmarContrasena, idLugar, idDeporteFavorito,
    setNombre, setCorreo, setContrasena, setConfirmarContrasena, setIdLugar, setIdDeporteFavorito,
    listaDeportes, listaLugares,
    loading, error,
    handleSubmit
  };
};