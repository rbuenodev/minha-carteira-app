using Application.Registry.DTOs;
using Application.Registry.Ports;
using Application.Registry.Request;
using Application.Registry.Response;
using Application.User.DTOs;
using Application.User.Response;
using Domain.Registries.Filters;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    [ApiController]
    [Route("api/v1/registry")]
    public class RegistryController : ControllerBase
    {

        private readonly ILogger<RegistryController> _logger;
        private readonly IRegistryManager _registryManager;
        public RegistryController(ILogger<RegistryController> logger, IRegistryManager registryManager)
        {
            _logger = logger;
            _registryManager = registryManager;
        }

        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<RegistryResponse<List<ResultRegistryDTO>>>> GetAllRegistries(
            [FromRoute] int userId,
            [FromQuery] string? dateBiggerThan = "",
            [FromQuery] string? dateLowerThan = "",
            [FromQuery] int? id = 0,
            [FromQuery] int? month = 0,
            [FromQuery] int? year = 0)

        {

            var filters = new RegistryFilter
            {
                UserId = userId,
                Id = (int)id,
                Month = (int)month,
                Year = (int)year,
                DateBiggerThan = dateBiggerThan,
                DateLowerThan = dateLowerThan

            };

            var res = await _registryManager.GetAllRegistry(filters);

            if (res.HasErrors) return StatusCode(500, res);
            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse<ResultUserDTO>>> GetByID([FromRoute] int id)
        {
            if (id == 0) return BadRequest();

            var res = await _registryManager.GetRegistryById(id);

            if (res.Message == "Entity not found") return NotFound(res);

            if (res.HasErrors) return StatusCode(500, res);

            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpPost()]
        public async Task<ActionResult<RegistryResponse<ResultRegistryDTO>>> PostRegistry([FromBody] CreateRegistryDTO createRegistryDTO)
        {
            if (createRegistryDTO == null) return BadRequest();

            var req = new CreateRegistryRequest { Data = createRegistryDTO };
            var res = await _registryManager.CreateRegistry(req);

            if (res.HasErrors) return StatusCode(500, res);

            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpPut()]
        public async Task<ActionResult<RegistryResponse<ResultRegistryDTO>>> PatchUser([FromBody] UpdateRegistryDTO updateRegistryDTO)
        {
            if (updateRegistryDTO == null) return BadRequest();

            var req = new UpdateRegistryRequest { Data = updateRegistryDTO };
            var res = await _registryManager.UpdateRegistry(req);

            if (res.HasErrors) return StatusCode(500, res);

            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }
    }
}
