import React from 'react';

type InputProps = {
  id: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
}) => (
  <label
    htmlFor={id}
    className="flex flex-col gap-2"
    style={{ fontFamily: 'Poppins, sans-serif' }}
  >
    <span className="text-sm font-medium text-slate-200"></span>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    />
  </label>
);
