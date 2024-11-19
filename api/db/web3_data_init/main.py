import random
from datetime import datetime

from reservation import Reservation
from date_generator import generate_dates, date_format
from validator import validate_data, reservation_pool
from services import choose_services, calculate_total_services_price

NUMBER_OF_RESERVATIONS = 10000000
NUMBER_OF_CLIENTS = 40
DATE_INTERVAL = (
    "2021-06-24",
    "2025-07-31"
)

clients = list(range(1, NUMBER_OF_CLIENTS + 1))

room_prices = {
    1: 80,
    2: 80,
    3: 100,
    4: 80,
    5: 100,
    6: 80,
    7: 80,
    8: 100,
    9: 100,
    10: 160,
    11: 160,
    12: 100,
    13: 160,
    14: 160,
    15: 160,
    16: 160,
    17: 160,
    18: 250,
    19: 250,
    20: 250,
}

payment_types = [1, 2, 3, 4, 5]
partners = [1, 2, 3, 4, 5]

last_reservation = 0

query_reservations = "INSERT INTO project.reservations (client, room, arrival_date, departure_date, checked_in, checked_out, total_price, is_paid, payment_type, partner) VALUES"
query_services = "INSERT INTO project.reservation_services (service, reservation) VALUES"

for _ in range(NUMBER_OF_RESERVATIONS):
    client = random.choice(clients)
    room = random.choice(list(room_prices.keys()))  # Randomly select a room ID
    arrival_date, departure_date = generate_dates(DATE_INTERVAL)

    room_price = room_prices[room] * (departure_date - arrival_date).days

    selected_services = choose_services()
    service_total = calculate_total_services_price(selected_services, (departure_date - arrival_date).days)

    total_price = room_price + service_total

    is_paid = False

    checked_in = False
    checked_out = False

    if arrival_date.month == 11 or (arrival_date.month == 12 and arrival_date.day < 6):
        is_paid = random.choice([True, False])

    elif arrival_date.month < 11:
        is_paid = True
    else:
        is_paid = False

    if arrival_date <= datetime.now():
        checked_in = True
    if departure_date <= datetime.now():
        checked_out = True

    payment_type = random.choice(payment_types) if is_paid else "NULL"
    partner = random.choice(partners)

    if validate_data(room, arrival_date, departure_date, is_paid, payment_type):
        last_reservation += 1

        reservation_pool[room].append(
            Reservation(client, room, arrival_date, departure_date, checked_in, checked_out, total_price, is_paid,
                        payment_type, partner)
        )

        query_reservations += f"\n({client}, {room}, '{arrival_date.strftime(date_format)}', '{departure_date.strftime(date_format)}', {checked_in}, {checked_out}, {total_price}, {is_paid}, {payment_type}, {partner}),"

        for service in selected_services:
            query_services += f"\n({service['id']}, {last_reservation}),"

with open('queries.txt', 'w') as file:
    file.write(query_reservations)
    file.write("\n" + query_services)

print("End of the script.")
