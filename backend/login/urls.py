from django.urls import path
from .views import (
    login,
    callback,
)

urlpatterns = [
    path('login/', login),
    path('callback/', callback),
]
