from django.urls import path
from .views import (
    login,
    callback,
    #validate_token
    send_2fa_email,
    verify_otp,
)

urlpatterns = [
    path('login/', login),
    path('callback/', callback),
    #path('validate/', validate_token),
    path('send-mail/', send_2fa_email),
    path('verify-otp/', verify_otp),
]
