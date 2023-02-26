using Application.Registry.DTOs;
using Application.Registry.Request;
using Application.Registry.Response;
using Domain.Registries.Filters;

namespace Application.Registry.Ports
{
    public interface IRegistryManager
    {
        Task<RegistryResponse<ResultRegistryDTO>> CreateRegistry(CreateRegistryRequest request);
        Task<RegistryResponse<ResultRegistryDTO>> GetRegistryById(int id);
        Task<RegistryResponse<List<ResultRegistryDTO>>> GetAllRegistry(RegistryFilter filters);
        Task<RegistryResponse<ResultRegistryDTO>> DeleteRegistry(int id);
        Task<RegistryResponse<ResultRegistryDTO>> UpdateRegistry(UpdateRegistryRequest request);
    }
}
