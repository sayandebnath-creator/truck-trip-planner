from django.test import TestCase

# Create your tests here.
from rest_framework.views import APIView
from rest_framework.response import Response

from core.serializers import TripSerializer
from .services.hos import build_trip_plan

class PlanTripView(APIView):

    def post(self, request):

        serializer = TripSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        # temporary fake distance
        total_miles = 1400

        logs = build_trip_plan(total_miles)

        return Response({
            "distance_miles": total_miles,
            "logs": logs
        })