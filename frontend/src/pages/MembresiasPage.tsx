import { useState, useEffect } from 'react';
import { Button, Card, Input, Badge, Select, Autocomplete, Pagination, SkeletonCard } from '../components/ui';
import { membresiaApi, clienteApi, tipoMembresiaApi, automatizacionApi } from '../api';
import { MembresiaDto, Cliente, TipoMembresia } from '../types';
import { getMembresiaStatus } from '../utils/membresiaStatus';

const ITEMS_PER_PAGE = 9;

type FiltroActivo = 'todos' | 'activos' | 'inactivos';

export const MembresiasPage: React.FC = () => {
  const [membresias, setMembresias] = useState<MembresiaDto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tiposMembresia, setTiposMembresia] = useState<TipoMembresia[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtroActivo, setFiltroActivo] = useState<FiltroActivo>('todos');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    clienteId: 0,
    tipoMembresiaId: 0,
    metodoPagoId: 1,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membresiasData, clientesData, tiposData] = await Promise.all([
        membresiaApi.getAll(),
        clienteApi.getAll(),
        tipoMembresiaApi.getAll(),
      ]);
      setMembresias(membresiasData);
      setClientes(clientesData.filter(c => c.activo));
      setTiposMembresia(tiposData.filter(t => t.activa));
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultado(null);

    if (!formData.clienteId || !formData.tipoMembresiaId) {
      setError('Debe seleccionar un cliente y un tipo de membresía');
      return;
    }

    try {
      setSaving(true);
      const data = await automatizacionApi.comprarMembresia(formData);
      setResultado(`Membresía creada: ${data.tipoMembresia} para ${data.clienteNombre}. Pago: $${data.monto} (${data.metodoPago})`);
      setShowForm(false);
      setFormData({ clienteId: 0, tipoMembresiaId: 0, metodoPagoId: 1 });
      loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al comprar membresía';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActivo = async (membresia: MembresiaDto) => {
    try {
      if (membresia.activa) {
        await membresiaApi.desactivate(membresia.id);
      } else {
        await membresiaApi.activate(membresia.id);
      }
      loadData();
    } catch (err) {
      console.error('Error cambiando estado:', err);
      alert('Error al cambiar el estado de la membresía');
    }
  };

  const membresiasFiltradas = membresias.filter(m => {
    const nombreCompleto = `${m.clienteNombre}`.toLowerCase();
    const coincideNombre = nombreCompleto.includes(busqueda.toLowerCase());
    
    if (filtroActivo === 'activos') return coincideNombre && m.activa;
    if (filtroActivo === 'inactivos') return coincideNombre && !m.activa;
    return coincideNombre;
  });

  // Paginación
  const totalPages = Math.ceil(membresiasFiltradas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const membresiasPaginadas = membresiasFiltradas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Resetear página cuando cambia la búsqueda o filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, filtroActivo]);

  const filtroOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'activos', label: 'Solo activas' },
    { value: 'inactivos', label: 'Solo inactivas' },
  ];

  const clienteOptions = clientes.map(c => ({
    value: c.id,
    label: `${c.nombre} ${c.apellido}`
  }));

  const clienteSeleccionado = clientes.find(c => c.id === formData.clienteId);

  const tipoOptions = tiposMembresia.map(t => ({
    value: t.id,
    label: `${t.nombre} - $${t.precio} (${t.duracionDias} días)`
  }));

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Membresías</h1>
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
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Membresías</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={loadData}>
            Recargar
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : 'Nueva Membresía'}
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda y filtro */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Buscar por nombre de cliente..."
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

      {/* Formulario de compra */}
      {showForm && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Comprar Nueva Membresía</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Autocomplete
                  label="Cliente"
                  value={formData.clienteId}
                  onChange={(value) => setFormData(prev => ({ ...prev, clienteId: value }))}
                  options={clienteOptions}
                />
                {clienteSeleccionado && (
                  <p className="text-sm -mt-2 mb-4" style={{ color: 'var(--text-muted)' }}>
                    {clienteSeleccionado.email}
                  </p>
                )}
              </div>
              <Select
                label="Tipo de Membresía"
                name="tipoMembresiaId"
                value={formData.tipoMembresiaId}
                onChange={(e) => setFormData(prev => ({ ...prev, tipoMembresiaId: parseInt(e.target.value) || 0 }))}
                options={tipoOptions}
                required
              />
              <Select
                label="Método de Pago"
                name="metodoPagoId"
                value={formData.metodoPagoId}
                onChange={(e) => setFormData(prev => ({ ...prev, metodoPagoId: parseInt(e.target.value) || 1 }))}
                options={[
                  { value: 1, label: 'Efectivo' },
                  { value: 2, label: 'Transferencia' },
                  { value: 3, label: 'Tarjeta' },
                  { value: 4, label: 'MercadoPago' },
                ]}
                required
              />
            </div>
            {error && (
              <div className="mt-3 p-2 rounded text-sm" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                {error}
              </div>
            )}
            {resultado && (
              <div className="mt-3 p-2 rounded text-sm" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
                {resultado}
              </div>
            )}
            <div className="mt-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Comprando...' : 'Comprar Membresía'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {error && !showForm && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {membresiasPaginadas.map(membresia => (
          <Card key={membresia.id}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{membresia.clienteNombre || `Cliente #${membresia.clienteId}`}</h3>
              {(() => {
                const status = getMembresiaStatus(membresia.fechaFin, membresia.activa);
                return (
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {status.daysRemaining !== null && status.daysRemaining > 0
                        ? `${status.daysRemaining} días restantes`
                        : status.label}
                    </span>
                  </div>
                );
              })()}
            </div>
            <div className="space-y-1 text-sm">
              <p style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Email:</span> {membresia.clienteEmail || 'N/A'}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Membresía:</span> {membresia.tipoMembresiaNombre || `Tipo #${membresia.tipoMembresiaId}`}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Inicio:</span> {new Date(membresia.fechaInicio).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Vence:</span> {new Date(membresia.fechaFin).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <Button
                variant={membresia.activa ? 'danger' : 'primary'}
                onClick={() => toggleActivo(membresia)}
                className="w-full text-sm"
              >
                {membresia.activa ? 'Desactivar' : 'Activar'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {membresiasFiltradas.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          {busqueda 
            ? `No se encontraron membresías con "${busqueda}"` 
            : 'No hay membresías registradas'}
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