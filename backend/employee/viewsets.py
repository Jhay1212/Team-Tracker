from rest_framework import serializers, viewsets, routers, generics
from .models import Employee, Team
from .serializers import EmployeeSerializer, TeamSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        # employee = Employee.objects.create(employee_name=request.data['name'], team_id=request.data['team_id'])
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

    def create(self, request, *args, **kwargs):
        team = Team.objects.create(team_name=request.data['team_name'])
        return team



router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'teams', TeamViewSet)