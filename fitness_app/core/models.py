from django.db import models
from django.contrib.auth.models import AbstractUser,Group
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    card_information = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    USER_TYPE_CHOICES = (
        ('trainee', 'Trainee'),
        ('coach', 'Coach'),
        ('admin', 'Admin'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='trainee')
    created_at = models.DateTimeField(auto_now_add=True)

class Muscle(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Exercise(models.Model):
    name = models.CharField(max_length=255)
    exercise_type = models.CharField(max_length=255)
    is_bodyweight = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class ExerciseMuscle(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    muscle = models.ForeignKey(Muscle, on_delete=models.CASCADE)
    impact_level = models.IntegerField()

    def __str__(self):
        return f"{self.exercise} - {self.muscle}"

class Program(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    duration = models.CharField(max_length=255)
    days_in_microcycle = models.IntegerField()
    completion_percentage = models.IntegerField()
    adherence_percentage = models.IntegerField()
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class TrainerProgram(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    duration = models.CharField(max_length=255)
    completion_percentage = models.IntegerField()
    adherence_percentage = models.IntegerField()
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class TrainingDay(models.Model):
    name = models.IntegerField()
    restday = models.BooleanField()
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.program.name} - {'Rest' if self.restday else 'Training'} Day"

class Workout(models.Model):
    WORKOUT_TYPES = [('running', 'Running'), ('gym', 'Gym')]
    
    name = models.CharField(max_length=255)
    workout_type = models.CharField(max_length=10, choices=WORKOUT_TYPES)
    time_range = models.CharField(max_length=50)
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='workouts')

    def __str__(self):
        return f"{self.name} ({self.workout_type})"

class SetsGoal(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    set_number_min = models.IntegerField()
    set_number_max = models.IntegerField()
    weight_min = models.DecimalField(max_digits=5, decimal_places=2)
    weight_max = models.DecimalField(max_digits=5, decimal_places=2)
    reps_min = models.IntegerField()
    reps_max = models.IntegerField()
    target_RPE_min = models.DecimalField(max_digits=3, decimal_places=1)
    target_RPE_max = models.DecimalField(max_digits=3, decimal_places=1)
    rest_min = models.DecimalField(max_digits=3, decimal_places=1)
    rest_max = models.DecimalField(max_digits=3, decimal_places=1)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.workout} - {self.exercise.name}"

class SetLogged(models.Model):
    trainer_program = models.ForeignKey(TrainerProgram, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    set_number = models.IntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    reps = models.IntegerField()
    RPE = models.DecimalField(max_digits=3, decimal_places=1)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.trainer_program.name} - {self.exercise.name} - Set {self.set_number}"


class RunningSetsGoal(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    set_number_min = models.IntegerField()
    set_number_max = models.IntegerField()
    distance_min = models.DecimalField(max_digits=6, decimal_places=2)
    distance_max = models.DecimalField(max_digits=6, decimal_places=2)
    sets_min = models.IntegerField()
    sets_max = models.IntegerField()
    rest_time_min = models.IntegerField()
    rest_time_max = models.IntegerField()
    target_time_min = models.DecimalField(max_digits=6, decimal_places=2)
    target_time_max = models.DecimalField(max_digits=6, decimal_places=2)
    target_RPE_min = models.DecimalField(max_digits=3, decimal_places=1)
    target_RPE_max = models.DecimalField(max_digits=3, decimal_places=1)
    target_heart_rate_min = models.IntegerField()
    target_heart_rate_max = models.IntegerField()
    date = models.DateTimeField()

    def __str__(self):
        return f"Running Set Goal for {self.workout}"

class RunningSetsLogged(models.Model):
    trainer_program = models.ForeignKey(TrainerProgram, on_delete=models.CASCADE)
    set_number = models.IntegerField()
    distance = models.DecimalField(max_digits=6, decimal_places=2)
    sets = models.IntegerField()
    rest_time = models.IntegerField()
    target_time = models.DecimalField(max_digits=6, decimal_places=2)
    target_pace = models.DecimalField(max_digits=6, decimal_places=2)
    target_RPE = models.DecimalField(max_digits=3, decimal_places=1)
    target_heart_rate = models.IntegerField()
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.trainer_program.name} - Running Set {self.set_number}"

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_start = models.DateTimeField()
    date_end = models.DateTimeField()
    weight_target_min = models.DecimalField(max_digits=5, decimal_places=2)
    weight_target_max = models.DecimalField(max_digits=5, decimal_places=2)
    bf_target_min = models.DecimalField(max_digits=5, decimal_places=2)
    bf_target_max = models.DecimalField(max_digits=5, decimal_places=2)
    weight_change_rate_min = models.DecimalField(max_digits=4, decimal_places=2)
    weight_change_rate_max = models.DecimalField(max_digits=4, decimal_places=2)
    calories_consumed_target_min = models.DecimalField(max_digits=6, decimal_places=2)
    calories_consumed_target_max = models.DecimalField(max_digits=6, decimal_places=2)
    macronutrients_target = models.JSONField()
    daily_steps_target_min = models.IntegerField()
    daily_steps_target_max = models.IntegerField()

    def __str__(self):
        return f"Goal for {self.user.username}"

class WeightLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    bf_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username} - {self.date.strftime('%Y-%m-%d')}"

class DietLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    calories_consumed = models.DecimalField(max_digits=6, decimal_places=2)
    macronutrients = models.JSONField()
    daily_steps = models.IntegerField()
    date = models.DateTimeField()

    def __str__(self):
        return f"Diet Log for {self.user.username} - {self.date.strftime('%Y-%m-%d')}"

class Measurement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    measurement_name = models.CharField(max_length=255)
    measurement_value = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.user.username} - {self.measurement_name}"

