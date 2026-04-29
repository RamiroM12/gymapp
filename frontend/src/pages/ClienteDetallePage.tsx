import { useState, useEffect } from 'react';
import { Button, Card, Input, Badge, SkeletonCard, Skeleton } from '../components/ui';
import { clienteApi, membresiaApi, pagoApi } from '../api';
import { Cliente, UpdateClienteDto } from '../types/cliente';
import { MembresiaDto } from '../types/membresia';
import { Pago } from '../types/pago';
import { ArrowLeft, Edit2, Save, X, User, CreditCard, DollarSign } from 'lucide-react';

interface ClienteDetallePageProps {
  clienteId: number;
  onBack: () => void;
}

export const ClienteDetallePage: React.FC<ClienteDetallePageProps> = ({ clienteId, onBack }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [memberships, setMemberships] = useState<MembresiaDto[]>([]);
  const [payments, setPayments] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<UpdateClienteDto>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    console.log('ClienteDetallePage - clienteId:', clienteId);
    loadData();
  }, [clienteId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Cargando cliente con ID:', clienteId);
      
      const [clienteData, membershipsData, paymentsData] = await Promise.all([
        clienteApi.getById(clienteId),
        membresiaApi.getByClienteId(clienteId),
        pagoApi.getByClienteId(clienteId),
      ]);
      
      console.log('Cliente data:', clienteData);
      
      if (!clienteData) {
        setError('Cliente no encontrado');
        return;
      }
      
      setCliente(clienteData);
      setMemberships(membershipsData);
      setPayments(paymentsData);
      setFormData({
        nombre: clienteData.nombre,
        apellido: clienteData.apellido,
        telefono: clienteData.telefono,
        email: clienteData.email,
      });
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos del cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await clienteApi.update(clienteId, formData);
      setCliente(prev => prev ? { ...prev, ...formData } : null);
      setEditing(false);
    } catch (err) {
      console.error('Error guardando:', err);
      setError('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        telefono: cliente.telefono,
        email: cliente.email,
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
            <ArrowLeft size={24} style={{ color: 'var(--text-primary)' }} />
          </button>
          <Skeleton variant="text" className="w-48 h-8" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
            <ArrowLeft size={24} style={{ color: 'var(--text-primary)' }} />
          </button>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Cliente no encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack} 
          className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Detalle del Cliente
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Datos del Cliente */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={20} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Datos Personales
            </h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="ml-auto p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <Input
                label="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <Input
                label="Apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              />
              <Input
                label="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={saving}>
                  <Save size={16} />
                  {saving ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  <X size={16} />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Nombre:</span>
                <span style={{ color: 'var(--text-primary)' }}>{cliente.nombre} {cliente.apellido}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Teléfono:</span>
                <span style={{ color: 'var(--text-primary)' }}>{cliente.telefono || 'No registrado'}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                <span style={{ color: 'var(--text-primary)' }}>{cliente.email}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Registrado:</span>
                <span style={{ color: 'var(--text-primary)' }}>{new Date(cliente.fechaRegistro).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estado:</span>
                <Badge variant={cliente.activo ? 'success' : 'error'}>
                  {cliente.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </div>
          )}
        </Card>

        {/* Membresías */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={20} style={{ color: 'var(--accent)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Membresías ({memberships.length})
            </h2>
          </div>

          {memberships.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No tiene membresías</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {memberships.map(m => (
                <div 
                  key={m.id} 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {m.tipoMembresiaNombre || `Membresía #${m.tipoMembresiaId}`}
                    </span>
                    <Badge variant={m.activa ? 'success' : 'error'}>
                      {m.activa ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    <p>Inicio: {new Date(m.fechaInicio).toLocaleDateString()}</p>
                    <p>Vence: {new Date(m.fechaFin).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Pagos - ocupa todo el ancho */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={20} style={{ color: 'var(--accent)' }} />
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Historial de Pagos ({payments.length})
              </h2>
            </div>

            {payments.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No tiene pagos registrados</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Fecha</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Monto</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Método</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(p => (
                      <tr key={p.id} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="px-4 py-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                          {new Date(p.fechaPago).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--success)' }}>
                          ${p.monto.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {p.metodoPagoNombre || 'N/A'}
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant={p.estado === 'Completado' ? 'success' : 'warning'}>
                            {p.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};