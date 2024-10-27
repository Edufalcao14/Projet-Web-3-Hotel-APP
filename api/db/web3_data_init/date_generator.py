import random
from datetime import datetime, timedelta

date_format = "%Y-%m-%d"


def generate_dates(date_range):
    min_date_str, max_date_str = date_range

    min_date = datetime.strptime(min_date_str, date_format)
    max_date = datetime.strptime(max_date_str, date_format)

    start_date = min_date + timedelta(days=random.randint(0, (max_date - min_date).days))
    end_date = start_date + timedelta(days=random.randint(1, 10))

    if end_date > max_date:
        end_date = max_date

    return start_date, end_date
