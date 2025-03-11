from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .modules import *

class BaseConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.event_hash = self.scope['url_route']['kwargs']['event_hash']
        await self.channel_layer.group_add(self.event_hash, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.event_hash, self.channel_name)
    
    async def send_response(self, type, data=None):
        response = {'type': type}
        if data:
            response.update(data)
        await self.send(text_data=json.dumps(response))


class EventUserConsumer(BaseConsumer, EventModule, AuthModule, TimeModule):
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.pop('action')

        # Route to appropriate handler based on action
        handlers = {
            'login': self.login,
            'create_event': self.create_event,
            'get_event': self.get_event,
            'update_times': self.update_times,
        }
        
        handler = handlers.get(action)
        if handler:
            await handler(data)

    async def broadcast_times(self, event):
        await self.send_response('all_times', {'times': event['times']})
