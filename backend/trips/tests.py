from django.test import TestCase

# Create your tests here.
from rest_framework.views import APIView
from rest_framework.response import Response

from core.serializers import TripSerializer
from .services.hos import build_trip_plan

from .services.routing import geocode, get_route

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

        # temporary fake distance
        # total_miles = 1400

        # logs = build_trip_plan(total_miles)

        return Response({
            # "distance_miles": total_miles,
            "distance_miles": round(miles, 2),
            # "logs": logs,
            "route": route,
            **trip_plan
        })