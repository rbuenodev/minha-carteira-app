
using Domain.Registries.Filters;
using Domain.Registries.Ports;
using Microsoft.EntityFrameworkCore;
using Entities = Domain.Registries.Entities;

namespace Data.Registry
{
    public class RegistryRepository : IRegistryRepository
    {
        private readonly CarteiraDBContext _dbContext;
        public RegistryRepository(CarteiraDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Delete(int id)
        {
            var entity = _dbContext.Registries.FirstOrDefault(r => r.Id == id);
            if (entity != null)
            {
                _dbContext.Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Entity not found");
            }
        }

        public async Task<Entities.Registry?> Get(int id)
        {
            return await _dbContext.Registries.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Entities.Registry?> GetAggragate(int id)
        {
            return await _dbContext.Registries.Include(u => u.User).FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Entities.Registry>> GetAll(RegistryFilter filters)
        {
            if (filters == null)
                return await _dbContext.Registries.ToListAsync();

            if (filters.Id > 0)
                return await _dbContext.Registries.Where(r => r.Id == filters.Id && r.User.Id == filters.UserId).ToListAsync();

            if (filters.Month > 0 && filters.Year > 0)
            {
                var initialDate = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse($"01/{filters.Month}/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                var finalDate = DateOnly.FromDateTime(DateTime.UtcNow);
                var lastDayOfMonth = DateTime.DaysInMonth(filters.Year, filters.Month);
                if (DateTime.TryParse($"{lastDayOfMonth}/{filters.Month}/{filters.Year}", out var dateF)) finalDate = DateOnly.FromDateTime(dateF);

                return await _dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate && r.User.Id == filters.UserId).ToListAsync();
            }

            if (filters.Year > 0)
            {
                var initialDate = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse($"01/01/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                var finalDate = DateOnly.FromDateTime(DateTime.UtcNow);
                var lastDayOfMonth = DateTime.DaysInMonth(filters.Year, 12);
                if (DateTime.TryParse($"{lastDayOfMonth}/12/{filters.Year}", out var dateF)) finalDate = DateOnly.FromDateTime(dateF);

                return await _dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate && r.User.Id == filters.UserId).ToListAsync();
            }

            if (!string.IsNullOrEmpty(filters.DateLowerThan) && !string.IsNullOrEmpty(filters.DateBiggerThan))
            {
                var initialDate = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse(filters.DateBiggerThan, out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                var finalDate = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse(filters.DateLowerThan, out var dateF)) finalDate = DateOnly.FromDateTime(dateF);

                return await _dbContext.Registries.Include(u => u.User).Where(r => r.Date > initialDate && r.Date < finalDate && r.User.Id == filters.UserId).ToListAsync();
            }

            if (!string.IsNullOrEmpty(filters.DateLowerThan))
            {
                var date = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse(filters.DateLowerThan, out var dateF)) date = DateOnly.FromDateTime(dateF);
                return await _dbContext.Registries.Include(u => u.User).Where(r => r.Date < date && r.User.Id == filters.UserId).ToListAsync();
            }

            if (!string.IsNullOrEmpty(filters.DateBiggerThan))
            {
                var date = DateOnly.FromDateTime(DateTime.UtcNow);
                if (DateTime.TryParse(filters.DateBiggerThan, out var dateI)) date = DateOnly.FromDateTime(dateI);

                return await _dbContext.Registries.Include(u => u.User).Where(r => r.Date > date && r.User.Id == filters.UserId).ToListAsync();
            }

            return await _dbContext.Registries.Include(u => u.User).Where(u => u.User.Id == filters.UserId).ToListAsync();
        }

        public async Task<Entities.Registry> Save(Entities.Registry registry)
        {
            var entity = _dbContext.Registries.FirstOrDefault(r => r.Id == registry.Id);
            if (entity != null)
            {
                return await Update(entity, registry);
            }
            else
            {
                return await Insert(registry);
            }
        }

        private async Task<Entities.Registry> Insert(Entities.Registry registry)
        {
            _dbContext.Registries.Add(registry);
            await _dbContext.SaveChangesAsync();
            return registry;
        }

        private async Task<Entities.Registry> Update(Entities.Registry entity, Entities.Registry registry)
        {
            _dbContext.Entry(entity).CurrentValues.SetValues(registry);
            await _dbContext.SaveChangesAsync();
            return registry;
        }
    }
}
