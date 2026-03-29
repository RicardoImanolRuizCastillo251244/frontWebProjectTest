export interface Deporte {
  idDeporte: number;
  nombreDeporte: string;
}

export interface Lugar {
  idLugar: number;
  nombreLugar: string;
}

export interface RegisterFormState {
  nombre: string;
  correo: string;
  contrasena: string;
  confirmarContrasena: string;
  idLugar: string;
  idDeporteFavorito: string;
  listaDeportes: Deporte[];
  listaLugares: Lugar[];
  loading: boolean;
  error: string | null;
}

export interface RegisterFormHandlers {
  setNombre: (val: string) => void;
  setCorreo: (val: string) => void;
  setContrasena: (val: string) => void;
  setConfirmarContrasena: (val: string) => void;
  setIdLugar: (val: string) => void;
  setIdDeporteFavorito: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export type RegisterFormProps = RegisterFormState & RegisterFormHandlers;