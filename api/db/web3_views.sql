SET SEARCH_PATH = project;

CREATE OR REPLACE VIEW project.rooms_vw AS
SELECT r.id_room, r.name, r.number, r.floor, bt.name AS bed_type, rs.name AS status, rt.name AS type
FROM project.rooms r
         INNER JOIN project.bed_types bt ON bt.id_bed_type = r.bed_type
         INNER JOIN project.room_statuses rs ON r.status = rs.id_room_status
         INNER JOIN project.room_types rt ON rt.id_room_type = r.type;

SELECT type, COUNT(*) FROM project.rooms_vw GROUP BY type;