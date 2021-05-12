from django.urls import path

from core_app import views

app_name = 'core_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('index.html', views.index, name='index'),
    path('403.html', views.forbidden, name='forbidden'),
    path('typhoon_module.html', views.typhoon, name='typhoon'),
    path('main_module.html', views.main, name='main'),
    path('rain_module.html', views.rain, name='rain'),
    path('basic_module.html', views.basic, name='basic'),
]
