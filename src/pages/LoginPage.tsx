import React from 'react';
import { Link } from 'react-router-dom';
import { BipartiteCard } from '@/components/BipartiteCard';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import logoCourtUrl from '@/assets/images/logoCourt.png';

export const LoginPage: React.FC = () => {
  const { usuario, password, setUsuario, setPassword, handleSubmit, error, isLoading } = useLoginForm();

  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-md">
      <BipartiteCard
        title="Iniciar sesión"
        logoSrc={logoCourtUrl}
        ariaLabel="Iniciar sesión"
      >
        <LoginForm
          usuario={usuario}
          password={password}
          setUsuario={setUsuario}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
        />
      </BipartiteCard>
      <div className="mt-6 w-full h-0.5 bg-white/40" aria-hidden />
      <p
        className="mt-3 text-center text-sm text-slate-200"
        style={{ fontFamily: 'ABeeZee, sans-serif' }}
      >
        ¿No tienes cuenta?{' '}
        <Link to="/auth/registro" className="text-[#71AB46] underline hover:no-underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
};
