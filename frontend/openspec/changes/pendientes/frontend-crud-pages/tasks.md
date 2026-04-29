# Tasks: Implementar páginas de Pagos, Membresías y Tipos de Membresía

## Lista de Tareas

### Fase 1: Tipos de Membresía

- [x] **1.1** Crear `src/pages/TiposMembresiaPage.tsx`
- [x] **1.2** Implementar estado (tipos, loading, showForm, busqueda, formData)
- [x] **1.3** Implementar `loadTipos()` para cargar desde API
- [x] **1.4** Implementar `handleSubmit` para crear tipo
- [x] **1.5** Implementar `handleDelete` para eliminar tipo
- [x] **1.6** Implementar filtro de búsqueda por nombre
- [x] **1.7** Renderizar lista de cards con datos de tipos
- [x] **1.8** Renderizar formulario de creación (collapsible)

### Fase 2: Membresías

- [x] **2.1** Crear `src/pages/MembresiasPage.tsx`
- [x] **2.2** Implementar estado (membresias, loading, busqueda)
- [x] **2.3** Implementar `loadMembresias()` para cargar desde API
- [x] **2.4** Implementar filtro de búsqueda por nombre de cliente
- [x] **2.5** Renderizar lista de cards con datos de membresías
- [x] **2.6** Agregar Badge para estado (activa/inactiva)

### Fase 3: Pagos

- [x] **3.1** Crear `src/pages/PagosPage.tsx`
- [x] **3.2** Implementar estado (pagos, loading, busqueda)
- [x] **3.3** Implementar `loadPagos()` para cargar desde API
- [x] **3.4** Implementar filtro de búsqueda por nombre de cliente
- [x] **3.5** Renderizar tabla de pagos con columnas
- [x] **3.6** Formatear fechas y moneda

### Fase 4: Integración

- [x] **4.1** Importar nuevas páginas en `App.tsx`
- [x] **4.2** Agregar rutas en el switch de `renderPage()`
- [x] **4.3** Agregar items de navegación en el navbar

### Fase 5: Verificación

- [ ] **5.1** Verificar que `npm run build` compila sin errores
- [ ] **5.2** Probar navegación a cada nueva página
- [ ] **5.3** Probar funcionalidad de cada página

---

## Orden de implementación recomendado

1. Primero: TiposMembresiaPage (más simple, CRUD completo)
2. Segundo: MembresiasPage (lista con búsqueda)
3. Tercero: PagosPage (tabla con búsqueda)
4. Cuarto: Integración en App.tsx

## Dependencias

- `api/tipoMembresiaApi.ts` - ya existe
- `api/membresiaApi.ts` - ya existe
- `api/pagoApi.ts` - ya existe
- `types/tipoMembresia.ts` - ya existe
- `types/membresia.ts` - ya existe
- `types/pago.ts` - ya existe
