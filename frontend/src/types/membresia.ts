export interface Membresia {
  id: number;
  clienteId: number;
  tipoMembresiaId: number;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

export interface MembresiaDto {
  id: number;
  clienteId: number;
  clienteNombre: string;
  clienteEmail: string;
  tipoMembresiaId: number;
  tipoMembresiaNombre: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

export interface BuyMembresiaDto {
  clienteId: number;
  tipoMembresiaId: number;
}