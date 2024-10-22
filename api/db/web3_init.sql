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
    email        VARCHAR(150) NOT NULL CHECK ( email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' ),
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
    number_persons INTEGER          NOT NULL CHECK ( number_persons > 0 ),
    total_price    DOUBLE PRECISION NOT NULL CHECK ( total_price > 0 ),
    is_paid        BOOLEAN          NOT NULL                                                DEFAULT FALSE,
    payment_type   INTEGER          NULL REFERENCES project.payment_types (payment_type_id) DEFAULT NULL,
    partner        INTEGER          NOT NULL REFERENCES project.partners (partner_id),
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


-- INSERTS
INSERT INTO project.room_types (name, price)
VALUES ('Standard',      80 ),
       ('Extra Comfort', 100),
       ('Business',      160),
       ('Deluxe',        250);

INSERT INTO project.room_statuses (name)
VALUES ('Available'),
       ('Occupied' ),
       ('Reserved' ),
       ('Cleaning' ),
       ('Repairing');

INSERT INTO project.bed_types (name)
VALUES ('Twin'          ),
       ('Double'        ),
       ('Double Comfort');

INSERT INTO project.rooms (name, number, floor, bed_type, type, current_status)
VALUES ('#01',           1, 0, 1, 1, 1),
       ('#02',           2, 0, 1, 1, 1),
       ('#03',           3, 0, 2, 2, 1),
       ('#04',           4, 0, 1, 1, 1),
       ('#05',           5, 0, 2, 2, 1),
       ('#06',           6, 0, 1, 1, 1),
       ('#07',           7, 0, 1, 1, 1),

       ('#11',           1, 1, 2, 2, 1),
       ('#12',           2, 1, 2, 2, 1),
       ('#13',           3, 1, 2, 3, 1),
       ('#14',           4, 1, 2, 3, 1),
       ('#15',           5, 1, 2, 2, 1),

       ('#21 - Business Premium',
                         1, 2, 3, 3, 1),
       ('#22',           2, 2, 2, 3, 1),
       ('#23',           3, 2, 2, 3, 1),
       ('#24',           4, 2, 2, 3, 1),
       ('#25 - Business Premium',
                         5, 2, 3, 3, 1),

       ('#31 - Luxus',   1, 3, 3, 4, 1),
       ('#32 - Olympus', 2, 3, 3, 4, 1),
       ('#33 - Titan',   3, 3, 3, 4, 1);

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
       ('Jacuzzi',         3 ),
       ('Sauna',           3 ),
       ('Massage',         10),
       ('Diner',           15),
       ('Bar',             15),
       ('Airport Shuttle', 40),
       ('All-Inclusive',   65);

INSERT INTO project.clients (first_name, last_name, phone_number, email, birthdate, country)
VALUES ('John',     'Doe',      '0123456789', 'johndoe@example.com',       '1985-05-20', 'US'), -- Frequent traveler
       ('Jane',     'Smith',    '0987654321', 'janesmith@example.com',     '1990-03-15', 'UK'), -- Businesswoman
       ('Robert',   'Johnson',  '0123498765', 'robert.j@example.com',      '1978-07-11', 'CA'), -- Family vacation
       ('Emily',    'Davis',    '0567890123', 'emilydavis@example.com',    '1992-09-30', 'FR'), -- Romantic getaway
       ('Michael',  'Brown',    '0678901234', 'michael.brown@example.com', '1982-12-25', 'DE'),-- Businessman
       ('Anna',     'Taylor',   '0765432109', 'anna.taylor@example.com',   '2001-01-05', 'AU'), -- Young adventurer
       ('David',    'Martin',   '0112233445', 'david.martin@example.com',  '1970-08-19', 'US'), -- Retired couple trip
       ('Sophie',   'Williams', '0456789012', 'sophie.w@example.com',      '1999-12-15', 'ES'), -- Solo backpacker
       ('Liam',     'Moore',    '0356789023', 'liam.moore@example.com',    '1988-11-21', 'NZ'), -- Honeymooner
       ('Isabella', 'Garcia',   '0287654321', 'isabella.g@example.com',    '1995-02-14', 'IT');
-- Fashion blogger

INSERT INTO project.reservations (client, room, arrival_date, departure_date, checked_in, checked_out, number_persons,
                                  total_price, is_paid, payment_type, partner)
VALUES
-- Business travelers, short stays
(1,  3,  '2024-10-22', '2024-10-24', TRUE,  FALSE, 1, 160,  TRUE,  2, 2), -- Checked in, simple stay
(2,  13, '2024-11-01', '2024-11-03', FALSE, FALSE, 1, 320,  FALSE, 3, 2), -- Reserved, business class

-- Family trips, longer stays
(3,  5,  '2024-12-01', '2024-12-10', FALSE, FALSE, 3, 900,  TRUE,  1, 3), -- Family vacation, reserved
(7,  11, '2024-11-15', '2024-11-25', FALSE, FALSE, 2, 1000, TRUE,  1, 1), -- Family retired, long stay

-- Honeymooners or romantic getaways
(4,  19, '2024-10-15', '2024-10-20', TRUE,  TRUE,  2, 1250, TRUE,  4, 1), -- Checked out, romantic getaway
(9,  20, '2024-11-20', '2024-11-25', FALSE, FALSE, 2, 1200, TRUE,  5, 1), -- Honeymoon, reserved

-- Solo adventurers or budget travelers
(6,  1,  '2024-11-10', '2024-11-15', FALSE, FALSE, 1, 400,  FALSE, 3, 3), -- Solo traveler, budget
(8,  4,  '2024-11-05', '2024-11-08', TRUE,  FALSE, 1, 300,  TRUE,  2, 2), -- Solo backpacker, checked in

-- Luxury travelers
(5,  20, '2024-12-20', '2024-12-25', FALSE, FALSE, 2, 1600, FALSE, 5, 1), -- Business premium, reserved
(10, 18, '2024-10-25', '2024-11-01', TRUE,  TRUE,  2, 2400, TRUE,  4, 1);
-- Checked out, luxury trip

INSERT INTO project.reservation_services (service, reservation)
VALUES
-- Business travelers: minimal to no services
(2,  1 ), -- Gym for reservation 1
(1,  2 ), -- Breakfast for reservation 2

-- Family vacation: more services
(1,  3 ), -- Breakfast for reservation 3
(7,  3 ), -- Diner for reservation 3
(3,  3 ), -- Pool for reservation 3

-- Romantic getaway or honeymoon: luxurious services
(1,  4 ), -- Breakfast for reservation 4
(6,  4 ), -- Massage for reservation 4
(4,  4 ), -- Jacuzzi for reservation 4
(9,  4 ), -- Airport Shuttle for reservation 4

(1,  9 ), -- Breakfast for reservation 9
(6,  9 ), -- Massage for reservation 9
(7,  9 ), -- Diner for reservation 9

-- Solo adventurer: minimal services
(1,  6 ), -- Breakfast for reservation 6
(3,  6 ), -- Pool for reservation 6

(3,  8 ), -- Pool for reservation 8

-- Luxury travelers: full packages
(1,  5 ), -- Breakfast for reservation 5
(10, 5 ), -- All-Inclusive for reservation 5
(9,  5 ), -- Airport Shuttle for reservation 5

(1,  10), -- Breakfast for reservation 10
(7,  10), -- Diner for reservation 10
(6,  10), -- Massage for reservation 10
(5,  10), -- Sauna for reservation 10
(9,  10); -- Airport Shuttle for reservation 10
