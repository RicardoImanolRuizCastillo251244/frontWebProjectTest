import React, { useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Match } from "../types/match.types";
import { useMatches } from "../hooks/useMatches";
import type { MatchTeam } from "../services/matches.service";
import MatchCard from "./MatchCard";
import MatchModal from "./MatchModal";

type MatchActionResult = "joined" | "left" | "cancelled";

const MatchesVisualization: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"disponibles" | "mis_partidos">("disponibles");

  // 1. Hook de lógica de partidos (Trae datos, loading, error y funciones de acción)
  const { matchesData, loading, error, handleToggleParticipation, refetch } = useMatches();

  // Estados para el control de la Modal
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // --- SEGURIDAD ---
  // Si la sesión expiró (detectado por el Context), evitamos renderizar el contenido
  // para que el ProtectedRoute haga su trabajo sin interferencias.
  if (!isAuthenticated) return null;

  // --- MANEJADOR PARA ABRIR MODAL ---
  const handleMatchAction = (matchId: number) => {
    const currentMatches =
      activeTab === "disponibles"
        ? matchesData?.disponibles || []
        : matchesData?.mis_partidos || [];

    // Buscamos el partido específico por su ID
    const match = currentMatches.find((m) => m.idMatch === matchId);

    if (match) {
      setSelectedMatch(match);
      setIsModalOpen(true);
    }
  };

  // --- LÓGICA DE CONFIRMACIÓN (UNIRSE / SALIR) ---
  const handleConfirmProcess = async (matchId: number, equipo?: MatchTeam): Promise<MatchActionResult> => {
    const currentMatch =
      matchesData?.mis_partidos.find((match) => match.idMatch === matchId) ||
      matchesData?.disponibles.find((match) => match.idMatch === matchId) ||
      selectedMatch;

    const isLeaving = Boolean(currentMatch?.isJoined);
    const isCreator = currentMatch?.idCreador === user?.idUser;

    await handleToggleParticipation(matchId, isLeaving, equipo);
    await refetch();

    if (isLeaving) {
      setIsModalOpen(false);
      setSelectedMatch(null);
      return isCreator ? "cancelled" : "left";
    }

    return "joined";
  };

  // Determinamos qué lista mostrar según el Tab activo
  const currentMatches =
    activeTab === "disponibles"
      ? matchesData?.disponibles || []
      : matchesData?.mis_partidos || [];

  const selectedMatchData = selectedMatch
    ? [...(matchesData?.disponibles || []), ...(matchesData?.mis_partidos || [])].find(
        (match) => match.idMatch === selectedMatch.idMatch
      ) || selectedMatch
    : null;

  return (
    <section className="w-full pt-8 pb-16 px-4 md:px-6 bg-[#0F172A] flex-grow flex flex-col items-center min-h-screen">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
        
        {/* --- SELECTOR DE TABS (ESTILO NAVEGACIÓN) --- */}
        <div className="bg-[#0C2143] rounded-[50px] p-1.5 flex items-center w-full max-w-sm md:max-w-md mx-auto mb-12 border border-white/5 shadow-2xl">
          <button
            onClick={() => setActiveTab("disponibles")}
            className={`flex-1 text-center py-2.5 px-4 rounded-[50px] font-roboto font-normal text-sm md:text-base transition-all duration-300 ${
              activeTab === "disponibles" 
                ? "bg-[#0D3472] text-white shadow-lg" 
                : "text-white/60 hover:text-white/90"
            }`}
          >
            Partidos disponibles
          </button>
          <button
            onClick={() => setActiveTab("mis_partidos")}
            className={`flex-1 text-center py-2.5 px-4 rounded-[50px] font-roboto font-normal text-sm md:text-base transition-all duration-300 ${
              activeTab === "mis_partidos" 
                ? "bg-[#0D3472] text-white shadow-lg" 
                : "text-white/60 hover:text-white/90"
            }`}
          >
            Mis partidos
          </button>
        </div>

        {/* --- ESTADOS DE CARGA --- */}
        {loading && (
          <div className="flex flex-col items-center my-20">
            <div className="w-10 h-10 border-4 border-[#71AB46] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white/70 font-roboto mt-4 animate-pulse">Sincronizando canchas...</p>
          </div>
        )}

        {/* --- ESTADOS DE ERROR (SÓLO SI NO ES 401) --- */}
        {error && (
          <div className="my-10 bg-red-400/10 px-6 py-4 rounded-lg border border-red-400/20 max-w-lg text-center">
            <p className="text-red-400 font-roboto text-sm">{error}</p>
          </div>
        )}

        {/* --- GRID DE PARTIDOS --- */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentMatches.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center opacity-40">
                <span className="text-5xl mb-4">🏟️</span>
                <p className="text-white font-roboto text-center uppercase tracking-widest text-sm">
                  No hay partidos en esta sección
                </p>
              </div>
            ) : (
              currentMatches.map((match) => (
                <MatchCard
                  key={match.idMatch}
                  match={match}
                  actionText={
                    activeTab === "disponibles"
                      ? "Ver y elegir equipo"
                      : match.idCreador === user?.idUser
                        ? "Ver / Gestionar"
                        : "Ver / Cancelar"
                  }
                  onActionClick={handleMatchAction}
                />
              ))
            )}
          </div>
        )}

        {/* --- MODAL DE DETALLE Y ACCIÓN --- */}
        <MatchModal
          isOpen={isModalOpen}
          match={selectedMatchData}
          isJoined={Boolean(selectedMatchData?.isJoined)}
          isCreator={selectedMatchData?.idCreador === user?.idUser}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMatch(null);
          }}
          onConfirmJoin={(id, equipo) => handleConfirmProcess(Number(id), equipo)} 
        />
      </div>
    </section>
  );
};

export default MatchesVisualization;