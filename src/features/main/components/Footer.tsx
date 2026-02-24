import React from 'react';
import { FooterProps } from '../types/main.types';

/**
 * Componente Footer - Pie de página elegante
 * Información de contacto, enlaces útiles y redes sociales
 */
const Footer: React.FC<FooterProps> = ({ brandName, year = new Date().getFullYear() }) => {
  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              <span className="text-white font-bold text-xl">{brandName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Conecta jugadores, reserva canchas y juega tu deporte favorito.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Soporte</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="
                  w-10 h-10 bg-slate-800 hover:bg-green-500
                  rounded-lg flex items-center justify-center
                  text-gray-400 hover:text-white
                  transition-all duration-300
                "
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="
                  w-10 h-10 bg-slate-800 hover:bg-green-500
                  rounded-lg flex items-center justify-center
                  text-gray-400 hover:text-white
                  transition-all duration-300
                "
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="
                  w-10 h-10 bg-slate-800 hover:bg-green-500
                  rounded-lg flex items-center justify-center
                  text-gray-400 hover:text-white
                  transition-all duration-300
                "
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="
                  w-10 h-10 bg-slate-800 hover:bg-green-500
                  rounded-lg flex items-center justify-center
                  text-gray-400 hover:text-white
                  transition-all duration-300
                "
              >
                <span className="text-lg">▶️</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {year} {brandName}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-gray-500 hover:text-green-400 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
