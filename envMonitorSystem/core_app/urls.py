from django.urls import path

from core_app import views

app_name = 'core_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('index.html', views.index, name='index'),
]
