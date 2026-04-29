using GymApp.DTOs.AutomatizacionDtos;

namespace GymApp.Services
{
    public interface IAutomatizacionService
    {
        Task<ResultadoClienteMembresiaDto> CrearClienteConMembresiaAsync(CrearClienteConMembresiaDto dto);
        Task<ResultadoCompraMembresiaDto> ComprarMembresiaAsync(ComprarMembresiaDto dto);
    }
}