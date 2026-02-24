import React from 'react';
import HeroButton from './HeroButton';

/**
 * Componente Hero - Solo layout visual de presentación
 * Imagen de fondo sin contenido
 */
interface HeroProps {
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
  return (
    <section
      className="w-full h-full relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-slate-900/50" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 gap-6 w-full max-w-4xl">
        {/* Título principal */}
        <h1
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 700,
          }}
        >
          Organiza y únete a partidos deportivos
        </h1>

        {/* Subtítulo */}
        <p
          className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed"
          style={{
            fontFamily: 'Roboto',
            fontWeight: 700,
          }}
        >
          Encuentra jugadores, crea partidos y disfruta del deporte que amas
        </p>

        {/* Botón */}
        <HeroButton>
          Crear Partido
        </HeroButton>
      </div>
    </section>
  );
};

export default Hero;
