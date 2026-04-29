using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApp.Models
{
    public class TipoMembresia
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        [Range(1, 3650)]
        public int DuracionDias { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }

        public bool Activa { get; set; } = true;

        
        public List<Membresia> Membresias { get; set; } = new();
    }
}
