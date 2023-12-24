--liquibase formatted sql

--changeset vu_diep_1:2

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS login_record (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    time TIMESTAMP NOT NULL,
    ip_address VARCHAR(30)
);

CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL
);