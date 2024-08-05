from rest_framework import serializers
from .models import User, Friend, Game, Tournament

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'img_url', 'is_2FA', 'is_online']

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ['user', 'friend']

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['user1', 'user2', 'score']

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['name', 'date', 'winner']
