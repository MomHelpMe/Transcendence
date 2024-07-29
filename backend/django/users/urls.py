from django.urls import path
from .views import (
    UserListCreateAPIView,
    FriendListAPIView,
    FriendCreateDeleteAPIView,
    GameListCreateAPIView,
    TournamentListCreateAPIView,
)

urlpatterns = [
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('friends/<int:user_id>/', FriendListAPIView.as_view(), name='friend-list'),
    path('friends/<int:user_id>/<int:friend_id>/', FriendCreateDeleteAPIView.as_view(), name='friend-create-delete'),
    path('games/<int:user_id>/', GameListCreateAPIView.as_view(), name='game-list-create'),
    path('tournaments/', TournamentListCreateAPIView.as_view(), name='tournament-list-create'),
]
