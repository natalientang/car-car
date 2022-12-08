from django.urls import path

from .views import api_list_sales, api_create_employee, api_create_customer

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("employees/", api_create_employee, name="api_create_employee"),
    path("customers/", api_create_customer, name="api_create_customer")
]
