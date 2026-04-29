using System.ComponentModel.DataAnnotations;

namespace GymApp.Models
{
    public class Membresia
    {
        public int Id { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int TipoMembresiaId { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }

        [Required]
        public DateTime FechaFin { get; set; }

        public bool Activa { get; set; } = true;


        public Cliente Cliente { get; set; }
        public TipoMembresia TipoMembresia { get; set; }

        public List<Pago> Pagos { get; set; } = new();
    }
}
