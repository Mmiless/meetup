from django.urls import path
from .views import *

urlpatterns = [
    path('newevent/', create_event, name='create-event'),
    path('getevent/', get_event, name='get-event'),
    path('login/', verify_login, name='verify-login')
]