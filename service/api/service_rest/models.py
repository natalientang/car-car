from django.db import models
from django.utils import timezone


class AutomobileVO(models.Model):
    color = models.CharField(max_length=20)
    year = models.IntegerField()
    vin = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True, null=True)

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField(unique=True)

class Service(models.Model):
    vin = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=100)
    date_time = models.DateTimeField(default=timezone.now)
    reason = models.CharField(max_length=100)

    auto = models.ForeignKey(
        AutomobileVO,
        related_name="services",
        on_delete=models.CASCADE
    )
    technician = models.ForeignKey(
        Technician,
        related_name="services",
        on_delete=models.CASCADE
    )
