
namespace Application.Registry.Response
{
    public class RegistryResponse<T> : Application.Response
    {
        public T? Data { get; set; }
    }
}
