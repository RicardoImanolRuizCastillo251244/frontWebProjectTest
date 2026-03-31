import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getMatchParticipants, type MatchTeam } from '../services/matches.service';
import { Match, MatchParticipant } from '../types/match.types';

interface MatchModalProps {
  isOpen: boolean;
  match: Match | null;
  onClose: () => void;
  onConfirmJoin: (matchId: number, equipo?: MatchTeam) => Promise<'joined' | 'left' | 'cancelled'>;
  isJoined: boolean;
  isCreator?: boolean;
}

const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  match,
  onClose,
  onConfirmJoin,
  isJoined,
  isCreator = false,
}) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<MatchParticipant[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<MatchTeam | ''>('');
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [participantsError, setParticipantsError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadParticipants = async (matchId: number) => {
    setLoadingParticipants(true);
    setParticipantsError(null);

    try {
      const data = await getMatchParticipants(matchId);
      setParticipants(data);
      return data;
    } catch (error: any) {
      setParticipants([]);
      setParticipantsError(error?.message || 'No se pudieron cargar los integrantes del partido.');
      return [];
    } finally {
      setLoadingParticipants(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !match) {
      setParticipants([]);
      setSelectedTeam('');
      setParticipantsError(null);
      setActionLoading(false);
      return;
    }

    let isMounted = true;

    const loadParticipantsForModal = async () => {
      try {
        setLoadingParticipants(true);
        setParticipantsError(null);
        const data = await getMatchParticipants(match.idMatch);
        if (!isMounted) {
          return;
        }
        setParticipants(data);
      } catch (error: any) {
        if (!isMounted) {
          return;
        }
        setParticipants([]);
        setParticipantsError(error?.message || 'No se pudieron cargar los integrantes del partido.');
      } finally {
        if (isMounted) {
          setLoadingParticipants(false);
        }
      }
    };

    loadParticipantsForModal();

    return () => {
      isMounted = false;
    };
  }, [isOpen, match]);

  const teamAPlayers = useMemo(
    () => participants.filter((participant) => participant.nombreEquipo === 'A'),
    [participants]
  );

  const teamBPlayers = useMemo(
    () => participants.filter((participant) => participant.nombreEquipo === 'B'),
    [participants]
  );

  const teamCapacity = useMemo(() => Math.ceil((match?.maxJugadores ?? 0) / 2), [match?.maxJugadores]);
  const totalPlayers = participants.length || match?.numJugadores || 0;

  useEffect(() => {
    if (isJoined || !selectedTeam) {
      return;
    }

    const selectedCount = selectedTeam === 'A' ? teamAPlayers.length : teamBPlayers.length;
    if (selectedCount >= teamCapacity) {
      setSelectedTeam('');
    }
  }, [isJoined, selectedTeam, teamAPlayers.length, teamBPlayers.length, teamCapacity]);

  const handlePrimaryAction = async () => {
    if (!match || actionLoading) {
      return;
    }

    setActionLoading(true);

    try {
      const result = await onConfirmJoin(match.idMatch, selectedTeam || undefined);
      if (result === 'joined') {
        await loadParticipants(match.idMatch);
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen || !match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all">
      <div className="bg-[#0C2143] border border-white/10 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 max-h-[90vh]">
        
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
        <div className="p-6 overflow-y-auto">
          <h4 className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">
            Descripción del encuentro
          </h4>
          <p className="text-white/80 font-roboto text-sm leading-relaxed mb-6">
            {match.descripcion || "Sin descripción disponible para este partido."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 items-start">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest block mb-1">Cupos</span>
                <span className="text-white font-roboto font-bold text-2xl">
                  <span className="text-[#71AB46]">{totalPlayers}</span>
                  <span className="text-white/20 mx-1">/</span>
                  {match.maxJugadores}
                </span>
                <p className="text-xs text-white/40 mt-2">{Math.max(match.maxJugadores - totalPlayers, 0)} cupos disponibles en total</p>
              </div>

              {!isJoined && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-3">
                    Elegir equipo
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {(['A', 'B'] as MatchTeam[]).map((team) => {
                      const teamCount = team === 'A' ? teamAPlayers.length : teamBPlayers.length;
                      const isSelected = selectedTeam === team;
                      const isTeamFull = teamCount >= teamCapacity;

                      return (
                        <button
                          key={team}
                          type="button"
                          onClick={() => setSelectedTeam(team)}
                          disabled={isTeamFull}
                          className={`rounded-xl border px-4 py-4 text-left transition-all ${
                            isSelected
                              ? 'border-[#71AB46] bg-[#71AB46]/15 text-white shadow-lg shadow-[#71AB46]/10'
                              : isTeamFull
                                ? 'border-red-500/20 bg-red-500/10 text-white/40 cursor-not-allowed'
                                : 'border-white/10 bg-black/20 text-white/80 hover:border-white/30'
                          }`}
                        >
                          <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Equipo</span>
                          <span className="block text-2xl font-black">{team}</span>
                          <span className="block text-xs text-white/50 mt-2">{teamCount}/{teamCapacity} jugadores</span>
                          <span className={`block text-[10px] uppercase tracking-widest mt-2 ${isTeamFull ? 'text-red-300' : 'text-[#A8D68A]'}`}>
                            {isTeamFull ? 'Equipo lleno' : `${teamCapacity - teamCount} cupo${teamCapacity - teamCount === 1 ? '' : 's'} libre${teamCapacity - teamCount === 1 ? '' : 's'}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                  Integrantes por equipo
                </h4>
                {loadingParticipants && (
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Cargando...</span>
                )}
              </div>

              {participantsError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {participantsError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { team: 'A' as MatchTeam, players: teamAPlayers },
                  { team: 'B' as MatchTeam, players: teamBPlayers },
                ].map(({ team, players }) => (
                  <div key={team} className="rounded-xl border border-white/10 bg-black/20 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Equipo</p>
                        <p className="text-white text-lg font-black mt-1">{team}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Jugadores</p>
                        <p className="text-[#71AB46] text-lg font-black mt-1">{players.length}/{teamCapacity}</p>
                      </div>
                    </div>

                    <div className="px-4 py-3 space-y-3 min-h-28">
                      {players.length === 0 ? (
                        <p className="text-sm text-white/35">Aun no hay jugadores en este equipo.</p>
                      ) : (
                        players.map((participant) => (
                          <div key={participant.idParticipacion} className="flex items-center justify-between gap-4 rounded-lg px-2 py-1.5 bg-white/[0.02]">
                            <div>
                              <p className="text-sm text-white font-medium">{participant.usuario.nombreUsuario || `Jugador ${participant.usuario.idUser}`}</p>
                              <p className="text-[11px] text-white/40">
                                {participant.usuario.idUser === user?.idUser ? 'Tú' : participant.usuario.correo || 'Sin correo disponible'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {participant.usuario.idUser === user?.idUser && (
                                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-sky-200">
                                  Tú
                                </span>
                              )}
                              {participant.esCreador && (
                                <span className="rounded-full border border-[#71AB46]/40 bg-[#71AB46]/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#A8D68A]">
                                  Creador
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 bg-black/20">
          {isJoined ? (
            <button 
              onClick={handlePrimaryAction}
              disabled={actionLoading}
              className="w-full bg-transparent border border-red-500/50 text-red-500 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-red-500 hover:text-white transition-all shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading ? 'Procesando...' : isCreator ? 'Cancelar partido' : 'Cancelar mi asistencia'}
            </button>
          ) : (
            <button 
              onClick={handlePrimaryAction}
              disabled={!selectedTeam || actionLoading}
              className="w-full bg-[#71AB46] text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-[#71AB46]/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? 'Procesando...'
                : selectedTeam
                  ? `Confirmar Asistencia en Equipo ${selectedTeam}`
                  : 'Selecciona un equipo para continuar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchModal;