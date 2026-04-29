export interface CrearClienteConMembresiaDto {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  tipoMembresiaId: number;
  metodoPagoId: number;
}

export interface ResultadoClienteMembresiaDto {
  clienteId: number;
  clienteNombre: string;
  clienteEmail: string;
  membresiaId: number;
  tipoMembresia: string;
  fechaInicio: string;
  fechaFin: string;
  pagoId: number;
  monto: number;
  metodoPago: string;
  descripcion: string;
}

export interface ComprarMembresiaDto {
  clienteId: number;
  tipoMembresiaId: number;
  metodoPagoId: number;
}

export interface ResultadoCompraMembresiaDto {
  membresiaId: number;
  clienteId: number;
  clienteNombre: string;
  tipoMembresia: string;
  fechaInicio: string;
  fechaFin: string;
  pagoId: number;
  monto: number;
  metodoPago: string;
  descripcion: string;
}