using GymApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExcelExportController : ControllerBase
    {
        private readonly IExcelExportService _excelExportService;
        public ExcelExportController(IExcelExportService excelExportService)
        {
            _excelExportService = excelExportService;
        }

        [HttpGet("ExportPayments")]
        public async Task<IActionResult> ExportPayments()
        {
            try
            {
                var fileContent = await _excelExportService.ExportPaymentsAsync();

                return File(
                    fileContent, 
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                    "Pagos.xlsx"
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al exportar pagos", error = ex.Message });
            }
        }

        [HttpGet("ExportPaymentsByDate")]
        public async Task<IActionResult> ExportPaymentsByDate([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                if (startDate > endDate)
                {
                    return BadRequest(new { message = "La fecha inicial no puede ser mayor a la fecha final" });
                }

                var startUtc = DateTime.SpecifyKind(startDate.Date, DateTimeKind.Utc);
                var endUtc = DateTime.SpecifyKind(endDate.Date.AddDays(1), DateTimeKind.Utc);

                var fileContent = await _excelExportService.ExportPaymentsAsync(startUtc, endUtc);

                return File(
                    fileContent,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    $"Pagos_{startDate:yyyyMMdd}_{endDate:yyyyMMdd}.xlsx"
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al exportar pagos por fecha", error = ex.Message });
            }
        }
    }
}