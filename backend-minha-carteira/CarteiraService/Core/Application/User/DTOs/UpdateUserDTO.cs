using Entity = Domain.Users.Entities;

namespace Application.User.DTOs
{
    public class UpdateUserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public static Entity.User MapToEntity(UpdateUserDTO updateUserDTO)
        {
            return new Entity.User
            {
                Id = updateUserDTO.Id,
                Name = updateUserDTO.Name,
                Email = updateUserDTO.Email,
            };
        }
    }
}
