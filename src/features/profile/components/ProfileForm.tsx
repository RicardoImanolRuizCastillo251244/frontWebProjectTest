import React, { useState, useEffect } from 'react';

interface ProfileFormData {
  username: string;
  contrasenaActual?: string;
  contrasenaNueva?: string;
}

interface ProfileFormProps {
  initialUsername: string;
  email: string;
  onSubmit: (data: ProfileFormData) => void;
  saving?: boolean;
  successSignal?: number;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialUsername, email, onSubmit, saving = false, successSignal }) => {
  // Estados locales solo para el formulario
  const [username, setUsername] = useState(initialUsername);
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');

    const [errors, setErrors] = useState<{ username?: string; contrasenaActual?: string; contrasenaNueva?: string; general?: string }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};

    if (!username || username.trim().length < 3) {
      next.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
    }

    if (contrasenaNueva && contrasenaNueva.length > 0) {
      if (!contrasenaActual || contrasenaActual.length === 0) {
        next.contrasenaActual = 'Ingresa la contraseña actual para cambiarla.';
      }

      if (contrasenaNueva.length < 8) {
        next.contrasenaNueva = 'La nueva contraseña debe tener al menos 8 caracteres.';
      }

      const rules = [/[A-Z]/, /[a-z]/, /[0-9]/, /[@$!%*?&]/];
      const ruleMsgs = ['una mayúscula', 'una minúscula', 'un número', 'un carácter especial (@$!%*?&)'];

      rules.forEach((r, i) => {
        if (!r.test(contrasenaNueva)) {
          next.contrasenaNueva = (next.contrasenaNueva || '') + (next.contrasenaNueva ? ', ' : '') + ruleMsgs[i];
        }
      });

      if (contrasenaActual && contrasenaActual === contrasenaNueva) {
        next.contrasenaNueva = (next.contrasenaNueva ? next.contrasenaNueva + '. ' : '') + 'La nueva contraseña debe ser distinta a la actual.';
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    // Le pasamos los datos al componente padre
    onSubmit({ username: username.trim(), contrasenaActual: contrasenaActual || undefined, contrasenaNueva: contrasenaNueva || undefined });
  };

  // Cuando el padre indica éxito, limpiamos los campos de contraseña
  useEffect(() => {
    if (typeof successSignal !== 'undefined') {
      setContrasenaActual('');
      setContrasenaNueva('');
    }
  }, [successSignal]);

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

        {/* Contraseña actual */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm font-roboto">Contraseña Actual</label>
          <input 
            type="password" 
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#0D3472] transition-colors font-roboto placeholder:text-white/30"
            placeholder="Ingresa tu contraseña actual para confirmar"
          />
        </div>

        {/* Nueva Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-white/70 text-sm font-roboto">Nueva Contraseña</label>
          <input 
            type="password" 
            value={contrasenaNueva}
            onChange={(e) => setContrasenaNueva(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#0D3472] transition-colors font-roboto placeholder:text-white/30"
            placeholder="Dejar en blanco para no cambiar"
          />
        </div>

        {/* Botón Guardar */}
        <div className="mt-4 flex flex-col gap-3">
          {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={saving}
              className={`bg-[#71AB46] text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ProfileForm;