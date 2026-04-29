import { useState, useEffect } from 'react';
import { Button, Card, Input, Badge, Pagination, Select, SkeletonCard } from '../components/ui';
import { clienteApi } from '../api';
import { Cliente, CreateClienteDto } from '../types';

const ITEMS_PER_PAGE = 9;

type FiltroActivo = 'todos' | 'activos' | 'inactivos';

interface ClientesPageProps {
  onSelectCliente?: (clienteId: number) => void;
}

export const ClientesPage: React.FC<ClientesPageProps> = ({ onSelectCliente }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroActivo, setFiltroActivo] = useState<FiltroActivo>('todos');
  const [formData, setFormData] = useState<CreateClienteDto>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteApi.getAll();
      setClientes(data);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await clienteApi.create(formData);
      setShowForm(false);
      setFormData({ nombre: '', apellido: '', telefono: '', email: '' });
      loadClientes();
    } catch (error) {
      console.error('Error creando cliente:', error);
      alert('Error al crear cliente');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleActivo = async (cliente: Cliente) => {
    try {
      if (cliente.activo) {
        await clienteApi.desactivate(cliente.id);
      } else {
        await clienteApi.activate(cliente.id);
      }
      loadClientes();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado del cliente');
    }
  };

  // Filtrar clientes por nombre y estado
  const clientesFiltrados = clientes.filter(cliente => {
    const nombreCompleto = `${cliente.nombre} ${cliente.apellido}`.toLowerCase();
    const coincideNombre = nombreCompleto.includes(busqueda.toLowerCase());
    
    if (filtroActivo === 'activos') return coincideNombre && cliente.activo;
    if (filtroActivo === 'inactivos') return coincideNombre && !cliente.activo;
    return coincideNombre;
  });

  // Paginación
  const totalPages = Math.ceil(clientesFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const clientesPaginados = clientesFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Resetear página cuando cambia la búsqueda o filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, filtroActivo]);

  const filtroOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'activos', label: 'Solo activos' },
    { value: 'inactivos', label: 'Solo inactivos' },
  ];

  // Skeleton loading state
  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Clientes</h1>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="max-w-md w-full"><SkeletonCard /></div>
          <div className="w-48"><SkeletonCard /></div>
        </div>
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
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Clientes</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Cliente'}
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
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Crear Nuevo Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <Input
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit">Crear Cliente</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientesPaginados.map(cliente => (
          <div
            key={cliente.id}
            onClick={() => onSelectCliente?.(cliente.id)}
            className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
          >
            <Card>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {cliente.nombre} {cliente.apellido}
                </h3>
                <Badge variant={cliente.activo ? 'success' : 'error'}>
                  {cliente.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm">Email: {cliente.email}</p>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Telefono: {cliente.telefono}</p>
              <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-2">
                Registrado: {new Date(cliente.fechaRegistro).toLocaleDateString()}
              </p>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }} onClick={(e) => e.stopPropagation()}>
                <Button
                  variant={cliente.activo ? 'danger' : 'primary'}
                  onClick={() => toggleActivo(cliente)}
                  className="w-full text-sm"
                >
                  {cliente.activo ? 'Desactivar' : 'Activar'}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {clientesFiltrados.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          {busqueda ? `No se encontraron clientes con "${busqueda}"` : 'No hay clientes registrados'}
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