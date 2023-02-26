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
            var errors = "";
            if (string.IsNullOrEmpty(Description))
                errors = "Name cannot be null; ";

            if (Amount <= 0)
                errors += "Amount might be bigger than zero; ";

            if (User == null)
                errors += "User cannot be null; ";

            if (Date == default(DateOnly))
                errors += "Date cannot be null; ";

            if (!string.IsNullOrEmpty(errors))
                throw new ArgumentNullException(errors);

            return true;
        }

        public bool IsValid()
        {
            return Validate();
        }
    }
}
