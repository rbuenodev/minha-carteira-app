using Domain.Filters;

namespace Domain.Registries.Filters
{
    public class RegistryFilter : EntityFilter
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public DateOnly DateBiggerThan { get; set; }
        public DateOnly DateLowerThan { get; set; }
        public int UserId { get; set; }
    }
}
