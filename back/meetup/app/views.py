from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

from .event import Event, EventSerializer

@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    print(request.data)
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
    print(event_hash, username, password)
    # event should already exist
    event = Event.objects.get(hash=event_hash)
    participants = event.participants
    if username in participants:
        if participants[username]['password'] == password:
            return Response(participants[username], status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    participants[username] = {'password': password, 'times': {}}
    event.participants = json.dumps(participants)
    event.save()
    return Response(participants[username], status=status.HTTP_200_OK)

@api_view(['POST'])
def update_user_times(request):
    data = request.data
    event_hash = data['hash']
    username = data['username']
    times = data['times']
    event = Event.objects.get(hash=event_hash)
    participants = event.participants
    participants[username]['times'] = times
    event.participants = json.dumps(participants)
    event.save()
    return Response(participants[username], status=status.HTTP_200_OK)
            
            
