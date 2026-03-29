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

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
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
          <Route path="/" element={<MainPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback inteligente: Si no existe la ruta, intenta ir al inicio */}
      <Route
        path="*"
        element={
          <Navigate
            to={localStorage.getItem("token") ? "/" : "/auth/login"}
            replace
          />
        }
      />
    </Routes>
  );
};
