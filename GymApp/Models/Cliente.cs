using System.ComponentModel.DataAnnotations;

namespace GymApp.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        [Required]
        [MaxLength(100)]
        public string Apellido { get; set; }

        [MaxLength(20)]
        public string Telefono { get; set; }

        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }

        public DateTime FechaRegistro { get; set; } = DateTime.Now;

        public bool Activo { get; set; } = true;


        public List<Membresia> Membresias { get; set; } = new();
        public List<Pago> Pagos { get; set; } = new();
    }
}
