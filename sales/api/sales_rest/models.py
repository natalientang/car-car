from django.db import models



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique = True)
    import_href = models.CharField(max_length=200, unique=True)


class SalesPerson(models.Model):
    employee_name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)


class PotentialCustomer(models.Model):
    customer_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)


class Sales(models.Model):
    price = models.PositiveIntegerField()
    employee = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        PotentialCustomer,
        related_name='sales',
        on_delete=models.CASCADE
    )
    auto = models.OneToOneField(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
