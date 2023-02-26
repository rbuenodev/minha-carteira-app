using Entity = Domain.Users.Entities;

namespace Application.User.DTOs
{
    public class ResultUserDTO

    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public static ResultUserDTO MapToDTO(Entity.User user)
        {
            return new ResultUserDTO { Id = user.Id, Name = user.Name, Email = user.Email };
        }

    }
}
