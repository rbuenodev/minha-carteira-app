using Application.User.DTOs;
using Application.User.Ports;
using Application.User.Request;
using Application.User.Response;
using Domain.Users.Filter;
using Domain.Users.Ports;

namespace Application.User
{
    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepository;
        public UserManager(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse<ResultUserDTO>> CreateUser(CreateUserRequest request)
        {
            try
            {
                var user = CreateUserDTO.MapToEntity(request.Data);
                user.IsValid();

                await _userRepository.Save(user);
                return new UserResponse<ResultUserDTO> { Success = true, Data = ResultUserDTO.MapToDTO(user) };
            }
            catch (Exception e)
            {
                return new UserResponse<ResultUserDTO> { Success = false, HasErrors = true, Message = e.Message };
            }
        }

        public async Task<UserResponse<ResultUserDTO>> DeleteUser(int id)
        {
            try
            {
                await _userRepository.Delete(id);

                return new UserResponse<ResultUserDTO>
                {
                    Success = true,
                    HasErrors = false
                };
            }
            catch (Exception e)
            {
                return new UserResponse<ResultUserDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<UserResponse<List<ResultUserDTO>>> GetAllUsers(UserFilter filters)
        {
            try
            {
                var list = await _userRepository.GetAll(filters);
                if (list == null)
                    return new UserResponse<List<ResultUserDTO>> { Success = true, Data = new List<ResultUserDTO>() };

                var result = list.Select(x => ResultUserDTO.MapToDTO(x)).ToList();
                return new UserResponse<List<ResultUserDTO>> { Success = true, Data = result };
            }
            catch (Exception e)
            {
                return new UserResponse<List<ResultUserDTO>>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<UserResponse<ResultUserDTO>> GetUserById(int id)
        {
            try
            {
                var user = await _userRepository.Get(id);
                if (user != null)
                    return new UserResponse<ResultUserDTO> { Success = true, Data = ResultUserDTO.MapToDTO(user) };

                return new UserResponse<ResultUserDTO> { Success = false, Message = "Entity not found" };
            }
            catch (Exception e)
            {
                return new UserResponse<ResultUserDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }

        public async Task<UserResponse<ResultUserDTO>> UpdateUser(UpdateUserRequest request)
        {
            try
            {
                var user = UpdateUserDTO.MapToEntity(request.Data);
                user.IsValid();

                await _userRepository.Save(user);
                return new UserResponse<ResultUserDTO> { Success = true, Data = ResultUserDTO.MapToDTO(user) };
            }
            catch (Exception e)
            {
                return new UserResponse<ResultUserDTO>
                {
                    Success = false,
                    HasErrors = true,
                    Message = e.Message
                };
            }
        }
    }
}
