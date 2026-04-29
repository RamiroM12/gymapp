namespace GymApp.Services
{
    public interface IExcelExportService
    {
        Task<byte[]> ExportPaymentsAsync();

        Task<byte[]> ExportPaymentsAsync(DateTime startDate, DateTime endDate);
    }
}
