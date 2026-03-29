import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // Si no hay token real, fuera. 
  // Usamos un chequeo estricto para evitar strings "null" o "undefined"
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};