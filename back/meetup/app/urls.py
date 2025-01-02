# Deprecated HTTP routing

from django.urls import path
from .views import *

urlpatterns = [
    path('newevent/', create_event, name='create-event'),
    path('getevent/', get_event, name='get-event'),
    path('login/', verify_login, name='verify-login'),
    path('update/', update_user_times, name='update-user-times'),
]