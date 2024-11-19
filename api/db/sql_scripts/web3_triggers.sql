-- TRIGGERS
SET SEARCH_PATH = project;

-- Insert Reservation Trigger
CREATE OR REPLACE FUNCTION project.insert_reservation()
    RETURNS TRIGGER AS
$$
BEGIN
    IF EXISTS (SELECT 1
               FROM project.reservations
               WHERE room = NEW.room
                 AND NEW.arrival_date < departure_date
                 AND NEW.departure_date > arrival_date) THEN
        RAISE EXCEPTION 'Room is already reserved for the selected dates';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS insert_reservation ON project.reservations;
CREATE TRIGGER insert_reservation
    BEFORE INSERT
    ON project.reservations
    FOR EACH ROW
EXECUTE FUNCTION project.insert_reservation();

-- Update Room Status Trigger (based on reservations)
CREATE OR REPLACE FUNCTION project.update_room_status_from_reservation()
    RETURNS TRIGGER AS
$$
BEGIN
    IF CURRENT_DATE BETWEEN NEW.arrival_date AND NEW.departure_date THEN
        IF NEW.checked_in AND NOT NEW.checked_out THEN
            UPDATE project.rooms
            SET current_status = (SELECT room_status_id
                                  FROM project.room_statuses
                                  WHERE name = 'Occupied')
            WHERE room_id = NEW.room;

        ELSIF NEW.checked_in AND NEW.checked_out THEN
            UPDATE project.rooms
            SET current_status = (SELECT room_status_id
                                  FROM project.room_statuses
                                  WHERE name = 'Cleaning')
            WHERE room_id = NEW.room;

        ELSE
            UPDATE project.rooms
            SET current_status = (SELECT room_status_id
                                  FROM project.room_statuses
                                  WHERE name = 'Reserved')
            WHERE room_id = NEW.room;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS reservation_status_update ON project.reservations;
CREATE TRIGGER reservation_status_update
    AFTER INSERT OR UPDATE OF checked_in, checked_out
    ON project.reservations
    FOR EACH ROW
EXECUTE FUNCTION project.update_room_status_from_reservation();

-- Update Room Status Trigger
CREATE OR REPLACE FUNCTION project.update_room_status()
    RETURNS TRIGGER AS
$$
DECLARE
    new_status VARCHAR(25);
    old_status VARCHAR(25);
BEGIN
    SELECT name
    INTO new_status
    FROM project.room_statuses
    WHERE room_status_id = NEW.current_status;

    SELECT name
    INTO old_status
    FROM project.room_statuses
    WHERE room_status_id = OLD.current_status;

    IF new_status = 'Available' THEN
        IF old_status != 'Cleaning' AND
           old_status != 'Repairing' THEN
            RAISE EXCEPTION 'Room status cannot be changed to ''Available'' from ''%''', old_status;
        END IF;
        IF EXISTS (SELECT 1
                   FROM project.reservations
                   WHERE room = NEW.room_id
                     AND CURRENT_DATE BETWEEN arrival_date AND departure_date
                     AND checked_in = FALSE
                     AND checked_out = FALSE) THEN
            UPDATE project.rooms
            SET current_status = (SELECT room_status_id
                                  FROM project.room_statuses
                                  WHERE name = 'Reserved')
            WHERE room_id = NEW.room_id;
            RETURN NULL;
        ELSE
            RETURN NEW;
        END IF;

    ELSIF new_status = 'Occupied' THEN
        IF old_status != 'Reserved' AND old_status != 'Available' THEN
            RAISE EXCEPTION 'Room status cannot be changed to ''Occupied'' from ''%''', old_status;
        END IF;

    ELSIF new_status = 'Cleaning' OR
          new_status = 'Repairing' THEN
        IF old_status != 'Occupied' THEN
            RAISE EXCEPTION 'Room status cannot be changed to ''%'' from ''%''', new_status, old_status;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS room_status_update ON project.rooms;
CREATE TRIGGER room_status_update
    BEFORE UPDATE OF current_status
    ON project.rooms
    FOR EACH ROW
EXECUTE FUNCTION project.update_room_status();
