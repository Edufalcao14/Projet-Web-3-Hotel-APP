-- QUERIES
SET SEARCH_PATH = project;

-- All rooms
SELECT *
FROM project.rooms_vw;

-- Available rooms
SELECT *
FROM project.rooms_vw
WHERE room_id NOT IN (SELECT room_id
                      FROM project.reservations_vw
                      WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                        AND (checked_in = FALSE OR (checked_out = FALSE AND checked_in = TRUE)));

-- Occupied rooms
SELECT *
FROM project.rooms_vw
WHERE room_id IN (SELECT room_id
                  FROM project.reservations_vw
                  WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                    AND checked_in = TRUE
                    AND checked_out = FALSE);

-- Reserved rooms
SELECT *
FROM project.rooms_vw
WHERE room_id IN (SELECT room_id
                  FROM project.reservations_vw
                  WHERE (CURRENT_DATE BETWEEN arrival_date AND departure_date)
                    AND checked_in = FALSE);

-- Room types count
WITH booked_rooms AS (SELECT room
                      FROM project.reservations
                      WHERE (arrival_date < CURRENT_DATE AND departure_date > CURRENT_DATE)
                      GROUP BY room),
     available_rooms AS (SELECT rt.room_type_id,
                                rt.name          AS room_type_name,
                                COUNT(r.room_id) AS total_rooms
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

-- Reservations (grouped)
SELECT *
FROM project.reservations_grouped_vw
WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date;

-- Reservations count by partner (next days)
SELECT arrival_date AS date, partner_name, COUNT(reservation_id) AS count
FROM project.reservations_grouped_vw
WHERE arrival_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 7
GROUP BY arrival_date, partner_name
ORDER BY arrival_date;

-- Reservations count by partner (last days)
SELECT arrival_date AS date, partner_name, COUNT(reservation_id) AS count
FROM project.reservations_grouped_vw
WHERE arrival_date BETWEEN CURRENT_DATE - 7 AND CURRENT_DATE
GROUP BY arrival_date, partner_name
ORDER BY arrival_date;

-- Reservations total by partner (next days)
WITH stats AS (SELECT arrival_date, partner_name, COUNT(reservation_id) AS count
               FROM project.reservations_grouped_vw
               WHERE arrival_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 7
               GROUP BY arrival_date, partner_name
               ORDER BY arrival_date)
SELECT partner_name, SUM(count) AS total
FROM stats
GROUP BY partner_name;

-- Reservations total by partner (last days)
WITH stats AS (SELECT arrival_date, partner_name, COUNT(reservation_id) AS count
               FROM project.reservations_grouped_vw
               WHERE arrival_date BETWEEN CURRENT_DATE - 7 AND CURRENT_DATE
               GROUP BY arrival_date, partner_name
               ORDER BY arrival_date)
SELECT partner_name, SUM(count) AS total
FROM stats
GROUP BY partner_name;

-- Reservations stats
SELECT COUNT(reservation_id) FILTER (WHERE checked_in = FALSE AND checked_out = FALSE) AS awaiting,
       COUNT(*) FILTER (WHERE checked_in = TRUE AND checked_out = FALSE)               AS in_home,
       COUNT(*)
       FILTER (WHERE checked_in = TRUE AND checked_out = TRUE)                         AS checked_out,
       COUNT(reservation_id)                                                           AS total
FROM project.reservations
WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date;

-- Current month revenue prediction
SELECT SUM(total_price) AS revenue_prediction
FROM project.reservations_grouped_vw
WHERE (DATE_PART('month', departure_date) = DATE_PART('month', CURRENT_DATE))
  AND (DATE_PART('year', departure_date) = DATE_PART('year', CURRENT_DATE));

-- Current month revenue (already paid)
SELECT SUM(total_price) AS revenue_paid
FROM project.reservations_grouped_vw
WHERE (DATE_PART('month', departure_date) = DATE_PART('month', CURRENT_DATE))
  AND (DATE_PART('year', departure_date) = DATE_PART('year', CURRENT_DATE))
  AND is_paid = TRUE;

-- Current month revenue (unpaid)
SELECT SUM(total_price) AS revenue_unpaid
FROM project.reservations_grouped_vw
WHERE (DATE_PART('month', departure_date) = DATE_PART('month', CURRENT_DATE))
  AND (DATE_PART('year', departure_date) = DATE_PART('year', CURRENT_DATE))
  AND is_paid = FALSE;

-- Revenue (last days)
SELECT SUM(total_price) AS revenue
FROM project.reservations_grouped_vw
WHERE (departure_date BETWEEN CURRENT_DATE - 30 AND CURRENT_DATE)
  AND is_paid = TRUE;

-- Revenue by payment type (last days)
SELECT payment_type_name     AS payment_type,
       SUM(total_price)      AS revenue,
       COUNT(reservation_id) AS total
FROM project.reservations_grouped_vw
WHERE (departure_date BETWEEN CURRENT_DATE - 30 AND CURRENT_DATE)
  AND is_paid = TRUE
GROUP BY payment_type_name;

-- Revenue by card (last days)
SELECT SUM(total_price) AS revenue, COUNT(reservation_id) AS total
FROM project.reservations_grouped_vw
WHERE (departure_date BETWEEN CURRENT_DATE - 30 AND CURRENT_DATE)
  AND (is_paid = TRUE)
  AND payment_type_name != 'Cash';

-- Revenue by cash (last days)
SELECT SUM(total_price) AS revenue, COUNT(reservation_id) AS total
FROM project.reservations_grouped_vw
WHERE (departure_date BETWEEN CURRENT_DATE - 30 AND CURRENT_DATE)
  AND (is_paid = TRUE)
  AND payment_type_name = 'Cash';

-- Revenue by date (last days)
SELECT departure_date                                                         AS date,
       SUM(CASE WHEN payment_type_name != 'Cash' THEN total_price ELSE 0 END) AS card_revenue,
       SUM(CASE WHEN payment_type_name = 'Cash' THEN total_price ELSE 0 END)  AS cash_revenue
FROM project.reservations_grouped_vw
WHERE (departure_date BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE)
  AND is_paid = TRUE
GROUP BY departure_date
ORDER BY departure_date;

-- Month revenue by room type
SELECT rt.name AS room_type, SUM(r.total_price) AS revenue, COUNT(r.reservation_id) AS count
FROM project.room_types rt
         LEFT OUTER JOIN project.reservations_grouped_vw r ON rt.name = r.room_type
WHERE (DATE_PART('month', r.departure_date) = 11 AND DATE_PART('year', r.departure_date) = 2024)
  AND r.is_paid = TRUE
GROUP BY rt.name;

-- Services count (today)
SELECT COALESCE(service_name, 'None') AS service, COUNT(reservation_id) AS count
FROM project.reservations_vw
WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date
GROUP BY service_name;

-- Services revenue (last days)
WITH nbr_services AS (SELECT service_id, COUNT(reservation_id) AS count
                      FROM project.reservations_vw
                      WHERE (arrival_date > CURRENT_DATE - 7)
                        AND (arrival_date <= CURRENT_DATE)
                      GROUP BY service_id)
SELECT service_name AS service, SUM(n.count * s.price * (departure_date - arrival_date)) AS revenue
FROM project.reservations_vw r
         INNER JOIN project.services s ON r.service_id = s.service_id
         INNER JOIN nbr_services n ON n.service_id = r.service_id
WHERE ((arrival_date
    > CURRENT_DATE - 7)
    AND (arrival_date <= CURRENT_DATE))
  AND is_paid = TRUE
GROUP BY service;

-- Services revenue by month
WITH nbr_services AS (SELECT service_id, COUNT(reservation_id) AS count
                      FROM project.reservations_vw
                      WHERE DATE_PART('month', arrival_date) = 11
                        AND DATE_PART('year', arrival_date) = 2024
                        AND is_paid = TRUE
                      GROUP BY service_id)
SELECT service_name AS service, SUM(n.count * s.price * (departure_date - arrival_date)) AS revenue
FROM project.reservations_vw r
         INNER JOIN project.services s ON r.service_id = s.service_id
         INNER JOIN nbr_services n ON n.service_id = r.service_id
WHERE DATE_PART('month', arrival_date) = 11
  AND DATE_PART('year', arrival_date) = 2024
  AND is_paid = TRUE
GROUP BY service;

-- All services (today)
SELECT service_name AS service,
       client_first_name,
       client_last_name,
       client_email,
       client_phone_number,
       room_name,
       reservation_id
FROM project.reservations_vw
WHERE CURRENT_DATE BETWEEN arrival_date AND departure_date
  AND service_name IS NOT NULL
ORDER BY client_last_name, client_first_name, room_name;
