from .models import Service, AutomobileVO, Technician
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoders import ServiceDetailEncoder, ServiceListEncoder, TechnicianEncoder, TechnicianDetailEncoder
from django.http import JsonResponse


@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServiceListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        except:
            response = JsonResponse(
                {"message": "Could not create technician"},
            )
            response.status_code = 400
            return response
        try:
            service = Service.objects.create(**content)
            return JsonResponse(
                service,
                encoder=ServiceDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create service"},
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_service(request, id):
    if request.method == "GET":
        try:
            service = Service.objects.get(id=id)
            return JsonResponse(
                service,
                encoder=ServiceDetailEncoder,
                safe=False,
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message": "Service does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Service.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Service.DoesNotExist:
            return JsonResponse({"message": "Service does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Service.objects.filter(id=id).update(**content)
            services = Service.objects.get(id=id)
            return JsonResponse(
                services,
                encoder=ServiceDetailEncoder,
                safe=False,
            )
        except Service.DoesNotExist:
            response = JsonResponse({"message": "Service does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create a technician"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Technician.objects.filter(id=id).update(**content)
            technicians = Technician.objects.get(id=id)
            return JsonResponse(
                technicians,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Technician does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_list_automobiles(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVO,
        )
    else:
         response = JsonResponse({"message": "AutomobileVO does not exist"})
         response.status_code = 404
         return response
