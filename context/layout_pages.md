# Estructura de Layout y Páginas

Documento de referencia para mantener un diseño consistente en todas las páginas de la aplicación. Sigue Clean Architecture, principios SOLID y arquitectura modular por features.

---

## Jerarquía de Estructura

```
App (Routes)
  └── Layout (envuelve el contenido de la ruta)
        └── Page (contenido específico)
              └── Feature Components / UI Components
```

- **Layout**: Define la estructura común (header, contenido centrado, sidebar, etc.) y envolve `children` por composición.
- **Page**: Solo ensambla componentes y delega la lógica a hooks. No debe contener lógica de negocio directa.
- **Componentes**: Presentacionales (UI) o de feature (módulo específico).

---

## Layouts Disponibles

### AuthLayout

**Ruta**: `src/layouts/AuthLayout.tsx`

**Uso**: Pantallas de autenticación (login, registro, recuperar contraseña).

**Estructura**:
- Contenedor a pantalla completa con Flexbox centrado.
- Fondo `bg-slate-950`.
- Contenido centrado vertical y horizontalmente.
- Ancho máximo `max-w-md` para el contenido.

**Patrón**:
```tsx
<main className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
  <div className="w-full max-w-md">{children}</div>
</main>
```

---

### MainLayout (pendiente de implementar)

**Uso**: Páginas internas tras autenticación (dashboard, listados, formularios).

**Propuesta de estructura**:
- Header fijo con navegación.
- Área de contenido principal con padding consistente.
- Fondo general `bg-slate-950`.
- Flexbox o Grid para la disposición, sin `position: absolute` para layout general.

---

## Paleta de Colores (Referencia)

Ver [paleta_colores.md](./paleta_colores.md) para valores exactos.

| Uso en layout/páginas | Clase Tailwind | Descripción |
|----------------------|----------------|-------------|
| Fondo de página      | `bg-slate-950` | Fondo oscuro base |
| Sección destacada    | `bg-[#0F172A]/85` | Slate oscuro (cabecera de cards) |
| Sección secundaria   | `bg-[#0F172A]/46` | Slate medio (cuerpo de cards) |
| Acciones primarias   | `bg-[#71AB46]` | Botones, enlaces principales |
| Bordes sutiles       | `border-white/10` o `border-white/20` | Separadores, contornos |
| Texto principal      | `text-white`, `text-slate-50` | Títulos y contenido |
| Texto secundario     | `text-slate-200`, `text-slate-400` | Etiquetas, placeholders |

---

## Reglas de Maquetación

1. **Flexbox y Grid**: Usar `flex`, `flex-col`, `gap-*`, `grid`, `grid-cols-*` para disposición.
2. **Prohibido `absolute` para layout general**: Solo excepciones puntuales (tooltips, dropdowns).
3. **Espaciado consistente**: `gap-4`, `gap-6`, `p-6`, `px-8`, `py-6` como valores de referencia.
4. **Bordes redondeados**: `rounded-lg`, `rounded-xl`, `rounded-2xl` según nivel de contenedor.

---

## Estructura de una Card/Ventana

Patrón de ventana bipartita (como en Login):

```
┌─────────────────────────────────┐
│  Cabecera (slate oscuro 85%)    │  ← Título, cabecera
│  bg-[#0F172A]/85                │
├─────────────────────────────────┤
│  Cuerpo (slate medio 46%)       │  ← Contenido, formulario
│  bg-[#0F172A]/46                │
└─────────────────────────────────┘
```

- Contenedor: `rounded-2xl overflow-hidden border border-white/10 shadow-2xl`
- Sin mezclar `absolute` para la división; usar dos bloques `div` apilados.

---

## Mapeo Rutas → Layouts

| Ruta base | Layout | Ejemplo de páginas |
|-----------|--------|--------------------|
| `/auth/*` | AuthLayout | Login, Registro |
| `/` (app interna) | MainLayout | Dashboard, listados |

---

## Checklist para Nuevas Páginas

- [ ] La página va en `src/pages/`.
- [ ] La lógica está en un Custom Hook (en `src/features/[modulo]/hooks/`).
- [ ] La página usa el layout adecuado según la ruta.
- [ ] Los colores siguen la paleta (slate oscuro, slate medio, verde principal).
- [ ] Maquetación con Flexbox/Grid, sin `absolute` para layout.
- [ ] Estados de carga y error considerados en la UI.
