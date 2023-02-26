using Domain.Users.Filter;
using Domain.Users.Ports;
using Entity = Domain.Users.Entities;



namespace Data.User
{
    public class UserRepository : IUserRepository
    {
        private readonly CarteiraDBContext _dbContext;
        public UserRepository(CarteiraDBContext carteiraDBContext)
        {
            _dbContext = carteiraDBContext;
        }
        public async Task Delete(int id)
        {
            var entity = _dbContext.Users.FirstOrDefault(r => r.Id == id);
            if (entity != null)
            {
                _dbContext.Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task<Entity.User> Get(int id)
        {
            return _dbContext.Users.FirstOrDefault(r => r.Id == id);
        }

        public async Task<List<Entity.User>> GetAll(UserFilter filter)
        {
            if (filter.Id > 0)
                return _dbContext.Users.Where(u => u.Id == filter.Id).ToList();

            if (!string.IsNullOrEmpty(filter.UserName))
                return _dbContext.Users.Where(u => u.Name == filter.UserName).ToList();

            if (!string.IsNullOrEmpty(filter.UserEmail))
                return _dbContext.Users.Where(u => u.Email == filter.UserEmail).ToList();

            return _dbContext.Users.ToList();
        }

        public async Task Save(Entity.User user)
        {
            var entity = _dbContext.Users.FirstOrDefault(r => r.Id == user.Id);
            if (entity != null)
            {
                _dbContext.Entry(entity).CurrentValues.SetValues(user);
            }
            else
            {
                _dbContext.Users.Add(user);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
