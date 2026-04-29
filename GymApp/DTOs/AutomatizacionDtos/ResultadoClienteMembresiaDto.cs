namespace GymApp.DTOs.AutomatizacionDtos
{
    public class ResultadoClienteMembresiaDto
    {
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = null!;
        public string ClienteEmail { get; set; } = null!;
        
        public int MembresiaId { get; set; }
        public string TipoMembresia { get; set; } = null!;
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        
        public int PagoId { get; set; }
        public decimal Monto { get; set; }
        public string MetodoPago { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
    }
}