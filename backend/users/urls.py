from django.urls import path
from .views import (
    get_user,
    get_user_list,
    create_user,

    # feature01-42OAuth_Login 에서 추가됨
    login,
    callback,
    login_view,
)

urlpatterns = [
    path('user/get/', get_user_list),
    path('user/get/<str:nickname>/', get_user),
    path('user/create/<str:nickname>/', create_user),

    # feature01-42OAuth_Login 에서 추가됨
    path('login/', login),
    path('callback/', callback),
    path('login/view/', login_view),
]
