from django.shortcuts import get_object_or_404
from rest_framework import serializers, viewsets, routers, generics
from rest_framework .authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import EmployeeSerializer, TeamSerializer, ProjectSerializer, UserSerializer
import bcrypt 

from .models import Employee, Team
from projects.models import Project


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    token = TokenAuthentication()
    # permission_classes = [IsAuthenticated]


    def retrieve(self, request, *args, **kwargs):
        queryset = Employee.objects.all()

        user = get_object_or_404(queryset, pk=kwargs['name'])
        serializer = self.get_serializer(user)
        return Response(serializer.data)
    def get_permissions(self):
        self.permission_classes = [AllowAny]
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    # def update(self, request, *args, **kwargs):
    @action(detail=False, methods=['get'], url_path='name/(?P<name>[^/.]+)')
    def get_emp(self, request,  name, *args, **kwargs):
        employee = Employee.objects.filter(name=name)
        serializer = self.get_serializer(employee, many=True)
        return Response(serializer.data)
    

    @action(detail=False, methods=['get'], url_path='team/(?P<team>[^/.]+)')
    def sort_by_name(self,  request,  team, *args, **kwargs):
        employee = Employee.objects.filter(team=team)
        serializer = self.get_serializer(employee, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path='team')
    def sort_by_team(self, request, *args, **kwargs):
        team_name = request.query_params.get('team', 'Team A')  
        try:
            team = Team.objects.get(name=team_name)
            employees = Employee.objects.filter(team=team.id).order_by('name')
            serializer = self.get_serializer(employees, many=True)
            return Response(serializer.data)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=404)


    def get_queryset(self):
        queryset = Employee.objects.all()
        team_id = self.request.query_params.get('team_id', None)
        if team_id is not None:
            queryset = Employee.objects.filter(team_id=team_id)
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        print(request.data)
        password = bcrypt.hashpw(request.data['password'].encode('utf-8'), bcrypt.gensalt())
        data['password'] = password 
        request._full_data = data
        return super().create(request, *args, **kwargs)




class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def get_queryset(self):
        queryset = Team.objects.all()
        team_id = self.request.query_params.get('team_id', None)
        if team_id is not None:
            queryset = Team.objects.filter(id=team_id)
        return queryset


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        employee_id = self.request.query_params.get('employee_id', None)
        if employee_id is not None:
            queryset = Project.objects.filter(employee_id=employee_id)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = UserSerializer
    

    def create(self, request, *args, **kwargs):
        token = TokenAuthentication(user=request.user)
    def get_queryset(self):
        queryset = Employee.objects.all()
        employee_id = self.request.query_params.get('employee_id', None)
        if employee_id is not None:
            queryset = Employee.objects.filter(id=employee_id)
        return queryset

class LoginView(generics.CreateAPIView):
    serializer_class = UserSerializer

router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'teams', TeamViewSet)
