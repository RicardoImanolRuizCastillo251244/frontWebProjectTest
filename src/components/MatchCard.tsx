import React from 'react';
import { Match } from '../types/match.types';

/**
 * Componente MatchCard - Tarjeta individual de partido
 * Componente reutilizable para mostrar información de un partido
 */
interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  className?: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick, className = '' }) => {
  const openSlots = Math.max(0, match.maxJugadores - (match.numJugadores || 0));
  const occupancy = match.maxJugadores > 0
    ? Math.min(100, ((match.numJugadores || 0) / match.maxJugadores) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className={`
        bg-slate-800/50 backdrop-blur-sm
        border border-slate-700/50 rounded-xl
        overflow-hidden hover:border-green-500/50
        hover:bg-slate-800/70 hover:shadow-xl
        transition-all duration-300 cursor-pointer
        group ${className}
      `}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-700/30">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-300">
            {match.deporte || 'Partido'}
          </span>
          <span className="text-xs px-3 py-1 rounded-full border font-medium bg-slate-500/20 border-slate-500/50 text-slate-300">
            {match.isJoined ? 'Inscrito' : 'Disponible'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Match Details */}
        <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/30">
          {/* Date and Time */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              {new Date(match.fecha).toLocaleDateString('es-ES', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              {' '}·{' '}
              {match.hora}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm truncate" title={match.lugar}>
              {match.lugar}
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0zM12.9 8.861A3 3 0 1017 8a1 1 0 00-1 1v.07A1 1 0 0015 9zM6 18a3 3 0 11-6 0 3 3 0 016 0zM12.9 16.861A3 3 0 1017 16a1 1 0 00-1 1v.07A1 1 0 0015 17z" />
            </svg>
            <span className="text-sm">
              {match.numJugadores || 0}/{match.maxJugadores} inscritos
            </span>
          </div>
        </div>

        {/* Participation Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Disponibilidad</span>
            <span className="text-xs font-semibold text-green-400">
              {openSlots} lugares
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-300"
              style={{
                width: `${occupancy}%`,
              }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="
            w-full bg-green-500 hover:bg-green-600
            text-white font-bold py-2 px-4 rounded-lg
            transition-all duration-300
            group-hover:shadow-lg group-hover:shadow-green-500/30
          "
        >
          {match.isJoined ? 'Ver Partido' : 'Inscribirse'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
