using GymApp.DTOs.MembresiaDtos;

namespace GymApp.Services
{
    public interface IMembresiasService
    {
        Task<List<MembresiaDto>> GetAllFromAsync();

        Task<List<MembresiaDto>> GetAllFromClienteAsync(int clienteId);

        Task BuyMembresiaAsync(int clienteId, int tipoMembresiaId);

        Task DesactivateMembresiaAsync(int MembresiaId);

        Task ActivateMembresiaAsync(int MembresiaId);
    }
}
