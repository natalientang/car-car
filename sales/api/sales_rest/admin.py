from django.contrib import admin
from .models import Sales, SalesPerson, PotentialCustomer, AutomobileVO

@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(PotentialCustomer)
class PotentialCustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
