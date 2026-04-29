# Design: Rediseño Visual Moderno y Minimalista

## Enfoque Técnico

Implementar un sistema de diseño moderno manteniendo la arquitectura actual de React + Tailwind. Se creará un componente Layout con sidebar, se actualizarán los componentes UI con estilos premium, y se agregarán iconos Lucide.

## Decisiones de Arquitectura

### Decisión: Estructura del Layout

**Elección**: Sidebar colapsable en lugar de navbar horizontal
**Alternativas consideradas**: Mantener navbar, tabs horizontales
**Rationale**: El sidebar es más escalable para muchas páginas, permite mejor uso del espacio horizontal, y se siente más "app-like"

### Decisión: Sistema de Iconos

**Elección**: Lucide React para todos los iconos
**Alternativas consideradas**: React Icons, FontAwesome
**Rationale**: Lucide es más ligero, tiene diseño consistente, y se integra bien con Tailwind

### Decisión: Skeleton Loaders

**Elección**: Componentes Skeleton personalizados con CSS
**Alternativas consideradas**: react-loading-skeleton, shadcn/ui skeleton
**Rationale**: Mayor control sobre estilos y colores, menos dependencias

### Decisión: Estilos de Componentes

**Elección**: Estilos inline con CSS variables + Tailwind
**Alternativas consideradas**: styled-components, CSS modules
**Rationale**: Mantiene consistencia con el dark mode actual, menos dependencias

## Flujo de Datos

```
App.tsx (Layout)
    │
    ├── Sidebar.tsx (navigation + icons)
    │       └── ThemeToggle
    │
    └── Page Content
            ├── ClientesPage
            ├── MembresiasPage
            ├── TiposMembresiaPage
            ├── PagosPage
            └── NuevoClientePage
```

## Cambios de Archivos

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/components/Layout.tsx` | Crear | Layout principal con sidebar |
| `src/components/Sidebar.tsx` | Crear | Navegación lateral con iconos |
| `src/components/ui/Skeleton.tsx` | Crear | Componente skeleton loader |
| `src/components/ui/index.tsx` | Modificar | Agregar Skeleton, mejorar estilos |
| `src/App.tsx` | Modificar | Usar Layout en lugar de navbar |
| `src/index.css` | Modificar | Nuevos tokens de diseño |
| `tailwind.config.js` | Modificar | Extender configuración |

## Interfaces / Contratos

```typescript
// Navigation item type
interface NavItem {
  id: Page;
  label: string;
  icon: LucideIcon;
}

// Sidebar props
interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

// Skeleton props
interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'table' | 'text';
}
```

## Estrategia de Testing

| Capa | Qué Testear | Enfoque |
|------|-------------|---------|
| Visual | Componentes renderizan correctamente | Revisión manual |
| Responsive | Sidebar colapsable en móvil | Probar en diferentes tamaños |
| Dark Mode | Todos los componentes en ambos temas | Toggle manual |

## Migración / Rollout

No se requiere migración. Los cambios son puramente visuales.

## Preguntas Abiertas

- [x] ¿El usuario quiere animaciones adicionales? → SÍ
- [x] ¿Preference de tamaño del sidebar? → Sidebar colapsable

### Decisión: Animaciones del Sidebar

**Elección**: Sidebar con animación de collapse usando CSS transitions
**Alternativas consideradas**: Framer Motion, React Spring
**Rationale**: CSS transitions es más ligero y suficiente para este caso de uso

### Decisión: Animaciones del Menú

**Elección**: Menú collapsible con transición suave de height
**Rationale**: Mejora UX, permite al usuario enfocarse en contenido relevante

---
**Próximo paso**: Ready for tasks (sdd-tasks).
