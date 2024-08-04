from django.urls import path
from .views import (
    login,
    callback,
    validate_token
)

urlpatterns = [
    path('login/', login),
    path('callback/', callback),
    path('validate/', validate_token),
]
