from django.contrib import admin
from django.urls import path, include
# from ..auth_app import views
from auth_app import views

from django.contrib.auth import views as auth_views

urlpatterns = [
    path('settings/', admin.site.urls),
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('auth_app/', include('auth_app.urls')),
    path('auth_app/', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
    path('core_app/', include('core_app.urls'))
]
