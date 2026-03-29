import React from 'react';
// 1. Apuntamos al nuevo archivo de tipos que creamos en la limpieza
import { Match } from '../types/match.types'; 

interface MatchCardProps {
  match: Match;
  actionText: string;
  // Cambiamos el tipo a number porque idMatch en Sequelize es INTEGER
  onActionClick?: (matchId: number) => void; 
}

const MatchCard: React.FC<MatchCardProps> = ({ match, actionText, onActionClick }) => {
  return (
    <div className="bg-[#0C2143] border-2 border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-xl hover:border-white/10 transition-all group">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[#71AB46] text-[10px] font-black uppercase tracking-[0.2em]">
          {match.deporte}
        </span>
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