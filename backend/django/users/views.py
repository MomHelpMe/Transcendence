from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from .models import User, Friend, Game, Tournament


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["nickname", "img_url", "is_2FA", "is_online"]


class UserListCreateAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, nickname):
        user = User(nickname=nickname)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FriendListAPIView(APIView):
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        friends = user.friends_as_user1.all() | user.friends_as_user2.all()
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)


class FriendCreateDeleteAPIView(APIView):
    def post(self, request, user_id, friend_id):
        user = User.objects.get(id=user_id)
        friend = User.objects.get(id=friend_id)
        friend = Friend(user=user, friend=friend)
        friend.save()
        return Response("Friend created", status=status.HTTP_201_CREATED)

    def delete(self, request, user_id, friend_id):
        user = User.objects.get(id=user_id)
        friend = User.objects.get(id=friend_id)
        friend = Friend.objects.get(user=user, friend=friend)
        friend.delete()
        return Response("Friend deleted", status=status.HTTP_204_NO_CONTENT)


class GameListCreateAPIView(APIView):
    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        games = user.games_as_user1.all() | user.games_as_user2.all()
        serializer = UserSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request, user_id, score):
        user = User.objects.get(id=user_id)
        game = Game(user=user, score=score)
        game.save()
        return Response("Game created", status=status.HTTP_201_CREATED)


class TournamentListCreateAPIView(APIView):
    def get(self, request):
        tournaments = Tournament.objects.all()
        serializer = UserSerializer(tournaments, many=True)
        return Response(serializer.data)

    def post(self, request, game_id1, game_id2, game_id3):
        tournament = Tournament(game_id1=game_id1, game_id2=game_id2, game_id3=game_id3)
        tournament.save()
        return Response("Tournament created", status=status.HTTP_201_CREATED)
