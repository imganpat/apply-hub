from django.urls import path
from .views import SummaryAnalytics, ApplicationsOverTime

urlpatterns = [
    path("summary/", SummaryAnalytics.as_view()),
    path("applications-over-time/", ApplicationsOverTime.as_view()),
    path("status-distribution/", SummaryAnalytics.as_view()),
]
