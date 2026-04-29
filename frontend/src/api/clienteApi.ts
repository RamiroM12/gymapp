import axios, { AxiosError } from 'axios';
import { Cliente, CreateClienteDto, UpdateClienteDto } from '../types/cliente';

const api = axios.create({
  baseURL: '/api',
});

export const clienteApi = {
  getAll: () => api.get<Cliente[]>('/Cliente/GetAll').then(res => res.data),
  
  getById: async (id: number): Promise<Cliente | null> => {
    try {
      const response = await api.get<Cliente>(`/Cliente/GetById/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching cliente:', error.message);
      }
      return null;
    }
  },
  
  create: (data: CreateClienteDto) => 
    api.post<Cliente>('/Cliente/CreateCliente', data).then(res => res.data),
  
  update: (id: number, data: UpdateClienteDto) => 
    api.put(`/Cliente/UpdateCliente/${id}`, data),
  
  desactivate: (id: number) => 
    api.put(`/Cliente/DesactivateCliente/${id}`),
  
  activate: (id: number) => 
    api.put(`/Cliente/ActivateCliente/${id}`),
};

export default api;