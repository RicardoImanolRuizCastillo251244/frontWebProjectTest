import React, { useState } from 'react';

interface ProfileFormData {
  username: string;
  password?: string;
}

interface ProfileFormProps {
  initialUsername: string;
  email: string;
  onSubmit: (data: ProfileFormData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialUsername, email, onSubmit }) => {
  // Estados locales solo para el formulario
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Le pasamos los datos al componente padre
    onSubmit({ username, password });
  };

  return (
    <div className="bg-[#0C2143] border border-white/10 rounded-xl p-6 md:p-8 shadow-lg mt-4">
      <h2 className="text-xl text-white font-medium mb-6 border-b border-white/10 pb-4">Detalles de la Cuenta</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Correo (Solo lectura) */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm font-roboto">Correo Electrónico (No editable)</label>
          <input 
            type="email" 
            value={email} 
            disabled 
            className="w-full bg-[#0F172A]/50 border border-white/5 text-white/50 rounded-lg px-4 py-3 cursor-not-allowed focus:outline-none font-roboto"
          />
        </div>

        {/* Nombre de Usuario */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm font-roboto">Nombre de Usuario</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#0D3472] transition-colors font-roboto placeholder:text-white/30"
            placeholder="Tu nombre de jugador"
          />
        </div>

        {/* Nueva Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm font-roboto">Nueva Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#0D3472] transition-colors font-roboto placeholder:text-white/30"
            placeholder="Dejar en blanco para no cambiar"
          />
        </div>

        {/* Botón Guardar */}
        <div className="mt-4 flex justify-end">
          <button 
            type="submit"
            className="bg-[#71AB46] text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md"
          >
            Guardar Cambios
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProfileForm;