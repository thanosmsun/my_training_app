# Generated by Django 5.0.1 on 2024-01-25 17:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_remove_user_role_user_user_type_alter_user_groups_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('workout_type', models.CharField(choices=[('running', 'Running'), ('gym', 'Gym')], max_length=10)),
                ('time_range', models.CharField(max_length=50)),
                ('training_day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workouts', to='core.trainingday')),
            ],
        ),
    ]
