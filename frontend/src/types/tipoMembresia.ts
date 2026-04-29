export interface TipoMembresia {
  id: number;
  nombre: string;
  duracionDias: number;
  precio: number;
  activa: boolean;
}

export interface CreateTipoMembresiaDto {
  nombre: string;
  duracionDias: number;
  precio: number;
}