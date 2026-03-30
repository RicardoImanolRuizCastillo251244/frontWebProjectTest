import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { UserProfile } from '../types/profile.types';
import { getUserProfile } from '../services/profile.service';

// Componentes Modularizados
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import ProfileForm from '../components/ProfileForm';
import LogoutButton from '../components/LogoutButton';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    if (!user) return null;
    return {
      id: String(user.idUser),
      username: user.nombreUsuario,
      email: user.correo || '...',
      stats: { played: 0, won: 0, lost: 0 },
    };
  });

  useEffect(() => {
    getUserProfile().then(setProfile).catch(console.error);
  }, []);

  if (!profile) return null; // O un spinner

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-[#0F172A] py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-10">
        
        <ProfileHeader username={profile.username} email={profile.email} />

        <div className="grid gap-4">
          <h3 className="text-white/30 text-xs font-bold uppercase tracking-widest ml-1">Rendimiento</h3>
          <ProfileStats stats={profile.stats} />
        </div>
        
        <div className="grid gap-4">
          <h3 className="text-white/30 text-xs font-bold uppercase tracking-widest ml-1">Ajustes</h3>
          <ProfileForm initialUsername={profile.username} email={profile.email} onSubmit={() => {}} />
        </div>

        <LogoutButton />

      </div>
    </section>
  );
};

export default ProfilePage;