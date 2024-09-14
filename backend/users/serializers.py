from rest_framework import serializers
from .models import User, Friend, Game, Tournament


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_id", "nickname", "img_url", "is_2FA", "is_online", "win", "lose"]

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["language"]

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ["user1", "user2"]


class FriendRequestSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
