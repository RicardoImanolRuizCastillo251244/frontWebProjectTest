export type RegisterFormState = {
  nombre: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
  ubicacion: string;
  deporteFavorito: string;
};

export type RegisterFormHandlers = {
  setNombre: (value: string) => void;
  setCorreo: (value: string) => void;
  setContraseña: (value: string) => void;
  setConfirmarContraseña: (value: string) => void;
  setUbicacion: (value: string) => void;
  setDeporteFavorito: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
