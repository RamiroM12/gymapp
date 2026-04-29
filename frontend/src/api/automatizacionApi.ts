import axios from 'axios';
import { 
  CrearClienteConMembresiaDto, 
  ResultadoClienteMembresiaDto,
  ComprarMembresiaDto,
  ResultadoCompraMembresiaDto 
} from '../types/automatizacion';

const api = axios.create({
  baseURL: '/api',
});

export const automatizacionApi = {
  crearClienteConMembresia: (data: CrearClienteConMembresiaDto) => 
    api.post<ResultadoClienteMembresiaDto>('/Automatizacion/CrearClienteConMembresia', data)
      .then(res => res.data),
  
  comprarMembresia: (data: ComprarMembresiaDto) => 
    api.post<ResultadoCompraMembresiaDto>('/Automatizacion/ComprarMembresia', data)
      .then(res => res.data),
};

export default api;