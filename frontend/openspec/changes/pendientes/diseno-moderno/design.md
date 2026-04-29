# Design: Nuevo diseño visual y modo oscuro

## Arquitectura del Tema

### Sistema de temas con Tailwind
```css
/* Variables CSS para temas */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
}

.dark {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent: #60a5fa;
  --accent-hover: #3b82f6;
}
```

### Estructura de archivos a modificar

1. `src/index.css` - agregar variables de tema
2. `src/App.tsx` - agregar ThemeProvider y toggle
3. `src/components/ui/index.tsx` - usar variables CSS
4. Todas las páginas - verificar estilos

## Decisiones de Diseño

### Colores
- **Modo claro**:
  - Fondo: blanco con acentos en gris claro
  - Texto: gris oscuro
  - Acentos: azul moderno
  
- **Modo oscuro**:
  - Fondo: gris oscuro (#1f2937)
  - Texto: blanco suave
  - Acentos: azul claro

### Componente ThemeToggle
- Ícono de sol para modo claro
- Ícono de luna para modo oscuro
- Ubicado en el navbar a la derecha

## Implementación

### Paso 1: Actualizar CSS con variables
Agregar variables CSS y clases dark en Tailwind config

### Paso 2: Crear ThemeContext
Provider de React context para manejar el tema

### Paso 3: Actualizar componentes UI
Reemplazar colores hardcodeados con variables CSS

### Paso 4: Agregar toggle al navbar
Botón para cambiar entre temas
