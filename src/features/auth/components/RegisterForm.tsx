import React from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import type { RegisterFormProps, Deporte, Lugar } from '../types/register.types';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  nombre,
  correo,
  contrasena,
  confirmarContrasena,
  idLugar,
  idDeporteFavorito,
  listaDeportes = [],
  listaLugares = [],
  loading,
  error,
  setNombre,
  setCorreo,
  setContrasena,
  setConfirmarContrasena,
  setIdLugar,
  setIdDeporteFavorito,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
        {error}
      </div>
    )}

    <div className="grid grid-cols-2 gap-4">
      {/* COLUMNA IZQUIERDA */}
      <div className="flex flex-col gap-4">
        <Input
          id="register-nombre"
          type="text"
          value={nombre}
          onChange={setNombre}
          placeholder="Nombre de usuario"
          required
        />

        <Input
          id="register-correo"
          type="email"
          value={correo}
          onChange={setCorreo}
          placeholder="Correo electrónico"
          autoComplete="email"
          required
        />

        <Select
          id="register-deporte"
          value={idDeporteFavorito}
          onChange={setIdDeporteFavorito}
          placeholder="Selecciona tu deporte"
          options={listaDeportes.map((d: Deporte) => ({ 
            value: d.idDeporte.toString(), 
            label: d.nombreDeporte 
          }))}
          ariaLabel="Deporte favorito"
          required
        />
      </div>

      {/* COLUMNA DERECHA */}
      <div className="flex flex-col gap-4">
        <Input
          id="register-contrasena"
          type="password"
          value={contrasena}
          onChange={setContrasena}
          placeholder="Contraseña"
          autoComplete="new-password"
          required
        />

        <Input
          id="register-confirmar-contrasena"
          type="password"
          value={confirmarContrasena}
          onChange={setConfirmarContrasena}
          placeholder="Confirmar contraseña"
          autoComplete="new-password"
          required
        />

        <Select
          id="register-ubicacion"
          value={idLugar}
          onChange={setIdLugar}
          placeholder="Selecciona tu ubicación"
          options={listaLugares.map((l: Lugar) => ({ 
            value: l.idLugar.toString(), 
            label: l.nombre 
          }))}
          ariaLabel="Ubicación"
          required
        />
      </div>
    </div>

    <Button type="submit" className="mt-2" disabled={loading}>
      {loading ? 'Cargando...' : 'Registrarse'}
    </Button>
  </form>
);