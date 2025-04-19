from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    name = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    position = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    password = models.CharField(max_length=100, default='admin.png', blank=True)
    team = models.ForeignKey('Team', on_delete=models.SET_NULL, null=True)



    def __str__(self):
        return self.name
    



class Team(models.Model):
    name = models.CharField(max_length=100)