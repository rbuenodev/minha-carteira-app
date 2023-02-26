using Enums = Domain.Registries.Enums;
using Entity = Domain.Registries.Entities;

namespace Application.Registry.DTOs
{
    public class UpdateRegistryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string Frequency { get; set; }
        public DateOnly Date { get; set; }
        public string? Obs { get; set; }
        public int UserId { get; set; }

        public static Entity.Registry MapToEntity(UpdateRegistryDTO updateRegistryDTO)
        {
            return new Entity.Registry
            {
                Id = updateRegistryDTO.Id,
                Description = updateRegistryDTO.Description,
                Amount = updateRegistryDTO.Amount,
                Type = (Enums.Type)Enum.Parse(typeof(Enums.Type), updateRegistryDTO.Type),
                Date = updateRegistryDTO.Date,
                Frequency = (Enums.Frequency)Enum.Parse(typeof(Enums.Frequency), updateRegistryDTO.Frequency),
                Obs = updateRegistryDTO.Obs,
                User = new Domain.Users.Entities.User { Id = updateRegistryDTO.UserId }
            };
        }
    }
}



