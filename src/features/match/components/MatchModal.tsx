import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getMatchParticipants, type MatchTeam } from '../services/matches.service';
import { Match, MatchParticipant } from '../types/match.types';

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
  const statusMeta = getStatusMeta(match?.estado);

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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-10 bg-slate-950/80 backdrop-blur-sm transition-all overflow-y-auto">
      <div className="bg-[#0C2143] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 max-h-[70vh] my-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-start p-6 border-b border-white/5 bg-[#0C2143]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#71AB46] text-[10px] font-black uppercase tracking-[0.2em]">
                {match.deporte}
              </span>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${statusMeta.className}`}>
                {statusMeta.label}
              </span>
            </div>
            <h2 className="text-white font-roboto font-bold text-xl uppercase tracking-tight mt-1">
              {match.lugar}
            </h2>
            <div className="text-white/50 text-[10px] font-bold mt-2 uppercase flex gap-3 italic">
              <span>📅 {match.fecha}</span>
              <span>⏰ {match.hora}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Cerrar modal"
            className="ml-4 shrink-0 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-white/80 hover:text-white hover:border-white/30 transition-colors text-sm leading-none"
          >
            X
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6 overflow-y-auto">
          {!isJoined && (
            <div className="mb-6 rounded-2xl border border-[#71AB46]/25 bg-[#71AB46]/10 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A8D68A] font-black mb-2">
                Flujo de Inscripcion
              </p>
              <h3 className="text-white text-lg font-black mb-2">Selecciona tu equipo antes de unirte</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Revisa cuántos jugadores hay en cada equipo, elige si quieres entrar al equipo A o al B y luego confirma tu asistencia.
              </p>
            </div>
          )}

          {match.motivoCancelacion && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-red-200 font-black mb-2">
                Motivo de cancelacion
              </p>
              <p className="text-sm text-red-100/90 leading-relaxed">{match.motivoCancelacion}</p>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                  {isJoined ? 'Integrantes por equipo' : 'Elige tu equipo'}
                </h4>
                <p className="text-sm text-white/60 mt-1">
                  {isJoined
                    ? 'Aqui puedes ver quién está en el equipo A y en el equipo B.'
                    : 'Selecciona A o B en estas mismas tarjetas y revisa quiénes ya están inscritos.'}
                </p>
              </div>
              {loadingParticipants && (
                <span className="text-[10px] uppercase tracking-widest text-white/40">Cargando...</span>
              )}
            </div>

            {participantsError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {participantsError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { team: 'A' as MatchTeam, players: teamAPlayers },
                { team: 'B' as MatchTeam, players: teamBPlayers },
              ].map(({ team, players }) => {
                const isSelectedTeam = selectedTeam === team;
                const isTeamFull = players.length >= teamCapacity;
                const cardBaseClass = `rounded-xl border bg-black/20 overflow-hidden text-left transition-all ${
                  !isJoined && isSelectedTeam
                    ? 'border-[#71AB46] shadow-lg shadow-[#71AB46]/10'
                    : !isJoined && isTeamFull
                      ? 'border-red-500/20 opacity-70 cursor-not-allowed'
                      : 'border-white/10'
                } ${!isJoined && !isTeamFull ? 'hover:border-white/30' : ''}`;

                const cardContent = (
                  <>
                    {isSelectedTeam && !isJoined && <div className="h-1.5 w-full bg-[#71AB46]" />}
                    <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-white/5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Equipo</p>
                        <p className="text-white text-lg font-black mt-1">{team}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {isSelectedTeam && !isJoined && (
                          <span className="inline-flex items-center justify-center rounded-full border border-[#71AB46]/40 bg-[#71AB46]/15 w-6 h-6 text-[12px] font-black text-[#A8D68A] mb-2">
                            <span>✓</span>
                          </span>
                        )}
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Jugadores</p>
                        <p className="text-[#71AB46] text-lg font-black mt-1">{players.length}/{teamCapacity}</p>
                      </div>
                    </div>

                    {!isJoined && (
                      <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-1">Seleccion</p>
                        <p className={`text-xs font-semibold leading-relaxed ${isSelectedTeam ? 'text-[#A8D68A]' : isTeamFull ? 'text-red-300' : 'text-white/75'}`}>
                          {isTeamFull
                            ? 'Equipo lleno'
                            : isSelectedTeam
                              ? 'Equipo seleccionado'
                              : 'Haz clic aqui para unirte a este equipo'}
                        </p>
                      </div>
                    )}

                    <div className="px-4 py-3 space-y-3 min-h-28">
                      {players.length === 0 ? (
                        <p className="text-sm text-white/35">Aun no hay jugadores en este equipo.</p>
                      ) : (
                        players.map((participant) => (
                          <div key={participant.idParticipacion} className="flex items-center justify-between gap-4 rounded-lg px-2 py-1.5 bg-white/[0.02]">
                            <div>
                              <p className="text-sm text-white font-medium">{participant.usuario.nombreUsuario || `Jugador ${participant.usuario.idUser}`}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {participant.usuario.idUser === user?.idUser && (
                                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-sky-200">
                                  Tu
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
                  </>
                );

                if (!isJoined) {
                  return (
                    <button
                      key={team}
                      type="button"
                      onClick={() => !isTeamFull && setSelectedTeam(team)}
                      disabled={isTeamFull}
                      className={cardBaseClass}
                    >
                      {cardContent}
                    </button>
                  );
                }

                return (
                  <div key={team} className={cardBaseClass}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6 p-4 bg-white/5 rounded-xl">
            <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest block mb-1">Cupos</span>
            <span className="text-white font-roboto font-bold text-2xl">
              <span className="text-[#71AB46]">{totalPlayers}</span>
              <span className="text-white/20 mx-1">/</span>
              {match.maxJugadores}
            </span>
            <p className="text-xs text-white/40 mt-2">{Math.max(match.maxJugadores - totalPlayers, 0)} cupos disponibles en total</p>
          </div>

          <div className="mt-6">
            <h4 className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">
              Descripción del encuentro
            </h4>
            <p className="text-white/80 font-roboto text-sm leading-relaxed">
              {match.descripcion || "Sin descripción disponible para este partido."}
            </p>
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