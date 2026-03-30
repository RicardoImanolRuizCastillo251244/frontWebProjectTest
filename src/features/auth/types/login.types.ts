export type LoginFormState = {
  usuario: string;
  password: string;
  isLoading: boolean;
  error: string | null;
};

export type LoginFormHandlers = {
  setUsuario: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

export type LoginFormProps = LoginFormState & LoginFormHandlers;

