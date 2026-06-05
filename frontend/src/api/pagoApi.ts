import { api } from './client';
import { Pago, CreatePagoDto } from '../types/pago';

export const pagoApi = {
  getAll: () => api.get<Pago[]>('/Pagos/GetAll').then(res => res.data),
  
  getById: (id: number) => api.get<Pago>(`/Pagos/GetPagoById/${id}`).then(res => res.data),
  
  getByClienteId: async (clienteId: number): Promise<Pago[]> => {
    try {
      const response = await api.get<Pago[]>(`/Pagos/GetPagosByCliente/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pagos:', error);
      return [];
    }
  },
  
  create: (data: CreatePagoDto) => 
    api.post<Pago>('/Pagos/CreatePago', data).then(res => res.data),
  
  exportAll: () => 
    api.get('/ExcelExport/ExportPayments', { responseType: 'blob' }).then(res => res.data),
  
  exportByDateRange: (startDate: string, endDate: string) =>
    api.get(`/ExcelExport/ExportPaymentsByDate?startDate=${startDate}&endDate=${endDate}`, { responseType: 'blob' }).then(res => res.data),
};