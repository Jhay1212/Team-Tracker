from django.db import models
from employee.models import Employee



class Project(models.Model):
    class StatusChoices(models.TextChoices):
        COMPLETE = 'Complete'
        IN_PROGRESS = 'In Progress'
        NOT_STARTED = 'Not Started'


    name = models.CharField(max_length=100)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.NOT_STARTED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    task_date_completed = models.DateField(null=True, blank=True)

    @property
    def calculated_time(self):
        return self.task_date_completed - self.created_at
    
    
    def __str__(self):
        return self.name + " " + self.description + " " + self.status if self.status and self.description else self.status