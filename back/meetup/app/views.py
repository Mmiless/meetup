from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

from .event import Event, EventSerializer
from .util import *

@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_event(request):
    event_hash = request.query_params.get('hash')
    try:
        event = Event.objects.get(hash=event_hash)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = EventSerializer(event)
    return Response(serializer.data)
    
@api_view(['POST'])
def verify_login(request):
    data = request.data
    event_hash = data['hash']
    username = data['username']
    password = data['password']
    event = Event.objects.get(hash=event_hash)
    participants = event.participants or {}

    if username in participants:
        if check_password(password, participants[username]['password']):
            return Response(participants[username], status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        participants[username] = {'password': new_password(password), 'times': {}}
        event.participants = json.dumps(participants) # temporary fix: JSONField not serializing properly
        event.save()
        return Response(participants[username], status=status.HTTP_200_OK)

@api_view(['POST'])
def update_user_times(request):
    data = request.data
    event_hash = data['hash']
    username = data['username']
    times = data['times']
    event = Event.objects.get(hash=event_hash)
    participants = event.participants or {}
    participants[username]['times'] = times
    event.participants = json.dumps(participants) # temporary fix: JSONField not serializing properly
    event.save()
    return Response(participants[username], status=status.HTTP_200_OK)
            
            
