# Spec: Implementar páginas de Pagos, Membresías y Tipos de Membresía

## Overview
Agregar las funcionalidades faltantes en el frontend para gestionar tres recursos: Tipos de Membresía, Membresías y Pagos.

## Requisitos Funcionales

### 1. Tipos de Membresía

#### 1.1 Listar Tipos de Membresía
- **Given** el usuario navega a la sección "Tipos de Membresía"
- **When** la página carga
- **Then** se muestran todos los tipos de membresía activos en cards
- **And** cada card muestra: nombre, duración en días, precio

#### 1.2 Crear Tipo de Membresía
- **Given** el usuario hace clic en "Nuevo Tipo"
- **When** se muestra el formulario con campos: nombre, duración (días), precio
- **And** el usuario completa los datos y hace clic en "Crear"
- **Then** se crea el tipo de membresía en el backend
- **And** la lista se actualiza automáticamente

#### 1.3 Eliminar Tipo de Membresía
- **Given** el usuario visualiza un tipo de membresía
- **When** hace clic en el botón "Eliminar"
- **Then** se elimina lógicamente (soft delete) en el backend
- **And** la lista se actualiza

### 2. Membresías

#### 2.1 Listar Membresías
- **Given** el usuario navega a la sección "Membresías"
- **When** la página carga
- **Then** se muestran todas las membresías en cards
- **And** cada card muestra: cliente (nombre completo), tipo de membresía, fecha inicio, fecha fin, estado (activa/inactiva)

#### 2.2 Buscar Membresías por Cliente
- **Given** el usuario está en la página de membresías
- **When** escribe en el campo de búsqueda
- **Then** se filtran las membresías por nombre del cliente

### 3. Pagos

#### 3.1 Listar Pagos
- **Given** el usuario navega a la sección "Pagos"
- **When** la página carga
- **Then** se muestran todos los pagos en una tabla o cards
- **And** cada pago muestra: cliente, membresía, método de pago, monto, fecha, estado

#### 3.2 Buscar Pagos por Cliente
- **Given** el usuario está en la página de pagos
- **When** escribe en el campo de búsqueda
- **Then** se filtran los pagos por nombre del cliente

## Requisitos No Funcionales

- Usar componentes UI existentes (Button, Input, Select, Card, Badge, Loading)
- Mantener consistencia de estilos con páginas existentes
- Manejar errores de API con mensajes apropiados
- Mostrar estados de carga (Loading) durante llamadas asíncronas

## Componentes a Crear

1. `src/pages/TiposMembresiaPage.tsx` - Página completa de tipos de membresía
2. `src/pages/MembresiasPage.tsx` - Página completa de membresías
3. `src/pages/PagosPage.tsx` - Página completa de pagos

## API Endpoints a Consumir

### Tipos de Membresía
- `GET /api/TipoMembresias/GetAll` - Listar todos
- `POST /api/TipoMembresias/Create` - Crear nuevo
- `PUT /api/TipoMembresias/Update/{id}` - Actualizar
- `DELETE /api/TipoMembresias/Delete/{id}` - Eliminar

### Membresías
- `GET /api/Membresias/GetAll` - Listar todas
- `GET /api/Membresias/GetById/{id}` - Listar por cliente
- `POST /api/Membresias/Buy` - Comprar membresía
- `PUT /api/Membresias/Desactivate/{id}` - Desactivar
- `PUT /api/Membresias/Activate/{id}` - Activar

### Pagos
- `GET /api/Pagos/GetAll` - Listar todos
- `GET /api/Pagos/GetByClienteId/{id}` - Listar por cliente
- `POST /api/Pagos/Create` - Registrar pago

## Edge Cases a Considerar

1. **Sin datos**: Mostrar mensaje "No hay..." cuando no hay registros
2. **Error de API**: Mostrar alert con el mensaje de error
3. **Validaciones**: Usar validaciones del DTO del backend (ya implementadas en el backend, el frontend las recibe)
