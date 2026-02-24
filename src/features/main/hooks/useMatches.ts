/**
 * Hook personalizado para cargar y gestionar partidos
 */

import { useState, useEffect } from 'react';
import { Match } from '../../../types/match.types';
import { mockMatches, filterMatches, sortMatchesByDate } from '../data/mockMatches';

export interface UseMatchesOptions {
  sport?: string;
  status?: Match['status'];
  city?: string;
  sortByDate?: boolean;
  delay?: number;
}

export interface UseMatchesResult {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filter: (filters: UseMatchesOptions) => void;
}

/**
 * Hook para cargar y gestionar partidos
 * En desarrollo usa datos mock, en producción consumiría una API real
 */
export const useMatches = (options: UseMatchesOptions = {}): UseMatchesResult => {
  const {
    sport,
    status,
    city,
    sortByDate = true,
    delay = 800,
  } = options;

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentOptions, setCurrentOptions] = useState(options);

  /**
   * Cargar partidos
   */
  const loadMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, delay));

      // TODO: Reemplazar con llamada a API real
      let result = [...mockMatches];

      // Aplicar filtros
      result = filterMatches(result, {
        sport: currentOptions.sport,
        status: currentOptions.status,
        city: currentOptions.city,
      });

      // Ordenar por fecha si es necesario
      if (currentOptions.sortByDate !== false) {
        result = sortMatchesByDate(result);
      }

      setMatches(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar partidos';
      setError(errorMessage);
      console.error('Error loading matches:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar al montar o cuando cambien las opciones
   */
  useEffect(() => {
    loadMatches();
  }, [currentOptions.sport, currentOptions.status, currentOptions.city]);

  /**
   * Recargar partidos
   */
  const refetch = async () => {
    await loadMatches();
  };

  /**
   * Aplicar filtros
   */
  const filter = (newFilters: UseMatchesOptions) => {
    setCurrentOptions((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return {
    matches,
    loading,
    error,
    refetch,
    filter,
  };
};

export default useMatches;
