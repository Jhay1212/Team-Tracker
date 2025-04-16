from rest_framework import serializers, viewsets, routers, generics
from .models import Employee, Team
from rest_framework .authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import EmployeeSerializer, TeamSerializer
import bcrypt 

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    token = TokenAuthentication()
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