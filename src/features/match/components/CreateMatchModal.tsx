import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createMatch } from '../services/matches.service';
import type { MatchCreateData } from '../services/matches.service';
import { catalogosService } from '@/services/catalogos.service';

interface Deporte {
  idDeporte: number;
  nombreDeporte: string;
}

interface Lugar {
  idLugar: number;
  nombre: string;
}

interface CreateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateMatchModal: React.FC<CreateMatchModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    idDeporte: '',
    fecha: '',
    hora: '',
    idLugar: '', // Cambiado de 'lugar' a 'idLugar' para coincidir con el backend
    maxJugadores: ''
  });

  const [deportes, setDeportes] = useState<Deporte[]>([]);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EFECTO: Carga de catálogos desde los NUEVOS endpoints
  useEffect(() => {
    if (isOpen) {
      const fetchCatalogos = async () => {
        try {
          // Lanzamos ambas peticiones en paralelo para mayor velocidad
          const [resDeportes, resLugares] = await Promise.all([
            catalogosService.getDeportes(),
            catalogosService.getLugares()
          ]);
          
          setDeportes(resDeportes || []); // resDeportes ya trae el array 'data' según tu service
          setLugares(resLugares || []);
        } catch (err) {
          console.error("Error cargando catálogos:", err);
          setError("No se pudieron cargar los datos del servidor");
        }
      };
      fetchCatalogos();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: MatchCreateData = {
        idDeporte: Number(formData.idDeporte),
        fecha: formData.fecha,
        hora: formData.hora,
        idLugar: Number(formData.idLugar),
        maxJugadores: Number(formData.maxJugadores)
      };

      await createMatch(payload);
      
      onSuccess(); 
      onClose();   
      setFormData({ idDeporte: '', fecha: '', hora: '', idLugar: '', maxJugadores: '' });
    } catch (err: any) {
      if (err.message !== 'SESION_EXPIRADA') {
        setError(err.message || 'Error al crear el partido');
      }
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0F172A] border-2 border-white p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold uppercase tracking-widest">Crear Partido</h2>
          <button onClick={onClose} className="text-white text-4xl hover:scale-110 transition-transform">&times;</button>
        </div>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-[10px] font-bold uppercase bg-red-500/10 p-2">{error}</p>}

          {/* SELECT DE DEPORTES */}
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] font-bold uppercase">Deporte</label>
            <select 
              name="idDeporte"
              value={formData.idDeporte}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white outline-none focus:border-white cursor-pointer"
              required
            >
              <option value="" className="bg-[#0F172A]">Selecciona deporte</option>
              {deportes.map((dep) => (
                <option key={dep.idDeporte} value={dep.idDeporte} className="bg-[#0F172A]">
                  {dep.nombreDeporte}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              name="fecha" type="date" value={formData.fecha} onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white outline-none focus:border-white"
              required
            />
            <input 
              name="hora" type="time" value={formData.hora} onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white outline-none focus:border-white"
              required
            />
          </div>

          {/* SELECT DE LUGARES */}
          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] font-bold uppercase">Lugar</label>
            <select 
              name="idLugar"
              value={formData.idLugar}
              onChange={handleChange}
              className="bg-transparent border border-white/20 p-3 text-white outline-none focus:border-white cursor-pointer"
              required
            >
              <option value="" className="bg-[#0F172A]">Selecciona ubicación</option>
              {lugares.map((lug) => (
                <option key={lug.idLugar} value={lug.idLugar} className="bg-[#0F172A]">
                  {lug.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/40 text-[10px] font-bold uppercase">Máximo de Jugadores</label>
            <input 
              name="maxJugadores" type="number" value={formData.maxJugadores}
              onChange={handleChange} min="2"
              className="bg-transparent border border-white/20 p-3 text-white outline-none focus:border-white" 
              required
            />
          </div>
          
          <button 
            type="submit" disabled={loading}
            className="bg-white text-[#0F172A] font-bold py-5 mt-4 uppercase tracking-[0.2em] hover:bg-slate-200 disabled:opacity-50"
          >
            {loading ? 'Publicando...' : 'Publicar Partido'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateMatchModal;