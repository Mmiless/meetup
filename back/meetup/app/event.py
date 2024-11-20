from django.db import models
from django.contrib.postgres.fields import ArrayField
from rest_framework import serializers
import uuid

class Event(models.Model):
    id = models.AutoField(primary_key=True) 
    hash = models.CharField(max_length=255, blank=False, null=False, default=uuid.uuid4)
    name = models.CharField(max_length=255, blank=True, null=True)
    start_time = models.IntegerField(blank=False, null=False)
    end_time = models.IntegerField(blank=False, null=False)
    dates = ArrayField(models.DateField(), blank=False, null=False) # change to false later  
    participants = models.JSONField(blank=True, null=True) 

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.id
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'hash', 'name', 'start_time', 'end_time', 'dates', 'participants']
        
