using Entity = Domain.Registries.Entities;

namespace Application.Registry.DTOs
{
    public class ResultRegistryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string Frequency { get; set; }
        public DateOnly Date { get; set; }
        public string? Obs { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }

        public static ResultRegistryDTO MapToDTO(Entity.Registry registry)
        {
            return new ResultRegistryDTO
            {
                Id = registry.Id,
                Amount = registry.Amount,
                Type = registry.Type.ToString(),
                Frequency = registry.Frequency.ToString(),
                Date = registry.Date,
                Description = registry.Description,
                Obs = registry.Obs,
                UserId = registry.User.Id,
                UserName = registry.User.Name
            };
        }
    }
}
