using GymApp.Data;
using GymApp.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//DI
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<ITiposDeMembresia, TiposDeMembresiaService>();
builder.Services.AddScoped<IMembresiasService, MembresiasService>();
builder.Services.AddScoped<IPagoService, PagoService>();
builder.Services.AddScoped<IAutomatizacionService, AutomatizacionService>();
builder.Services.AddScoped<IExcelExportService, ExcelExportService>();

builder.Services.AddDbContext<GymAppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
        
// Configure the HTTP request pipeline.

app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
