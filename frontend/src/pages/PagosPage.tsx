import { useState, useEffect } from 'react';
import { Input, Badge, Pagination, Card, Skeleton, SkeletonTableRow, Button } from '../components/ui';
import { pagoApi } from '../api';
import { Pago } from '../types';
import { Download, FileSpreadsheet } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export const PagosPage: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  
  // Estado para el filtro de mes
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(
    new Date().toISOString().slice(0, 7) // Mes actual en formato YYYY-MM
  );

  useEffect(() => {
    loadPagos();
  }, []);

  const loadPagos = async () => {
    try {
      setLoading(true);
      const data = await pagoApi.getAll();
      setPagos(data);
    } catch (err) {
      console.error('Error cargando pagos:', err);
      setError('Error al cargar pagos');
    } finally {
      setLoading(false);
    }
  };

  // Calcular ganancias del mes seleccionado
  const gananciasDelMes = pagos
    .filter(pago => {
      const fecha = new Date(pago.fechaPago);
      const mesPago = fecha.toISOString().slice(0, 7);
      return mesPago === mesSeleccionado && pago.estado === 'Completado';
    })
    .reduce((sum, pago) => sum + pago.monto, 0);

  const mesActual = new Date().toISOString().slice(0, 7);

  // Filtrar pagos por nombre de cliente Y mes seleccionado
  const pagosFiltrados = pagos.filter(pago => {
    const nombreCliente = pago.clienteNombre?.toLowerCase() || '';
    const coincideNombre = nombreCliente.includes(busqueda.toLowerCase());
    
    // Filtrar por mes seleccionado
    const fecha = new Date(pago.fechaPago);
    const mesPago = fecha.toISOString().slice(0, 7);
    const coincideMes = mesPago === mesSeleccionado;
    
    return coincideNombre && coincideMes;
  });

  // Paginación
  const totalPages = Math.ceil(pagosFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagosPaginados = pagosFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Resetear página cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, mesSeleccionado]);

  const formatoMes = (mes: string) => {
    const [año, mesNum] = mes.split('-');
    const mesesNombres = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${mesesNombres[parseInt(mesNum) - 1]} ${año}`;
  };

  const esMesActual = mesSeleccionado === mesActual;

  const handleExportAll = async () => {
    try {
      setExporting(true);
      const blob = await pagoApi.exportAll();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Pagos_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exportando:', err);
      setError('Error al exportar todos los pagos');
    } finally {
      setExporting(false);
    }
  };

  const handleExportMonth = async () => {
    try {
      setExporting(true);
      const [año, mes] = mesSeleccionado.split('-');
      const startDate = `${año}-${mes}-01`;
      const lastDay = new Date(parseInt(año), parseInt(mes), 0).getDate();
      const endDate = `${año}-${mes}-${lastDay}`;
      
      const blob = await pagoApi.exportByDateRange(startDate, endDate);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Pagos_${formatoMes(mesSeleccionado)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exportando:', err);
      setError('Error al exportar pagos del mes');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Pagos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card><Skeleton variant="text" className="h-20" /></Card>
          <Card><Skeleton variant="text" className="h-20" /></Card>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="grid grid-cols-6 gap-4 p-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} variant="text" />)}
          </div>
          {Array.from({ length: 5 }).map((_, i) => <SkeletonTableRow key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Pagos</h1>
        <div className="flex gap-2">
          <button 
            onClick={loadPagos}
            className="px-4 py-2 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
          >
            Recargar
          </button>
        </div>
      </div>

      {/* Botones de exportar */}
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={handleExportAll} 
          disabled={exporting}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Download size={16} />
          {exporting ? 'Exportando...' : 'Exportar Todos'}
        </Button>
        <Button 
          onClick={handleExportMonth} 
          disabled={exporting}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <FileSpreadsheet size={16} />
          Exportar {formatoMes(mesSeleccionado)}
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className={esMesActual ? 'border-2' : ''} style={esMesActual ? { borderColor: 'var(--accent)' } : {}}>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
              {esMesActual ? 'Ganancias de Este Mes' : `Ganancias de ${formatoMes(mesSeleccionado)}`}
            </p>
            <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>
              ${gananciasDelMes.toFixed(2)}
            </p>
            {esMesActual && (
              <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>Mes actual</p>
            )}
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Total Historico</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              ${pagos.filter(p => p.estado === 'Completado').reduce((sum, p) => sum + p.monto, 0).toFixed(2)}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{pagos.length} pagos</p>
          </div>
        </Card>
      </div>

      {/* Selector de mes */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-48">
          <input
            type="month"
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] outline-none transition-colors"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <Input
          placeholder="Buscar por nombre de cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="max-w-md"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
          {error}
        </div>
      )}

      {/* Tabla de pagos */}
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl shadow-md overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <thead style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Fecha</th>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Cliente</th>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Membresía</th>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Monto</th>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Método</th>
              <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {pagosPaginados.map(pago => (
              <tr key={pago.id} className="hover:opacity-80 transition-opacity">
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(pago.fechaPago).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {pago.clienteNombre || `Cliente #${pago.clienteId}`}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {pago.membresiaTipo || `Membresía #${pago.membresiaId}`}
                </td>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  ${pago.monto.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {pago.metodoPagoNombre || 'N/A'}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={pago.estado === 'Completado' ? 'success' : 'warning'}>
                    {pago.estado}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagosFiltrados.length === 0 ? (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          {busqueda 
            ? `No se encontraron pagos con "${busqueda}"` 
            : `No hay pagos registrados para ${formatoMes(mesSeleccionado)}`}
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