import React from 'react';
import { Link } from 'react-router-dom';
import { BipartiteCard } from '@/components/BipartiteCard';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';
import logoCourtUrl from '@/assets/images/logoCourt.png';

export const RegisterPage: React.FC = () => {
  const {
    // Datos de los inputs
    nombre,
    correo,
    contrasena,
    confirmarContrasena,
    idLugar,
    idDeporteFavorito,
    // Setters
    setNombre,
    setCorreo,
    setContrasena,
    setConfirmarContrasena,
    setIdLugar,
    setIdDeporteFavorito,
    // Listas dinámicas del back
    listaDeportes,
    listaLugares,
    // Estado y envío
    loading,
    error,
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
          // Pasamos todo lo que el Form necesita
          nombre={nombre}
          correo={correo}
          contrasena={contrasena}
          confirmarContrasena={confirmarContrasena}
          idLugar={idLugar}
          idDeporteFavorito={idDeporteFavorito}
          listaDeportes={listaDeportes}
          listaLugares={listaLugares}
          setNombre={setNombre}
          setCorreo={setCorreo}
          setContrasena={setContrasena}
          setConfirmarContrasena={setConfirmarContrasena}
          setIdLugar={setIdLugar}
          setIdDeporteFavorito={setIdDeporteFavorito}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
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