namespace Domain.Users.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        private bool Validate()
        {
            if (string.IsNullOrEmpty(Name))
                throw new ArgumentNullException("Name");

            if (string.IsNullOrEmpty(Email))
                throw new ArgumentNullException("Email");

            return true;
        }

        public bool IsValid()
        {
            return Validate();
        }
    }
}
