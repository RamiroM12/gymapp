# Tasks: Nuevo diseño visual y modo oscuro

## Lista de tareas

### Fase 1: Configuración de Tailwind
- [ ] **1.1** Actualizar `tailwind.config.js` para soportar darkMode: 'class'
- [ ] **1.2** Actualizar `index.css` con variables CSS para temas

### Fase 2: Theme Provider
- [ ] **2.1** Crear `src/context/ThemeContext.tsx`
- [ ] **2.2** Envolver App con ThemeProvider en `main.tsx`

### Fase 3: Toggle en Navbar
- [ ] **3.1** Crear componente `ThemeToggle.tsx`
- [ ] **3.2** Agregar al navbar en `App.tsx`

### Fase 4: Actualizar Componentes UI
- [ ] **4.1** Actualizar Button con variables CSS
- [ ] **4.2** Actualizar Input con variables CSS
- [ ] **4.3** Actualizar Card con variables CSS
- [ ] **4.4** Actualizar Select, Badge, Pagination, Autocomplete

### Fase 5: Verificación
- [ ] **5.1** Probar cambio de tema en todas las páginas
- [ ] **5.2** Verificar que localStorage guarda la preferencia
- [ ] **5.3** Build sin errores
