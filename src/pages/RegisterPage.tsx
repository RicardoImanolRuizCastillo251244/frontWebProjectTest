import React from 'react';
import { Link } from 'react-router-dom';
import { BipartiteCard } from '@/components/BipartiteCard';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';
import logoCourtUrl from '@/assets/images/logoCourt.png';

export const RegisterPage: React.FC = () => {
  const {
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
  } = useRegisterForm();

  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-4xl">
      <BipartiteCard
        title="Crear cuenta"
        logoSrc={logoCourtUrl}
        ariaLabel="Crear cuenta"
      >
        <RegisterForm
          nombre={nombre}
          correo={correo}
          contraseña={contraseña}
          confirmarContraseña={confirmarContraseña}
          ubicacion={ubicacion}
          deporteFavorito={deporteFavorito}
          setNombre={setNombre}
          setCorreo={setCorreo}
          setContraseña={setContraseña}
          setConfirmarContraseña={setConfirmarContraseña}
          setUbicacion={setUbicacion}
          setDeporteFavorito={setDeporteFavorito}
          handleSubmit={handleSubmit}
        />
      </BipartiteCard>
      <div className="mt-6 w-full max-w-md h-0.5 bg-white/40" aria-hidden />
      <p
        className="mt-3 text-center text-sm text-slate-200"
        style={{ fontFamily: 'ABeeZee, sans-serif' }}
      >
        ¿Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-[#71AB46] underline hover:no-underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};
