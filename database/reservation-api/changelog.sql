--liquibase formatted sql


--changeset vu_diep_2:5
CREATE TABLE IF NOT EXISTS parking_spot (
    id VARCHAR(255) PRIMARY KEY,
    vehicle_type VARCHAR(255),
    rate DECIMAL(10, 2),
    lot VARCHAR(2)
);

--changeset vu_diep_3:2
CREATE TABLE IF NOT EXISTS reservation (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    parking_spot_id VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP  NOT NULL,
    license_plate VARCHAR(255),
);

