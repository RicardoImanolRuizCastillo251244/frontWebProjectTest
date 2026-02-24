import { useState } from 'react';
import type { RegisterFormState, RegisterFormHandlers } from '../types/register.types';

export type UseRegisterFormReturn = RegisterFormState & RegisterFormHandlers;

export const useRegisterForm = (): UseRegisterFormReturn => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [deporteFavorito, setDeporteFavorito] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de registro se conectará via caso de uso / repository posteriormente
  };

  return {
    nombre,
    correo,
    contraseña,
    confirmarContraseña,
    ubicacion,
    deporteFavorito,
    setNombre,
    setCorreo,
    setContraseña,
    setConfirmarContraseña,
    setUbicacion,
    setDeporteFavorito,
    handleSubmit,
  };
};
