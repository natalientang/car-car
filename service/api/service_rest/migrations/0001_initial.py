# Generated by Django 4.0.3 on 2022-12-11 04:21

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(max_length=20)),
                ('year', models.IntegerField()),
                ('vin', models.CharField(max_length=17)),
                ('import_href', models.CharField(max_length=200, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('employee_number', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17)),
                ('customer_name', models.CharField(max_length=100)),
                ('date', models.DateField(blank=True, default=datetime.datetime.now)),
                ('time', models.TimeField(blank=True, default=datetime.datetime.now)),
                ('reason', models.CharField(max_length=100)),
                ('completed', models.BooleanField(default=False)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='service_rest.technician')),
            ],
        ),
    ]