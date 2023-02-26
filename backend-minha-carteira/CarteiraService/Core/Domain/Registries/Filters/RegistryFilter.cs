using Domain.Filters;

namespace Domain.Registries.Filters
{
    public class RegistryFilter : EntityFilter
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public string DateBiggerThan { get; set; }
        public string DateLowerThan { get; set; }
        public int UserId { get; set; }
    }
}
