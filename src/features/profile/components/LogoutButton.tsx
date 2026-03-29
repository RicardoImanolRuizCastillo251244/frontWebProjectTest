import { useAuth } from '@/features/auth/context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <div className="pt-6 border-t border-white/5 flex justify-center md:justify-end">
      <button 
        onClick={logout}
        className="flex items-center gap-3 px-8 py-3 bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 text-red-500 hover:text-white rounded-xl font-roboto font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogoutButton;