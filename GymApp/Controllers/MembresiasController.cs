using GymApp.DTOs.MembresiaDtos;
using GymApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembresiasController : ControllerBase
    {
        private readonly IMembresiasService _membresiaService;

        public MembresiasController(IMembresiasService membresiaService)
        {
            _membresiaService = membresiaService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var membresias = await _membresiaService.GetAllFromAsync();

            return Ok(membresias);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetAllById(int id)
        {
            var membresia = await _membresiaService.GetAllFromClienteAsync(id);

            // Return empty array if no memberships instead of 404
            if (membresia == null)
                return Ok(new List<MembresiaDto>());

            return Ok(membresia);
        }

        [HttpPost("Buy")]
        public async Task<IActionResult> Buy(BuyMembresiaDto dto)
        {
            try
            {
                await _membresiaService.BuyMembresiaAsync(dto.ClienteId, dto.TipoMembresiaId);
                return Ok("Membresia comprada exitosamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Desactivate/{id}")]
        public async Task<IActionResult> Desactivate(int id)
        {
            try
            {
                await _membresiaService.DesactivateMembresiaAsync(id);
                return Ok("Membresia desactivada exitosamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Activate/{id}")]
        public async Task<IActionResult> Activate(int id)
        {
            try
            {
                await _membresiaService.ActivateMembresiaAsync(id);
                return Ok("Membresia activada exitosamente");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
