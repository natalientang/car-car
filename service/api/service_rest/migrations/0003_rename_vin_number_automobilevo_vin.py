# Generated by Django 4.0.3 on 2022-12-08 16:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_rename_vin_automobilevo_vin_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='automobilevo',
            old_name='vin_number',
            new_name='vin',
        ),
    ]
