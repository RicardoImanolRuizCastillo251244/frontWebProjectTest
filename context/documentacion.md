# Documentación del Proyecto - TestWebProjectV1

## 1. Resumen general

- Nombre proyecto: `test-web-project-v1`
- Tecnología principal: React + TypeScript + Vite
- UI: TailwindCSS v4 + componente propios
- Enrutamiento: React Router v7
- Estado de auth: Context API (`AuthContext`)
- Backend: APIs REST en `http://localhost:3000/api` (axios no usado, usa `fetch` en servicios)
- Arquetipo: app CRUD de partidos deportivos con usuario, auth y matchmaking.

## 2. Estructura del repositorio

- `index.html`
- `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts`.
- `public/`:
   - `data/locations.json`, `sports.json` y `mocks/` con datos de pruebas
   - `images/` contenido gráfico
- `src/`
   - `App.tsx`: contenedor principal de UI y `AppRoutes`.
   - `main.tsx`: mount React, `BrowserRouter`, `AuthProvider` (revisar si ya está, no se leía aquí)
   - `assets/` imágenes (logo, fondos, avatar de test, etc.)
   - `components/`: componentes genéricos (`Button`, `Input`, `Select`, `SectionContainer`, etc.)
   - `features/`: subsistemas de la app por dominio
   - `layouts/`: `MainLayout`, `AuthLayout`
   - `pages/`: `LoginPage`, `RegisterPage`, `MainPage`
   - `routes/`: manejos de rutas protegidas y públicas
   - `services/`: catálogos globales

## 3. Funcionalidades principales

### 3.1 Autenticación
- `src/features/auth/context/AuthContext.tsx`:
  - login/logout y control de token localStorage + usuario
  - `isAuthenticated` calculado con token localStorage
  - `logout`: limpia datos y redirect a `/auth/login`
  - `useAuth` hook para consumo en componentes

- `src/features/auth/services/auth.service.ts`:
  - endpoint `/api/auth/login` para login, `/api/auth/registro` para registro
  - maneja 401 como `SESION_EXPIRADA` y limpia localStorage

- `src/features/auth/hooks/useLoginForm.ts` y `useRegisterForm.ts`
  - formularios adaptativos y validaciones básicas (contraseña / confirmación)
  - uso de `catalogosService` para cargar deportes/lugares en Registro
  - navegación React Router tras registro/login

- `src/features/auth/components/LoginForm.tsx`, `RegisterForm.tsx`:
  - inputs controlados, error UI, botones de estado

- `routes/ProtectedRoute`, `PublicRoute`:
  - control acceso rutas según token.

### 3.2 Página principal (Matchmaking)
- `MainPage.tsx` carga:
  - `HeroMediaSection` (banner + CTA para modal crear partido)
  - `MatchesVisualization` com lista de partidos
  - `CreateMatchModal` modal de creación de nuevos partidos

- `src/features/match/components/MatchesVisualization.tsx`:
  - pestañas `disponibles` y `mis_partidos`
  - control de UI, loading, error, selección modal
  - usa `useMatches` para lógica de datos

- `useMatches` hook:
  - obtiene `getMatches`, maneja loading+error
  - `handleToggleParticipation` optimista + fallbacks + rollback

- `src/features/match/services/matches.service.ts`:
  - CRUD base: `getMatches`,`joinMatch`,`leaveMatch`,`createMatch`
  - token Bearer en headers, 401 redirige a login

- `CreateMatchModal`:
  - formulario para crear partido con deportes/lugares cargados
  - validación HTML y feedback de errores

- `MatchCard` y `MatchModal` componentes para RPE, no leí el código exacto pero asumo exhiben detalles y acciones.

### 3.3 Perfil de usuario
- `src/features/profile/pages/ProfilePage.tsx` + `ProfileHeader/ProfileForm/ProfileStats`, `LogoutButton` 
- posibilidad de ver/datos usuario y cerrar sesión.

## 4. Variables de entorno y configuración
- Usa `import.meta.env.VITE_API_URL` con fallback a `http://localhost:3000/api`.
- Circula uso de localStorage para token.
- La app proveedor de rutas y contexto es `main.tsx`.

## 5. Dependencias y scripts
- `npm run dev` -> `vite`
- `npm run build` -> `vite build`
- `npm run preview` -> `vite preview`
- `npm run lint` -> `eslint .`
- React 18.3, TS 5.7, Tailwind 4, Vite 6

## 6. Flujo de uso esperado (user journey)
1. Usuario entra a `/auth/login` o `/auth/registro`.
2. Registra con nombre/correo/contrasena/deporte/ubicacion.
3. Inicia sesión, token guardado y navega a `/`.
4. MainPage muestra partidos disponibles y propios en pestañas.
5. Puede crear partido / unirse / salir.
6. Perfil ( `/perfil` ) muestra info y botón logout.

## 7. Recomendaciones para mejoras (future work)
- Manejo de errores globales con `ErrorBoundary` o interceptor común.
- Optimizar `AuthProvider` para no validar en cada render con localStorage repetido.
- Añadir tests unitarios (React Testing Library + vitest).
- Convertir `localStorage` y redirecciones en utilities para DRY.
- Añadir i18n (está en español hardcoded)
- Verificar `user` como objeto con interfaz en `AuthContext` y evitar `any`.

## 8. Archivos de diseño existentes
- `context/fuentes.md`: tipografías.
- `context/paleta_colores.md`: paleta principal.
- `context/layout_pages.md`, `layout_pageMain.md`: layout y guía visual de páginas.

---

**Ubicación de documento:** `context/documentacion.md` (creado con éxito)

**Estado:** lista la documentación de todo el proyecto para usar como contexto continuo.

