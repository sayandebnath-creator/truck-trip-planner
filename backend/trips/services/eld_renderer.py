from PIL import Image, ImageDraw
import os

GRID_START_X = 90
GRID_END_X = 570

HOUR_WIDTH = (GRID_END_X - GRID_START_X) / 24

ROWS = {
    "OFF": 190,
    "SLEEPER": 215,
    "DRIVING": 240,
    "ON": 265
}


def hour_to_x(hour):

    return GRID_START_X + (hour * HOUR_WIDTH)


def generate_log_sheet(day_log):

    image = Image.open(
        "assets/blank-paper-log.png"
    )

    draw = ImageDraw.Draw(image)

    draw.text(
    (90, 55),
    "05/18/2026",
    fill="black"
    )

    draw.text(
        (520, 55),
        str(day_log["driving_miles"]),
        fill="black"
    )

    draw.text(
        (340, 110),
        "Spotter AI Logistics",
        fill="black"
    )

    draw.text(
        (100, 520),
        "Pickup and delivery route",
        fill="black"
    )

    segments = day_log["segments"]

    previous_y = None
    previous_x = None

    for segment in segments:

        status = segment["status"]

        start = segment["start"]
        end = segment["end"]

        y = ROWS[status]

        start_x = hour_to_x(start)
        end_x = hour_to_x(end)

        # vertical transition line
        if previous_y is not None:

            draw.line(
                [(start_x, previous_y), (start_x, y)],
                fill="black",
                width=2
            )

        # horizontal status line
        draw.line(
            [(start_x, y), (end_x, y)],
            fill="black",
            width=2
        )

        previous_y = y
        previous_x = end_x

    output_path = (
        f"media/log_day_{day_log['day']}.png"
    )
    
    os.makedirs("media", exist_ok=True)
    image.save(output_path)

    return output_path