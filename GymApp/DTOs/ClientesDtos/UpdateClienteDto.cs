using System.ComponentModel.DataAnnotations;

namespace GymApp.DTOs.ClientesDtos
{
    public class UpdateClienteDto
    {
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
    }
}
