from PIL import Image, ImageDraw

GRID_START_X = 105
GRID_END_X = 570

HOUR_WIDTH = (GRID_END_X - GRID_START_X) / 24

ROWS = {
    "OFF": 262,
    "SLEEPER": 292,
    "DRIVING": 322,
    "ON": 352
}


def hour_to_x(hour):

    return GRID_START_X + (hour * HOUR_WIDTH)


def generate_log_sheet(day_log):

    image = Image.open(
        "assets/blank-paper-log.png"
    )

    draw = ImageDraw.Draw(image)

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
                width=3
            )

        # horizontal status line
        draw.line(
            [(start_x, y), (end_x, y)],
            fill="black",
            width=3
        )

        previous_y = y
        previous_x = end_x

    output_path = (
        f"media/log_day_{day_log['day']}.png"
    )

    image.save(output_path)

    return output_path