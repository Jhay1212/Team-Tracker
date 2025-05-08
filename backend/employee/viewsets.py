from rest_framework import serializers, viewsets, routers, generics
from rest_framework .authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import EmployeeSerializer, TeamSerializer, ProjectSerializer, UserSerializer
from django.contrib.auth.models import User 
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
import bcrypt 
from .models import Employee, Team
from projects.models import Project
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, DateFilter, CharFilter

class EmployeeFilter(FilterSet):
    name = CharFilter(field_name='name', lookup_expr='icontains')
    email = CharFilter(field_name='email', lookup_expr='icontains')
    date_now = DateFilter(field_name='date_joined', lookup_expr='year')
    class Meta:
        model = Employee
        fields = ['name', 'email', 'date_now']

class AuthViewSet(viewsets.ViewSet):
    queryset = User.objects.none()
    serializers = UserSerializer
    permision_classes = [AllowAny]
    autenciation_classes = [TokenAuthentication, SessionAuthentication]
    @action (detail=False, methods=['post'], url_path='login')
    def login(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = User.objects.filter(username=username).first()
        if not user:
            return Response({'error': 'Invalid username or password.'}, status=401)
     
    
        if check_password(password, user.password):
        
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'is_superuser': user.is_superuser,
                'staff_status': user.is_staff
            })
        else:
            return Response({'error': 'Invalid username or password.'}, status=401)     

        

    def logout(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({'message': 'Logged out successfully.'})
       
    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        if User.objects.filter(username=username).exists():
            return Response({'message': 'User already exists.'}, status=400)
        
        user = User.objects.create_user(username=username , email=email, password=password)
        user.save()
        return Response({'message': 'User created successfully.'}, status=201)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    token = TokenAuthentication()
    permission_classes = [AllowAny]


    # def retrieve(self, request, *args, **kwargs):
    #     queryset = Employee.objects.all()

    #     user = get_object_or_404(queryset, pk=kwargs['name'])
    #     serializer = self.get_serializer(user)
        # return Response(serializer.data)
    # def get_permissions(self):
        # self.permission_classes = [AllowAny]
        # if self.request.method == 'POST':
            # self.permission_classes = [IsAdminUser]

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
        if 'password' in data:
            data['password'] = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)



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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

   

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)
    

    
    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = User.objects.filter(username=username)
        return queryset


router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'projects', ProjectViewSet)
# router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'auth', AuthViewSet)
