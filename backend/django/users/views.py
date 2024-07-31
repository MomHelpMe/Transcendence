from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User, Friend, Game, Tournament
from .serializers import UserSerializer, FriendSerializer, GameSerializer, TournamentSerializer


@api_view(["GET"])
def get_user(request, nickname):
    try:
        user = get_object_or_404(User, nickname=nickname)
    except User.DoesNotExist:
        return JsonResponse({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)


@api_view(["GET"])
def get_user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
def create_user(request, nickname):
    if User.objects.filter(nickname=nickname).exists():
        return JsonResponse({"detail": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)
    user = User(nickname=nickname)
    user.save()
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
