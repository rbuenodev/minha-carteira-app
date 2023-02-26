using Application.Registry;
using Application.Registry.DTOs;
using Application.Registry.Request;
using Domain.Registries.Ports;
using Domain.Users.Entities;
using Domain.Users.Ports;
using Moq;
using Entity = Domain.Registries.Entities;

namespace ApplicationTests.Registry
{
    public class RegistryManagerTest
    {
        private readonly User _user = new User { Id = 1, Name = "Teste", Email = "Email" };
        private readonly Entity.Registry _registry = new Entity.Registry { Id = 1, Amount = 10, Date = DateOnly.FromDateTime(DateTime.Now), Description = "Description", Frequency = 0, Type = 0, User = new User { Id = 1, Name = "Teste", Email = "Email" } };
        private readonly CreateRegistryDTO _createRegistryDTO = new CreateRegistryDTO { Amount = 10, Date = DateOnly.FromDateTime(DateTime.Now), Description = "Description", Frequency = "Eventual", Type = "Entrada", UserId = 1 };

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task ShouldCrateANewRegistrySuccessfully()
        {
            //Mock
            var registryRepo = new Mock<IRegistryRepository>();
            var userRepo = new Mock<IUserRepository>();
            registryRepo.Setup(s => s.Save(It.IsAny<Entity.Registry>())).Returns(Task.FromResult(_registry));
            userRepo.Setup(s => s.Get(It.IsAny<int>())).Returns(Task.FromResult(_user));

            var registryManager = new RegistryManager(registryRepo.Object, userRepo.Object);
            var res = await registryManager.CreateRegistry(new CreateRegistryRequest { Data = _createRegistryDTO });

            Assert.NotNull(res);
            Assert.That(res.Success, Is.True);
            Assert.That(res.Data.UserName, Is.EqualTo(_registry.User.Name));
            Assert.That(res.Data.Type, Is.EqualTo("Entrada"));
        }

        [Test]
        public async Task ShouldCrateANewRegistryUnsuccessfully()
        {
            //Mock
            var registryRepo = new Mock<IRegistryRepository>();
            var userRepo = new Mock<IUserRepository>();
            registryRepo.Setup(s => s.Save(It.IsAny<Entity.Registry>())).Returns(Task.FromResult(It.IsAny<Entity.Registry>()));
            userRepo.Setup(s => s.Get(It.IsAny<int>())).Returns(Task.FromResult(_user));

            var registryManager = new RegistryManager(registryRepo.Object, userRepo.Object);
            var res = await registryManager.CreateRegistry(new CreateRegistryRequest { Data = It.IsAny<CreateRegistryDTO>() });

            Assert.NotNull(res);
            Assert.That(res.Success, Is.False);
            Assert.That(res.HasErrors);
        }
    }
}
