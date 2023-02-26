using Domain.Registries.Enums;
using Domain.Users.Entities;
using EnumType = Domain.Registries.Enums.Type;

namespace Domain.Registries.Entities
{
    public class Registry
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public EnumType Type { get; set; }
        public Frequency Frequency { get; set; }
        public DateOnly Date { get; set; }
        public string? Obs { get; set; }
        public User User { get; set; }


        private bool Validate()
        {
            if (string.IsNullOrEmpty(Description))
                throw new ArgumentNullException("Name");
            if (Amount == 0)
                throw new Exception("Amount might be bigger than zero");
            if (User == null)
                throw new ArgumentNullException("User");
            if (Date == default(DateOnly))
                throw new ArgumentNullException("Date");

            return true;
        }

        public bool IsValid()
        {
            return Validate();
        }
    }
}
