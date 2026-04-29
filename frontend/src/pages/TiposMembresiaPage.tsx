import { useState, useEffect } from 'react';
import { Button, Card, Input, Badge, Pagination, Select, SkeletonCard } from '../components/ui';
import { tipoMembresiaApi } from '../api';
import { TipoMembresia, CreateTipoMembresiaDto } from '../types';

const ITEMS_PER_PAGE = 9;

type FiltroActivo = 'todos' | 'activos' | 'inactivos';

export const TiposMembresiaPage: React.FC = () => {
  const [tipos, setTipos] = useState<TipoMembresia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroActivo, setFiltroActivo] = useState<FiltroActivo>('todos');
  const [error, setError] = useState('');
  
  // Estado para edición
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<CreateTipoMembresiaDto>({
    nombre: '',
    duracionDias: 0,
    precio: 0,
  });
  
  const [formData, setFormData] = useState<CreateTipoMembresiaDto>({
    nombre: '',
    duracionDias: 0,
    precio: 0,
  });

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    try {
      setLoading(true);
      const data = await tipoMembresiaApi.getAll();
      setTipos(data);
    } catch (err) {
      console.error('Error cargando tipos de membresía:', err);
      setError('Error al cargar tipos de membresía');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.nombre || formData.duracionDias <= 0 || formData.precio <= 0) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      await tipoMembresiaApi.create(formData);
      setShowForm(false);
      setFormData({ nombre: '', duracionDias: 0, precio: 0 });
      loadTipos();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear tipo';
      setError(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracionDias' || name === 'precio' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'duracionDias' || name === 'precio' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleToggleActivo = async (tipo: TipoMembresia) => {
    try {
      if (tipo.activa) {
        await tipoMembresiaApi.desactivate(tipo.id);
      } else {
        await tipoMembresiaApi.activate(tipo.id);
      }
      loadTipos();
    } catch (err) {
      console.error('Error cambiando estado:', err);
      alert('Error al cambiar el estado del tipo de membresía');
    }
  };

  const startEdit = (tipo: TipoMembresia) => {
    setEditId(tipo.id);
    setEditData({
      nombre: tipo.nombre,
      duracionDias: tipo.duracionDias,
      precio: tipo.precio,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ nombre: '', duracionDias: 0, precio: 0 });
  };

  const handleEditSubmit = async (id: number) => {
    setError('');
    
    if (!editData.nombre || editData.duracionDias <= 0 || editData.precio <= 0) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      await tipoMembresiaApi.update(id, editData);
      setEditId(null);
      setEditData({ nombre: '', duracionDias: 0, precio: 0 });
      loadTipos();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar tipo';
      setError(message);
    }
  };

  // Filtrar tipos por nombre y estado
  const tiposFiltrados = tipos.filter(tipo => {
    const coincideNombre = tipo.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    if (filtroActivo === 'activos') return coincideNombre && tipo.activa;
    if (filtroActivo === 'inactivos') return coincideNombre && !tipo.activa;
    return coincideNombre;
  });

  // Paginación
  const totalPages = Math.ceil(tiposFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const tiposPaginados = tiposFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Resetear página cuando cambia la búsqueda o filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, filtroActivo]);

  const filtroOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'activos', label: 'Solo activos' },
    { value: 'inactivos', label: 'Solo inactivos' },
  ];

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Tipos de Membresía</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Tipos de Membresía</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Tipo'}
        </Button>
      </div>

      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-md"
        />
        <div className="w-48">
          <Select
            value={filtroActivo}
            onChange={(e) => setFiltroActivo(e.target.value as FiltroActivo)}
            options={filtroOptions}
          />
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Crear Nuevo Tipo de Membresía</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Básico, Premium"
                required
              />
              <Input
                label="Duración (días)"
                name="duracionDias"
                type="number"
                value={formData.duracionDias}
                onChange={handleChange}
                placeholder="30"
                required
              />
              <Input
                label="Precio ($)"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleChange}
                placeholder="500"
                required
              />
            </div>
            {error && (
              <div className="mt-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                {error}
              </div>
            )}
            <div className="mt-4">
              <Button type="submit">Crear Tipo</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tiposPaginados.map(tipo => (
          <Card key={tipo.id}>
            {editId === tipo.id ? (
              // Modo edición
              <div>
                <h3 className="font-semibold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Editar {tipo.nombre}</h3>
                <div className="space-y-3">
                  <Input
                    label="Nombre"
                    name="nombre"
                    value={editData.nombre}
                    onChange={handleEditChange}
                  />
                  <Input
                    label="Duración (días)"
                    name="duracionDias"
                    type="number"
                    value={editData.duracionDias}
                    onChange={handleEditChange}
                  />
                  <Input
                    label="Precio ($)"
                    name="precio"
                    type="number"
                    value={editData.precio}
                    onChange={handleEditChange}
                  />
                </div>
                {error && (
                  <div className="mt-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                    {error}
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => handleEditSubmit(tipo.id)}>
                    Guardar
                  </Button>
                  <Button variant="secondary" onClick={cancelEdit}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              // Modo visualización
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{tipo.nombre}</h3>
                  <Badge variant={tipo.activa ? 'success' : 'error'}>
                    {tipo.activa ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Duración:</span> {tipo.duracionDias} días
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Precio:</span> ${tipo.precio}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                  <Button
                    variant="secondary"
                    onClick={() => startEdit(tipo)}
                    className="w-full text-sm"
                  >
                    Editar
                  </Button>
                  <Button
                    variant={tipo.activa ? 'danger' : 'primary'}
                    onClick={() => handleToggleActivo(tipo)}
                    className="w-full text-sm"
                  >
                    {tipo.activa ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {tiposFiltrados.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          {busqueda 
            ? `No se encontraron tipos con "${busqueda}"` 
            : 'No hay tipos de membresía registrados'}
        </div>
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};