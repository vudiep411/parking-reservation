--liquibase formatted sql

--changeset vu_diep_1:1

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255),
    name VARCHAR(100) NOT NULL
);