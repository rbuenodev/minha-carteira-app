namespace Application.User.Response
{
    public class UserResponse<T> : Application.Response
    {
        public T? Data { get; set; }
    }
}
