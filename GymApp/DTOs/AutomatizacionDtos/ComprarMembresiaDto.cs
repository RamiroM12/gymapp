using System.ComponentModel.DataAnnotations;

namespace GymApp.DTOs.AutomatizacionDtos
{
    public class ComprarMembresiaDto
    {
        [Required(ErrorMessage = "El ID del cliente es requerido")]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El ID del tipo de membresía es requerido")]
        public int TipoMembresiaId { get; set; }

        [Required(ErrorMessage = "El ID del método de pago es requerido")]
        public int MetodoPagoId { get; set; }
    }
}