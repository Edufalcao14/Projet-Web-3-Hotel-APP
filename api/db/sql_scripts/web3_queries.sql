-- QUERIES
SET SEARCH_PATH = project;

-- All Rooms
SELECT *
FROM project.rooms_vw;

-- Available Rooms
SELECT *
FROM project.rooms_vw
WHERE room_id NOT IN (SELECT room_id
                      FROM project.reservations_vw
                      WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                        AND (checked_in = FALSE OR (checked_out = FALSE AND checked_in = TRUE)));

-- Occupied Rooms
SELECT *
FROM project.rooms_vw
WHERE room_id IN (SELECT room_id
                  FROM project.reservations_vw
                  WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                    AND checked_in = TRUE
                    AND checked_out = FALSE);

-- Reserved Rooms
SELECT *
FROM project.rooms_vw
WHERE room_id IN (SELECT room_id
                  FROM project.reservations_vw
                  WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                    AND checked_in = FALSE);

-- Room Types Count
WITH booked_rooms AS (SELECT room
                      FROM project.reservations
                      WHERE (arrival_date < CURRENT_DATE AND departure_date > CURRENT_DATE)
                      GROUP BY room),
     available_rooms AS (SELECT rt.room_type_id, rt.name AS room_type_name, COUNT(r.room_id) AS total_rooms
                         FROM project.rooms r
                                  INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                         GROUP BY rt.room_type_id, rt.name)
SELECT ar.room_type_name                               AS type,
       (ar.total_rooms - COALESCE(br.booked_count, 0)) AS count
FROM available_rooms ar
         LEFT JOIN (SELECT rt.room_type_id, COUNT(r.room_id) AS booked_count
                    FROM project.rooms r
                             INNER JOIN project.room_types rt ON r.type = rt.room_type_id
                    WHERE r.room_id IN (SELECT room
                                        FROM booked_rooms)
                    GROUP BY rt.room_type_id) br ON ar.room_type_id = br.room_type_id
ORDER BY ar.room_type_id;

-- Reservations
SELECT *
FROM project.reservations_vw
WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date;
