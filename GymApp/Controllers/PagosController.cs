using GymApp.DTOs.PagosDtos;
using GymApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagosController : ControllerBase
    {
        private readonly IPagoService _pagoService;

        public PagosController(IPagoService pagoService)
        {
            _pagoService = pagoService;
        }

        // Obtener todos los pagos
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var pagos = await _pagoService.GetAllAsync();
            return Ok(pagos);
        }

        // Obtener un pago por ID
        [HttpGet("GetPagoById/{id}")]
        public async Task<IActionResult> GetPagoById(int id)
        {
            var pago = await _pagoService.GetByIdAsync(id);
            
            if (pago == null)
                return NotFound("Pago no encontrado");

            return Ok(pago);
        }

        // Obtener todos los pagos de un cliente
        [HttpGet("GetPagosByCliente/{clienteId}")]
        public async Task<IActionResult> GetPagosByCliente(int clienteId)
        {
            var pagos = await _pagoService.GetByClienteIdAsync(clienteId);
            return Ok(pagos);
        }

        [HttpPost("CreatePago")]
        public async Task<IActionResult> CreatePago([FromBody] CreatePagoDto pagoDto)
        {
            try
            {
                var pago = await _pagoService.CreatePagoAsync(pagoDto);
                return CreatedAtAction(nameof(GetPagoById), new { id = pago.Id }, pago);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
