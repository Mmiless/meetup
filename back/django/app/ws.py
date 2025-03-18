from django.urls import re_path
from .consumers import EventUserConsumer

websocket_urlpatterns = [
    re_path(r'ws/event/(?P<event_hash>[a-f0-9\-]+)/$', EventUserConsumer.as_asgi()),
]