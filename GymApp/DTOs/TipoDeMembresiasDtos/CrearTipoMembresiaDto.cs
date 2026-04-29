using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApp.DTOs.TipoDeMembresiasDtos
{
    public class CrearTipoMembresiaDto
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(100)]
        public string Nombre { get; set; } = null!;

        [Required(ErrorMessage = "La duración en días es requerida")]
        [Range(1, 3650, ErrorMessage = "La duración debe ser entre 1 y 3650 días")]
        public int DuracionDias { get; set; }

        [Required(ErrorMessage = "El precio es requerido")]
        [Range(0.01, 999999.99, ErrorMessage = "El precio debe ser mayor a 0")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }   
    }
}
