# deprecated HTTP routing

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Backed functioning")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')), 
    path('', home),
]
