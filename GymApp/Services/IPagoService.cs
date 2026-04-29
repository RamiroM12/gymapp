using GymApp.DTOs.PagosDtos;
using GymApp.Models;

namespace GymApp.Services
{
    public interface IPagoService
    {
        Task<PagoDto> CreatePagoAsync(CreatePagoDto pagoDto);
        Task<List<PagoDto>> GetAllAsync();
        Task<PagoDto?> GetByIdAsync(int id);
        Task<List<PagoDto>> GetByClienteIdAsync(int clienteId);
    }
}
