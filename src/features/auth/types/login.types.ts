export type LoginFormState = {
  usuario: string;
  password: string;
  isLoading?: boolean; // Nuevo
  error?: string | null; // Nuevo
};

export type LoginFormHandlers = {
  setUsuario: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

