using Domain.Users.Entities;
using Domain.Users.Filter;

namespace Domain.Users.Ports
{
    public interface IUserRepository
    {
        Task<User?> Get(int id);
        Task<List<User>> GetAll(UserFilter? filter);
        Task<User> Save(User user);
        Task Delete(int id);
    }
}
