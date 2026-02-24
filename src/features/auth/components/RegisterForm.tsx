import React from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { locationData } from '../data/locationData';
import { sportData } from '../data/sportData';
import type { RegisterFormState, RegisterFormHandlers } from '../types/register.types';

type RegisterFormProps = RegisterFormState & RegisterFormHandlers;

export const RegisterForm: React.FC<RegisterFormProps> = ({
  nombre,
  correo,
  contraseña,
  confirmarContraseña,
  ubicacion,
  deporteFavorito,
  setNombre,
  setCorreo,
  setContraseña,
  setConfirmarContraseña,
  setUbicacion,
  setDeporteFavorito,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    {/* Grid de dos columnas con 3 campos a cada lado */}
    <div className="grid grid-cols-2 gap-4">
      {/* COLUMNA IZQUIERDA */}
      <div className="flex flex-col gap-4">
        {/* Campo 1: Nombre */}
        <Input
          id="register-nombre"
          type="text"
          value={nombre}
          onChange={setNombre}
          placeholder="Nombre"
          required
        />

        {/* Campo 2: Correo */}
        <Input
          id="register-correo"
          type="email"
          value={correo}
          onChange={setCorreo}
          placeholder="Correo electrónico"
          autoComplete="email"
          required
        />

        {/* Campo 3: Deporte Favorito */}
        <Select
          id="register-deporte"
          value={deporteFavorito}
          onChange={setDeporteFavorito}
          placeholder="Selecciona tu deporte"
          options={sportData}
          ariaLabel="Deporte favorito"
          required
        />
      </div>

      {/* COLUMNA DERECHA */}
      <div className="flex flex-col gap-4">
        {/* Campo 4: Contraseña */}
        <Input
          id="register-contraseña"
          type="password"
          value={contraseña}
          onChange={setContraseña}
          placeholder="Contraseña"
          autoComplete="new-password"
          required
        />

        {/* Campo 5: Confirmar Contraseña */}
        <Input
          id="register-confirmar-contraseña"
          type="password"
          value={confirmarContraseña}
          onChange={setConfirmarContraseña}
          placeholder="Confirmar contraseña"
          autoComplete="new-password"
          required
        />

        {/* Campo 6: Ubicación */}
        <Select
          id="register-ubicacion"
          value={ubicacion}
          onChange={setUbicacion}
          placeholder="Selecciona tu ubicación"
          options={locationData}
          ariaLabel="Ubicación"
          required
        />
      </div>
    </div>

    {/* Botón de envío (ancho completo) */}
    <Button type="submit" className="mt-2">
      Registrarse
    </Button>
  </form>
);
