from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Muscle, Exercise, ExerciseMuscle, Program, TrainerProgram, TrainingDay, SetsGoal, RunningSetsGoal, WeightLog, DietLog, Goal, Measurement

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Muscle)
admin.site.register(Exercise)
admin.site.register(ExerciseMuscle)
admin.site.register(Program)
admin.site.register(TrainerProgram)
admin.site.register(TrainingDay)
admin.site.register(SetsGoal)
admin.site.register(RunningSetsGoal)
admin.site.register(WeightLog)
admin.site.register(DietLog)
admin.site.register(Goal)
admin.site.register(Measurement)
