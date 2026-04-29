using System.ComponentModel.DataAnnotations;

namespace GymApp.DTOs.MembresiaDtos
{
    public class BuyMembresiaDto
    {
        [Required(ErrorMessage = "El ID del cliente es requerido")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El ID del tipo de membresía es requerido")]
        public int TipoMembresiaId { get; set; }
    }
}
