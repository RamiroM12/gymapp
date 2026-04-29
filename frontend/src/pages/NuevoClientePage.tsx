import { useState, useEffect } from 'react';
import { Button, Card, Input, Select, Loading } from '../components/ui';
import { automatizacionApi, tipoMembresiaApi } from '../api';
import { TipoMembresia, CrearClienteConMembresiaDto, ResultadoClienteMembresiaDto } from '../types';

export const NuevoClientePage: React.FC = () => {
  const [tiposMembresia, setTiposMembresia] = useState<TipoMembresia[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resultado, setResultado] = useState<ResultadoClienteMembresiaDto | null>(null);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState<CrearClienteConMembresiaDto>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    tipoMembresiaId: 0,
    metodoPagoId: 1,
  });

  useEffect(() => {
    loadTiposMembresia();
  }, []);

  const loadTiposMembresia = async () => {
    try {
      const data = await tipoMembresiaApi.getAll();
      setTiposMembresia(data.filter(t => t.activa));
    } catch (err) {
      console.error('Error cargando tipos de membresía:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tipoMembresiaId' || name === 'metodoPagoId' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultado(null);
    
    if (!formData.tipoMembresiaId) {
      setError('Debe seleccionar un tipo de membresía');
      return;
    }

    try {
      setSaving(true);
      const data = await automatizacionApi.crearClienteConMembresia(formData);
      setResultado(data);
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        tipoMembresiaId: 0,
        metodoPagoId: 1,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear cliente';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Cargando..." />;

  const membresiaOptions = tiposMembresia.map(t => ({
    value: t.id,
    label: `${t.nombre} - $${t.precio} (${t.duracionDias} días)`
  }));

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Nuevo Cliente con Membresía</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Juan"
            />
            <Input
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              placeholder="Pérez"
            />
            <Input
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="123456789"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan@email.com"
            />
          </div>

          <h2 className="text-lg font-semibold mb-4 mt-6" style={{ color: 'var(--text-primary)' }}>Membresía y Pago</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Tipo de Membresía"
              name="tipoMembresiaId"
              value={formData.tipoMembresiaId}
              onChange={handleChange}
              options={membresiaOptions}
              required
            />
            <Select
              label="Método de Pago"
              name="metodoPagoId"
              value={formData.metodoPagoId}
              onChange={handleChange}
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
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
              {error}
            </div>
          )}

          <div className="mt-6">
            <Button type="submit" disabled={saving}>
              {saving ? 'Creando...' : 'Crear Cliente y Membresía'}
            </Button>
          </div>
        </form>
      </Card>

      {resultado && (
        <Card className="mt-6 border-2" style={{ borderColor: 'var(--success)' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--success)' }}>¡Cliente creado exitosamente!</h2>
          <div className="space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
            <p><strong>Cliente:</strong> {resultado.clienteNombre}</p>
            <p><strong>Email:</strong> {resultado.clienteEmail}</p>
            <p><strong>Membresía:</strong> {resultado.tipoMembresia}</p>
            <p><strong>Válida hasta:</strong> {new Date(resultado.fechaFin).toLocaleDateString()}</p>
            <p><strong>Pago:</strong> ${resultado.monto} - {resultado.metodoPago}</p>
          </div>
        </Card>
      )}
    </div>
  );
};