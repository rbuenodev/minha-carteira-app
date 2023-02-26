using Entity = Domain.Users.Entities;

namespace Application.User.DTOs
{
    public class CreateUserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }


        public static Entity.User MapToEntity(CreateUserDTO createUserDTO)
        {
            return new Entity.User
            {
                Id = 0,
                Name = createUserDTO.Name,
                Email = createUserDTO.Email,
            };
        }
    }
}
