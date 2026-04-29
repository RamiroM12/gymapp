# Design: Implementar páginas de Pagos, Membresías y Tipos de Membresía

## Arquitectura de Componentes

### Estructura de páginas

```
src/pages/
├── ClientesPage.tsx         (ya existe)
├── NuevoClientePage.tsx     (ya existe)
├── TiposMembresiaPage.tsx   (NUEVO)
├── MembresiasPage.tsx       (NUEVO)
└── PagosPage.tsx            (NUEVO)
```

### Relación con componentes existentes

```
App.tsx
├── ClientesPage
├── NuevoClientePage
├── TiposMembresiaPage   ← NUEVO
├── MembresiasPage       ← NUEVO
└── PagosPage            ← NUEVO

Cada página usa:
├── components/ui/Button
├── components/ui/Input
├── components/ui/Select
├── components/ui/Card
├── components/ui/Badge
├── components/ui/Loading
└── api/* (Axios calls)
```

## Diseño de Cada Página

### 1. TiposMembresiaPage

```
+--------------------------------------------------+
|  Tipos de Membresía                    [+ Nuevo] |
+--------------------------------------------------+
|  [Barra de búsqueda por nombre...]               |
+--------------------------------------------------+
|  +----------------+  +----------------+          |
|  | Tipo: Básico   |  | Tipo: Premium  |          |
|  | 30 días        |  | 90 días        |          |
|  | $500           |  | $1200          |          |
|  | [Eliminar]     |  | [Eliminar]     |          |
|  +----------------+  +----------------+          |
+--------------------------------------------------+
|  +-------------------------------------------+   |
|  | Formulario de creación (collapsible)      |   |
|  | Nombre: [_____]                           |   |
|  | Duración: [_____] días                    |   |
|  | Precio: $ [_____]                         |   |
|  | [Crear]                                   |   |
|  +-------------------------------------------+   |
+--------------------------------------------------+
```

**Estado del componente:**
```ts
interface TiposMembresiaState {
  tipos: TipoMembresia[];
  loading: boolean;
  showForm: boolean;
  busqueda: string;
  formData: CreateTipoMembresiaDto;
}
```

### 2. MembresiasPage

```
+--------------------------------------------------+
|  Membresías                              [+ Nueva]|
+--------------------------------------------------+
|  [Buscar por nombre de cliente...]              |
+--------------------------------------------------+
|  +----------------+  +----------------+          |
|  | Juan Pérez     |  | María García  |          |
|  | Tipo: Premium  |  | Tipo: Básico  |          |
|  | Desde: 1/1/26  |  | Desde: 5/1/26 |          |
|  | Hasta: 1/4/26  |  | Hasta: 4/2/26 |          |
|  | Estado: Activa |  | Estado: Activa|          |
|  +----------------+  +----------------+          |
+--------------------------------------------------+
```

**Estado del componente:**
```ts
interface MembresiasState {
  membresias: Membresia[];
  loading: boolean;
  busqueda: string;
}
```

### 3. PagosPage

```
+--------------------------------------------------+
|  Pagos                                         |
+--------------------------------------------------+
|  [Buscar por nombre de cliente...]              |
+--------------------------------------------------+
|  +------+----------+------+-------+---------+    |
|  |Fecha | Cliente  |Membresía|Monto | Método  |   |
|  +------+----------+------+-------+---------+    |
|  |1/1/26| Juan P.  |Premium |$1200 | Efectivo|    |
|  |5/1/26| María G. |Básico  |$500  | Tarjeta |    |
|  +------+----------+------+-------+---------+    |
+--------------------------------------------------+
```

**Estado del componente:**
```ts
interface PagosState {
  pagos: Pago[];
  loading: boolean;
  busqueda: string;
}
```

## Decisiones de Diseño

### 1. Búsqueda del lado del cliente
Se implementa filtrando el array en memoria en lugar de llamar a un endpoint de búsqueda. Esto es más rápido para conjuntos de datos pequeños/medios.

### 2. Componentes reutilizados
Se usan los mismos componentes UI existentes:
- `Card` para mostrar cada registro
- `Input` para formularios y búsqueda
- `Button` para acciones
- `Badge` para estados
- `Loading` para estados de carga

### 3. Manejo de errores
- Cada llamada API envolvida en try-catch
- Mensajes de error mostrados con `alert()`
- Estados de carga visibles durante operaciones

## Rutas de API

### Actualizar App.tsx

```tsx
// Agregar las nuevas páginas al menú
type Page = 'clientes' | 'membresias' | 'tipos-membresia' | 'pagos' | 'nuevo-cliente';

// En renderPage:
case 'tipos-membresia':
  return <TiposMembresiaPage />;
case 'membresias':
  return <MembresiasPage />;
case 'pagos':
  return <PagosPage />;
```

## Testing Manual

### Tipos de Membresía
1. Navegar a "Tipos de Membresía"
2. Verificar que aparecen las cards
3. Click en "Nuevo" → completar formulario → verificar que aparece en la lista
4. Click en "Eliminar" → verificar que desaparece de la lista

### Membresías
1. Navegar a "Membresías"
2. Verificar que aparecen las cards
3. Escribir en búsqueda → verificar filtrado

### Pagos
1. Navegar a "Pagos"
2. Verificar que aparece la tabla
3. Escribir en búsqueda → verificar filtrado

## Riesgos Identificados

1. **Endpoint de eliminación de tipo membresía**: Verificar que existe en el backend
2. **Fechas en formato**: Asegurar formato legible para el usuario
3. **Datos nulos**: Manejar casos donde las relaciones sean null
