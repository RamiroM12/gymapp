using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApp.Models
{
    public class Pago
    {
        public int Id { get; set; }

        [Required]
        public int ClienteId { get; set; }

        [Required]
        public int MembresiaId { get; set; }

        [Required]
        public int MetodoPagoId { get; set; }

        [Required]
        public DateTime FechaPago { get; set; } = DateTime.Now;

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Monto { get; set; }

        [MaxLength(200)]
        public string Descripcion { get; set; }

        [MaxLength(50)]
        public string Estado { get; set; } = "Completado";

       
        public Cliente Cliente { get; set; }
        public Membresia Membresia { get; set; }
        public MetodoPago MetodoPago { get; set; }
    }
}
