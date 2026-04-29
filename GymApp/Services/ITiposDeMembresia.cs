using GymApp.DTOs.TipoDeMembresiasDtos;
using GymApp.Models;

namespace GymApp.Services
{
    public interface ITiposDeMembresia
    {
        public Task<List<TipoMembresiaDto>> GetTiposDeMembresia();

        public Task<TipoMembresiaDto?> GetTipoMembresiaById(int id);

        public Task<TipoMembresiaDto> CreateTipoMembresia(CrearTipoMembresiaDto dto);

        public Task UpdateTipoMembresia(CrearTipoMembresiaDto dto, int id);

        public Task DesactivateTipoMembresia(int id);

        public Task ActivateTipoMembresia(int id);
    }
}
