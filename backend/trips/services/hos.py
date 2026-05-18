from math import ceil

AVERAGE_SPEED = 55

MAX_DRIVING_HOURS = 11
BREAK_AFTER_HOURS = 8

FUEL_STOP_MILES = 1000

def build_trip_plan(total_miles):

    total_driving_hours = total_miles / AVERAGE_SPEED

    days_required = ceil(
        total_driving_hours / MAX_DRIVING_HOURS
    )

    remaining_hours = total_driving_hours

    logs = []

    fuel_stops = []

    break_stops = []

    miles_covered = 0

    for day in range(days_required):

        drive_today = min(
            MAX_DRIVING_HOURS,
            remaining_hours
        )

        day_miles = drive_today * AVERAGE_SPEED

        miles_covered += day_miles

        if drive_today >= BREAK_AFTER_HOURS:

            break_stops.append({
                "day": day + 1,
                "after_hours": 8
            })

        if miles_covered >= FUEL_STOP_MILES:

            fuel_stops.append({
                "day": day + 1,
                "mile": round(miles_covered)
            })

            miles_covered = 0

        logs.append({
            "day": day + 1,
            "driving_hours": round(drive_today, 2),
            "driving_miles": round(day_miles),
            "break_required": drive_today >= 8,
            "off_duty_hours": 10
        })

        remaining_hours -= drive_today

    return {
        "logs": logs,
        "fuel_stops": fuel_stops,
        "break_stops": break_stops,
        "days_required": days_required
    }