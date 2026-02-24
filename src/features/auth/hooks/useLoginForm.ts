import { useState } from 'react';
import type { LoginFormState, LoginFormHandlers } from '../types/login.types';

export type UseLoginFormReturn = LoginFormState & LoginFormHandlers;

export const useLoginForm = (): UseLoginFormReturn => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login se conectará via caso de uso / repository posteriormente
  };

  return {
    usuario,
    password,
    setUsuario,
    setPassword,
    handleSubmit,
  };
};
