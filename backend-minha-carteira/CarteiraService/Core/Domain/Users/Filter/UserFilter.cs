using Domain.Filters;

namespace Domain.Users.Filter
{
    public class UserFilter : EntityFilter
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
