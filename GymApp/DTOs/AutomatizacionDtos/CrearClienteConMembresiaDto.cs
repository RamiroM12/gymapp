using System.ComponentModel.DataAnnotations;

namespace GymApp.DTOs.AutomatizacionDtos
{
    public class CrearClienteConMembresiaDto
    {
        // Datos del cliente
        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(100)]
        public string Nombre { get; set; } = null!;

        [Required(ErrorMessage = "El apellido es requerido")]
        [MaxLength(100)]
        public string Apellido { get; set; } = null!;

        [MaxLength(20)]
        public string Telefono { get; set; } = null!;

        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "El formato del email no es válido")]
        [MaxLength(150)]
        public string Email { get; set; } = null!;

        // Datos de la membresía
        [Required(ErrorMessage = "El ID del tipo de membresía es requerido")]
        public int TipoMembresiaId { get; set; }

        // Datos del pago
        [Required(ErrorMessage = "El ID del método de pago es requerido")]
        public int MetodoPagoId { get; set; }
    }
}