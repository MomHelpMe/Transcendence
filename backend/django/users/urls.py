from django.urls import path
from .views import (
    get_user,
    get_user_list,
    create_user,
)

urlpatterns = [
    path('user/get/', get_user_list),
    path('user/get/<str:nickname>/', get_user),
    path('user/create/<str:nickname>/', create_user),
]
