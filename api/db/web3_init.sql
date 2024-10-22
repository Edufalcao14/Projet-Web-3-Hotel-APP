DROP SCHEMA IF EXISTS project CASCADE;
CREATE SCHEMA IF NOT EXISTS project;
SET SEARCH_PATH = project;



-- CREATE TABLES
-- Clients : Those who make reservations in the Hotel.
CREATE TABLE project.clients
(
    id_client    SERIAL PRIMARY KEY,
    first_name   VARCHAR(50)  NOT NULL CHECK ( first_name <> '' ),
    last_name    VARCHAR(50)  NOT NULL CHECK ( last_name <> '' ),
    phone_number CHAR(10)     NULL CHECK ( phone_number ~ '^[0-9]{9,10}$' ),
    email        VARCHAR(150) NOT NULL CHECK ( email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' ),
    birthdate    DATE         NOT NULL CHECK ( birthdate <= CURRENT_DATE AND
                                               birthdate >= (CURRENT_DATE - INTERVAL '120 YEARS') ),
    country      CHAR(2)      NOT NULL CHECK ( country <> '' )
);

-- Partners : Partners with whom the reservations are made (Vinci Hotel, Booking, ...).
CREATE TABLE project.partners
(
    id_partner SERIAL PRIMARY KEY,
    name       VARCHAR(50) NOT NULL CHECK ( name <> '' )
);

-- Room Types : Types for a room.
CREATE TABLE project.room_types
(
    id_room_type SERIAL PRIMARY KEY,
    name         VARCHAR(50)      NOT NULL CHECK ( name <> '' ),
    price        DOUBLE PRECISION NOT NULL CHECK ( price > 0 )
);

-- Room Statuses : Statuses for a room.
CREATE TABLE project.room_statuses
(
    id_room_status SERIAL PRIMARY KEY,
    name           VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Bed Types : Types of beds for a room.
CREATE TABLE project.bed_types
(
    id_bed_type SERIAL PRIMARY KEY,
    name        VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Rooms : Rooms that the clients can make reservations for.
CREATE TABLE project.rooms
(
    id_room  SERIAL PRIMARY KEY,
    name     VARCHAR(50) NOT NULL CHECK ( name <> '' ),
    number   INTEGER     NOT NULL CHECK ( number > 0 ),
    floor    INTEGER     NOT NULL,
    bed_type INTEGER     NOT NULL REFERENCES bed_types (id_bed_type),
    status   INTEGER     NOT NULL REFERENCES project.room_statuses (id_room_status),
    type     INTEGER     NOT NULL REFERENCES project.room_types (id_room_type)
);

-- Payment Types : Types of payment for a reservation
CREATE TABLE project.payment_types
(
    id_payment_type SERIAL PRIMARY KEY,
    name            VARCHAR(25) NOT NULL CHECK ( name <> '' )
);

-- Reservations : Reservations made by the clients.
CREATE TABLE project.reservations
(
    id_reservation SERIAL PRIMARY KEY,
    client         INTEGER          NOT NULL REFERENCES project.clients (id_client),
    room           INTEGER          NOT NULL REFERENCES project.rooms (id_room),
    arrival_date   DATE             NOT NULL CHECK ( arrival_date < reservations.departure_date ),
    departure_date DATE             NOT NULL CHECK ( departure_date > reservations.arrival_date ),
    checked_in     BOOLEAN          NOT NULL DEFAULT FALSE,
    checked_out    BOOLEAN          NOT NULL DEFAULT FALSE,
    number_persons INTEGER          NOT NULL CHECK ( number_persons > 0 ),
    total_price    DOUBLE PRECISION NOT NULL CHECK ( total_price > 0 ),
    is_paid        BOOLEAN          NOT NULL DEFAULT FALSE,
    payment_type   INTEGER          NOT NULL REFERENCES project.payment_types (id_payment_type),
    partner        INTEGER          NOT NULL REFERENCES project.partners (id_partner)
);

-- Services : Services that the clients can add to their reservations.
CREATE TABLE project.services
(
    id_service SERIAL PRIMARY KEY,
    name       VARCHAR(50)      NOT NULL CHECK ( name <> '' ),
    price      DOUBLE PRECISION NOT NULL CHECK ( price >= 0 )
);

-- Reservation's Services : Services of a reservation
CREATE TABLE project.reservation_services
(
    id_r_service SERIAL PRIMARY KEY,
    service      INTEGER NOT NULL REFERENCES project.services (id_service),
    reservation  INTEGER NOT NULL REFERENCES project.reservations (id_reservation)
);



-- INSERTS
INSERT INTO project.room_types (name, price)
VALUES ('Standard',      80 ),
       ('Extra Comfort', 100),
       ('Business',      160),
       ('Deluxe',        250);

INSERT INTO project.room_statuses (name)
VALUES ('Available'),
       ('Occupied' ),
       ('Cleaning' ),
       ('Repairing');

INSERT INTO project.bed_types (name)
VALUES ('Twin'          ),
       ('Double'        ),
       ('Double Comfort');

INSERT INTO project.rooms (name, number, floor, bed_type, status, type)
VALUES ('#01',           1, 0, 1, 1, 1),
       ('#02',           2, 0, 1, 1, 1),
       ('#03',           3, 0, 2, 1, 2),
       ('#04',           4, 0, 1, 1, 1),
       ('#05',           5, 0, 2, 1, 2),
       ('#06',           6, 0, 1, 1, 1),
       ('#07',           1, 0, 1, 1, 1),

       ('#11',           1, 1, 2, 1, 2),
       ('#12',           2, 1, 2, 1, 2),
       ('#13',           3, 1, 2, 1, 3),
       ('#14',           4, 1, 2, 1, 3),
       ('#15',           5, 1, 2, 1, 2),

       ('#21 - Business Premium',
                         1, 2, 3, 1, 3),
       ('#21',           1, 2, 2, 1, 3),
       ('#21',           1, 2, 2, 1, 3),
       ('#21',           1, 2, 2, 1, 3),
       ('#21 - Business Premium',
                         1, 2, 3, 1, 3),

       ('#31 - Luxus',   1, 3, 3, 1, 4),
       ('#31 - Olympus', 1, 3, 3, 1, 4),
       ('#31 - Titan',   1, 3, 3, 1, 4);

INSERT INTO project.payment_types (name)
VALUES ('Cash'            ),
       ('Bancontact'      ),
       ('Visa'            ),
       ('MasterCard'      ),
       ('American Express');

INSERT INTO project.partners (name)
VALUES ('Vinci Hotel'),
       ('Booking'    ),
       ('Hotel Beds' ),
       ('Expedia'    ),
       ('AirBnb'     );

INSERT INTO project.services (name, price)
VALUES ('Breakfast',       12),
       ('Gym',             7 ),
       ('Pool',            5 ),
       ('Diner',           15),
       ('Bar',             15),
       ('Airport Shuttle', 40),
       ('All-Inclusive',   50);