from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):
    status_choice = [
        ('0', 'PENDING'),
        ('1', 'COMPLETED'),
    ]

    priority_choice = [
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
        ('5', '5'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    status = models.CharField(max_length=2, choices=status_choice)
    deadline = models.DateTimeField()
    priority = models.CharField(max_length=2, choices=priority_choice)
