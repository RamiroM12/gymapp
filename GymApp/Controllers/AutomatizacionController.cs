using GymApp.DTOs.AutomatizacionDtos;
using GymApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutomatizacionController : ControllerBase
    {
        private readonly IAutomatizacionService _automatizacionService;

        public AutomatizacionController(IAutomatizacionService automatizacionService)
        {
            _automatizacionService = automatizacionService;
        }

        /// <summary>
        /// Crea un nuevo cliente, su membresía y el pago en un solo paso.
        /// </summary>
        [HttpPost("CrearClienteConMembresia")]
        public async Task<IActionResult> CrearClienteConMembresia(CrearClienteConMembresiaDto dto)
        {
            try
            {
                var resultado = await _automatizacionService.CrearClienteConMembresiaAsync(dto);
                return CreatedAtAction(nameof(CrearClienteConMembresia), new { id = resultado.ClienteId }, resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Compra una membresía para un cliente existente y genera el pago automáticamente.
        /// </summary>
        [HttpPost("ComprarMembresia")]
        public async Task<IActionResult> ComprarMembresia(ComprarMembresiaDto dto)
        {
            try
            {
                var resultado = await _automatizacionService.ComprarMembresiaAsync(dto);
                return CreatedAtAction(nameof(ComprarMembresia), new { id = resultado.MembresiaId }, resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}