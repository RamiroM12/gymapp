using GymApp.Data;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace GymApp.Services
{
    public class ExcelExportService : IExcelExportService
    {
        private readonly GymAppDbContext _context;

        public ExcelExportService(GymAppDbContext context)
        {
            _context = context;
            // Configurar licencia EPPlus (versión 7.x usa LicenseContext)
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        public async Task<byte[]> ExportPaymentsAsync()
        {
            var pagos = await _context.Pagos
                .Include(p => p.Cliente)
                .Include(p => p.Membresia)
                .ThenInclude(m => m.TipoMembresia)
                .ToListAsync();

            using var package = new ExcelPackage();

            var sheet = package.Workbook.Worksheets.Add("Pagos");

            // Headers
            sheet.Cells[1, 1].Value = "Cliente";
            sheet.Cells[1, 2].Value = "Email";
            sheet.Cells[1, 3].Value = "Tipo Membresía";
            sheet.Cells[1, 4].Value = "Monto";
            sheet.Cells[1, 5].Value = "Fecha Pago";
            sheet.Cells[1, 6].Value = "Metodo Pago";
            sheet.Cells[1, 7].Value = "Descripción";

            // Formato de headers
            using var headerRange = sheet.Cells[1, 1, 1, 7];
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            headerRange.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(59, 130, 246)); // Azul

            int row = 2;    

            foreach (var pago in pagos)
            {
                sheet.Cells[row, 1].Value = $"{pago.Cliente?.Nombre} {pago.Cliente?.Apellido}" ?? "N/A";
                sheet.Cells[row, 2].Value = pago.Cliente?.Email ?? "N/A";
                sheet.Cells[row, 3].Value = pago.Membresia?.TipoMembresia?.Nombre ?? "N/A";
                sheet.Cells[row, 4].Value = pago.Monto;
                sheet.Cells[row, 5].Value = pago.FechaPago.ToString("dd/MM/yyyy");
                sheet.Cells[row, 6].Value = pago.Membresia?.TipoMembresia?.Nombre ?? "N/A";
                sheet.Cells[row, 7].Value = pago.Descripcion ?? "";

                row++;
            }

            // Autoajustar columnas
            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

            return package.GetAsByteArray();
        }

        public async Task<byte[]> ExportPaymentsAsync(DateTime startDate, DateTime endDate)
        {
            var pagos = await _context.Pagos
                .Include(p => p.Cliente)
                .Include(p => p.Membresia)
                .ThenInclude(m => m.TipoMembresia)
                .Where(p => p.FechaPago >= startDate.Date && p.FechaPago < endDate.Date.AddDays(1))
                .ToListAsync();

            using var package = new ExcelPackage();

            var sheet = package.Workbook.Worksheets.Add("Pagos");

            // Headers
            sheet.Cells[1, 1].Value = "Cliente";
            sheet.Cells[1, 2].Value = "Email";
            sheet.Cells[1, 3].Value = "Tipo Membresía";
            sheet.Cells[1, 4].Value = "Monto";
            sheet.Cells[1, 5].Value = "Fecha Pago";
            sheet.Cells[1, 6].Value = "Metodo Pago";
            sheet.Cells[1, 7].Value = "Descripción";

            // Formato de headers
            using var headerRange = sheet.Cells[1, 1, 1, 7];
            headerRange.Style.Font.Bold = true;
            headerRange.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
            headerRange.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.FromArgb(59, 130, 246));

            int row = 2;    

            foreach (var pago in pagos)
            {
                sheet.Cells[row, 1].Value = $"{pago.Cliente?.Nombre} {pago.Cliente?.Apellido}" ?? "N/A";
                sheet.Cells[row, 2].Value = pago.Cliente?.Email ?? "N/A";
                sheet.Cells[row, 3].Value = pago.Membresia?.TipoMembresia?.Nombre ?? "N/A";
                sheet.Cells[row, 4].Value = pago.Monto;
                sheet.Cells[row, 5].Value = pago.FechaPago.ToString("dd/MM/yyyy");
                sheet.Cells[row, 6].Value = pago.Membresia?.TipoMembresia?.Nombre ?? "N/A";
                sheet.Cells[row, 7].Value = pago.Descripcion ?? "";

                row++;
            }

            // Autoajustar columnas
            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

            return package.GetAsByteArray();
        }
    }
}