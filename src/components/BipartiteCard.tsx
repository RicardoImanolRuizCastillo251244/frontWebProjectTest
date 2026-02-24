import React from 'react';

type BipartiteCardProps = {
  title: string;
  children: React.ReactNode;
  /** Logo a la izquierda del brandText (ej. "Match" + "Court") */
  logoSrc?: string;
  /** Texto de marca junto al logo (fuente Racing Sans One) */
  brandText?: string;
  /** Accesibilidad: aria-label del contenedor */
  ariaLabel?: string;
};

export const BipartiteCard: React.FC<BipartiteCardProps> = ({
  title,
  children,
  logoSrc,
  brandText,
  ariaLabel,
}) => (
  <article
    className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
    role="form"
    aria-label={ariaLabel ?? title}
  >
    <div className="bg-[#0F172A]/85 px-8 py-6 flex flex-col gap-4">
      {(logoSrc || brandText) && (
        /* Cambio: justify-center para centrar y flex-col si quieres el texto debajo, o mantenlo así para centrar ambos */
        <div className="flex items-center justify-center gap-2"> 
          {brandText && (
            <span
              className="text-2xl text-white leading-none"
              style={{ fontFamily: '"Racing Sans One", sans-serif' }}
            >
              {brandText}
            </span>
          )}
          {logoSrc && (
            <img
              src={logoSrc}
              alt=""
              /* Cambio: h-16 -> h-32 para hacerlo más grande */
              className="h-32 w-auto object-contain" 
              aria-hidden
            />
          )}
        </div>
      )}
      <div className="w-full flex flex-col items-center">
        <div className="inline-flex flex-col items-center">
          <h1
            className="text-xl font-semibold text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {title}
          </h1>
          <div className="mt-1 h-0.5 w-full bg-white/40" aria-hidden />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4 bg-[#0F172A]/46 px-8 py-6">{children}</div>
  </article>
);