# Design: Página de Detalle de Cliente

## Enfoque Técnico

Crear una nueva página `ClienteDetallePage` que muestre la información completa del cliente. Usar el sistema de navegación existente con estado para pasar el ID del cliente.

## Decisiones de Arquitectura

### Decisión: Estructura de Navegación

**Elección**: Usar estado en App.tsx con objeto `currentPage` que puede ser string o objeto
**Alternativas consideradas**: Routeo con react-router, URL con query params
**Rationale**: Mantiene consistencia con el sistema actual de navegación por estado

### Decisión: Carga de Datos

**Elección**: Carga en paralelo de cliente, membresías y pagos
**Rationale**: Mejor rendimiento, cada sección es independiente

### Decisión: Edición de Datos

**Elección**: Modal o sección collapsible para edición
**Rationale**: Menos disruptive, el usuario puede editar sin perder contexto

## Flujo de Datos

```
App.tsx
  └── currentPage: { id: 'cliente-detalle', clienteId: number }
        │
        └── ClienteDetallePage (clienteId)
              ├── clienteApi.getById(id) → datos del cliente
              ├── membresiaApi.getByClienteId(id) → membresías del cliente
              └── pagoApi.getByClienteId(id) → pagos del cliente
```

## Cambios de Archivos

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `src/App.tsx` | Modificar | Agregar tipo para navegación con params |
| `src/pages/ClienteDetallePage.tsx` | Crear | Nueva página de detalle |
| `src/pages/ClientesPage.tsx` | Modificar | Cards clickeables |
| `src/api/clienteApi.ts` | Modificar | Agregar getById |

## Interfaces

```typescript
type Page = 
  | 'clientes' 
  | 'membresias' 
  | 'tipos-membresia' 
  | 'pagos' 
  | 'nuevo-cliente'
  | { id: 'cliente-detalle', clienteId: number };

// ClienteDetallePage Props
interface ClienteDetallePageProps {
  clienteId: number;
  onBack: () => void;
}
```

## Estrategia de Testing

- Verificar que las cards de cliente son clickeables
- Verificar que se carga la información correcta
- Verificar que la edición funciona
- Verificar diseño consistente con el resto

## Preguntas Abiertas

- [ ] ¿El usuario quiere que las membresías sean clickeables también?
- [ ] ¿Necesita poder editar las membresías desde esta página?