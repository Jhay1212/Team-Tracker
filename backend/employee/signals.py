from django.db.models.signals import post_save  
from django.dispatch import receiver
from .models import Employee
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def  create_user(sender, instance, created, **kwargs):

    if created:
        Employee.objects.create(user=instance, 
                                email=instance.email,
                                name=instance.username,
                                phone='',
                                position='',
                                )
    else:
        if instance.employee:
            instance.employee.save()

@receiver(post_save, sender=User)
def save_user(sender, instance, **kwargs):
    instance.employee.save()