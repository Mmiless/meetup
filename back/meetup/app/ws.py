from django.urls import re_path
from consumers import EventConsumer

websocket_urlpatterns = [
    re_path(r'ws/event/(?P<event_hash>[a-f0-9\-]+)/$', EventConsumer.as_asgi()),
]