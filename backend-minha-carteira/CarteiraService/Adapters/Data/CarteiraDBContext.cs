using Entities = Domain.Registries.Entities;
using Microsoft.EntityFrameworkCore;
using Entity = Domain.Users.Entities;

namespace Data
{
    public class CarteiraDBContext : DbContext
    {
        public CarteiraDBContext(DbContextOptions<CarteiraDBContext> options) : base(options)
        {
        }

        public virtual DbSet<Entities.Registry> Registries { get; set; }
        public virtual DbSet<Entity.User> Users { get; set; }

    }
}