import React from 'react';
// 1. Apuntamos al nuevo archivo de tipos que creamos en la limpieza
import { Match } from '../types/match.types'; 

const getStatusMeta = (status?: string) => {
  switch (status) {
    case 'en_curso':
      return {
        label: 'En curso',
        className: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
      };
    case 'finalizado':
      return {
        label: 'Finalizado',
        className: 'border-slate-400/30 bg-slate-400/10 text-slate-200',
      };
    case 'cancelado':
      return {
        label: 'Cancelado',
        className: 'border-red-400/30 bg-red-400/10 text-red-200',
      };
    case 'programado':
    default:
      return {
        label: 'Programado',
        className: 'border-[#71AB46]/30 bg-[#71AB46]/10 text-[#C7E7B2]',
      };
  }
};

interface MatchCardProps {
  match: Match;
  actionText: string;
  // Cambiamos el tipo a number porque idMatch en Sequelize es INTEGER
  onActionClick?: (matchId: number) => void; 
}

const MatchCard: React.FC<MatchCardProps> = ({ match, actionText, onActionClick }) => {
  const statusMeta = getStatusMeta(match.estado);

  return (
    <div className="bg-[#0C2143] border-2 border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-xl hover:border-white/10 transition-all group">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="text-[#71AB46] text-[10px] font-black uppercase tracking-[0.2em]">
            {match.deporte}
          </span>
          <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${statusMeta.className}`}>
            {statusMeta.label}
          </span>
        </div>
        <div className="flex flex-col items-end text-white font-bold text-xs uppercase">
          <span>{match.fecha}</span>
          <span className="text-white/40 text-[10px]">{match.hora}</span>
        </div>
      </div>

      {/* Lugar */}
      <div className="py-2">
        <h3 className="text-white font-roboto font-bold text-xl uppercase tracking-tight group-hover:text-[#71AB46] transition-colors">
          {match.lugar}
        </h3>
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-center border-t border-white/5 pt-5">
        <div className="flex flex-col">
          <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Cupos</span>
          <span className="text-white font-roboto font-bold text-lg">
            <span className="text-[#71AB46]">{match.numJugadores || 0}</span>
            <span className="text-white/10 mx-1.5">/</span>
            {match.maxJugadores}
          </span>
        </div>
        
        <button 
          // 2. CORRECCIÓN: Usamos match.idMatch en lugar de match.id
          onClick={() => onActionClick && onActionClick(match.idMatch)}
          className="bg-white text-[#0F172A] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#71AB46] hover:text-white transition-all active:scale-95 shadow-lg shadow-black/20"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;