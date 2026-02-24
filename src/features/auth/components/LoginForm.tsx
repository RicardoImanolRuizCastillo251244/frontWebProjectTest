import React from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import type { LoginFormState, LoginFormHandlers } from '../types/login.types';

type LoginFormProps = LoginFormState & LoginFormHandlers;

export const LoginForm: React.FC<LoginFormProps> = ({
  usuario,
  password,
  setUsuario,
  setPassword,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <Input
      id="login-usuario"
      type="text"
      value={usuario}
      onChange={setUsuario}
      placeholder="Correo electrónico"
      autoComplete="gmail"
      required
    />
    <Input
      id="login-password"
      type="password"
      value={password}
      onChange={setPassword}
      placeholder="Contraseña"
      autoComplete="current-password"
      required
    />
    <Button type="submit" className="mt-2">
      Iniciar sesión
    </Button>
  </form>
);
