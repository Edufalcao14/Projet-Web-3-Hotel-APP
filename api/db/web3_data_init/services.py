# services.py
import random

services = [
    {"id": 1, "name": "Breakfast", "price": 12},
    {"id": 2, "name": "Gym", "price": 7},
    {"id": 3, "name": "Pool", "price": 5},
    {"id": 4, "name": "Jacuzzi", "price": 3},
    {"id": 5, "name": "Sauna", "price": 3},
    {"id": 6, "name": "Massage", "price": 10},
    {"id": 7, "name": "Diner", "price": 15},
    {"id": 8, "name": "Bar", "price": 15},
    {"id": 9, "name": "Airport Shuttle", "price": 40},
    {"id": 10, "name": "All-Inclusive", "price": 65},
]


def choose_services():
    if random.random() < 0.2:
        return []

    is_all_inclusive = random.choice([True, False])

    selected_services = []

    if is_all_inclusive:
        selected_services.append({"id": 10, "name": "All-Inclusive", "price": 65})

        if random.random() < 0.5:
            selected_services.append({"id": 9, "name": "Airport Shuttle", "price": 40})
    else:
        possible_services = [service for service in services if service['name'] != "All-Inclusive"]
        selected_services = random.sample(possible_services, random.randint(1, len(possible_services)))

    return selected_services


def calculate_total_services_price(selected_services, number_of_days):
    total = 0
    airport_shuttle_selected = False

    for service in selected_services:
        if service['name'] == "Airport Shuttle":
            airport_shuttle_selected = True
            continue
        total += service['price']

    total *= number_of_days

    if airport_shuttle_selected:
        total += services[8]['price']

    return total
