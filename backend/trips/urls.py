from django.urls import path
from .tests import PlanTripView

urlpatterns = [
    path("plan-trip/", PlanTripView.as_view())
]