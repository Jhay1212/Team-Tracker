from django.db import models
from django.contrib.auth.models import User
import bcrypt
from PIL import Image

def upload_to(instance, filename):
    return 'profile_pics/{filename}'.format(filename=filename)

class Employee(models.Model):
    name = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='employee')
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    position = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to=upload_to, null=True, blank=True)
    password = models.CharField(max_length=100, blank=True)
    team = models.ForeignKey('Team', on_delete=models.SET_NULL, null=True, related_name='employees')

    # def clean(self):




    def __str__(self):
        return self.name
    



class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name