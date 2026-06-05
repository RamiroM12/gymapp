using GymApp.Data;
using GymApp.DTOs.MembresiaDtos;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Services
{
    public class MembresiasService : IMembresiasService
    {
        private readonly GymAppDbContext _context;

        public MembresiasService(GymAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<MembresiaDto>> GetAllFromAsync()
        {
            var membresias = await _context.Membresias
                .Include(m => m.Cliente)
                .Include(m => m.TipoMembresia)
                .AsNoTracking()
                .ToListAsync();

            if (membresias == null)
                throw new Exception("No se encontraron membresias");

            return membresias.Select(m => new MembresiaDto
            {
                Id = m.Id,
                ClienteId = m.ClienteId,
                ClienteNombre = m.Cliente != null ? $"{m.Cliente.Nombre} {m.Cliente.Apellido}" : string.Empty,
                ClienteEmail = m.Cliente?.Email ?? string.Empty,
                TipoMembresiaId = m.TipoMembresiaId,
                TipoMembresiaNombre = m.TipoMembresia?.Nombre ?? string.Empty,
                FechaInicio = m.FechaInicio,
                FechaFin = m.FechaFin,
                Activa = m.Activa
            }).ToList();
        }

        public async Task<List<MembresiaDto>> GetAllFromClienteAsync(int clienteId)
        {
            var membresias = await _context.Membresias
                .Include(m => m.TipoMembresia)
                .AsNoTracking()
                .Where(m => m.ClienteId == clienteId)
                .ToListAsync();

            return membresias.Select(m => new MembresiaDto
            {
                Id = m.Id,
                ClienteId = m.ClienteId,
                TipoMembresiaId = m.TipoMembresiaId,
                TipoMembresiaNombre = m.TipoMembresia?.Nombre ?? string.Empty,
                FechaInicio = m.FechaInicio,
                FechaFin = m.FechaFin,
                Activa = m.Activa
            }).ToList();
        }
        public async Task BuyMembresiaAsync(int clienteId, int tipoMembresiaId)
        {
            var tipoMem = await _context.TiposMembresia.FindAsync(tipoMembresiaId);
            var cliente = await _context.Clientes.FindAsync(clienteId);

            if (tipoMem == null) 
                throw new Exception("Tipo de membresia no encontrado");

            if (cliente == null)
                throw new Exception("Cliente no encontrado");

            Membresia membresia = new Membresia
            {
                ClienteId = clienteId,
                TipoMembresiaId = tipoMembresiaId,
                FechaInicio = DateTime.UtcNow,
                FechaFin = DateTime.UtcNow.AddDays(tipoMem.DuracionDias),
                Activa = true
            };

            await _context.Membresias.AddAsync(membresia);
            await _context.SaveChangesAsync();
        }

        public async Task DesactivateMembresiaAsync(int MembresiaId)
        {
            var membresia = await _context.Membresias.FindAsync(MembresiaId);

            if (membresia == null)
                throw new Exception("Membresia no encontrada");

            membresia.Activa = false;

            await _context.SaveChangesAsync();
        }

        public async Task ActivateMembresiaAsync(int MembresiaId)
        {
            var membresia = await _context.Membresias.FindAsync(MembresiaId);

            if (membresia == null)
                throw new Exception("Membresia no encontrada");

            membresia.Activa = true;

            await _context.SaveChangesAsync();
        }
    }
}
