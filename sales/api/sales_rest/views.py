#from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from .models import (
    Sales,
    SalesPerson,
    AutomobileVO,
    PotentialCustomer)

from .encoders import SalesEncoder, PotentialCustomerEncoder, SalesPersonEncoder, AutomobileVOEncoder

@require_http_methods(["GET", "POST"])
def api_create_customer(request):
    if request.method == "GET":
        customers = PotentialCustomer.objects.all()
        return JsonResponse({"customers": customers},
            encoder=PotentialCustomerEncoder,
            safe=False)
    else:
        content = json.loads(request.body)
        customer = PotentialCustomer.objects.create(**content)
        return JsonResponse(customer,
            encoder=PotentialCustomerEncoder,
            safe=False)


@require_http_methods(["GET", "POST"])
def api_create_employee(request):
    if request.method == "GET":
        employees = SalesPerson.objects.all()
        return JsonResponse({"employees": employees},
        encoder=SalesPersonEncoder)
    else:
        content = json.loads(request.body)
        employee = SalesPerson.objects.create(**content)
        return JsonResponse(employee,
            encoder=SalesPersonEncoder,
            safe=False)


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sales.objects.all()
        return JsonResponse({"sales":sales},
            encoder=SalesEncoder)
    else:
        content = json.loads(request.body)

        try:

            auto = AutomobileVO.objects.get(import_href=content["auto"])
            content["auto"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Automobile"},
                status=400,
            )
        try:
            employee = SalesPerson.objects.get(employee_name=content["employee"])
            content["employee"] = employee

        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sales Person"},
                status=400,
            )
        try:
            customer = PotentialCustomer.objects.get(id=content["customer"])
            content["customer"] = customer

        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer"},
                status=400,
            )

        sale = Sales.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def api_autovos(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse({
            "autos": autos},
            encoder=AutomobileVOEncoder)
