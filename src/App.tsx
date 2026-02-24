import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import MainPage from '@/pages/MainPage';
import Header from '@/features/main/components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="overflow-y-auto">
        <Routes>
          {/* Main Page - Ruta Raíz */}
          <Route path="/" element={<MainPage />} />

          {/* Authentication Routes */}
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
            <Route index element={<Navigate to="/auth/login" replace />} />
          </Route>

          {/* Catch all - Redirige a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
