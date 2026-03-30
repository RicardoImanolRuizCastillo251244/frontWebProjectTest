import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { catalogosService } from '@/services/catalogos.service';
import type { Match, MatchesState } from '../types/match.types';
import { getMatches, getPlayerMatches, joinMatch, leaveMatch } from '../services/matches.service';

export interface UseMatchesResult {
  matchesData: MatchesState | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  handleToggleParticipation: (matchId: number, isJoined: boolean) => Promise<void>;
}

function buildMatchesState(
  allMatches: Match[],
  playerMatches: Match[],
  deportes: { idDeporte: number; nombreDeporte: string }[],
  lugares: { idLugar: number; nombre: string }[]
): MatchesState {
  const playerMatchIds = new Set(playerMatches.map(m => m.idMatch));
  const deporteMap = new Map(deportes.map(d => [d.idDeporte, d.nombreDeporte]));
  const lugarMap = new Map(lugares.map(l => [l.idLugar, l.nombre]));

  const enriched = allMatches.map(m => ({
    ...m,
    idlugar: m.idlugar ?? m.idLugar,
    lugar: m.lugar ?? lugarMap.get(m.idlugar ?? m.idLugar ?? -1) ?? 'Lugar desconocido',
    deporte: deporteMap.get(m.idDeporte) ?? `Deporte ${m.idDeporte}`,
    isJoined: playerMatchIds.has(m.idMatch),
  }));

  return {
    disponibles: enriched.filter(m => !m.isJoined),
    mis_partidos: enriched.filter(m => m.isJoined),
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
      const [allMatches, playerMatches, deportes, lugares] = await Promise.all([
        getMatches(),
        getPlayerMatches(user.idUser),
        catalogosService.getDeportes(),
        catalogosService.getLugares(),
      ]);
      setMatchesData(buildMatchesState(allMatches, playerMatches, deportes, lugares));
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

  const handleToggleParticipation = async (matchId: number, isJoined: boolean) => {
    if (!matchesData || !user) return;

    const sourceKey = isJoined ? 'mis_partidos' : 'disponibles';
    const targetKey = isJoined ? 'disponibles' : 'mis_partidos';

    const matchToMove = matchesData[sourceKey].find(m => m.idMatch === matchId);
    if (!matchToMove) return;

    const previousData = { ...matchesData };
    const updatedMatch: Match = { ...matchToMove, isJoined: !isJoined };

    // Optimistic update
    setMatchesData({
      ...matchesData,
      [sourceKey]: matchesData[sourceKey].filter(m => m.idMatch !== matchId),
      [targetKey]: [...matchesData[targetKey], updatedMatch],
    });

    try {
      if (isJoined) {
        await leaveMatch(matchId);
      } else {
        await joinMatch({ idUser: user.idUser, idMatch: matchId });
      }
    } catch (err: any) {
      if (err.message === 'SESION_EXPIRADA') return;
      setMatchesData(previousData);
      setError(err.message || 'No se pudo completar la acción. Inténtalo de nuevo.');
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