from rest_framework import serializers
from .models import User, Friend, Game, Tournament


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_id", "nickname", "img_url", "is_2FA", "is_online", "win", "lose"]


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ["user1", "user2"]


class FriendRequestSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["game_id", "game_type", "user1", "user2", "score1", "score2", "start_timestamp", "end_timestamp"]


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ["name", "date", "winner"]
