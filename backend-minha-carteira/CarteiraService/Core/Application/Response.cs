namespace Application
{
    public abstract class Response
    {
        public bool Success { get; set; }
        public string Message { get; set; } = "";
        public bool HasErrors { get; set; }
    }
}