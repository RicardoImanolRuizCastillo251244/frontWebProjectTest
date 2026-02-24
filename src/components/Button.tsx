import React from 'react';

type ButtonProps = {
  type: 'submit' | 'button';
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  disabled = false,
  className = '',
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`rounded-lg bg-[#71AB46] px-4 py-3 font-normal text-white transition hover:bg-[#5d9340] focus:outline-none focus:ring-2 focus:ring-[#71AB46] focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 ${className}`.trim()}
    style={{ fontFamily: 'Roboto, sans-serif' }}
  >
    {children}
  </button>
);
