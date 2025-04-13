from django.db import models
from employee.models import Employee

class Project(models.Model):
    name = models.CharField(max_length=100)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    task_date_completed = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name