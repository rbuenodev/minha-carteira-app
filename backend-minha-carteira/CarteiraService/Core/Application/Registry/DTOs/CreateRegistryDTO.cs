using Enums = Domain.Registries.Enums;
using Entity = Domain.Registries.Entities;

namespace Application.Registry.DTOs
{
    public class CreateRegistryDTO
    {
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string Frequency { get; set; }
        public DateOnly Date { get; set; }
        public string? Obs { get; set; }
        public int UserId { get; set; }


        public static Entity.Registry MapToEntity(CreateRegistryDTO createRegistryDTO)
        {
            return new Entity.Registry
            {
                Id = 0,
                Description = createRegistryDTO.Description,
                Amount = createRegistryDTO.Amount,
                Type = (Enums.Type)Enum.Parse(typeof(Enums.Type), createRegistryDTO.Type),
                Date = createRegistryDTO.Date,
                Frequency = (Enums.Frequency)Enum.Parse(typeof(Enums.Frequency), createRegistryDTO.Frequency),
                Obs = createRegistryDTO.Obs,
                User = new Domain.Users.Entities.User { Id = createRegistryDTO.UserId }
            };
        }
    }
}
