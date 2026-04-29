using GymApp.DTOs.ClientesDtos;
using GymApp.Models;

namespace GymApp.Services
{
    public interface IClienteService
    {
        Task<List<ClienteDto>> GetAllAsync();
        Task<ClienteDto?> GetByIdAsync(int id);
        Task<ClienteDto> CreateAsync(CreateClienteDto cliente);
        Task UpdateAsync(UpdateClienteDto cliente, int id);
        Task DesactivateAsync(int id);

        Task ActivateAsync(int id);
    }
}
