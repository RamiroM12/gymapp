using GymApp.Data;
using GymApp.DTOs.ClientesDtos;
using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Services
{
    public class ClienteService : IClienteService
    {
        private readonly GymAppDbContext _context;
        public ClienteService(GymAppDbContext context)
        {
            _context = context;
        }

        public async Task<ClienteDto> CreateAsync(CreateClienteDto clienteDto)
        {
            var exist = await _context.Clientes.AnyAsync(c => c.Email.ToLower() == clienteDto.Email.ToLower());

            if (exist) 
                throw new Exception("Ya existe un cliente con el mismo email");

            var cliente = new Cliente
            {
                Nombre = clienteDto.Nombre,
                Apellido = clienteDto.Apellido,
                Telefono = clienteDto.Telefono,
                Email = clienteDto.Email,
                FechaRegistro = DateTime.Now,
                Activo = true
            };

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return new ClienteDto
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Email = cliente.Email,
                Telefono = cliente.Telefono,
                FechaRegistro = cliente.FechaRegistro,
                Activo = cliente.Activo
            };
        }

        public async Task DesactivateAsync(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
                throw new Exception("Cliente no encontrado");

            cliente.Activo = false;

            await _context.SaveChangesAsync();
        }

        public async Task<List<ClienteDto>> GetAllAsync()
        {
            var clientes = await _context.Clientes
                .AsNoTracking()
                .ToListAsync();

            return clientes.Select(c => new ClienteDto
            {
                Id = c.Id,
                Nombre = c.Nombre,
                Apellido = c.Apellido,
                Email = c.Email,
                Telefono = c.Telefono,
                FechaRegistro = c.FechaRegistro,
                Activo = c.Activo
            }).ToList();
        }


        public async Task<ClienteDto?> GetByIdAsync(int id)
        {
            var cliente = await _context.Clientes
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cliente == null)
                return null;

            return new ClienteDto
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Email = cliente.Email,
                Telefono = cliente.Telefono,
                FechaRegistro = cliente.FechaRegistro,
                Activo = cliente.Activo
            };
        }

        public async Task UpdateAsync(UpdateClienteDto clientedto, int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
                throw new Exception("Cliente no encontrado");

            if (cliente.Email.ToLower() != clientedto.Email.ToLower())
            {
                var exist = await _context.Clientes.AnyAsync(c => c.Email.ToLower() == clientedto.Email.ToLower());
                if (exist)
                    throw new Exception("Ya existe un cliente con el mismo email");
            }

            cliente.Nombre = clientedto.Nombre;
            cliente.Apellido = clientedto.Apellido;
            cliente.Telefono = clientedto.Telefono;
            cliente.Email = clientedto.Email;

            await _context.SaveChangesAsync();
        }

        public async Task ActivateAsync(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
                throw new Exception("Cliente no encontrado");

            cliente.Activo = true;

            await _context.SaveChangesAsync();
        }
    }
}
