using GymApp.DTOs.ClientesDtos;
using GymApp.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        // get all clientes
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ClienteDto>>> GetAll()
        {
            var clientes = await _clienteService.GetAllAsync();

            return Ok(clientes);
        }

        // get cliente by id
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _clienteService.GetByIdAsync(id);

            if (cliente == null)
                return NotFound();

            return Ok(cliente);
        }

        [HttpPost("CreateCliente")]
        public async Task<IActionResult> Create(CreateClienteDto clienteDto)
        {
            try
            {
                var cliente = await _clienteService.CreateAsync(clienteDto);
                return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateCliente/{id}")]
        public async Task<IActionResult> Update(int id, UpdateClienteDto clienteDto)
        {
            try
            {
                await _clienteService.UpdateAsync(clienteDto, id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("DesactivateCliente/{id}")]
        public async Task<IActionResult> Desactivate(int id)
        {
            try
            {
                await _clienteService.DesactivateAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("ActivateCliente/{id}")]
        public async Task<IActionResult> Activate(int id)
        {
            try
            {
                await _clienteService.ActivateAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
