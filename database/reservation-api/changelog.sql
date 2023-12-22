--liquibase formatted sql


--changeset vu_diep_1:3
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    name VARCHAR(100) NOT NULL
);

--changeset vu_diep_2:1
CREATE TABLE IF NOT EXISTS parking_spot (
    id VARCHAR(255) PRIMARY KEY,
    status BOOLEAN,
    vehicle_type VARCHAR(255),
    rate DECIMAL(10, 2)
);

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