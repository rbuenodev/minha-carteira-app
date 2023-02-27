using Application.User.DTOs;
using Application.User.Ports;
using Application.User.Request;
using Application.User.Response;
using Domain.Users.Filter;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{

    [ApiController]
    [Route("api/v1/user")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IUserManager _userManager;
        public UserController(ILogger<UserController> logger, IUserManager userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        [HttpGet()]
        public async Task<ActionResult<UserResponse<List<ResultUserDTO>>>> GetAll(
            [FromQuery] int? id = 0,
            [FromQuery] string? userEmail = "",
            [FromQuery] string? userName = "")
        {
            var filters = new UserFilter { Id = (int)id, UserEmail = userEmail, UserName = userName };
            var res = await _userManager.GetAllUsers(filters);

            if (res.HasErrors) return StatusCode(500, res);
            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse<ResultUserDTO>>> GetByID([FromRoute] int id)
        {
            if (id == 0) return BadRequest();

            var res = await _userManager.GetUserById(id);

            if (res.Message == "Entity not found") return NotFound(res);

            if (res.HasErrors) return StatusCode(500, res);

            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpPost()]
        public async Task<ActionResult<UserResponse<ResultUserDTO>>> PostUser([FromBody] CreateUserDTO createUserDTO)
        {
            if (createUserDTO == null) return BadRequest();

            var req = new CreateUserRequest { Data = createUserDTO };
            var res = await _userManager.CreateUser(req);

            if (res.HasErrors) return StatusCode(500, res);

            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }

        [HttpPut()]
        public async Task<ActionResult<UserResponse<ResultUserDTO>>> PatchUser([FromBody] UpdateUserDTO updateUserDTO)
        {
            if (updateUserDTO == null) return BadRequest();

            var req = new UpdateUserRequest { Data = updateUserDTO };
            var res = await _userManager.UpdateUser(req);

            if (res.HasErrors) return StatusCode(500, res);
            if (res.Success) return Ok(res);

            _logger.LogError("response with unknown error", res);
            return StatusCode(500);
        }
    }
}
