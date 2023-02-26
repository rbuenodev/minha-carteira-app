using Entity = Domain.Registries.Entities;

namespace DomainTests.RegistryTests
{
    public class Registry
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ShouldCreateAValidRegistry()
        {
            var registry = new Entity.Registry { Id = 1, Amount = 10, Date = DateOnly.FromDateTime(DateTime.Now), Description = "Description", Frequency = 0, Type = 0, User = new Domain.Users.Entities.User { Id = 1, Name = "Teste", Email = "Email" } };
            Assert.That(registry.IsValid());
            Assert.NotNull(registry);
        }

        [Test]
        public void ShouldCreateAnInvalidRegistry()
        {
            var registry = new Entity.Registry();

            Assert.NotNull(registry);
            try
            {
                registry.IsValid();
            }
            catch (Exception e)
            {
                Assert.NotNull(e.Message);
            }
        }

        [Test]
        public void ShouldCreateRegistryWithInvalidDate()
        {
            var registry = new Entity.Registry { Id = 1, Amount = 10, Description = "Description", Frequency = 0, Type = 0, User = new Domain.Users.Entities.User { Id = 1, Name = "Teste", Email = "Email" } };
            try
            {
                registry.IsValid();
            }
            catch (Exception e)
            {
                Assert.That(e.Message, Is.EqualTo("Value cannot be null. (Parameter 'Date cannot be null; ')"));
            }
            Assert.NotNull(registry);
        }
    }
}
