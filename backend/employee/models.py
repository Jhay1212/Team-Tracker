from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class EmployeeManager(BaseUserManager):
    def create_user(self, email=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email=email, **extra_fields)
    

# Create your models here.
class Employee(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_anonymous = models.BooleanField(default=False)

    # profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    password = models.CharField(max_length=100, default='admin.png', blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'password']

    objects = EmployeeManager()
    def __str__(self):
        return self.name
    



class Team(models.Model):
    name = models.CharField(max_length=100)
    employees = models.ManyToManyField(Employee)