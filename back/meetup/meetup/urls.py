from django.contrib import admin
from django.urls import path

from app.views import create_event

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/events/', create_event, name='create-event'),
]
