from django.shortcuts import render
from common.json import ModelEncoder
from .models import Service, AutomobileVO, Technician
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color",
        "year",
        "vin",
        "import_href"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]

class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "date_time",
        "reason",
        "technician",
        "auto",
        "id"
    ]
    encoders = {
        "auto": AutomobileVODetailEncoder(),
        "technician": TechnicianEncoder()
    }

class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "date_time",
        "reason",
        "auto",
        "technician",
    ]
    encoders = {
        "auto": AutomobileVODetailEncoder(),
        "technician": TechnicianEncoder()
    }

@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobile_href = content["auto"]
            auto = AutomobileVO.objects.get(import_href=automobile_href)
            content["auto"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
            )
        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
            )

        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_service(request, id):
    if request.method == "GET":
        service = Service.objects.get(id=id)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            auto = AutomobileVO.objects.get(import_href=content["auto"])
            content["auto"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400
            )

        Service.objects.filter(id=id).update(**content)
        services = Service.objects.get(id=id)
        return JsonResponse(
            services,
            encoder=ServiceDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)

        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
