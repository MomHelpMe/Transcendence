from django.urls import path
from game_history.views import TournamentAPIView

urlpatterns = [
    path('game-history/tournament',  TournamentAPIView.as_view(), name='tournament'),  
]
