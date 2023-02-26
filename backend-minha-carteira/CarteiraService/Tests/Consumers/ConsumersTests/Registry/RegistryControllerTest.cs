using API.Controllers.v1;
using Application.Registry.DTOs;
using Application.Registry.Ports;
using Application.Registry.Response;
using Domain.Registries.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace ConsumersTests.Registry
{
    public class RegistryControllerTest
    {
        private readonly RegistryResponse<ResultRegistryDTO> _registryResponse = new RegistryResponse<ResultRegistryDTO> { Data = new ResultRegistryDTO { Id = 1, Amount = 10, Date = DateOnly.FromDateTime(DateTime.Now), Description = "Description", Frequency = "Eventual", Type = "Entrada", UserId = 1, UserName = "User" }, Success = true };
        private readonly RegistryResponse<List<ResultRegistryDTO>> _registryResponseList = new RegistryResponse<List<ResultRegistryDTO>> { Data = new List<ResultRegistryDTO> { new ResultRegistryDTO { Id = 1, Amount = 10, Date = DateOnly.FromDateTime(DateTime.Now), Description = "Description", Frequency = "Eventual", Type = "Entrada", UserId = 1, UserName = "User" } }, HasErrors = false, Success = true };

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task ShouldGetAllRegistriesWithStatus200()
        {
            //Mock
            var registryManager = new Mock<IRegistryManager>();
            registryManager.Setup(x => x.GetAllRegistry(It.IsAny<RegistryFilter>())).Returns(Task.FromResult(_registryResponseList));
            var logger = new Mock<ILogger<RegistryController>>();

            var controller = new RegistryController(logger.Object, registryManager.Object);

            var res = await controller.GetAllRegistries(1);
            var result = res.Result as OkObjectResult;
            var resultObject = GetObjectResultContent<RegistryResponse<List<ResultRegistryDTO>>>(result);

            Assert.IsNotNull(result);
            Assert.IsNotNull(result.Value);
            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(resultObject.Success);
            Assert.IsNotNull(resultObject.Data.ElementAt(0));
        }

        [Test]
        public async Task ShouldGetRegistryWithStatus200()
        {
            //Mock
            var registryManager = new Mock<IRegistryManager>();
            registryManager.Setup(x => x.GetRegistryById(It.IsAny<int>())).Returns(Task.FromResult(_registryResponse));
            var logger = new Mock<ILogger<RegistryController>>();

            var controller = new RegistryController(logger.Object, registryManager.Object);

            var res = await controller.GetByID(1);
            var result = res.Result as OkObjectResult;
            var resultObject = GetObjectResultContent<RegistryResponse<ResultRegistryDTO>>(result);

            Assert.IsNotNull(result);
            Assert.IsNotNull(result.Value);
            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(resultObject.Success);
            Assert.IsNotNull(resultObject.Data);
            Assert.That(resultObject.Data.Id, Is.EqualTo(_registryResponse.Data.Id));
        }

        [Test]
        public async Task ShouldNotGetRegistryWithStatusBadRequest400()
        {
            //Mock
            var registryManager = new Mock<IRegistryManager>();
            registryManager.Setup(x => x.GetRegistryById(It.IsAny<int>())).Returns(Task.FromResult(It.IsAny<RegistryResponse<ResultRegistryDTO>>()));
            var logger = new Mock<ILogger<RegistryController>>();

            var controller = new RegistryController(logger.Object, registryManager.Object);

            var res = await controller.GetByID(0);
            var result = res.Result as BadRequestResult;            

            Assert.IsNotNull(result);            
            Assert.That(result.StatusCode, Is.EqualTo(400));            
        }

        private static T GetObjectResultContent<T>(ActionResult<T> result)
        {
            return (T)((ObjectResult)result.Result).Value;
        }
    }
}
