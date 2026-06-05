FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY GymApp/GymApp.csproj GymApp/
RUN dotnet restore GymApp/GymApp.csproj

COPY . .

RUN dotnet publish GymApp/GymApp.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "GymApp.dll"]