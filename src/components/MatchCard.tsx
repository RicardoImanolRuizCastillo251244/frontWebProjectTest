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
  const getStatusColor = (status: Match['status']): string => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
      case 'ongoing':
        return 'bg-green-500/20 border-green-500/50 text-green-300';
      case 'finished':
        return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
      default:
        return 'bg-slate-500/20 border-slate-500/50 text-slate-300';
    }
  };

  const getStatusLabel = (status: Match['status']): string => {
    switch (status) {
      case 'scheduled':
        return 'Programado';
      case 'ongoing':
        return 'En vivo';
      case 'finished':
        return 'Finalizado';
      default:
        return status;
    }
  };

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
            {match.sport}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusColor(match.status)}`}>
            {getStatusLabel(match.status)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Teams */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <p className="text-white font-bold text-lg mb-2 truncate">
                {match.homeTeam.name}
              </p>
              {match.homeTeam.color && (
                <div
                  className="w-12 h-12 mx-auto rounded-full border-2 border-slate-600"
                  style={{ backgroundColor: match.homeTeam.color }}
                />
              )}
            </div>

            {/* VS Badge */}
            <div className="px-4 flex flex-col items-center">
              <div className="text-gray-500 font-bold text-sm mb-1">VS</div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-transparent" />
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <p className="text-white font-bold text-lg mb-2 truncate">
                {match.awayTeam.name}
              </p>
              {match.awayTeam.color && (
                <div
                  className="w-12 h-12 mx-auto rounded-full border-2 border-slate-600"
                  style={{ backgroundColor: match.awayTeam.color }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-3 mb-6 pb-6 border-b border-slate-700/30">
          {/* Date and Time */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              {new Date(match.date).toLocaleDateString('es-ES', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              {' '}·{' '}
              {match.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm truncate" title={match.location.name}>
              {match.location.name}
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 10a3 3 0 11-6 0 3 3 0 016 0zM12.9 8.861A3 3 0 1017 8a1 1 0 00-1 1v.07A1 1 0 0015 9zM6 18a3 3 0 11-6 0 3 3 0 016 0zM12.9 16.861A3 3 0 1017 16a1 1 0 00-1 1v.07A1 1 0 0015 17z" />
            </svg>
            <span className="text-sm">
              {match.participants}/{match.maxParticipants} inscritos
            </span>
          </div>
        </div>

        {/* Participation Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Disponibilidad</span>
            <span className="text-xs font-semibold text-green-400">
              {match.maxParticipants - match.participants} lugares
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-400 h-full transition-all duration-300"
              style={{
                width: `${(match.participants / match.maxParticipants) * 100}%`,
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
          {match.status === 'finished' ? 'Ver Resultado' : 'Inscribirse'}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
