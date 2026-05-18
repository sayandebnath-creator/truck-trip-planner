from django.test import TestCase

# Create your tests here.
from rest_framework.views import APIView
from rest_framework.response import Response

from core.serializers import TripSerializer
from .services.hos import build_trip_plan

from .services.routing import geocode, get_route

from .services.eld_renderer import generate_log_sheet

class PlanTripView(APIView):

    def post(self, request):

        serializer = TripSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        # added dynamic real data fetching
        pickup = geocode(data["pickup_location"])

        dropoff = geocode(data["dropoff_location"])

        route = get_route(pickup, dropoff)

        summary = route["routes"][0]["summary"]

        meters = summary["distance"]

        miles = meters * 0.000621371

        # logs = build_trip_plan(miles)
        trip_plan = build_trip_plan(miles)

        generated_logs = []

        for log in trip_plan["logs"]:

            path = generate_log_sheet(log)

            generated_logs.append(path)

        # temporary fake distance
        # total_miles = 1400

        # logs = build_trip_plan(total_miles)

        return Response({
            # "distance_miles": total_miles,
            "distance_miles": round(miles, 2),
            "log_images": generated_logs,
            # "logs": logs,
            "route": route,
            **trip_plan
        })