
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
            var result = new List<Entities.Registry>();
            if (filters == null)
                result.AddRange(_dbContext.Registries.ToList());

            if (filters.Id > 0)
                result.AddRange(_dbContext.Registries.ToList());

            if (filters.Month > 0 && filters.Year > 0)
            {
                DateOnly initialDate;
                if (DateTime.TryParse($"{filters.Month}/01/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                DateOnly finalDate;
                var lastDayOfMonth = DateTime.DaysInMonth(filters.Month, filters.Year);
                if (DateTime.TryParse($"{filters.Month}/{lastDayOfMonth}/{filters.Year}", out var dateF)) initialDate = DateOnly.FromDateTime(dateF);

                result.AddRange(_dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate).ToList());
            }

            if (filters.Year > 0)
            {
                DateOnly initialDate;
                if (DateTime.TryParse($"01/01/{filters.Year}", out var dateI)) initialDate = DateOnly.FromDateTime(dateI);
                DateOnly finalDate;
                if (DateTime.TryParse($"12/01/{filters.Year}", out var dateF)) initialDate = DateOnly.FromDateTime(dateF);

                result.AddRange(_dbContext.Registries.Include(u => u.User).Where(r => r.Date >= initialDate && r.Date <= finalDate).ToList());
            }

            if (filters.DateLowerThan != default(DateOnly))
            {

                result.AddRange(_dbContext.Registries.Include(u => u.User).Where(r => r.Date < filters.DateLowerThan).ToList());
            }

            if (filters.DateBiggerThan != default(DateOnly))
            {

                result.AddRange(_dbContext.Registries.Include(u => u.User).Where(r => r.Date > filters.DateBiggerThan).ToList());
            }

            if (filters.DateLowerThan != default(DateOnly) && filters.DateBiggerThan != default(DateOnly))
            {

                result.AddRange(_dbContext.Registries.Include(u => u.User).Where(r => r.Date > filters.DateBiggerThan && r.Date < filters.DateLowerThan).ToList());
            }


            if (result.Count == 0)
                return _dbContext.Registries.Include(u => u.User).Where(u => u.User.Id == filters.UserId).ToList();

            return result.Where(u => u.User.Id == filters.UserId).ToList();

        }

        public async Task Save(Entities.Registry registry)
        {
            var entity = _dbContext.Registries.FirstOrDefault(r => r.Id == registry.Id);
            if (entity != null)
            {
                _dbContext.Entry(entity).CurrentValues.SetValues(registry);
            }
            else
            {
                _dbContext.Registries.Add(registry);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
