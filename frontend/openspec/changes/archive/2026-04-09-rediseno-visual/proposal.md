# Proposal: Rediseño visual moderno y minimalista

## Intención

Transformar el frontend de GymApp en una aplicación con diseño moderno, minimalista y profesional. El objetivo es mejorar la experiencia de usuario con mejor tipografía, espaciado consistente, iconos, y un sistema de diseño cohesivo sin perder la funcionalidad actual.

## Alcance

### En Scope
- Rediseñar sistema de componentes UI con estilos modernos
- Agregar iconos a la navegación y acciones principales
- Mejorar tipografía y espaciado (spacing system)
- Crear layout con sidebar en lugar de navbar horizontal
- Actualizar el look de cards, botones, inputs con estilos premium
- Mantener dark mode funcional con mejor integración
- Agregar skeleton loaders para estados de carga

### Out of Scope
- Nuevas funcionalidades (solo diseño)
- Cambios en el backend
- Migración a otra librería de componentes
- Tests de UI (por ahora)

## Capabilities

### New Capabilities
- `visual-redesign`: Sistema de diseño completo con tokens, componentes mejorados, iconos

### Modified Capabilities
- `dark-mode`: Se mejora la integración visual en ambos temas

## Enfoque

Mejorar el diseño visual manteniendo la arquitectura actual de React + Tailwind + TypeScript. Se implementará un sistema de diseño personalizado basado en:
- shadcn/ui como inspiración (componentes accesibles y bien diseñados)
- Iconos Lucide React
- Nuevo layout con sidebar collapsible
- Skeleton loaders para mejor UX

## Áreas Afectadas

| Área | Impacto | Descripción |
|------|---------|-------------|
| `src/App.tsx` | Modificado | Nuevo layout con sidebar |
| `src/components/ui/index.tsx` | Modificado | Componentes con estilos premium |
| `src/pages/*.tsx` | Modificado | Mejora visual de todas las páginas |
| `src/index.css` | Modificado | Nuevas variables y tokens de diseño |
| `tailwind.config.js` | Modificado | Extender configuración |
| `src/components/Layout.tsx` | Nuevo | Componente de layout con sidebar |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Romper funcionalidad existente | Baja | Mantener estructura de componentes, solo cambiar estilos |
| Incompatibilidad con dark mode | Media | Probar ambos temas en cada componente |
| Tiempo de desarrollo | Alta | Dividir en fases small |

## Plan de Rollback

1. Mantener backup de archivos originales
2. Si hay errores, revertir cambios de CSS/Tailwind
3. Los cambios son puramente visuales, no hay cambio de lógica

## Dependencias

- `lucide-react`: Para iconos modernos
- No hay dependencias nuevas de backend

## Criterios de Éxito

- [ ] Diseño visual moderno y minimalista implementado
- [ ] Sidebar navigable en lugar de navbar horizontal
- [ ] Iconos en navegación y acciones principales
- [ ] Dark mode funciona correctamente
- [ ] Skeleton loaders en estados de carga
- [ ] Build sin errores
