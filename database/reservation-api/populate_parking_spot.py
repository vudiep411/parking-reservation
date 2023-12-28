import psycopg2

# Database connection parameters
dbname = ''
user = ''
password = ''
host = ''
port = '5432'

conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
cursor = conn.cursor()

lots = ["A", "B", "C"]
records = []
for lot in lots:
    for i in range(100, 500):
        parking_id = lot + str(i)
        records.append((parking_id, "Any", "2.0", lot))

insert_query = "INSERT INTO parking_spot (id, vehicle_type, rate, lot) VALUES (%s, %s, %s, %s, %s)"

for record in records:
    cursor.execute(insert_query, record)

conn.commit()
cursor.close()
conn.close()

print("done")