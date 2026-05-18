import requests

from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("OPENROUTE_API_KEY")


def geocode(place):

    url = "https://api.openrouteservice.org/geocode/search"

    params = {
        "api_key": API_KEY,
        "text": place,
        "size": 1
    }

    response = requests.get(url, params=params)

    data = response.json()

    feature = data["features"][0]

    lon, lat = feature["geometry"]["coordinates"]

    return {
        "lat": lat,
        "lng": lon
    }


def get_route(start, end):

    url = "https://api.openrouteservice.org/v2/directions/driving-car"

    headers = {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
    }

    body = {
        "coordinates": [
            [start["lng"], start["lat"]],
            [end["lng"], end["lat"]]
        ]
    }

    response = requests.post(
        url,
        json=body,
        headers=headers
    )

    return response.json()