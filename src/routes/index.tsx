import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import MainPage from "@/pages/MainPage";
import Header from "@/features/main/components/Header";
import { ProfilePage } from "@/features/profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { useAuth } from "@/features/auth/context/AuthContext";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/registro" element={<Navigate to="/auth/registro" replace />} />

      {/* RUTAS PÚBLICAS: Si estoy logueado, me saca de aquí */}
      <Route element={<PublicRoute />}>
        <Route
          path="/auth"
          element={
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* RUTAS PROTEGIDAS: Si NO estoy logueado, me manda al login */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <>
              <Header />
              <main className="overflow-y-auto">
                <Outlet />
              </main>
            </>
          }
        >
            <Route path="/" element={<Navigate to="/mainpage" replace />} />
            <Route path="/mainpage" element={<MainPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback inteligente: Si no existe la ruta, intenta ir al inicio */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/mainpage" : "/auth/login"}
            replace
          />
        }
      />
    </Routes>
  );
};
