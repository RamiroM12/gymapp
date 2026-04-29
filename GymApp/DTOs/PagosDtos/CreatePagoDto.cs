namespace GymApp.DTOs.PagosDtos
{
    public class CreatePagoDto
    {
        public int ClienteId { get; set; }

        public int MembresiaId { get; set; }

        public int MetodoPagoId { get; set; }

        /// <summary>
        /// Descripción personalizada opcional para el pago.
        /// Si no se proporciona, se generará una descripción automática.
        /// </summary>
        public string? Descripcion { get; set; }
    }
}
