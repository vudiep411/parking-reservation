--liquibase formatted sql

--changeset vu_diep_1:4
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    date_created TIMESTAMP
);

ALTER TABLE users ADD COLUMN date_created TIMESTAMP DEFAULT NOW();

--changeset vu_diep_2:1
CREATE TABLE IF NOT EXISTS login_record (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    time TIMESTAMP NOT NULL,
    ip_address VARCHAR(30)
);

--changeset vu_diep_3:1
CREATE TABLE refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL
);