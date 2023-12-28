--liquibase formatted sql


--changeset vu_diep_1:4
CREATE OR REPLACE VIEW spot_reservation AS (
SELECT 
    p.id AS parking_spot_id,
    p.status AS parking_spot_status,
    p.vehicle_type,
    p.rate,
    p.lot,
    r.id AS reservation_id,
    r.user_id,
    r.start_time,
    r.end_time,
    r.license_plate,
    r.status AS reservation_status
FROM 
    parking_spot p
JOIN 
    reservation r ON p.id = r.parking_spot_id;
);


--changeset vu_diep_2:4
CREATE TABLE IF NOT EXISTS parking_spot (
    id VARCHAR(255) PRIMARY KEY,
    status BOOLEAN,
    vehicle_type VARCHAR(255),
    rate DECIMAL(10, 2),
    lot VARCHAR(2)
);
CREATE INDEX lot_index ON parking_spot (lot);

--changeset vu_diep_3:1
CREATE TABLE IF NOT EXISTS reservation (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    parking_spot_id VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP  NOT NULL,
    license_plate VARCHAR(255),
    status VARCHAR(30)
);

