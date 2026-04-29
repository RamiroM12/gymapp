using GymApp.DTOs.TipoDeMembresiasDtos;
using GymApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoMembresiasController : ControllerBase
    {
        private readonly ITiposDeMembresia _tiposDeMembresia;

        public TipoMembresiasController(ITiposDeMembresia tiposDeMembresia)
        {
            _tiposDeMembresia = tiposDeMembresia;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var tiposMembresia = await _tiposDeMembresia.GetTiposDeMembresia();
            return Ok(tiposMembresia);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tipoMembresia = await _tiposDeMembresia.GetTipoMembresiaById(id);

            if (tipoMembresia == null)
                return NotFound("Tipo de membresia no encontrado");

            return Ok(tipoMembresia);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(CrearTipoMembresiaDto dto)
        {
            try
            {
                var tipoMembresia = await _tiposDeMembresia.CreateTipoMembresia(dto);
                return CreatedAtAction(nameof(GetById), new { id = tipoMembresia.Id }, tipoMembresia);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> Update(int id, CrearTipoMembresiaDto dto)
        {
            try
            {
                await _tiposDeMembresia.UpdateTipoMembresia(dto, id);
                return NoContent();
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
                await _tiposDeMembresia.DesactivateTipoMembresia(id);
                return NoContent();
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
                await _tiposDeMembresia.ActivateTipoMembresia(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
