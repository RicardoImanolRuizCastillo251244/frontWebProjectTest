import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { catalogosService } from '@/services/catalogos.service';
import type { Match, MatchesState } from '../types/match.types';
import { cancelMatch, getMatchParticipations, getMatches, getPlayerMatches, getCreatedMatches, joinMatch, leaveMatch, type MatchTeam } from '../services/matches.service';
import { connectSocket, onEvento } from '@/services/socket';

export interface UseMatchesResult {
  matchesData: MatchesState | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  handleToggleParticipation: (matchId: number, isJoined: boolean, equipo?: MatchTeam) => Promise<void>;
}

function buildMatchesState(
  allMatches: Match[],
  playerMatches: Match[],
  createdMatches: Match[],
  deportes: { idDeporte: number; nombreDeporte: string }[],
  lugares: { idLugar: number; nombre: string }[],
  currentUserId: number
): MatchesState {
  const deporteMap = new Map(deportes.map(d => [d.idDeporte, d.nombreDeporte]));
  const lugarMap = new Map(lugares.map(l => [l.idLugar, l.nombre]));
  const normalizeMatch = (match: Match): Match => ({
    ...match,
    idlugar: match.idlugar ?? match.idLugar,
    idCreador: match.idCreador ?? match.creador?.idUser,
    lugar: match.lugar ?? lugarMap.get(match.idlugar ?? match.idLugar ?? -1) ?? 'Lugar desconocido',
    deporte: deporteMap.get(match.idDeporte) ?? `Deporte ${match.idDeporte}`,
    numJugadores: match.numJugadores ?? match.participantesActuales ?? 0,
  });

  const normalizedPlayerMatches = playerMatches.map(normalizeMatch);
  const normalizedCreatedMatches = createdMatches.map(normalizeMatch);
  const playerMatchIds = new Set(normalizedPlayerMatches.map(match => match.idMatch));
  const createdMatchIds = new Set(normalizedCreatedMatches.map(match => match.idMatch));

  const enriched = allMatches.map(match => {
    const normalizedMatch = normalizeMatch(match);
    const isCreatedByUser = createdMatchIds.has(normalizedMatch.idMatch) || normalizedMatch.idCreador === currentUserId;

    return {
      ...normalizedMatch,
      isJoined: playerMatchIds.has(normalizedMatch.idMatch) || isCreatedByUser,
    };
  });

  const myMatchesMap = new Map<number, Match>();

  // Start from created matches and player matches so both appear in `mis_partidos`
  normalizedCreatedMatches.forEach(match => {
    myMatchesMap.set(match.idMatch, {
      ...match,
      isJoined: true,
    });
  });

  normalizedPlayerMatches.forEach(match => {
    myMatchesMap.set(match.idMatch, {
      ...match,
      isJoined: true,
    });
  });

  enriched.forEach(match => {
    if (match.isJoined) {
      myMatchesMap.set(match.idMatch, match);
    }
  });

  const finalizados = enriched.filter(match => match.estado === 'finalizado' && (playerMatchIds.has(match.idMatch) || createdMatchIds.has(match.idMatch)));
  const disponibles = enriched.filter(match => !playerMatchIds.has(match.idMatch) && !createdMatchIds.has(match.idMatch) && match.estado === 'programado');
  const mis_partidos = Array.from(myMatchesMap.values()).filter(m => m.estado !== 'finalizado');

  return {
    disponibles,
    mis_partidos,
    finalizados,
  };
}

export const useMatches = (): UseMatchesResult => {
  const { user } = useAuth();
  const [matchesData, setMatchesData] = useState<MatchesState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const [allMatchesResult, playerMatchesResult, createdMatchesResult, deportesResult, lugaresResult] = await Promise.allSettled([
        getMatches(),
        getPlayerMatches(user.idUser),
        getCreatedMatches(user.idUser),
        catalogosService.getDeportes(),
        catalogosService.getLugares(),
      ]);

      if (allMatchesResult.status === 'rejected') {
        throw allMatchesResult.reason;
      }

      if (deportesResult.status === 'rejected') {
        throw deportesResult.reason;
      }

      if (lugaresResult.status === 'rejected') {
        throw lugaresResult.reason;
      }

      const allMatches = allMatchesResult.value;
      const deportes = deportesResult.value;
      const lugares = lugaresResult.value;
      let playerMatches = playerMatchesResult.status === 'fulfilled' ? playerMatchesResult.value : [];
      let createdMatches = createdMatchesResult.status === 'fulfilled' ? createdMatchesResult.value : [];

      if (playerMatchesResult.status === 'rejected') {
        const reasonMessage = playerMatchesResult.reason?.message || '';
        if (reasonMessage === 'SESION_EXPIRADA') {
          throw playerMatchesResult.reason;
        }

        // Fallback: infer joined matches from per-match participations when the user endpoint fails.
        const participationChecks = await Promise.allSettled(
          allMatches.map((match) => getMatchParticipations(match.idMatch))
        );

        const joinedIds = new Set<number>();
        participationChecks.forEach((result) => {
          if (result.status !== 'fulfilled') {
            return;
          }

          const isUserInMatch = result.value.participaciones.some(
            (participacion) => participacion.idUser === user.idUser
          );

          if (isUserInMatch) {
            joinedIds.add(result.value.idMatch);
          }
        });

        if (joinedIds.size > 0) {
          playerMatches = allMatches.filter((match) => joinedIds.has(match.idMatch));
        }

        setError('No se pudo cargar la lista de partidos donde participas. Puedes ver los partidos disponibles.');
      }

      // If fetching created matches failed (non-fatal), fallback to inferring from allMatches
      if (createdMatchesResult.status === 'rejected') {
        const reasonMessage = createdMatchesResult.reason?.message || '';
        if (reasonMessage === 'SESION_EXPIRADA') {
          throw createdMatchesResult.reason;
        }

        createdMatches = allMatches.filter((m) => (m.idCreador ?? m.creador?.idUser) === user.idUser);
      }

      setMatchesData(buildMatchesState(allMatches, playerMatches, createdMatches, deportes, lugares, user.idUser));
    } catch (err: any) {
      if (err.message === 'SESION_EXPIRADA') return;
      setError(err.message || 'Error al cargar los partidos');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  // Socket listeners para actualizaciones en tiempo real
  useEffect(() => {
    if (!user) return;

    const socket = connectSocket();

    const offPartidos = onEvento('partidosEstadoActualizado', async () => {
      await loadMatches();
    });

    const offNueva = onEvento('nuevaReta', async () => {
      await loadMatches();
    });

    const offCancel = onEvento('partidoCancelado', async () => {
      await loadMatches();
    });

    const onPartidoCreado = async (e: any) => {
      await loadMatches();
    };

    const onPartidoCanceladoWindow = async (e: any) => {
      await loadMatches();
    };

    window.addEventListener('partidoCreado', onPartidoCreado as EventListener);
    window.addEventListener('partidoCancelado', onPartidoCanceladoWindow as EventListener);

    return () => {
      offPartidos();
      offNueva();
      offCancel();
      // not disconnecting global socket here to allow other components reuse
      try {
        socket && socket.off && socket.off('partidosEstadoActualizado');
      } catch (e) {}
      window.removeEventListener('partidoCreado', onPartidoCreado as EventListener);
      window.removeEventListener('partidoCancelado', onPartidoCanceladoWindow as EventListener);
    };
  }, [user, loadMatches]);

  const handleToggleParticipation = async (matchId: number, isJoined: boolean, equipo?: MatchTeam) => {
    if (!matchesData || !user) return;

    const sourceKey = isJoined ? 'mis_partidos' : 'disponibles';
    const targetKey = isJoined ? 'disponibles' : 'mis_partidos';

    const matchToMove = matchesData[sourceKey].find(m => m.idMatch === matchId);
    if (!matchToMove) return;

    const previousData = { ...matchesData };
    const updatedMatch: Match = { ...matchToMove, isJoined: !isJoined };
    const isCreator = matchToMove.idCreador === user.idUser;

    // Optimistic update: creator cancellation removes the match from UI, participant leave moves it back to available.
    if (isJoined && isCreator) {
      setMatchesData({
        disponibles: matchesData.disponibles.filter(m => m.idMatch !== matchId),
        mis_partidos: matchesData.mis_partidos.filter(m => m.idMatch !== matchId),
      });
    } else {
      setMatchesData({
        ...matchesData,
        [sourceKey]: matchesData[sourceKey].filter(m => m.idMatch !== matchId),
        [targetKey]: [...matchesData[targetKey], updatedMatch],
      });
    }

    try {
      if (isJoined) {
        if (isCreator) {
          await cancelMatch(matchId);
          try {
            window.dispatchEvent(new CustomEvent('partidoCancelado', { detail: { idMatch: matchId } }));
          } catch (e) {}
        } else {
          await leaveMatch(matchId, user.idUser);
        }
      } else {
        await joinMatch({ idMatch: matchId, equipo: equipo ?? 'A' });
      }
    } catch (err: any) {
      if (err.message === 'SESION_EXPIRADA') throw err;
      setMatchesData(previousData);
      setError(err.message || 'No se pudo completar la acción. Inténtalo de nuevo.');
      throw err;
    }
  };

  return {
    matchesData,
    loading,
    error,
    refetch: loadMatches,
    handleToggleParticipation
  };
};

export default useMatches;