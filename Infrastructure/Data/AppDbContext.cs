using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class AppDbContext(DbContextOptions options): DbContext(options)
    {
        public DbSet<Element> Elements { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ElementDeployment> ElementsDeployment { get; set; }
        public DbSet<ElementTag> ElementTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ElementDeployment>(entity =>
            {
                entity.HasOne(e => e.Element)
                        .WithMany()
                        .HasForeignKey(e => e.ElementId);
                entity.HasOne(e => e.Map)
                        .WithMany()
                        .HasForeignKey(e => e.MapId);
                entity.HasIndex(e => new { e.ElementId, e.MapId }).IsUnique();

                entity.Property(e => e.X)
                        .HasPrecision(15, 10);
                entity.Property(e => e.Y)
                        .HasPrecision(15, 10);
            });
            modelBuilder.Entity<ElementTag>(entity =>
            {
                entity.HasOne(e => e.Element)
                        .WithMany(e => e.Tags)
                        .HasForeignKey(e => e.ElementId);
                entity.HasOne(e=> e.Tag)
                        .WithMany(t => t.Elements)
                        .HasForeignKey(e => e.TagId);
                entity.HasIndex(e => new { e.ElementId, e.TagId }).IsUnique();
            });
            modelBuilder.Entity<Element>(entity =>
            {
                entity.Property(e => e.Status)
                        .HasConversion<string>();
            });
        }
    }
}
