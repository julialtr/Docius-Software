# Etapa base (imagem de runtime)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
# Define um usuário padrão (evita erro se APP_UID não estiver definido)
ARG APP_UID=1000
USER ${APP_UID}
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copia os arquivos de projeto (.csproj) individualmente
COPY Docius.API/Docius.API.csproj Docius.API/
COPY Docius.Service/Docius.Service.csproj Docius.Service/
COPY Docius.Repository/Docius.Repository.csproj Docius.Repository/

# Copia o diretório Template para a pasta publish
COPY Docius.API/Template /app/publish/Template

# Restaura os pacotes NuGet
RUN dotnet restore Docius.API/Docius.API.csproj

# Copia o restante dos arquivos da solução
COPY . .

# Compila a aplicação
WORKDIR /src/Docius.API
RUN dotnet build Docius.API.csproj -c $BUILD_CONFIGURATION -o /app/build

# Etapa de publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish Docius.API.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Etapa final (imagem de runtime pronta para produção)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Docius.API.dll"]


