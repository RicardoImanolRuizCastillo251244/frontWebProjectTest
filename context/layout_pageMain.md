# Layout - Página Principal (CourtMatch)

## Estructura General de la Página

```
┌─────────────────────────────────────────┐
│        CABECERA (80% Slate)             │
│  Color: #0F172ACD (Slate cabecera)    │
│  Altura: ~80px                          │
│  Contenido: Logo + Nav + Botones       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│     PRESENTACIÓN + PARTE MEDIA           │
│     (FUSIONADAS - Primero visible)      │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │   PRESENTACIÓN (Hero Section)    │  │
│  │ Fondo: src/assets/images/       │  │
│  │         fondoMain.png           │  │
│  │ Overlay: Slate medium 46%       │  │
│  │ Contenido: Titulo + CTA          │  │
│  │ Altura: ~500-600px              │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │    PARTE MEDIA (Container)       │  │
│  │ Color: #0D3472 (Azul principal)  │  │
│  │ Contenido: A futuro              │  │
│  │ Altura: ~300-400px (flexible)    │  │
│  │ Padding: 40px 20px               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  VISUALIZACIÓN DE PARTIDOS (Matches)    │
│  Color: #0F172A (Slate oscuro)         │
│  Contenido: Grid de partidos            │
│  Padding: 60px 20px                     │
│  Altura: Dinámica (depende del contenido)
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           FOOTER ELEGANTE               │
│  Color: #0F172A (Slate oscuro)         │
│  © 2026 CourtMatch                      │
│  Links: Redes sociales, Legal, Support │
│  Altura: ~200px (flexible)              │
└─────────────────────────────────────────┘
```

---

## Descripción Detallada de Secciones

### 1. **CABECERA**
- **Color de fondo**: `#0F172ACD` (Slate cabecera - 80% opacidad)
- **Altura**: 80px
- **Pos**: Fixed (top)
- **Z-index**: Alto para estar sobre otros elementos
- **Contenido**: 
  - Logo CourtMatch (izquierda)
  - Menú de navegación (centro)
  - Botones de Login/Register (derecha)

---

### 2. **PRESENTACIÓN (Hero Section)**
- **Imagen de fondo**: `src/assets/images/fondoMain.png`
- **Overlay**: Slate medio (#0F172A/46) para oscurecer la imagen
- **Altura**: 500-600px
- **Contenido**:
  - Título principal grande y atractivo
  - Subtítulo descriptivo
  - Botón de llamada a acción (CTA)
- **Efecto**: La imagen se ve de fondo con el overlay aplicado
- **Posicionamiento**: `relative`, `bg-cover`, `bg-center`

---

### 3. **PARTE MEDIA (Container Principal)**
- **Color**: `#0D3472` (Azul principal)
- **Altura**: 300-400px (puede expandirse según contenido)
- **Padding**: 40px 20px
- **Contenido**: Contenedor vacío listo para futuras secciones
- **Alineación**: Centrado, con máximo ancho (max-w-7xl)
- **Fusión visual**: Conecta fluidamente con el hero

---

### 4. **VISUALIZACIÓN DE PARTIDOS**
- **Color de fondo**: `#0F172A` (Slate oscuro)
- **Padding**: 60px 20px
- **Contenido**: 
  - Título "Próximos Partidos"
  - Grid responsivo de tarjetas de partidos
- **Estructura**: Cards con:
  - Hora del partido
  - Equipos enfrentados
  - Ubicación
  - Botón de inscripción

---

### 5. **FOOTER ELEGANTE**
- **Color de fondo**: `#0F172A` (Slate oscuro)
- **Altura**: 200px (flexible)
- **Estructura**:
  ```
  ┌─────────────────────────────────────┐
  │   FOOTER CONTENT                    │
  ├─────────────────────────────────────┤
  │ Logo/Nombre | Enlaces Rápidos       │
  │ CourtMatch  | Sobre Nosotros        │
  │             | Contacto              │
  │             | Redes Sociales        │
  ├─────────────────────────────────────┤
  │ © 2026 CourtMatch. Todos los       │
  │ derechos reservados.               │
  └─────────────────────────────────────┘
  ```

- **Elementos**:
  - Logo + Branding CourtMatch (izquierda)
  - Enlaces útiles (centro)
  - Iconos de redes sociales (derecha)
  - Barra de copyright (abajo)
  - Colores de links: Verde principal (#71AB46) en hover

---

## Paleta de Colores Utilizada

| Sección | Color | Código |
|---------|-------|--------|
| Cabecera | Slate Cabecera | `#0F172ACD` (80%) |
| Hero Overlay | Slate Medio | `#0F172A/46` |
| Parte Media | Azul Principal | `#0D3472` |
| Partidos + Footer | Slate Oscuro | `#0F172A` |
| Acentos/Hover | Verde Principal | `#71AB46` |

---

## Breakpoints Responsivos

- **Mobile** (< 640px): Full width, single column
- **Tablet** (640px - 1024px): 2 columns para grid
- **Desktop** (> 1024px): 3-4 columns para grid, max-width activado

---

## Notas de Implementación

- Usar Tailwind CSS para aplicar colores y estilos
- Mantener coherencia de espaciado (usar escala 4, 8, 12, 16, 20, 24, etc.)
- Asegurar que los colores con opacidad se apliquen correctamente en Tailwind
- Hero section debe ser visualmente impactante pero legible
- Footer debe ser sticky en pantallas cortas
