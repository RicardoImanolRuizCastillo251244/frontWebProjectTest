import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import logoCourtUrl from "@/assets/images/logoCourt.png";

interface HeaderProps {
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ fixed = true }) => {
  const { user } = useAuth(); // Ya no necesitamos 'logout' ni 'navigate' aquí
  console.log("Header renderizado. Usuario:", user);
  const headerElement = (
    <header
      className="h-20 bg-[#0F172A] flex items-center justify-between px-8"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 9999,
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)" // Un toque sutil de división
      }}
    >
      {/* LADO IZQUIERDO: Logo */}
      <Link to="/" className="flex items-center transition-transform hover:scale-105">
        <img
          src={logoCourtUrl}
          alt="CourtMatch Logo"
          className="h-14 w-auto cursor-pointer"
        />
      </Link>

      {/* LADO DERECHO: Acceso al Perfil */}
      <div className="flex items-center">
        {/* LADO DERECHO: Acceso al Perfil */}
        <Link to="/perfil" className="flex items-center group">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-[#71AB46] font-black uppercase tracking-[0.2em] leading-none mb-1 opacity-80">
              Mi Cuenta
            </span>
            <span
              className="text-white font-bold group-hover:text-[#71AB46] transition-colors text-base tracking-tight"
              style={{ fontFamily: "'Roboto', sans-serif" }} 
            >
              {typeof user === "string" ? user : user?.nombreUsuario || "Usuario"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );

  return createPortal(headerElement, document.body);
};

export default Header;