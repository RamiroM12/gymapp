using GymApp.Models;

namespace GymApp.DTOs.PagosDtos
{
    public class PagoDto
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int MembresiaId { get; set; }
        public int MetodoPagoId { get; set; }
        public DateTime FechaPago { get; set; }
        public decimal Monto { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }

        public string? ClienteNombre { get; set; }
        public string? MembresiaTipo { get; set; }
        public string? MetodoPagoNombre { get; set; }
    }
}
