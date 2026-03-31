import React, { useEffect, useState } from 'react';
import MediaStatItem from './MediaStatItem';
import { MediaSectionProps } from '../types/main.types';
import { apiFetchJson } from '@/services/api';

import logoCalendario from '@/assets/images/calendario.png';
import logoIntegrantes from '@/assets/images/integrantes.png';
import logoDeportes from '@/assets/images/deportes.png';

interface JugadoresResponse {
  pagination?: { total: number };
  data?: Array<unknown>;
}

interface ConteoResponse {
  pagination?: { total: number };
  data?: Array<unknown>;
}

const MediaSection: React.FC<MediaSectionProps> = ({ className = '' }) => {
  const [jugadoresTotal, setJugadoresTotal] = useState<number | null>(null);
  const [deportesTotal, setDeportesTotal] = useState<number | null>(null);
  const [partidosTotal, setPartidosTotal] = useState<number | null>(null);

  useEffect(() => {
    apiFetchJson<JugadoresResponse>('/jugadores/')
      .then((data) => {
        if (typeof data.pagination?.total === 'number') {
          setJugadoresTotal(data.pagination.total);
          return;
        }

        if (Array.isArray(data.data)) {
          setJugadoresTotal(data.data.length);
        }
      })
      .catch(() => {});

    apiFetchJson<ConteoResponse>('/deportes/')
      .then((data) => {
        if (typeof data.pagination?.total === 'number') {
          setDeportesTotal(data.pagination.total);
          return;
        }

        if (Array.isArray(data.data)) {
          setDeportesTotal(data.data.length);
        }
      })
      .catch(() => {});

    apiFetchJson<ConteoResponse>('/partidos/')
      .then((data) => {
        if (typeof data.pagination?.total === 'number') {
          setPartidosTotal(data.pagination.total);
          return;
        }

        if (Array.isArray(data.data)) {
          setPartidosTotal(data.data.length);
        }
      })
      .catch(() => {});
  }, []);

  const STATS = [
    {
      id: 'partidos',
      iconSrc: logoCalendario,
      label: partidosTotal !== null ? `${partidosTotal} Partidos registrados` : 'Partidos registrados',
      altText: 'Logo Partidos registrados',
    },
    {
      id: 'jugadores',
      iconSrc: logoIntegrantes,
      label: jugadoresTotal !== null ? `${jugadoresTotal} Jugadores registrados` : 'Jugadores registrados',
      altText: 'Logo Jugadores registrados',
    },
    {
      id: 'deportes',
      iconSrc: logoDeportes,
      label: deportesTotal !== null ? `${deportesTotal} Deportes disponibles` : 'Deportes disponibles',
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
            label={stat.label}
            altText={stat.altText}
          />
        ))}
      </div>
    </section>
  );
};

export default MediaSection;