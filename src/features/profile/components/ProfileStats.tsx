import React from 'react';
import { ProfileStats as StatsType } from '../types/profile.types';

interface ProfileStatsProps {
  stats: StatsType;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  // Calculamos el Win Rate aquí dentro
  const winRate = stats.played > 0 
    ? Math.round((stats.won / stats.played) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-[#0C2143] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
        <span className="text-[#71AB46] text-3xl font-bold font-roboto">{winRate}%</span>
        <span className="text-white/70 text-sm mt-1 uppercase tracking-wider">Win Rate</span>
      </div>
      <div className="bg-[#0C2143] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
        <span className="text-white text-3xl font-bold font-roboto">{stats.played}</span>
        <span className="text-white/70 text-sm mt-1 uppercase tracking-wider">Jugados</span>
      </div>
      <div className="bg-[#0C2143] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
        <span className="text-[#0D3472] text-3xl font-bold font-roboto">{stats.won}</span>
        <span className="text-white/70 text-sm mt-1 uppercase tracking-wider">Ganados</span>
      </div>
      <div className="bg-[#0C2143] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
        <span className="text-red-400 text-3xl font-bold font-roboto">{stats.lost}</span>
        <span className="text-white/70 text-sm mt-1 uppercase tracking-wider">Perdidos</span>
      </div>
    </div>
  );
};

export default ProfileStats;