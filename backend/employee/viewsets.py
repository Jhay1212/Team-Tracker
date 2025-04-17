from rest_framework import serializers, viewsets, routers, generics
from .models import Employee, Team
from rest_framework .authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import EmployeeSerializer, TeamSerializer
import bcrypt 

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    token = TokenAuthentication()


    @action(detail=False, methods=['get'], url_path='name/<str:name>')
    def get_emp(self, request,  name, *args, **kwargs):
        employee = Employee.objects.get(name=name)
        serializer = self.get-serializer(employee, many=True)
        return Response(serializer.data)
    

    @action(detail=False, methods=['get'], url_path='team/<str:team>')
    def sort_by_name(self,  request,  team, *args, **kwargs):
        employee = Employee.objects.get(team=team)
        serializer = self.get_serializer(employee, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def sort_by_team(self, request, *args, **kwargs):
        return Employee.objects.order_by('team')

    def get_queryset(self):
        queryset = Employee.objects.all()
        team_id = self.request.query_params.get('team_id', None)
        if team_id is not None:
            queryset = Employee.objects.filter(team_id=team_id)
        return queryset

    def create(self, request, *args, **kwargs):
        print(request.data)
        password = bcrypt.hashpw(request.data['password'].encode('utf-8'), bcrypt.gensalt())
        request.data['password'] = password

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



router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'teams', TeamViewSet)