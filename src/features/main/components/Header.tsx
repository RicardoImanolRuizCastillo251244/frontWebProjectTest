import React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import logoCourtUrl from "@/assets/images/logoCourt.png";
import perfilTest from "@/assets/images/perfilTest.jpg";

interface HeaderProps {
  fixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({ fixed = true }) => {
  const { user } = useAuth(); // Ya no necesitamos 'logout' ni 'navigate' aquí

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
        <Link to="/perfil" className="flex items-center gap-3 group">
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

          <div className="relative">
            <img
              src={perfilTest}
              alt="Perfil"
              className="w-12 h-12 rounded-full border-2 border-[#71AB46] object-cover group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"
            />
            {/* Punto de estado "Online" */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#71AB46] rounded-full border-2 border-[#0F172A]"></span>
          </div>
        </Link>
      </div>
    </header>
  );

  return createPortal(headerElement, document.body);
};

export default Header;