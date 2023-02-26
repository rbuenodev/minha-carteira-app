
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
            return _dbContext.Registries.FirstOrDefault(r => r.Id == id);
        }

        public async Task<Entities.Registry?> GetAggragate(int id)
        {
            return _dbContext.Registries.Include(u => u.User).FirstOrDefault(r => r.Id == id);
        }

        public async Task<List<Entities.Registry>> GetAll(RegistryFilter filters)
        {
            if (filters == null)
                return _dbContext.Registries.ToList();

            if (filters.Id > 0)
                return _dbContext.Registries.Where(r => r.Id == filters.Id && r.User.Id == filters.UserId).ToList();

            if (filters.Month > 0 && filters.Year > 0)
            {
                DateOnly initialDate;
                if (DateTime.TryParse($"{filters.Month}/01/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                DateOnly finalDate;
                var lastDayOfMonth = DateTime.DaysInMonth(filters.Month, filters.Year);
                if (DateTime.TryParse($"{filters.Month}/{lastDayOfMonth}/{filters.Year}", out var dateF)) initialDate = DateOnly.FromDateTime(dateF);

                return _dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate && r.User.Id == filters.UserId).ToList();
            }

            if (filters.Year > 0)
            {
                DateOnly initialDate;
                if (DateTime.TryParse($"01/01/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                DateOnly finalDate;
                if (DateTime.TryParse($"12/01/{filters.Year}", out var dateF)) initialDate = DateOnly.FromDateTime(dateF);

                return _dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate && r.User.Id == filters.UserId).ToList();
            }

            if (!string.IsNullOrEmpty(filters.DateLowerThan) && !string.IsNullOrEmpty(filters.DateBiggerThan))
            {
                DateOnly initialDate;
                if (DateTime.TryParse(filters.DateBiggerThan, out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                DateOnly finalDate;
                if (DateTime.TryParse(filters.DateLowerThan, out var dateF)) initialDate = DateOnly.FromDateTime(dateF);

                return _dbContext.Registries.Include(u => u.User).Where(r => r.Date > initialDate && r.Date < finalDate && r.User.Id == filters.UserId).ToList();
            }

            if (!string.IsNullOrEmpty(filters.DateLowerThan))
            {
                DateOnly date;
                if (DateTime.TryParse(filters.DateLowerThan, out var dateF)) date = DateOnly.FromDateTime(dateF);
                return _dbContext.Registries.Include(u => u.User).Where(r => r.Date < date && r.User.Id == filters.UserId).ToList();
            }

            if (!string.IsNullOrEmpty(filters.DateBiggerThan))
            {
                DateOnly date;
                if (DateTime.TryParse(filters.DateBiggerThan, out var dateF)) date = DateOnly.FromDateTime(dateF);

                return _dbContext.Registries.Include(u => u.User).Where(r => r.Date > date && r.User.Id == filters.UserId).ToList();
            }

            return _dbContext.Registries.Include(u => u.User).Where(u => u.User.Id == filters.UserId).ToList();
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
