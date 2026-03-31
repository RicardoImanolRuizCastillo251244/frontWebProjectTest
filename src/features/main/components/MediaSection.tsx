import React, { useEffect, useState } from 'react';
import MediaStatItem from './MediaStatItem';
import { MediaSectionProps } from '../types/main.types';
import { apiFetchJson } from '@/services/api';

import logoCalendario from '@/assets/images/calendario.png';
import logoIntegrantes from '@/assets/images/integrantes.png';
import logoDeportes from '@/assets/images/deportes.png';

interface JugadoresResponse {
  pagination?: { total: number };
}

interface StatusEstadisticas {
  deportes: number;
  partidos: number;
}

interface StatusResponse {
  estadisticas?: StatusEstadisticas;
}

const MediaSection: React.FC<MediaSectionProps> = ({ className = '' }) => {
  const [jugadoresTotal, setJugadoresTotal] = useState<number | null>(null);
  const [statusStats, setStatusStats] = useState<StatusEstadisticas | null>(null);

  useEffect(() => {
    apiFetchJson<JugadoresResponse>('/jugadores/')
      .then((data) => {
        if (data.pagination?.total !== undefined) {
          setJugadoresTotal(data.pagination.total);
        }
      })
      .catch(() => {});

    apiFetchJson<StatusResponse>('/status')
      .then((data) => {
        if (data.estadisticas) setStatusStats(data.estadisticas);
      })
      .catch(() => {});
  }, []);

  const STATS = [
    {
      id: 'partidos',
      iconSrc: logoCalendario,
      value: statusStats?.partidos ?? null,
      label: 'Partidos registrados',
      altText: 'Logo Partidos registrados',
    },
    {
      id: 'jugadores',
      iconSrc: logoIntegrantes,
      value: jugadoresTotal,
      label: 'Jugadores registrados',
      altText: 'Logo Jugadores registrados',
    },
    {
      id: 'deportes',
      iconSrc: logoDeportes,
      value: statusStats?.deportes ?? null,
      label: 'Deportes disponibles',
      altText: 'Logo Deportes disponibles',
    },
  ];

  return (
    <section className={`w-full h-full flex flex-col justify-center bg-[#0D3472] pt-10 pb-12 md:pt-4 md:pb-20 px-4 md:px-6 transition-all duration-300 ${className}`}>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 justify-items-center">
        {STATS.map((stat) => (
          <MediaStatItem
            key={stat.id}
            id={stat.id}
            iconSrc={stat.iconSrc}
            value={stat.value}
            label={stat.label}
            altText={stat.altText}
          />
        ))}
      </div>
    </section>
  );
};

export default MediaSection;