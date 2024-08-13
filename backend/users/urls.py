from django.urls import path
from .views import (
    UserDetailView,
    FriendDetailView,
    get_user,
    get_user_list,
)

urlpatterns = [
    path('me/', UserDetailView.as_view()),
    path('friends/', FriendDetailView.as_view()),
    path('user/', get_user_list),
    path('user/<int:pk>/', get_user),
]
