using Application.Registry.DTOs;
using Application.Registry.Response;
using Domain.Registries.Filters;

namespace Application.Registry.Ports
{
    public interface IRegistryManager
    {
        Task<RegistryResponse> CreateRegistry(CreateRegistryDTO createRegistryDTO);
        Task<RegistryResponse> GetRegistryById(int id);
        Task<RegistryResponse> GetAllRegistry(RegistryFilter filters);
        Task<RegistryResponse> DeleteRegistry(int id);
        Task<RegistryResponse> UpdateRegistry(UpdateRegistryDTO updateRegistryDTO);
    }
}
