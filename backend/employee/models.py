from django.db import models

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    



class Team(models.Model):
    name = models.CharField(max_length=100)
    employees = models.ManyToManyField(Employee)