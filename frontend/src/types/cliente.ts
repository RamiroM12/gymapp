export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface CreateClienteDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}

export interface UpdateClienteDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
}