using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
DotNetEnv.Env.Load();
var secret = Environment.GetEnvironmentVariable("SECRET");

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret")) // Retrieve from configuration or hardcoded
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireToken", policy =>
        policy.RequireAuthenticatedUser());
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/available_spots", () =>
{
    ApplicationDataBase db = new ApplicationDataBase();
    List<ParkingSpot> res = db.GetAvailableSpots();
    return res;
})
.WithName("crime")
.WithOpenApi()
.RequireAuthorization("RequireToken");

app.Run();
