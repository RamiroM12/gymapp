# Proposal: Página de Detalle de Cliente

## Intención

Crear una página de detalle de cliente que muestre toda la información del cliente (datos personales), sus membresías activas e inactivas, y sus pagos. También permitirá actualizar los datos del cliente.

## Alcance

### En Scope
- Página de detalle de cliente accesible al hacer click en una card de cliente
- Mostrar datos personales del cliente (nombre, apellido, teléfono, email, fecha de registro)
- Listar todas las membresías del cliente (activas e inactivas) con detalles
- Listar todos los pagos del cliente
- Formulario para actualizar datos del cliente
- Botón para volver a la lista de clientes

### Out of Scope
- Eliminar cliente (por ahora)
- Agregar/eliminar membresías desde esta página
- Historial de cambios

## Capabilities

### New Capabilities
- `cliente-detalle`: Nueva página de detalle de cliente con datos, membresías y pagos

### Modified Capabilities
- Ninguno

## Enfoque

Usar la navegación existente (cambiar el estado `currentPage` para incluir un cliente seleccionado). Crear una nueva página `ClienteDetallePage` que reciba el ID del cliente y muestre toda la información.

## Áreas Afectadas

| Área | Impacto | Descripción |
|------|---------|-------------|
| `src/App.tsx` | Modificado | Agregar estado para cliente seleccionado |
| `src/pages/ClienteDetallePage.tsx` | Nuevo | Nueva página de detalle |
| `src/pages/ClientesPage.tsx` | Modificado | Hacer clickeable las cards |
| `src/api/clienteApi.ts` | Modificado | Agregar método para obtener cliente por ID |

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Cliente no existe | Baja | Validar ID y mostrar mensaje |
| Error al cargar datos | Media | Mostrar estados de carga/error |
| Datos incompletos | Baja | Usar valores por defecto |

## Plan de Rollback

- Revertir cambios en App.tsx y ClientesPage
- Eliminar archivo de nueva página

## Dependencias

- API existente de clientes
- API existente de membresías
- API existente de pagos

## Criterios de Éxito

- [ ] Al hacer click en cliente se abre la página de detalle
- [ ] Se muestran datos personales del cliente
- [ ] Se listan todas las membresías del cliente
- [ ] Se listan todos los pagos del cliente
- [ ] Se pueden actualizar los datos del cliente
- [ ] Diseño consistente con el resto de la app