import axios from 'axios';
import { MembresiaDto, BuyMembresiaDto } from '../types/membresia';

const api = axios.create({
  baseURL: '/api',
});

export const membresiaApi = {
  getAll: () => api.get<MembresiaDto[]>('/Membresias/GetAll').then(res => res.data),
  
  getByClienteId: async (clienteId: number): Promise<MembresiaDto[]> => {
    try {
      const response = await api.get<MembresiaDto[]>(`/Membresias/GetById/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching membresias:', error);
      return [];
    }
  },
  
  buy: (data: BuyMembresiaDto) => 
    api.post<string>('/Membresias/Buy', data).then(res => res.data),
  
  desactivate: (id: number) => 
    api.put<string>(`/Membresias/Desactivate/${id}`).then(res => res.data),
  
  activate: (id: number) => 
    api.put<string>(`/Membresias/Activate/${id}`).then(res => res.data),
};

export default api;