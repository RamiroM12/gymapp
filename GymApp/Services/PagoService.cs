using GymApp.Data;
using GymApp.DTOs.PagosDtos;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Services
{
    public class PagoService : IPagoService
    {
        private readonly GymAppDbContext _context;

        public PagoService(GymAppDbContext context)
        {
            _context = context;
        }

        public async Task<PagoDto> CreatePagoAsync(CreatePagoDto pagoDto)
        {
            // Verificar que la membresía exista
            var membresia = await _context.Membresias
                .Include(m => m.TipoMembresia)
                .FirstOrDefaultAsync(m => m.Id == pagoDto.MembresiaId);

            if (membresia == null)
                throw new Exception("La membresía no existe");

            // Verificar que el método de pago exista
            var metodoPago = await _context.MetodosPago
                .FirstOrDefaultAsync(mp => mp.Id == pagoDto.MetodoPagoId);

            if (metodoPago == null)
                throw new Exception("El método de pago no existe");

            // Verificar que el cliente exista
            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(c => c.Id == pagoDto.ClienteId);

            if (cliente == null)
                throw new Exception("El cliente no existe");

            // Verificar que la membresía pertenezca al cliente
            if (membresia.ClienteId != pagoDto.ClienteId)
                throw new Exception("La membresía no pertenece al cliente especificado");

            // Crear el pago con los datos obtenidos
            var pago = new Pago
            {
                ClienteId = pagoDto.ClienteId,
                MembresiaId = pagoDto.MembresiaId,
                MetodoPagoId = pagoDto.MetodoPagoId,
                FechaPago = DateTime.UtcNow,
                Monto = membresia.TipoMembresia.Precio,
                Descripcion = string.IsNullOrEmpty(pagoDto.Descripcion)
                    ? $"Pago de membresía {membresia.TipoMembresia.Nombre} - {metodoPago.Nombre}"
                    : pagoDto.Descripcion,
                Estado = "Completado"
            };

            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            return new PagoDto
            {
                Id = pago.Id,
                ClienteId = pago.ClienteId,
                MembresiaId = pago.MembresiaId,
                MetodoPagoId = pago.MetodoPagoId,
                FechaPago = pago.FechaPago,
                Monto = pago.Monto,
                Descripcion = pago.Descripcion,
                Estado = pago.Estado,
                ClienteNombre = $"{cliente.Nombre} {cliente.Apellido}",
                MembresiaTipo = membresia.TipoMembresia.Nombre,
                MetodoPagoNombre = metodoPago.Nombre
            };
        }

        public async Task<List<PagoDto>> GetAllAsync()
        {
            var pagos = await _context.Pagos
                .Include(p => p.Cliente)
                .Include(p => p.Membresia)
                    .ThenInclude(m => m.TipoMembresia)
                .Include(p => p.MetodoPago)
                .AsNoTracking()
                .ToListAsync();

            return pagos.Select(MapToDto).ToList();
        }

        public async Task<PagoDto?> GetByIdAsync(int id)
        {
            var pago = await _context.Pagos
                .Include(p => p.Cliente)
                .Include(p => p.Membresia)
                    .ThenInclude(m => m.TipoMembresia)
                .Include(p => p.MetodoPago)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pago == null)
                return null;

            return MapToDto(pago);
        }

        public async Task<List<PagoDto>> GetByClienteIdAsync(int clienteId)
        {
            var pagos = await _context.Pagos
                .Include(p => p.Cliente)
                .Include(p => p.Membresia)
                    .ThenInclude(m => m.TipoMembresia)
                .Include(p => p.MetodoPago)
                .AsNoTracking()
                .Where(p => p.ClienteId == clienteId)
                .ToListAsync();

            return pagos.Select(MapToDto).ToList();
        }

        private static PagoDto MapToDto(Pago pago)
        {
            return new PagoDto
            {
                Id = pago.Id,
                ClienteId = pago.ClienteId,
                MembresiaId = pago.MembresiaId,
                MetodoPagoId = pago.MetodoPagoId,
                FechaPago = pago.FechaPago,
                Monto = pago.Monto,
                Descripcion = pago.Descripcion,
                Estado = pago.Estado,
                ClienteNombre = pago.Cliente != null ? $"{pago.Cliente.Nombre} {pago.Cliente.Apellido}" : null,
                MembresiaTipo = pago.Membresia?.TipoMembresia?.Nombre,
                MetodoPagoNombre = pago.MetodoPago?.Nombre
            };
        }
    }
}
