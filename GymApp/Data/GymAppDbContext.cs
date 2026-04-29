using GymApp.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApp.Data
{
    public class GymAppDbContext : DbContext
    {
        public GymAppDbContext(DbContextOptions<GymAppDbContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<TipoMembresia> TiposMembresia { get; set; }
        public DbSet<Membresia> Membresias { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<MetodoPago> MetodosPago { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cliente -> Membresias
            modelBuilder.Entity<Membresia>()
                .HasOne(m => m.Cliente)
                .WithMany(c => c.Membresias)
                .HasForeignKey(m => m.ClienteId)
                .OnDelete(DeleteBehavior.Restrict);

            // Membresia -> TipoMembresia
            modelBuilder.Entity<Membresia>()
                .HasOne(m => m.TipoMembresia)
                .WithMany(t => t.Membresias)
                .HasForeignKey(m => m.TipoMembresiaId)
                .OnDelete(DeleteBehavior.Restrict);

            // Pago -> Cliente
            modelBuilder.Entity<Pago>()
                .HasOne(p => p.Cliente)
                .WithMany(c => c.Pagos)
                .HasForeignKey(p => p.ClienteId)
                .OnDelete(DeleteBehavior.Restrict);

            // Pago -> Membresia
            modelBuilder.Entity<Pago>()
                .HasOne(p => p.Membresia)
                .WithMany(m => m.Pagos)
                .HasForeignKey(p => p.MembresiaId)
                .OnDelete(DeleteBehavior.Restrict);

            // Pago -> MetodoPago
            modelBuilder.Entity<Pago>()
                .HasOne(p => p.MetodoPago)
                .WithMany(mp => mp.Pagos)
                .HasForeignKey(p => p.MetodoPagoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MetodoPago>().HasData(
                new MetodoPago { Id = 1, Nombre = "Efectivo" },
                new MetodoPago { Id = 2, Nombre = "Transferencia" },
                new MetodoPago { Id = 3, Nombre = "Tarjeta" },
                new MetodoPago { Id = 4, Nombre = "MercadoPago" });
        }
    }
}
