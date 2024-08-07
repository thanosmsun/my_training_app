# Generated by Django 5.0.1 on 2024-01-26 22:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_workout'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='runningsetsgoal',
            name='training_day',
        ),
        migrations.RemoveField(
            model_name='setsgoal',
            name='training_day',
        ),
        migrations.AddField(
            model_name='runningsetsgoal',
            name='workout',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.workout'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='setsgoal',
            name='workout',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.workout'),
            preserve_default=False,
        ),
    ]
