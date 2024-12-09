from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
    event_hash = request.query_params.get('hash')
    username = request.query_params.get('username')
    password = request.query_params.get('password')
    # event should already exist
    event = Event.objects.get(hash=event_hash)
    event_participants = event.participants.all()

    pass