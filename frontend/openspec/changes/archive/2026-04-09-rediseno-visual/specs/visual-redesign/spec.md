# Delta for visual-redesign

## ADDED Requirements

### Requirement: Sistema de Diseño Moderno

La aplicación debe implementar un sistema de diseño moderno, minimalista y profesional que mejore la experiencia de usuario manteniendo la funcionalidad existente.

#### Scenario: Layout con Sidebar

- GIVEN el usuario abre la aplicación
- WHEN el layout se renderiza
- THEN debe mostrar un sidebar navegable en lugar de navbar horizontal
- AND el sidebar debe ser collapsible en móviles

#### Scenario: Componentes con Estilos Premium

- GIVEN cualquier componente UI se renderiza
- WHEN el usuario interactúa con él
- THEN debe mostrar estados de hover, focus y active bien definidos
- AND las transiciones deben ser suaves (150-200ms)

### Requirement: Iconografía Consistente

La aplicación debe usar iconos Lucide React de manera consistente en toda la navegación y acciones principales.

#### Scenario: Iconos en Navegación

- GIVEN el usuario visualiza el sidebar
- WHEN cada elemento de menú se renderiza
- THEN debe mostrar un icono representativo junto al label
- AND los iconos deben ser consistentes en tamaño (20px)

#### Scenario: Iconos en Acciones

- GIVEN el usuario visualiza una card o formulario
- WHEN hay botones de acción (editar, eliminar, crear)
- THEN debe mostrar iconos apropiados para cada acción

### Requirement: Skeleton Loaders

La aplicación debe mostrar skeleton loaders durante la carga de datos para mejorar la percepción de rendimiento.

#### Scenario: Skeleton en Lista de Clientes

- GIVEN los clientes están cargando
- WHEN la página de clientes se renderiza
- THEN debe mostrar 6-9 skeleton cards simulando la estructura real
- AND el skeleton debe tener animación de pulso

#### Scenario: Skeleton en Tabla de Pagos

- GIVEN los pagos están cargando
- WHEN la página de pagos se renderiza
- THEN debe mostrar skeleton de tabla con filas simuladas

### Requirement: Dark Mode Mejorado

El modo oscuro debe integrarse completamente con el nuevo diseño visual, manteniendo la legibilidad y el contraste adecuado.

#### Scenario: Transición entre Temas

- GIVEN el usuario hace clic en el toggle de tema
- WHEN el tema cambia de claro a oscuro o viceversa
- THEN la transición debe ser suave (sin parpadeo)
- AND todos los componentes deben actualizar sus estilos correctamente

#### Scenario: Contraste en Dark Mode

- GIVEN el modo oscuro está activo
- WHEN el usuario visualiza texto en cards
- THEN el contraste debe cumplir WCAG AA (mínimo 4.5:1)
- AND los colores de acento deben ser legibles sobre fondos oscuros

### Requirement: Espaciado y Tipografía Consistente

La aplicación debe usar un sistema de espaciado y tipografía consistente basado en tokens de diseño.

#### Scenario: Sistema de Espaciado

- GIVEN cualquier componente se renderiza
- WHEN los elementos tienen márgenes o padding
- THEN deben usar los tokens de espaciado de Tailwind (4, 6, 8, 12, 16, 24, 32)
- AND no debe haber espaciado arbitrario (sin p-[23px] o类似)

#### Scenario: Tipografía

- GIVEN texto se renderiza en la aplicación
- WHEN se muestra un heading (h1, h2, h3)
- THEN debe usar las clases de Tailwind para heading (text-2xl font-bold, etc.)
- AND el texto body debe usar text-sm o text-base según el contexto
