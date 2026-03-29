import React from "react";
import { AppRoutes } from "./routes";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Aquí ya NO ponemos <BrowserRouter> ni <AuthProvider> 
          porque ya los pusiste en el main.tsx. 
      */}
      <AppRoutes />
    </div>
  );
};

export default App;