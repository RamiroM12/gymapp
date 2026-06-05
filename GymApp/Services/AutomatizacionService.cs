using GymApp.Data;
using GymApp.DTOs.AutomatizacionDtos;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Services
{
    public class AutomatizacionService : IAutomatizacionService
    {
        private readonly GymAppDbContext _context;

        public AutomatizacionService(GymAppDbContext context)
        {
            _context = context;
        }

        public async Task<ResultadoClienteMembresiaDto> CrearClienteConMembresiaAsync(CrearClienteConMembresiaDto dto)
        {
            // Validar que el tipo de membresía exista
            var tipoMembresia = await _context.TiposMembresia
                .FirstOrDefaultAsync(t => t.Id == dto.TipoMembresiaId);

            if (tipoMembresia == null)
                throw new Exception("El tipo de membresía no existe");

            // Validar que el método de pago exista
            var metodoPago = await _context.MetodosPago
                .FirstOrDefaultAsync(m => m.Id == dto.MetodoPagoId);

            if (metodoPago == null)
                throw new Exception("El método de pago no existe");

            // Validar que no exista un cliente con el mismo email (case-insensitive)
            var existingCliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Email.ToLower() == dto.Email.ToLower());

            if (existingCliente != null)
                throw new Exception("Ya existe un cliente con el mismo email");

            // Crear el cliente
            var cliente = new Cliente
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Telefono = dto.Telefono,
                Email = dto.Email,
                FechaRegistro = DateTime.UtcNow,
                Activo = true
            };

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            // Crear la membresía
            var membresia = new Membresia
            {
                ClienteId = cliente.Id,
                TipoMembresiaId = dto.TipoMembresiaId,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow.AddDays(tipoMembresia.DuracionDias),
                Activa = true
            };

            _context.Membresias.Add(membresia);
            await _context.SaveChangesAsync();

            // Crear el pago
            var pago = new Pago
            {
                ClienteId = cliente.Id,
                MembresiaId = membresia.Id,
                MetodoPagoId = dto.MetodoPagoId,
                FechaPago = DateTime.UtcNow,
                Monto = tipoMembresia.Precio,
                Descripcion = $"Pago de membresía {tipoMembresia.Nombre} - {metodoPago.Nombre}",
                Estado = "Completado"
            };

            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            // Retornar el resultado
            return new ResultadoClienteMembresiaDto
            {
                ClienteId = cliente.Id,
                ClienteNombre = $"{cliente.Nombre} {cliente.Apellido}",
                ClienteEmail = cliente.Email,
                MembresiaId = membresia.Id,
                TipoMembresia = tipoMembresia.Nombre,
                FechaInicio = membresia.FechaInicio,
                FechaFin = membresia.FechaFin,
                PagoId = pago.Id,
                Monto = pago.Monto,
                MetodoPago = metodoPago.Nombre,
                Descripcion = pago.Descripcion
            };
        }

        public async Task<ResultadoCompraMembresiaDto> ComprarMembresiaAsync(ComprarMembresiaDto dto)
        {
            // Validar que el cliente exista
            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Id == dto.ClienteId);

            if (cliente == null)
                throw new Exception("El cliente no existe");

            // Validar que el tipo de membresía exista
            var tipoMembresia = await _context.TiposMembresia
                .FirstOrDefaultAsync(t => t.Id == dto.TipoMembresiaId);

            if (tipoMembresia == null)
                throw new Exception("El tipo de membresía no existe");

            // Validar que el método de pago exista
            var metodoPago = await _context.MetodosPago
                .FirstOrDefaultAsync(m => m.Id == dto.MetodoPagoId);

            if (metodoPago == null)
                throw new Exception("El método de pago no existe");

            // Crear la membresía
            var membresia = new Membresia
            {
                ClienteId = dto.ClienteId,
                TipoMembresiaId = dto.TipoMembresiaId,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow.AddDays(tipoMembresia.DuracionDias),
                Activa = true
            };

            _context.Membresias.Add(membresia);
            await _context.SaveChangesAsync();

            // Crear el pago
            var pago = new Pago
            {
                ClienteId = dto.ClienteId,
                MembresiaId = membresia.Id,
                MetodoPagoId = dto.MetodoPagoId,
                FechaPago = DateTime.UtcNow,
                Monto = tipoMembresia.Precio,
                Descripcion = $"Pago de membresía {tipoMembresia.Nombre} - {metodoPago.Nombre}",
                Estado = "Completado"
            };

            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            // Retornar el resultado
            return new ResultadoCompraMembresiaDto
            {
                MembresiaId = membresia.Id,
                ClienteId = cliente.Id,
                ClienteNombre = $"{cliente.Nombre} {cliente.Apellido}",
                TipoMembresia = tipoMembresia.Nombre,
                FechaInicio = membresia.FechaInicio,
                FechaFin = membresia.FechaFin,
                PagoId = pago.Id,
                Monto = pago.Monto,
                MetodoPago = metodoPago.Nombre,
                Descripcion = pago.Descripcion
            };
        }
    }
}