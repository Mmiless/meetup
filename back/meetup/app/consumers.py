from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json
from .validation import *

class EventUserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        from .event import Event; # ensure import happens after Django initialization
        
        self.event_hash = self.scope['url_route']['kwargs']['event_hash']
        
        # add created channel to group
        await self.channel_layer.group_add(self.event_hash, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        # remove created channel from group
        await self.channel_layer.group_discard(self.event_hash, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data['action']
        data.pop('action')

        if action == "login":
            await self.login(data)
        elif action == "create_event":
            await self.create_event(data)
        elif action == "get_event":
            await self.get_event(data)
        elif action == "update_times":
            await self.update_times(data)

    async def create_event(self, data):
        from .event import EventSerializer
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            await sync_to_async(serializer.save)()
            await self.send(text_data=json.dumps({
                'type': 'event_created',
                'event': serializer.data
            }))
        else:
            await self.send(text_data=json.dumps({
                'type': 'event_error',
                'error': serializer.errors
            }))

    async def get_event(self, data):
        from .event import Event, EventSerializer
        event_hash = data['hash']
        try:
            event = await sync_to_async(Event.objects.get)(hash=event_hash)
        except Event.DoesNotExist:
            await self.send(text_data=json.dumps({
                'type': 'event_not_found'
            }))
            return

        serializer = EventSerializer(event)
        await self.send(text_data=json.dumps({
            'type': 'event_found',
            'event': serializer.data
        }))

    async def login(self, data):
        username = data['username']
        password = data['password']
        user = await validate_user(self.event_hash, username, password)

        if user:
            await self.send(text_data=json.dumps({
                'type': 'login_success',
                'username': username,
                'times': user['times']
                }))
        else:
            await self.send(text_data=json.dumps({
                'type': 'login_failed',
                'error': 'Invalid login credentials'
            }))

    async def get_all_times(self):
        from .event import Event
        event = await sync_to_async(Event.objects.get)(hash=self.event_hash)
        participants = event.participants or {}
        payload = []
        for p in participants:
            payload.append(participants[p]['times'])
        payload = json.dump(payload)

        await self.send(text_data=json.dumps({
            'type': 'all_times',
            'times': payload
        }))

    async def update_times(self, data):
        from .event import Event
        username = data['username']
        times = data['times']
        event = await sync_to_async(Event.objects.get)(hash=self.event_hash)
        participants = event.participants or {}
        participants[username]['times'] = times
        event.participants = json.dumps(participants)
        await sync_to_async(event.save)()
        await self.send(text_data=json.dumps({
            'type': 'times_updated',
        }))

        updated_times = get_all_times(participants)
        await self.channel_layer.group_send(self.event_hash, 
            {
            'type': 'broadcast',
            'times': updated_times
            }
        )
    
    async def broadcast(self, message):
        await self.send(text_data=json.dumps({
            'type': 'all_times',
            'times': message['times']
        }))
