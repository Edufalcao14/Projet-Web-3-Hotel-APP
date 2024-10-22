SET SEARCH_PATH = project;

DROP VIEW IF EXISTS project.rooms_vw CASCADE;
CREATE VIEW project.rooms_vw AS
SELECT r.room_id,
       r.name,
       r.number,
       r.floor,
       bt.bed_type_id,
       bt.name AS bed_type,
       rs.room_status_id,
       rs.name AS current_status,
       rt.room_type_id,
       rt.name AS type
FROM project.rooms r
         INNER JOIN project.bed_types bt ON bt.bed_type_id = r.bed_type
         INNER JOIN project.room_statuses rs ON rs.room_status_id = r.current_status
         INNER JOIN project.room_types rt ON rt.room_type_id = r.type
ORDER BY floor, number;

DROP VIEW IF EXISTS project.reservations_vw CASCADE;
CREATE VIEW project.reservations_vw AS
SELECT re.reservation_id,
       re.checked_in,
       re.checked_out,
       re.total_price,
       re.arrival_date,
       re.departure_date,
       re.is_paid,

       c.client_id        AS client_id,
       c.first_name       AS client_first_name,
       c.last_name        AS client_last_name,
       c.email            AS client_email,
       c.phone_number     AS client_phone_number,
       c.birthdate        AS client_birth,
       c.country          AS client_country,

       ro.room_id         AS room_id,
       ro.name            AS room_name,
       ro.number          AS room_number,
       ro.floor           AS room_floor,
       ro.bed_type_id,
       ro.bed_type        AS room_bed_type,
       ro.room_type_id,
       ro.type            AS room_type,
       ro.room_status_id,
       ro.current_status  AS room_status,

       p.partner_id       AS partner_id,
       p.name             AS partner_name,

       pt.payment_type_id AS payment_type_id,
       pt.name            AS payment_type_name,

       s.service_id       AS service_id,
       s.name             AS service_name
FROM project.reservations re
         INNER JOIN project.clients c ON re.client = c.client_id
         INNER JOIN project.rooms_vw ro ON re.room = ro.room_id
         INNER JOIN project.partners p ON p.partner_id = re.partner
         INNER JOIN project.payment_types pt ON pt.payment_type_id = re.payment_type
         LEFT OUTER JOIN project.reservation_services rs ON re.reservation_id = rs.reservation
         LEFT OUTER JOIN project.services s ON rs.service = s.service_id
GROUP BY re.reservation_id, re.checked_in, re.checked_out, re.total_price, re.arrival_date,
         re.departure_date,
         re.is_paid,
         c.client_id, c.first_name, c.last_name, c.email, c.phone_number, c.birthdate, c.country,
         ro.room_id, ro.name, ro.number, ro.floor, ro.bed_type_id, ro.bed_type, ro.room_type_id,
         ro.type,
         ro.room_status_id, ro.current_status,
         p.partner_id, p.name,
         pt.payment_type_id, pt.name,
         s.service_id, s.name
ORDER BY arrival_date;
