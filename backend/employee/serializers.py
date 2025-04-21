from rest_framework import serializers, viewsets, routers
from .models import Employee, Team
from django.contrib.auth.models import User
from projects.models import Project


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def update(self, instance, validated_data, *args, **kwargs):
        instance.name = self.validated_data.get('name', instance.name)
        instance.email = self.validated_data.get('email', instance.email)
        instance.position = self.validated_data.get('position', instance.position)
        instance.save()
        return instance




class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        get_project_by_user = serializers.SerializerMethodField()

        def get_project_by_user(self, obj):
            projects = obj.get_project_by_user()
            return ProjectSerializer(projects, many=True).data

            

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    