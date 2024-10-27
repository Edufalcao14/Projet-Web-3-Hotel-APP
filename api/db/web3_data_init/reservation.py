from datetime import datetime


class Reservation:
    def __init__(self, client: int, room: int, arrival_date: datetime, departure_date: datetime,
                 checked_in: bool, checked_out: bool, total_price: int, is_paid: bool,
                 payment_type, partner: int):
        self.client = client
        self.room = room
        self.arrival_date = arrival_date
        self.departure_date = departure_date
        self.checked_in = checked_in
        self.checked_out = checked_out
        self.total_price = total_price
        self.is_paid = is_paid
        self.payment_type = payment_type
        self.partner = partner
