from rest_framework import viewsets
from .models import (Workout,User, Muscle, Exercise, ExerciseMuscle, Program, TrainerProgram, TrainingDay, SetsGoal, SetLogged, RunningSetsGoal, RunningSetsLogged, Goal, WeightLog, DietLog, Measurement)
from .serializers import (WorkoutSerializer,UserSerializer, MuscleSerializer, ExerciseSerializer, ExerciseMuscleSerializer, ProgramSerializer, TrainerProgramSerializer, TrainingDaySerializer, SetsGoalSerializer, SetLoggedSerializer, RunningSetsGoalSerializer, RunningSetsLoggedSerializer, GoalSerializer, WeightLogSerializer, DietLogSerializer, MeasurementSerializer)
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken  # Added import for RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.db.models import Q



class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": UserSerializer(user).data,
                "message": "User created successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,  # Include user_id in the response
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='details')
    def get_user_details(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class MuscleViewSet(viewsets.ModelViewSet):
    queryset = Muscle.objects.all()
    serializer_class = MuscleSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    
class ExerciseMuscleViewSet(viewsets.ModelViewSet):
    queryset = ExerciseMuscle.objects.all()
    serializer_class = ExerciseMuscleSerializer

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class TrainerProgramViewSet(viewsets.ModelViewSet):
    queryset = TrainerProgram.objects.all()
    serializer_class = TrainerProgramSerializer

class TrainingDayViewSet(viewsets.ModelViewSet):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer

    def get_queryset(self):
            """
            Optionally restricts the returned training days to a given program,
            by filtering against a `program` query parameter in the URL.
            """
            queryset = super().get_queryset()
            program_id = self.request.query_params.get('program')
            if program_id is not None:
                queryset = queryset.filter(program_id=program_id)
            return queryset

class SetsGoalViewSet(viewsets.ModelViewSet):
    queryset = SetsGoal.objects.all()
    serializer_class = SetsGoalSerializer

class SetLoggedViewSet(viewsets.ModelViewSet):
    queryset = SetLogged.objects.all()
    serializer_class = SetLoggedSerializer

class RunningSetsGoalViewSet(viewsets.ModelViewSet):
    queryset = RunningSetsGoal.objects.all()
    serializer_class = RunningSetsGoalSerializer

class RunningSetsLoggedViewSet(viewsets.ModelViewSet):
    queryset = RunningSetsLogged.objects.all()
    serializer_class = RunningSetsLoggedSerializer

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class WeightLogViewSet(viewsets.ModelViewSet):
    queryset = WeightLog.objects.all()
    serializer_class = WeightLogSerializer

class DietLogViewSet(viewsets.ModelViewSet):
    queryset = DietLog.objects.all()
    serializer_class = DietLogSerializer

class MeasurementViewSet(viewsets.ModelViewSet):
    queryset = Measurement.objects.all()
    serializer_class = MeasurementSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer