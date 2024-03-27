from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Workout,Muscle, Exercise, ExerciseMuscle, Program, TrainerProgram, TrainingDay, SetsGoal, SetLogged, RunningSetsGoal, RunningSetsLogged, Goal, WeightLog, DietLog, Measurement
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class UserTestCase(APITestCase):
    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()

    def get_token(self):
        # Get token for user
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_user(self):
        # Test creating a user
        url = reverse('user-list')
        data = {'username': 'newuser', 'password': 'newpassword', 'email': 'newuser@example.com','role':'coach'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_users(self):
        # Test retrieving user list
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MuscleTestCase(APITestCase):
    def setUp(self):
        # Create a user and authenticate
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()
        self.muscle = Muscle.objects.create(name='Bicep')

    def get_token(self):
        # Get token for user
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_muscle(self):
        # Test creating a muscle
        url = reverse('muscle-list')
        data = {'name': 'Tricep'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_muscles(self):
        # Test retrieving muscle list
        url = reverse('muscle-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Continue with similar structure for other test cases...

class ExerciseTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()
        self.exercise = Exercise.objects.create(name='Push Up', exercise_type='Bodyweight', is_bodyweight=True)

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_exercise(self):
        url = reverse('exercise-list')
        data = {'name': 'Squat', 'exercise_type': 'Bodyweight', 'is_bodyweight': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_exercises(self):
        url = reverse('exercise-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ExerciseMuscleTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()
        self.muscle = Muscle.objects.create(name='Chest')
        self.exercise = Exercise.objects.create(name='Bench Press', exercise_type='Weightlifting', is_bodyweight=False)
        self.exerciseMuscle = ExerciseMuscle.objects.create(exercise=self.exercise, muscle=self.muscle, impact_level=5)

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_exerciseMuscle(self):
        url = reverse('exercisemuscle-list')
        data = {'exercise': self.exercise.id, 'muscle': self.muscle.id, 'impact_level': 4}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_exerciseMuscles(self):
        url = reverse('exercisemuscle-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
class ProgramTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()
        self.program = Program.objects.create(user=self.user, name='Strength Training', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_program(self):
        url = reverse('program-list')
        data = {'user': self.user.id, 'name': 'Cardio Program', 'duration': '8 weeks', 'completion_percentage': 0, 'adherence_percentage': 0, 'type': 'Cardio'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_programs(self):
        url = reverse('program-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TrainerProgramTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Strength Program', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.trainer_program = TrainerProgram.objects.create(user=self.user, program=self.program, name='Advanced Strength', duration='6 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_trainer_program(self):
        url = reverse('trainerprogram-list')
        data = {'user': self.user.id, 'program': self.program.id, 'name': 'Cardio Program', 'duration': '8 weeks', 'completion_percentage': 0, 'adherence_percentage': 0, 'type': 'Cardio'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_trainer_programs(self):
        url = reverse('trainerprogram-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TrainingDayTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Strength Program', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.training_day = TrainingDay.objects.create(restday=False, program=self.program)
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_training_day(self):
        url = reverse('trainingday-list')
        data = {'restday': True, 'program': self.program.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_training_days(self):
        url = reverse('trainingday-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class SetsGoalTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Strength Program', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.training_day = TrainingDay.objects.create(restday=False, program=self.program)
        self.exercise = Exercise.objects.create(name='Bench Press', exercise_type='Strength', is_bodyweight=False)
        self.sets_goal = SetsGoal.objects.create(training_day=self.training_day, exercise=self.exercise, set_number_min=3, set_number_max=5, weight_min=50, weight_max=100, reps_min=8, reps_max=12, target_RPE_min=6, target_RPE_max=8, date=timezone.now())
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_sets_goal(self):
        url = reverse('setsgoal-list')
        data = {
            'training_day': self.training_day.id,
            'exercise': self.exercise.id,
            'set_number_min': 4,
            'set_number_max': 6,
            'weight_min': 60,
            'weight_max': 120,
            'reps_min': 10,
            'reps_max': 15,
            'target_RPE_min': 7,
            'target_RPE_max': 9,
            'date': timezone.now()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_sets_goal(self):
        url = reverse('setsgoal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
class SetLoggedTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Strength Program', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.trainer_program = TrainerProgram.objects.create(user=self.user, program=self.program, name='Trainer Program', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.exercise = Exercise.objects.create(name='Squat', exercise_type='Strength', is_bodyweight=False)
        self.set_logged = SetLogged.objects.create(trainer_program=self.trainer_program, exercise=self.exercise, set_number=1, weight=100, reps=10, RPE=7.5, date=timezone.now())
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_set_logged(self):
        url = reverse('setlogged-list')
        data = {
            'trainer_program': self.trainer_program.id,
            'exercise': self.exercise.id,
            'set_number': 2,
            'weight': 110,
            'reps': 8,
            'RPE': 8.0,
            'date': timezone.now()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_set_logged(self):
        url = reverse('setlogged-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class RunningSetsLoggedTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Running Program', duration='8 weeks', completion_percentage=0, adherence_percentage=0, type='Cardio')
        self.trainer_program = TrainerProgram.objects.create(user=self.user, program=self.program, name='Runner’s Schedule', duration='8 weeks', completion_percentage=0, adherence_percentage=0, type='Cardio')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_running_sets_logged(self):
        url = reverse('runningsetslogged-list')
        data = {
            'trainer_program': self.trainer_program.id,
            'set_number': 1,
            'distance': 5.0,
            'sets': 1,
            'rest_time': 5,
            'target_time': 30.0,
            'target_pace': 6.0,
            'target_RPE': 5.0,
            'target_heart_rate': 120,
            'date': timezone.now()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_running_sets_logged(self):
        url = reverse('runningsetslogged-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GoalTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_goal(self):
        url = reverse('goal-list')
        data = {
            'user': self.user.id,
            'date_start': timezone.now(),
            'date_end': timezone.now() + timedelta(days=30),
            'weight_target_min': 60.0,
            'weight_target_max': 65.0,
            'bf_target_min': 15.0,
            'bf_target_max': 20.0,
            'weight_change_rate_min': 0.5,
            'weight_change_rate_max': 1.0,
            'calories_consumed_target_min': 2000,
            'calories_consumed_target_max': 2500,
            'macronutrients_target': {'protein': 150, 'carbs': 300, 'fats': 80},
            'daily_steps_target_min': 8000,
            'daily_steps_target_max': 10000
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_goals(self):
        url = reverse('goal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WeightLogTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_weight_log(self):
        url = reverse('weightlog-list')
        data = {
            'user': self.user.id,
            'weight': 70.0,
            'bf_percentage': 18.0,
            'date': timezone.now()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_weight_logs(self):
        url = reverse('weightlog-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class DietLogTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_diet_log(self):
        url = reverse('dietlog-list')
        data = {
            'user': self.user.id,
            'calories_consumed': 2200,
            'macronutrients': {'protein': 160, 'carbs': 250, 'fats': 70},
            'daily_steps': 9000,
            'date': timezone.now()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_diet_logs(self):
        url = reverse('dietlog-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class MeasurementTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_measurement(self):
        url = reverse('measurement-list')
        data = {
            'user': self.user.id,
            'measurement_name': 'Arm Circumference',
            'measurement_value': 32.0,
            'date': timezone.now()
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_measurements(self):
        url = reverse('measurement-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.program = Program.objects.create(user=self.user, name='Strength Training', duration='12 weeks', completion_percentage=0, adherence_percentage=0, type='Strength')
        self.training_day = TrainingDay.objects.create(restday=False, program=self.program)
        self.workout = Workout.objects.create(training_day=self.training_day, name='Morning Run', workout_type='Running', time_range='6am-7am')
        self.get_token()

    def get_token(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_create_workout(self):
        url = reverse('workout-list')  # Update with the actual URL name for workouts
        data = {
            'training_day': self.training_day.id,
            'name': 'Evening Gym Session',
            'workout_type': 'gym',  # Use lowercase 'gym'
            'time_range': '5pm-6pm'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_get_workouts(self):
        url = reverse('workout-list')  # Update with the actual URL name for workouts
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Add more tests as needed, such as update, delete, etc.
