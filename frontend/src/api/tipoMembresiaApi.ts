import { api } from './client';
import { TipoMembresia, CreateTipoMembresiaDto } from '../types/tipoMembresia';

export const tipoMembresiaApi = {
  getAll: () => api.get<TipoMembresia[]>('/TipoMembresias/GetAll').then(res => res.data),
  
  getById: (id: number) => api.get<TipoMembresia>(`/TipoMembresias/GetById/${id}`).then(res => res.data),
  
  create: (data: CreateTipoMembresiaDto) => 
    api.post<TipoMembresia>('/TipoMembresias/Create', data).then(res => res.data),
  
  update: (id: number, data: CreateTipoMembresiaDto) => 
    api.put(`/TipoMembresias/Update/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/TipoMembresias/Delete/${id}`),

  activate: (id: number) => 
    api.put(`/TipoMembresias/Activate/${id}`),

  desactivate: (id: number) =>
    api.put(`/TipoMembresias/Desactivate/${id}`),
};