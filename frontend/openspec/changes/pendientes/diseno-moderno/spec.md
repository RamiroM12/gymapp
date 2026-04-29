# Spec: Nuevo diseño visual y modo oscuro

## Overview
Modernizar el frontend de GymApp con un diseño más atractivo y agregar soporte para modo oscuro.

## Requisitos Funcionales

### 1. Modo Oscuro
- **Given** el usuario hace clic en el botón de tema
- **When** se alterna entre modo claro y oscuro
- **Then** toda la app cambia de color instantáneamente
- **And** la preferencia se guarda en localStorage

### 2. Diseño Moderno
- Colores más vibrantes y profesionales
- Mejores espaciados y tipografía
- Cards con mejores sombras y bordes redondeados
- Animaciones suaves en transiciones

### 3. Toggle de Tema
- **Given** el usuario está en cualquier página
- **When** hace clic en el ícono de sol/luna en el navbar
- **Then** el tema cambia y se recuerda para futuras visitas

## Requisitos No Funcionales
- Transiciones suaves entre temas
- Sin parpadeo al cambiar de tema
- Compatible con todos los navegadores modernos

## Componentes a Modificar
- `App.tsx` - agregar estado del tema y provider
- `index.css` - agregar variables de colores para ambos temas
- Componentes UI - actualizar estilos con variables CSS
