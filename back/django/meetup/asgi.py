import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from app.ws import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'meetup.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Handle traditional HTTP requests
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns  # Routes for WebSocket connections
        )
    ),
})
