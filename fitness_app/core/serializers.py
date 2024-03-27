from rest_framework import serializers
from .models import User, Muscle, Exercise, ExerciseMuscle, Program, TrainerProgram, TrainingDay, SetsGoal, SetLogged, RunningSetsGoal, RunningSetsLogged, Goal, WeightLog, DietLog, Measurement,Workout
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'user_type']  # Include 'user_type'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class MuscleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Muscle
        fields = ['id', 'name']



class ExerciseMuscleSerializer(serializers.ModelSerializer):
    muscle = MuscleSerializer(read_only=True)

    class Meta:
        model = ExerciseMuscle
        fields = ['id', 'muscle', 'impact_level']

class ExerciseSerializer(serializers.ModelSerializer):
    exmuscles = ExerciseMuscleSerializer(source='exercisemuscle_set', many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = ['id', 'name', 'exercise_type', 'is_bodyweight','exmuscles']

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'user', 'name', 'duration','days_in_microcycle', 'completion_percentage', 'adherence_percentage', 'type']

class TrainerProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerProgram
        fields = ['id', 'user', 'program', 'name', 'duration', 'completion_percentage', 'adherence_percentage', 'type']

class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = ['id','name', 'restday', 'program']

class SetsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetsGoal
        fields = ['id', 'workout', 'exercise', 'set_number_min', 'set_number_max', 'weight_min', 'weight_max', 'reps_min', 'reps_max', 'target_RPE_min', 'target_RPE_max','rest_min','rest_max' ,'date']

class SetLoggedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetLogged
        fields = ['id', 'trainer_program', 'exercise', 'set_number', 'weight', 'reps', 'RPE', 'date']

class RunningSetsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunningSetsGoal
        fields = ['id', 'workout', 'set_number_min', 'set_number_max', 'distance_min', 'distance_max', 'sets_min', 'sets_max', 'rest_time_min', 'rest_time_max', 'target_time_min', 'target_time_max', 'target_RPE_min', 'target_RPE_max', 'target_heart_rate_min', 'target_heart_rate_max', 'date']

class RunningSetsLoggedSerializer(serializers.ModelSerializer):
    class Meta:
        model = RunningSetsLogged
        fields = ['id', 'trainer_program', 'set_number', 'distance', 'sets', 'rest_time', 'target_time', 'target_pace', 'target_RPE', 'target_heart_rate', 'date']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'user', 'date_start', 'date_end', 'weight_target_min', 'weight_target_max', 'bf_target_min', 'bf_target_max', 'weight_change_rate_min', 'weight_change_rate_max', 'calories_consumed_target_min', 'calories_consumed_target_max', 'macronutrients_target', 'daily_steps_target_min', 'daily_steps_target_max']

class WeightLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightLog
        fields = ['id', 'user', 'weight', 'bf_percentage', 'date']

class DietLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietLog
        fields = ['id', 'user', 'calories_consumed', 'macronutrients', 'daily_steps', 'date']

class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ['id', 'user', 'measurement_name', 'measurement_value', 'date']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'workout_type', 'time_range', 'training_day']