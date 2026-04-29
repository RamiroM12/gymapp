namespace GymApp.DTOs.TipoDeMembresiasDtos
{
    public class TipoMembresiaDto
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public int DuracionDias { get; set; }

        public decimal Precio { get; set; }

        public bool Activa { get; set; } = true;
    }
}
