using Domain.Registries.Entities;
using Domain.Registries.Filters;

namespace Domain.Registries.Ports
{
    public interface IRegistryRepository
    {
        Task<Registry?> Get(int id);
        Task<Registry?> GetAggragate(int id);
        Task<List<Registry>> GetAll(RegistryFilter filters);
        Task Delete(int id);
        Task Save(Registry registry);
    }
}
