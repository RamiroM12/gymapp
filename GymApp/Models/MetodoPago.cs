using System.ComponentModel.DataAnnotations;

namespace GymApp.Models
{
    public class MetodoPago
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }


        public List<Pago> Pagos { get; set; } = new();
    }
}
