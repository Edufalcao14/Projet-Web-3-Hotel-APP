-- INIT
DROP SCHEMA IF EXISTS project CASCADE;
CREATE SCHEMA IF NOT EXISTS project;
SET SEARCH_PATH = project;

-- CREATE TABLES
-- Clients : Those who make reservations in the Hotel.
CREATE TABLE project.clients
(
    client_id    SERIAL PRIMARY KEY,
    first_name   VARCHAR(50)  NOT NULL CHECK ( first_name <> '' ),
    last_name    VARCHAR(50)  NOT NULL CHECK ( last_name <> '' ),
    phone_number CHAR(10)     NULL CHECK ( phone_number ~ '^[0-9]{9,10}$' ),
    email        VARCHAR(150) NOT NULL UNIQUE CHECK ( email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' ),
    birthdate    DATE         NOT NULL CHECK ( birthdate <= CURRENT_DATE AND
                                               birthdate >= (CURRENT_DATE - INTERVAL '120 YEARS') ),
    country      CHAR(2)      NOT NULL CHECK ( country <> '' )
);

-- Partners : Partners with whom the reservations are made (Vinci Hotel, Booking, ...).
CREATE TABLE project.partners
(
    partner_id SERIAL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL CHECK ( name <> '' )
);

-- Room Types : Types for a room.
CREATE TABLE project.room_types
(
    room_type_id SERIAL PRIMARY KEY,
    name         VARCHAR(50)      NOT NULL CHECK ( name <> '' ),
    price        DOUBLE PRECISION NOT NULL CHECK ( price > 0 )
);

-- Room Statuses : Statuses for a room.
CREATE TABLE project.room_statuses
(
    room_status_id SERIAL PRIMARY KEY,
    name           VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Bed Types : Types of beds for a room.
CREATE TABLE project.bed_types
(
    bed_type_id SERIAL PRIMARY KEY,
    name        VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Rooms : Rooms that the clients can make reservations for.
CREATE TABLE project.rooms
(
    room_id        SERIAL PRIMARY KEY,
    name           VARCHAR(50) NOT NULL CHECK ( name <> '' ),
    number         INTEGER     NOT NULL CHECK ( number > 0 ),
    floor          INTEGER     NOT NULL,
    bed_type       INTEGER     NOT NULL REFERENCES project.bed_types (bed_type_id),
    type           INTEGER     NOT NULL REFERENCES project.room_types (room_type_id),
    current_status INTEGER     NOT NULL REFERENCES project.room_statuses (room_status_id)
);

-- Payment Types : Types of payment for a reservation
CREATE TABLE project.payment_types
(
    payment_type_id SERIAL PRIMARY KEY,
    name            VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Reservations : Reservations made by the clients.
CREATE TABLE project.reservations
(
    reservation_id SERIAL PRIMARY KEY,
    client         INTEGER          NOT NULL REFERENCES project.clients (client_id),
    room           INTEGER          NOT NULL REFERENCES project.rooms (room_id),
    arrival_date   DATE             NOT NULL,
    departure_date DATE             NOT NULL,
    checked_in     BOOLEAN          NOT NULL                                                DEFAULT FALSE,
    checked_out    BOOLEAN          NOT NULL                                                DEFAULT FALSE,
    total_price    DOUBLE PRECISION NOT NULL CHECK ( total_price > 0 ),
    is_paid        BOOLEAN          NOT NULL                                                DEFAULT FALSE,
    payment_type   INTEGER          NULL REFERENCES project.payment_types (payment_type_id) DEFAULT NULL,
    partner        INTEGER          NOT NULL REFERENCES project.partners (partner_id),
    UNIQUE (room, arrival_date, departure_date),
    CONSTRAINT chk_dates CHECK ( arrival_date < departure_date )
);

-- Services : Services that the clients can add to their reservations.
CREATE TABLE project.services
(
    service_id SERIAL PRIMARY KEY,
    name       VARCHAR(50)      NOT NULL CHECK ( name <> '' ),
    price      DOUBLE PRECISION NOT NULL CHECK ( price >= 0 )
);

-- Reservation's Services : Services of a reservation
CREATE TABLE project.reservation_services
(
    r_service_id SERIAL PRIMARY KEY,
    service      INTEGER NOT NULL REFERENCES project.services (service_id),
    reservation  INTEGER NOT NULL REFERENCES project.reservations (reservation_id)
);
