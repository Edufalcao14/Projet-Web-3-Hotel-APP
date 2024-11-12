-- INSERTS
SET SEARCH_PATH = project;

-- Types of a room
INSERT INTO project.room_types (name, price)
VALUES ('Standard',      80 ),
       ('Extra Comfort', 100),
       ('Business',      160),
       ('Deluxe',        250);

-- Statuses of a room
INSERT INTO project.room_statuses (name)
VALUES ('Available'),
       ('Occupied' ),
       ('Reserved' ),
       ('Cleaning' ),
       ('Repairing');

-- Types of bed of a room
INSERT INTO project.bed_types (name)
VALUES ('Twin'          ),
       ('Double'        ),
       ('Double Comfort');

-- Rooms
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

-- Types of payment
INSERT INTO project.payment_types (name)
VALUES ('Cash'            ),
       ('Bancontact'      ),
       ('Visa'            ),
       ('MasterCard'      ),
       ('American Express');

-- Partners
INSERT INTO project.partners (name)
VALUES ('Vinci Hotel'),
       ('Booking'    ),
       ('Hotel Beds' ),
       ('Expedia'    ),
       ('AirBnb'     );

-- Services
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
