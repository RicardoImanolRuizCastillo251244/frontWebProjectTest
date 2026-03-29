import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const token = localStorage.getItem('token');
  const hasToken = token && token !== "undefined" && token !== "null";

  if (hasToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};