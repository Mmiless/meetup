from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json

class EventModule:
    
    async def create_event(self, data):
        from .event import EventSerializer
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            await sync_to_async(serializer.save)()
            await self.send_response('event_created', {'event': serializer.data})
        else:
            await self.send_response('event_error', {'error': serializer.errors})
            
    async def get_event(self, data):
        from .event import Event, EventSerializer
        event_hash = data['hash']
        try:
            event = await sync_to_async(Event.objects.get)(hash=event_hash)
        except Event.DoesNotExist:
            await self.send_response('event_not_found')
            return

        serializer = EventSerializer(event)
        await self.send_response('event_found', {'event': serializer.data})

class AuthModule:
    
    async def login(self, data):
        from .services import validate_user
        
        username = data['username']
        password = data['password']
        user = await validate_user(self.event_hash, username, password)

        if user:
            await self.send_response('login_success', {
                'username': username,
                'times': user['times']
            })
        else:
            await self.send_response('login_failed', {
                'error': 'Invalid login credentials'
            })

class TimeModule:
    
    async def update_times(self, data):
        from .services import get_all_times 
        from .event import Event
        
        username = data['username']
        times = data['times']
        
        event = await sync_to_async(Event.objects.get)(hash=self.event_hash)
        participants = event.participants or {}
        participants[username]['times'] = times
        event.participants = json.dumps(participants)
        await sync_to_async(event.save)()
        
        await self.send_response('times_updated')

        updated_times = await get_all_times(self.event_hash)
        await self.channel_layer.group_send(self.event_hash, {
            'type': 'broadcast_times',
            'times': updated_times
        })