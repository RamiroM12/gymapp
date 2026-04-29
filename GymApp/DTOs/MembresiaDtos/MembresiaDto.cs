using System.ComponentModel.DataAnnotations;

namespace GymApp.DTOs.MembresiaDtos
{
    public class MembresiaDto
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }

        public string ClienteNombre { get; set; } = string.Empty;
        public string ClienteEmail { get; set; } = string.Empty;

        public int TipoMembresiaId { get; set; }
        public string TipoMembresiaNombre { get; set; } = string.Empty;

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        public bool Activa { get; set; } = true;
    }
}