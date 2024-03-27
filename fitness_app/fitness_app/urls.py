"""
URL configuration for fitness_app project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import ( WorkoutViewSet,RegisterAPIView, LoginAPIView,UserViewSet, MuscleViewSet, ExerciseViewSet, ExerciseMuscleViewSet, ProgramViewSet, TrainerProgramViewSet, TrainingDayViewSet, SetsGoalViewSet, SetLoggedViewSet, RunningSetsGoalViewSet, RunningSetsLoggedViewSet, GoalViewSet, WeightLogViewSet, DietLogViewSet, MeasurementViewSet)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import re_path

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'muscles', MuscleViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'exercise_muscles', ExerciseMuscleViewSet)
router.register(r'programs', ProgramViewSet)
router.register(r'trainer_programs', TrainerProgramViewSet)
router.register(r'training_days', TrainingDayViewSet)
router.register(r'sets_goals', SetsGoalViewSet)
router.register(r'sets_logged', SetLoggedViewSet)
router.register(r'running_sets_goals', RunningSetsGoalViewSet)
router.register(r'running_sets_logged', RunningSetsLoggedViewSet)
router.register(r'goals', GoalViewSet)
router.register(r'weight_logs', WeightLogViewSet)
router.register(r'diet_logs', DietLogViewSet)
router.register(r'measurements', MeasurementViewSet)
router.register(r'workouts', WorkoutViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
