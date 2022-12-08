from django.urls import path

from .views import api_list_services, api_list_technicians, api_show_service, api_list_automobiles

urlpatterns = [
    path("services/", api_list_services, name="api_list_services"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("services/<int:id>/", api_show_service, name="api_show_service"),
    path("autos/", api_list_automobiles, name="api_list_automobiles"),
]
