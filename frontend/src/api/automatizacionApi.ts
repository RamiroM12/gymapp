import { api } from './client';
import {
  CrearClienteConMembresiaDto,
  ResultadoClienteMembresiaDto,
  ComprarMembresiaDto,
  ResultadoCompraMembresiaDto
} from '../types/automatizacion';

export const automatizacionApi = {
  crearClienteConMembresia: (data: CrearClienteConMembresiaDto) => 
    api.post<ResultadoClienteMembresiaDto>('/Automatizacion/CrearClienteConMembresia', data)
      .then(res => res.data),
  
  comprarMembresia: (data: ComprarMembresiaDto) =>
    api.post<ResultadoCompraMembresiaDto>('/Automatizacion/ComprarMembresia', data)
      .then(res => res.data),
};