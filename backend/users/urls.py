from django.urls import path
from .views import (
    UserDetailView,
    FriendDetailView,
)

urlpatterns = [
    path('me/', UserDetailView.as_view()),
    path('friends/', FriendDetailView.as_view()),
]
