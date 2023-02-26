using Application.User.DTOs;
using Application.User.Request;
using Application.User.Response;
using Domain.Users.Filter;

namespace Application.User.Ports
{
    public interface IUserManager
    {
        Task<UserResponse<ResultUserDTO>> CreateUser(CreateUserRequest request);
        Task<UserResponse<ResultUserDTO>> GetUserById(int id);
        Task<UserResponse<List<ResultUserDTO>>> GetAllUsers(UserFilter filters);
        Task<UserResponse<ResultUserDTO>> DeleteUser(int id);
        Task<UserResponse<ResultUserDTO>> UpdateUser(UpdateUserRequest request);
    }
}
