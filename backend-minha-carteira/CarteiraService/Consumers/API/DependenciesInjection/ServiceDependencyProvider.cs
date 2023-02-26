using Application.Registry;
using Application.Registry.Ports;
using Application.User;
using Application.User.Ports;
using Data;
using Data.Registry;
using Data.User;
using Domain.Registries.Ports;
using Domain.Users.Ports;
using Microsoft.EntityFrameworkCore;

namespace API.DependenciesInjection
{
    public static class ServiceDependencyProvider
    {
        public static void RegisterDependencies(this IServiceCollection serviceCollection, string connectionString)
        {            
            serviceCollection.AddScoped<IUserManager, UserManager>();
            serviceCollection.AddScoped<IUserRepository, UserRepository>();
            serviceCollection.AddScoped<IRegistryManager, RegistryManager>();            
            serviceCollection.AddScoped<IRegistryRepository, RegistryRepository>();
            serviceCollection.AddDbContext<CarteiraDBContext>(options => options.UseNpgsql(connectionString));
        }

    }
}
