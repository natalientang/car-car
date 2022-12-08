from .models import (
    Sales,
    SalesPerson,
    AutomobileVO,
    PotentialCustomer)
from common.json import ModelEncoder

class AutomboileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href"]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = ["customer_name", "address", "phone", "id"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["employee_name", "employee_number"]


class SalesEncoder(ModelEncoder):
    model = Sales
    properties = ["price", "auto", "customer","employee"]

    encoders = {
        "auto": AutomboileVOEncoder(),
        "customer": PotentialCustomerEncoder(),
        "employee": SalesPersonEncoder(),
    }
