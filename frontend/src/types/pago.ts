export interface Pago {
  id: number;
  clienteId: number;
  membresiaId: number;
  metodoPagoId: number;
  fechaPago: string;
  monto: number;
  descripcion: string;
  estado: string;
  clienteNombre?: string;
  membresiaTipo?: string;
  metodoPagoNombre?: string;
}

export interface CreatePagoDto {
  clienteId: number;
  membresiaId: number;
  metodoPagoId: number;
  descripcion?: string;
}