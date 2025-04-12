from django import urls
from django.urls import path, include
from . import views
from .viewsets import router

urlpatterns = [
    path('', include(router.urls)),

]