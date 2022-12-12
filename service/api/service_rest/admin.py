from django.contrib import admin
from .models import Service, Technician

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass
