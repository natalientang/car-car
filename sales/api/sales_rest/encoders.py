from .models import (
    Sales,
    SalesPerson,
    AutomobileVO,
    PotentialCustomer)
from common.json import ModelEncoder

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "import_href","id"]


class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = ["customer_name", "address", "phone", "id"]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["employee_name", "employee_number","id"]


class SalesEncoder(ModelEncoder):
    model = Sales
    properties = ["price", "auto", "customer","employee", "id"]

    encoders = {
        "auto": AutomobileVOEncoder(),
        "customer": PotentialCustomerEncoder(),
    }

    def get_extra_data(self, o):
        return {"employee": o.employee.employee_name}
