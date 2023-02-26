using Application.Registry.DTOs;

namespace Application.Registry.Response
{
    public class RegistryResponse : Application.Response
    {
        public ResultRegistryDTO? Data { get; set; }
    }
}
