import { useState, useEffect, useCallback } from 'react';
import { Match, MatchesApiResponse } from '../../../types/match.types';
import { getMatches, joinMatch, leaveMatch } from '../services/matches.service';

export interface UseMatchesResult {
  matchesData: MatchesApiResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  handleToggleParticipation: (matchId: number, isJoined: boolean) => Promise<void>;
}

export const useMatches = (): UseMatchesResult => {
  const [matchesData, setMatchesData] = useState<MatchesApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMatches();
      setMatchesData(data);
    } catch (err: any) {
      // IMPORTANTE: Sincronizado con SESION_EXPIRADA del auth.service
      if (err.message === 'SESION_EXPIRADA') {
        // No seteamos error en el estado para evitar parpadeos en la UI
        // mientras la ruta nos redirige al login.
        return; 
      }
      setError(err.message || 'Error al cargar los partidos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const handleToggleParticipation = async (matchId: number, isJoined: boolean) => {
    if (!matchesData) return;

    // --- PASO A: Actualización Optimista ---
    const sourceKey = isJoined ? 'mis_partidos' : 'disponibles';
    const targetKey = isJoined ? 'disponibles' : 'mis_partidos';
    const playerDiff = isJoined ? -1 : 1;

    const matchToMove = matchesData[sourceKey].find(m => m.idMatch === matchId);
    if (!matchToMove) return;

    const previousData = { ...matchesData };

    const updatedMatch: Match = {
      ...matchToMove,
      numJugadores: Math.max(0, (matchToMove.numJugadores || 0) + playerDiff),
      isJoined: !isJoined
    };

    setMatchesData({
      ...matchesData,
      [sourceKey]: matchesData[sourceKey].filter(m => m.idMatch !== matchId),
      [targetKey]: [...matchesData[targetKey], updatedMatch]
    });

    // --- PASO B: Comunicación con el Backend ---
    try {
      if (isJoined) {
        await leaveMatch(matchId);
      } else {
        await joinMatch(matchId);
      }
    } catch (err: any) {
      // --- PASO C: Rollback inteligente ---
      if (err.message === 'SESION_EXPIRADA') {
        // Si la sesión murió, no avisamos ni hacemos rollback.
        // Las rutas (ProtectedRoute) detectarán el disco vacío y nos sacarán.
        return; 
      }

      console.error("Error en el servidor, revirtiendo cambios...", err);
      setMatchesData(previousData);
      alert("No se pudo completar la acción. Inténtalo de nuevo.");
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