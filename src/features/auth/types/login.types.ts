export type LoginFormState = {
  usuario: string;
  password: string;
};

export type LoginFormHandlers = {
  setUsuario: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
