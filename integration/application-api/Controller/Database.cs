using System;
using System.Collections.Generic;
using System.Linq;
using Npgsql;
using System.Data;
using DotNetEnv;
public class ApplicationDataBase {
    private readonly string databaseUrl = "";
    public ApplicationDataBase() {
        DotNetEnv.Env.Load();
        this.databaseUrl = Environment.GetEnvironmentVariable("DB_URL"); 
    }
    public ApplicationDataBase(string url) {
        this.databaseUrl = url;
    }

    public List<ParkingSpot> GetAvailableSpots() {
        List<ParkingSpot> available = new List<ParkingSpot>();
        using (NpgsqlConnection conn = new NpgsqlConnection(this.databaseUrl)) {
            conn.Open();
            string stmt = "SELECT * FROM parking_spot WHERE status = True";
            NpgsqlCommand exec = new NpgsqlCommand(stmt, conn);
            NpgsqlDataReader results = exec.ExecuteReader();

            while(results.Read()) {
                var ParkingSpotData = new ParkingSpot(
                    results.GetString(0),
                    results.GetBoolean(1),
                    results.GetString(2),
                    results.GetFloat(3),
                    results.GetString(4)
                );
                available.Add(ParkingSpotData);
            }
        }
        return available;
    }
}