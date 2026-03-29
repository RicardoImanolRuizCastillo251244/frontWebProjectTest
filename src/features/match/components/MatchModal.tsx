import React from 'react';
// 1. Apuntamos a la nueva ubicación de tipos
import { Match } from '../types/match.types';

interface MatchModalProps {
  isOpen: boolean;
  match: Match | null;
  onClose: () => void;
  // 2. Cambiamos a number para que coincida con idMatch (Sequelize)
  onConfirmJoin: (matchId: number) => void; 
  isJoined: boolean;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, match, onClose, onConfirmJoin, isJoined }) => {
  // Guard clause para evitar errores si no hay match seleccionado
  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all">
      <div className="bg-[#0C2143] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-white/5">
          <div>
            <span className="text-[#71AB46] text-[10px] font-black uppercase tracking-[0.2em]">
              {match.deporte}
            </span>
            <h2 className="text-white font-roboto font-bold text-xl uppercase tracking-tight mt-1">
              {match.lugar}
            </h2>
            <div className="text-white/50 text-[10px] font-bold mt-2 uppercase flex gap-3 italic">
              <span>📅 {match.fecha}</span>
              <span>⏰ {match.hora}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-lg">✕</button>
        </div>

        {/* Cuerpo */}
        <div className="p-6">
          <h4 className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">
            Descripción del encuentro
          </h4>
          <p className="text-white/80 font-roboto text-sm leading-relaxed mb-6">
            {match.descripcion || "Sin descripción disponible para este partido."}
          </p>

          {/* Cupos */}
          <div className="p-3 bg-white/5 rounded-lg inline-block">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest block mb-1">Cupos</span>
            <span className="text-white font-roboto font-bold text-base">
              {/* Usamos numJugadores y maxJugadores de tus nuevos tipos */}
              <span className="text-[#71AB46]">{match.numJugadores || 0}</span>
              <span className="text-white/20 mx-1">/</span>
              {match.maxJugadores}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 bg-black/20">
          {isJoined ? (
            <button 
              // 3. CORRECCIÓN: Usamos match.idMatch y quitamos el .toString()
              onClick={() => onConfirmJoin(match.idMatch)}
              className="w-full bg-transparent border border-red-500/50 text-red-500 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              Cancelar mi asistencia
            </button>
          ) : (
            <button 
              // 3. CORRECCIÓN: Usamos match.idMatch
              onClick={() => onConfirmJoin(match.idMatch)}
              className="w-full bg-[#71AB46] text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#71AB46]/20"
            >
              Confirmar Asistencia
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchModal;