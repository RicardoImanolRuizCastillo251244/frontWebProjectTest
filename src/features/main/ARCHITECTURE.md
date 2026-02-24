# Arquitectura de la Página Principal (CourtMatch)

## Descripción General

Este documento describe la estructura y arquitectura de la página principal de CourtMatch, siguiendo principios profesionales de arquitectura de software, modularización y reutilización de componentes.

---

## Estructura de Carpetas

```
src/
├── components/                          # Componentes globales reutilizables
│   ├── MatchCard.tsx                   # Tarjeta individual de partido
│   ├── SectionContainer.tsx            # Contenedor para secciones
│   └── index.ts                        # Barrel export
│
├── features/
│   └── main/                           # Feature principal - Página Main
│       ├── components/                 # Componentes específicos del feature
│       │   ├── Header.tsx              # Cabecera con navegación
│       │   ├── Hero.tsx                # Sección de presentación (hero)
│       │   ├── MediaSection.tsx        # Sección media con features
│       │   ├── MatchesVisualization.tsx# Grid de partidos
│       │   ├── Footer.tsx              # Footer elegante
│       │   └── index.ts                # Barrel export
│       │
│       ├── types/                      # Tipos e interfaces TypeScript
│       │   └── main.types.ts           # Tipos específicos del feature
│       │
│       ├── hooks/                      # Hooks personalizados
│       │   ├── useMatches.ts           # Hook para cargar y gestionar partidos
│       │   └── index.ts                # Barrel export
│       │
│       ├── data/                       # Datos mock y funciones utilitarias
│       │   ├── mockMatches.ts          # Datos mock de partidos
│       │   └── index.ts                # Barrel export
│       │
│       └── index.ts                    # Barrel export del feature
│
├── layouts/
│   ├── MainLayout.tsx                  # Layout principal con Header y Footer
│   └── AuthLayout.tsx                  # Layout para auth (existente)
│
├── pages/
│   ├── MainPage.tsx                    # Página principal del sitio
│   ├── LoginPage.tsx                   # (existente)
│   └── RegisterPage.tsx                # (existente)
│
├── types/
│   └── match.types.ts                  # Tipos globales para partidos
│
└── App.tsx                             # Rutas principales
```

---

## Arquitectura de Componentes

### 1. **Componentes Presentacionales (Dumb Components)**

Estos componentes reciben props y no tienen estado interno complejo.

#### Header.tsx
- **Responsabilidad**: Mostrar la navegación superior
- **Props**: `fixed`, `onLoginClick`, `onRegisterClick`
- **Características**: Logo, navegación, botones de auth
- **Color**: Slate cabecera con 80% opacidad

#### Hero.tsx
- **Responsabilidad**: Mostrar la sección hero/presentación
- **Props**: `title`, `subtitle`, `backgroundImage`, `ctaButtonText`, `onCtaClick`
- **Características**: Imagen de fondo, overlay, contenido destacado
- **Color**: Fondo con overlay Slate 46%

#### MediaSection.tsx
- **Responsabilidad**: Mostrar features/características en un contenedor
- **Props**: `features`, `onFeatureClick`
- **Características**: Grid de 3 columnas con tarjetas de features
- **Color**: Azul principal (#0D3472)

#### MatchesVisualization.tsx
- **Responsabilidad**: Mostrar grid de partidos
- **Props**: `matches`, `onMatchClick`, `loading`, `error`
- **Características**: Grid responsivo, estados de carga, manejo de errores
- **Color**: Slate oscuro

#### Footer.tsx
- **Responsabilidad**: Mostrar información en el pie de página
- **Props**: `brandName`, `year`
- **Características**: Enlaces, redes sociales, copyright
- **Color**: Slate oscuro

### 2. **Componentes UI Reutilizables**

#### MatchCard.tsx
- **Ubicación**: `src/components/`
- **Responsabilidad**: Mostrar información de un partido individual
- **Props**: `match`, `onClick`, `className`
- **Características**:
  - Información de equipos
  - Fecha y hora
  - Ubicación
  - Barra de participantes
  - Botón de acción

#### SectionContainer.tsx
- **Ubicación**: `src/components/`
- **Responsabilidad**: Contenedor reutilizable para secciones
- **Props**: `children`, `className`, `bgColor`, `spacing`, `fullWidth`
- **Características**: Padding consistente, max-width, alineación

### 3. **Layouts**

#### MainLayout.tsx
- **Responsabilidad**: Envolver la página con Header y Footer
- **Props**: `children`
- **Características**: Estructura general de la página
- **Composición**: Header (fixed) + Main (flex-1) + Footer

#### AuthLayout.tsx
- **Responsabilidad**: Layout para páginas de autenticación (existente)

### 4. **Páginas**

#### MainPage.tsx
- **Responsabilidad**: Página principal que orquesta todas las secciones
- **Características**:
  - Usa el hook `useMatches` para cargar partidos
  - Compone todas las secciones principales
  - Maneja eventos de navegación
  - Define features hardcodeadas para demostración

---

## Gestión de Estado y Datos

### Hook Personalizado: useMatches

**Ubicación**: `src/features/main/hooks/useMatches.ts`

**Responsabilidad**: Centralizar la lógica de carga y gestión de partidos

**Features**:
- Carga de datos (mock → API real)
- Filtrado por deporte, estado, ciudad
- Ordenamiento por fecha
- Estados de carga y error
- Refetch manual

**Uso**:
```typescript
const { matches, loading, error, refetch, filter } = useMatches({
  sortByDate: true,
  delay: 800,
});
```

### Datos Mock

**Ubicación**: `src/features/main/data/mockMatches.ts`

**Contenido**:
- Array de 6 partidos de ejemplo
- Funciones utilitarias: `filterMatches`, `sortMatchesByDate`
- Fácil de reemplazar con un servicio API real

---

## Tipos TypeScript

### Global
**Ubicación**: `src/types/match.types.ts`
```typescript
- Match         // Partido completo
- Team          // Equipo
- Location      // Ubicación
- MatchFilters  // Filtros
```

### Feature Main
**Ubicación**: `src/features/main/types/main.types.ts`
```typescript
- MainPageContent
- Feature
- MainLayoutProps
- HeaderProps
- HeroProps
- MediaSectionProps
- MatchesVisualizationProps
- FooterProps
```

---

## Paleta de Colores

| Sección | Color | Código |
|---------|-------|--------|
| Cabecera | Slate Cabecera | `#0F172ACD` (80%) |
| Hero | Slate Medio | `#0F172A/46` |
| Media | Azul Principal | `#0D3472` |
| Partidos | Slate Oscuro | `#0F172A` |
| Footer | Slate Oscuro | `#0F172A` |
| Acentos | Verde | `#71AB46` |

---

## Patrones y Mejores Prácticas

### 1. **Separación de Responsabilidades**
- Componentes presentacionales separan renderizado de lógica
- Hooks contienen la lógica de estado y datos
- Types definen contratos de datos

### 2. **Modularización**
- Cada feature está encapsulada en su carpeta
- Barrel exports (`index.ts`) facilitan importaciones limpias
- Componentes globales en `src/components/`

### 3. **Reutilización**
- `MatchCard` es usado en `MatchesVisualization`
- `SectionContainer` disponible para nuevas secciones
- `useMatches` puede ser usado en múltiples páginas

### 4. **Tipado Fuerte**
- Props interface para cada componente
- Tipos exportados y reutilizables
- TypeScript strict mode

### 5. **Escalabilidad**
- Fácil agregar nuevas secciones sin modificar existentes
- Mock data → API real sin cambios en componentes
- Estructura preparada para agregar filtros, búsqueda, etc.

---

## Flujo de Datos

```
MainPage (orquestador)
    ├── useMatches() ──→ mockMatches
    ├── features (hardcodeadas)
    │
    ├── MainLayout
    │   ├── Header
    │   ├── Main (children)
    │   │   ├── Hero
    │   │   ├── MediaSection
    │   │   │   └── Features grid
    │   │   └── MatchesVisualization
    │   │       └── MatchCard (mapeado)
    │   └── Footer
```

---

## Pautas de Expansión

### Agregar nueva sección
1. Crear componente en `features/main/components/`
2. Agregar tipos en `features/main/types/main.types.ts`
3. Importar en `MainPage.tsx`
4. Renderizar entre secciones existentes

### Migrar a datos reales
1. Reemplazar `mockMatches` en `useMatches.ts`
2. Agregar llamadas a servicio API
3. Mantener la misma interfaz del hook

### Agregar filtros
1. Extender `UseMatchesOptions` en `useMatches.ts`
2. Agregar UI para filtros en `MatchesVisualization`
3. Llamar `filter()` del hook

---

## Archivos de Configuración Utilizados

- **Tailwind CSS**: Estilos (colores, espaciado, responsive)
- **TypeScript**: Tipado de componentes y datos
- **React**: Componentes funcionales con hooks
- **React Router**: Navegación (MainPage en ruta `/`)

---

## Próximos Pasos Recomendados

1. ✅ Agregar archivo de imagen `src/assets/images/fondoMain.png`
2. Mejorar animaciones en Hero (fade-in, bounce)
3. Implementar servicio API para partidos reales
4. Agregar página de detalles de partido
5. Implementar sistema de filtros avanzados
6. Agregar autenticación a funciones de inscripción
7. Implementar responsividad completa (tablet, mobile)
8. Agregar tests (unitarios, integración)

---

## Referencias

- **TypeScript**: Tipado fuerte para mantenibilidad
- **React Hooks**: Reutilización de lógica de estado
- **Tailwind CSS**: Estilos consistentes y rápidos
- **Feature-based Architecture**: Escalabilidad y modularización
