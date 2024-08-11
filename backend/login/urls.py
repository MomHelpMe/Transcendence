from django.urls import path
from .views import (
    login,
    callback,
    verify_jwt,
    send_2fa_email,
    verify_otp,
)

urlpatterns = [
    path('login/', login),
    path('callback/', callback),
    path('validate/', verify_jwt),
    path('send-mail/', send_2fa_email),
    path('verify-otp/', verify_otp),
]
