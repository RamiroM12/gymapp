using GymApp.Data;
using GymApp.DTOs.TipoDeMembresiasDtos;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Services
{
    public class TiposDeMembresiaService : ITiposDeMembresia
    {
        private readonly GymAppDbContext _context;
        public TiposDeMembresiaService(GymAppDbContext context)
        {
            _context = context;
        }
        public async Task<TipoMembresiaDto> CreateTipoMembresia(CrearTipoMembresiaDto dto)
        {
            var exist = await _context.TiposMembresia.AnyAsync(x => x.Nombre.ToLower() == dto.Nombre.ToLower());

            if (exist)
                throw new Exception("Ya existe un tipo de membresia con ese nombre");

            var tipoMembresia = new TipoMembresia
            {
                Nombre = dto.Nombre,
                DuracionDias = dto.DuracionDias,
                Precio = dto.Precio,
                Activa = true
            };

            await _context.TiposMembresia.AddAsync(tipoMembresia);
            await _context.SaveChangesAsync();

            return new TipoMembresiaDto
            {
                Id = tipoMembresia.Id,
                Nombre = tipoMembresia.Nombre,
                DuracionDias = tipoMembresia.DuracionDias,
                Precio = tipoMembresia.Precio,
                Activa = tipoMembresia.Activa
            };
        }

        public async Task DesactivateTipoMembresia(int id)
        {
            var tipoMembresia = await _context.TiposMembresia.FindAsync(id);

            if (tipoMembresia == null)
                throw new Exception("Tipo de membresia no encontrado");

            tipoMembresia.Activa = false;

            await _context.SaveChangesAsync();
        }

        public async Task<TipoMembresiaDto?> GetTipoMembresiaById(int id)
        {
            var tipoMembresia = await _context.TiposMembresia.FindAsync(id);

            if (tipoMembresia == null)
                return null;
             var tipoMembresiaDto = new TipoMembresiaDto
            {
                Id = tipoMembresia.Id,
                Nombre = tipoMembresia.Nombre,
                DuracionDias = tipoMembresia.DuracionDias,
                Precio = tipoMembresia.Precio,
                Activa = tipoMembresia.Activa
            };

            return tipoMembresiaDto;
        }

        public async Task<List<TipoMembresiaDto>> GetTiposDeMembresia()
        {
            var tiposMembresias = await _context.TiposMembresia.Select(x => new TipoMembresiaDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                DuracionDias = x.DuracionDias,
                Precio = x.Precio,
                Activa = x.Activa
            }).ToListAsync();

            return tiposMembresias;
        }

        public async Task UpdateTipoMembresia(CrearTipoMembresiaDto dto, int id)
        {
            var tipoMembresia = await _context.TiposMembresia.FindAsync(id);

            if (tipoMembresia == null)
                throw new Exception("Tipo de membresia no encontrado");

            tipoMembresia.Nombre = dto.Nombre;
            tipoMembresia.DuracionDias = dto.DuracionDias;
            tipoMembresia.Precio = dto.Precio;

            await _context.SaveChangesAsync();
        }

        public async Task ActivateTipoMembresia(int id)
        {
            var tipoMembresia = await _context.TiposMembresia.FindAsync(id);

            if (tipoMembresia == null)
                throw new Exception("Tipo de membresia no encontrado");

            tipoMembresia.Activa = true;

            await _context.SaveChangesAsync();
        }
    }
}
