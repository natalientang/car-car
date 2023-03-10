from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Service


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
        "employee_number",
        "id"
    ]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]


class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "id",
        "completed",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }


class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "completed",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }
