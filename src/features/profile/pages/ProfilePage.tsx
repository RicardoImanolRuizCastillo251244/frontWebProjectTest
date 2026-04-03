import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/features/auth/context/AuthContext';
import { UserProfile } from '../types/profile.types';
import { getUserProfile, updateUserProfile, changePassword } from '../services/profile.service';

// Componentes Modularizados
import ProfileHeader from '../components/ProfileHeader';
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

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successSignal, setSuccessSignal] = useState(0);

  const handleProfileSubmit = async (data: { username: string; contrasenaActual?: string; contrasenaNueva?: string }) => {
    if (!profile) return;
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      // 1) Update username if changed
      if (data.username && data.username !== profile.username) {
        const res = await updateUserProfile({ nombreUsuario: data.username });
        if (res && res.ok) {
          setProfile((p) => p ? { ...p, username: res.data?.nombreUsuario || data.username } : p);
          setMessage(res.message || 'Nombre de usuario actualizado');
          toast.success(res.message || 'Nombre de usuario actualizado');
          setSuccessSignal(s => s + 1);
        } else {
          throw new Error(res?.message || 'Error al actualizar nombre');
        }
      }

      // 2) Change password if provided
      if (data.contrasenaNueva && data.contrasenaNueva.length > 0) {
        const pwRes = await changePassword({ contrasenaActual: data.contrasenaActual || '', contrasenaNueva: data.contrasenaNueva });
        if (pwRes && pwRes.ok) {
          setMessage((msg) => (msg ? msg + ' — Contraseña actualizada' : 'Contraseña actualizada'));
          toast.success('Contraseña actualizada');
          setSuccessSignal(s => s + 1);
        } else {
          throw new Error(pwRes?.message || 'Error al cambiar contraseña');
        }
      }

    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
      toast.error(err.message || 'Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return null; // O un spinner

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-[#0F172A] py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-10 items-center">
        <div className="w-full">
          <ProfileHeader username={profile.username} />
        </div>

        <div className="w-full max-w-2xl">
          <h3 className="text-white/30 text-xs font-bold uppercase tracking-widest ml-1">Ajustes</h3>
          <ProfileForm initialUsername={profile.username} email={profile.email} onSubmit={handleProfileSubmit} saving={saving} successSignal={successSignal} />
          {message && <p className="text-green-400 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <Toaster position="top-right" />
        </div>

        <LogoutButton />
      </div>
    </section>
  );
};

export default ProfilePage;