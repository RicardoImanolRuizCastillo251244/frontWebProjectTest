// ARCHIVO: src/features/auth/components/LoginForm.tsx
import React from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm: React.FC = () => {
  const { usuario, password, setUsuario, setPassword, handleSubmit, error, isLoading } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="login-usuario"
        type="text" // Validación nativa de email
        value={usuario}
        onChange={setUsuario}
        placeholder="Correo electrónico"
        required
      />
      <Input
        id="login-password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Contraseña"
        required
      />

      {error && (
        <p className="text-red-500 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
};