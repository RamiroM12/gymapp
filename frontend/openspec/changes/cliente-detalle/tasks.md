# Tasks: Página de Detalle de Cliente

## Fase 1: Backend API (si es necesario)

- [x] 1.1 Revisar si existe endpoint para obtener cliente por ID - YA EXISTE
- [x] 1.2 Si no existe, crear endpoint en backend - NO NECESARIO

## Fase 2: Frontend - API

- [x] 2.1 Agregar método `getById` en `src/api/clienteApi.ts` - YA EXISTE
- [x] 2.2 Verificar que existen métodos para membresías por cliente - YA EXISTE
- [x] 2.3 Verificar que existen métodos para pagos por cliente - YA EXISTE

## Fase 3: Frontend - Navegación

- [x] 3.1 Modificar tipo `Page` en `src/App.tsx` para soportar objeto con params
- [x] 3.2 Actualizar función `renderPage` para manejar el nuevo tipo

## Fase 4: Frontend - ClientesPage

- [x] 4.1 Hacer las cards de clientes clickeables
- [x] 4.2 Agregar cursor pointer y efecto hover
- [x] 4.3 Conectar click con navegación

## Fase 5: Frontend - Nueva Página

- [x] 5.1 Crear `src/pages/ClienteDetallePage.tsx`
- [x] 5.2 Implementar carga de datos (cliente, membresías, pagos)
- [x] 5.3 Mostrar datos del cliente
- [x] 5.4 Mostrar lista de membresías
- [x] 5.5 Mostrar lista de pagos
- [x] 5.6 Implementar formulario de edición
- [x] 5.7 Agregar botón para volver

## Fase 6: Diseño

- [x] 6.1 Aplicar estilos con CSS variables
- [x] 6.2 Agregar skeleton loaders
- [x] 6.3 Verificar consistencia con el diseño existente

## Fase 7: Verificación

- [x] 7.1 Probar navegación desde lista de clientes
- [x] 7.2 Probar que se cargan todos los datos
- [x] 7.3 Probar edición de cliente
- [x] 7.4 Verificar diseño responsive
- [x] 7.5 Build sin errores