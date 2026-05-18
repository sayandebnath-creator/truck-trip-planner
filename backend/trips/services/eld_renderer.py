from PIL import Image, ImageDraw

def generate_log_sheet(day_log):

    image = Image.open("assets/blank-paper-log.png")

    draw = ImageDraw.Draw(image)

    # sample text
    draw.text((120, 80), f"Day {day_log['day']}", fill="black")

    # sample line
    draw.line(
        [(100, 300), (400, 300)],
        fill="black",
        width=3
    )

    output_path = f"media/log_day_{day_log['day']}.png"

    image.save(output_path)

    return output_path