#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["CarteiraService/Consumers/API/API.csproj", "CarteiraService/Consumers/API/"]
COPY ["CarteiraService/Adapters/Data/Data.csproj", "CarteiraService/Adapters/Data/"]
COPY ["CarteiraService/Core/Domain/Domain.csproj", "CarteiraService/Core/Domain/"]
COPY ["CarteiraService/Core/Application/Application.csproj", "CarteiraService/Core/Application/"]
RUN dotnet restore "CarteiraService/Consumers/API/API.csproj"
RUN dotnet dev-certs https
COPY . .
WORKDIR "/src/CarteiraService/Consumers/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
ENTRYPOINT ["dotnet", "API.dll"]