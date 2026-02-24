import React from 'react';

export type SelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
  required?: boolean;
  ariaLabel?: string;
};

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  options,
  required = false,
  ariaLabel,
}) => (
  <label
    htmlFor={id}
    className="flex flex-col gap-2"
    style={{ fontFamily: 'Poppins, sans-serif' }}
  >
    <span className="text-sm font-medium text-slate-200"></span>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      aria-label={ariaLabel}
      className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/20 appearance-none cursor-pointer"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-950 text-white">
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
