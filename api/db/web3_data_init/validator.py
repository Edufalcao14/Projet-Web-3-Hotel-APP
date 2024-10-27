from collections import defaultdict

reservation_pool = defaultdict(list)


def validate_data(room: int, arrival_date, departure_date, is_paid: bool, payment_type):
    if arrival_date >= departure_date:
        return False

    for reservation in reservation_pool[room]:
        if not (departure_date <= reservation.arrival_date or arrival_date >= reservation.departure_date):
            return False

    if is_paid and payment_type is None:
        return False

    return True
