using Application.Registry.DTOs;
using Application.Registry.Ports;
using Application.Registry.Request;
using Application.Registry.Response;
using Domain.Registries.Filters;
using Domain.Registries.Ports;
using Domain.Users.Ports;

namespace Application.Registry
{
    public class RegistryManager : IRegistryManager
    {
        private readonly IRegistryRepository _registryRepository;
        private readonly IUserRepository _userRepository;
        public RegistryManager(IRegistryRepository registryRepository, IUserRepository userRepository)
        {
            _registryRepository = registryRepository;
            _userRepository = userRepository;
        }

        public async Task<RegistryResponse<ResultRegistryDTO>> CreateRegistry(CreateRegistryRequest request)
        {
            try
            {
                var registry = CreateRegistryDTO.MapToEntity(request.Data);
                var user = await _userRepository.Get(request.Data.UserId);

                if (user == null)
                    throw new Exception("Invalid user");

                registry.User = user;
                registry.IsValid();

                await _registryRepository.Save(registry);
                var result = ResultRegistryDTO.MapToDTO(registry);

                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = true,
                    Data = result
                };
            }
            catch (Exception e)
            {
                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<RegistryResponse<ResultRegistryDTO>> DeleteRegistry(int id)
        {
            try
            {
                await _registryRepository.Delete(id);

                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = true,
                    HasErrors = false
                };
            }
            catch (Exception e)
            {
                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<RegistryResponse<List<ResultRegistryDTO>>> GetAllRegistry(RegistryFilter filters)
        {
            try
            {
                var list = await _registryRepository.GetAll(filters);
                if (list == null)
                    return new RegistryResponse<List<ResultRegistryDTO>> { Success = true, Data = new List<ResultRegistryDTO>() };

                var result = list.Select(x => ResultRegistryDTO.MapToDTO(x)).ToList();
                return new RegistryResponse<List<ResultRegistryDTO>> { Success = true, Data = result };
            }
            catch (Exception e)
            {
                return new RegistryResponse<List<ResultRegistryDTO>>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<RegistryResponse<ResultRegistryDTO>> GetRegistryById(int id)
        {
            try
            {
                var registry = await _registryRepository.GetAggragate(id);
                if (registry != null)
                    return new RegistryResponse<ResultRegistryDTO> { Success = true, Data = ResultRegistryDTO.MapToDTO(registry) };

                return new RegistryResponse<ResultRegistryDTO> { Success = false, Message = "Entity not found" };
            }
            catch (Exception e)
            {
                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<RegistryResponse<ResultRegistryDTO>> UpdateRegistry(UpdateRegistryRequest request)
        {
            try
            {
                var registry = UpdateRegistryDTO.MapToEntity(request.Data);
                registry.IsValid();

                await _registryRepository.Save(registry);
                return new RegistryResponse<ResultRegistryDTO> { Success = true, Data = ResultRegistryDTO.MapToDTO(registry) };
            }
            catch (Exception e)
            {

                return new RegistryResponse<ResultRegistryDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }
    }
}
