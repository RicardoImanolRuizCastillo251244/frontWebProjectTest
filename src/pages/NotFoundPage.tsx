import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import logoCourtUrl from '@/assets/images/logoCourt.png';

export const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-slate-900/80 p-8 sm:p-10 shadow-2xl text-center">
        <img
          src={logoCourtUrl}
          alt="CourtMatch"
          className="mx-auto h-20 w-auto sm:h-24"
        />

        <p
          className="mt-6 text-xs font-semibold tracking-[0.35em] text-[#71AB46]"
          style={{ fontFamily: 'ABeeZee, sans-serif' }}
        >
          ERROR 404
        </p>

        <h1
          className="mt-3 text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: 'ABeeZee, sans-serif' }}
        >
          Pagina no encontrada
        </h1>

        <p
          className="mt-4 text-slate-300"
          style={{ fontFamily: 'ABeeZee, sans-serif' }}
        >
          La ruta que intentaste abrir no existe o fue movida.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={isAuthenticated ? '/mainpage' : '/auth/login'}
            className="inline-flex items-center justify-center rounded-lg bg-[#71AB46] px-5 py-2.5 text-slate-950 font-semibold transition hover:brightness-110"
            style={{ fontFamily: 'ABeeZee, sans-serif' }}
          >
            {isAuthenticated ? 'Ir al inicio' : 'Ir a iniciar sesion'}
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-white font-semibold transition hover:bg-white/10"
            style={{ fontFamily: 'ABeeZee, sans-serif' }}
          >
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
};