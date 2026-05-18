from math import ceil

AVERAGE_SPEED = 55
MAX_DRIVE_HOURS = 11

def build_trip_plan(total_miles):

    total_driving_hours = total_miles / AVERAGE_SPEED

    days_required = ceil(total_driving_hours / MAX_DRIVE_HOURS)

    remaining_hours = total_driving_hours

    logs = []

    for day in range(days_required):

        driving_today = min(MAX_DRIVE_HOURS, remaining_hours)

        logs.append({
            "day": day + 1,
            "driving_hours": round(driving_today, 2),
            "break_required": driving_today > 8,
            "off_duty_hours": 10
        })

        remaining_hours -= driving_today

    return logs