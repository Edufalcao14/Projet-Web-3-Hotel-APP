SET SEARCH_PATH = project;

-- All Rooms
SELECT *
FROM project.rooms_vw;

-- Available Rooms
SELECT *
FROM project.rooms_vw
WHERE room_id NOT IN (SELECT room_id
                      FROM project.reservations_vw
                      WHERE '2024-10-25' BETWEEN arrival_date AND departure_date);

-- Reserved Rooms
SELECT *
FROM project.rooms_vw
WHERE room_id IN (SELECT room_id
                  FROM project.reservations_vw
                  WHERE '2024-10-25' BETWEEN arrival_date AND departure_date);
