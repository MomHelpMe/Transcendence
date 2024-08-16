from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, Friend, Game, Tournament
from .serializers import UserSerializer, FriendSerializer, FriendRequestSerializer, GameSerializer, TournamentSerializer
from drf_yasg.utils import swagger_auto_schema
from django.conf import settings
import jwt


# NOTE: JWT 토큰 검증 함수 필요 (재사용을 위해서 login/views.py에 있는 함수를 가져와서 사용하거나 app을 분리해서 사용하기)
# 근데 ImportError: attempted relative import beyond top-level package 에러가 발생해서 그냥 복붙함
def decode_jwt(token):
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    return payload


class UserDetailView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)

        user = get_object_or_404(User, pk=payload.get("id"))
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    @swagger_auto_schema(request_body=UserSerializer, responses={200: UserSerializer()})
    def put(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)

        user = get_object_or_404(User, pk=payload.get("id"))
        # FIXME: is_online도 변경이 가능함 수정 필요
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Delete the JWT cookie
        response = Response({"message": "Logged out successfully"})
        response.delete_cookie("jwt")
        return response

    def delete(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)

        user = get_object_or_404(User, pk=payload.get("id"))
        user.delete()
        response = Response()
        response.delete_cookie("jwt")
        return response


class FriendDetailView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)
        user = get_object_or_404(User, pk=payload.get("id"))


        # 유저와 친구 상태인 유저 모델들을 모두 가져옴
        friends_as_user1 = Friend.objects.filter(user1=user)
        friends_as_user2 = Friend.objects.filter(user2=user)


        # 친구 유저 ID 수집
        friend_ids = set(friends_as_user1.values_list("user2", flat=True)) | set(
            friends_as_user2.values_list("user1", flat=True)
        )

        # 친구 ID를 통해 친구 유저 정보 가져오기
        try:
            friends = User.objects.filter(pk__in=friend_ids)
        except User.DoesNotExist:
            return Response({"[]"}, status=status.HTTP_200_OK)

        # 직렬화하여 JSON 응답으로 반환
        serializer = UserSerializer(friends, many=True)
        return JsonResponse(serializer.data, safe=False)

    @swagger_auto_schema(
        request_body=FriendRequestSerializer,
        responses={201: FriendSerializer()},
    )
    def post(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)
        user = get_object_or_404(User, pk=payload.get("id"))

        serializer = FriendRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        friend_user_id = serializer.validated_data["user_id"]
        if user.user_id == friend_user_id:
            return Response({"error": "Cannot be friend with yourself"}, status=status.HTTP_400_BAD_REQUEST)
        friend_user = get_object_or_404(User, pk=friend_user_id)

        # 이미 존재하는 친구 관계 확인
        if (
            Friend.objects.filter(user1=user, user2=friend_user).exists()
            or Friend.objects.filter(user1=friend_user, user2=user).exists()
        ):
            return Response({"error": "Friendship already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # 새로운 친구 관계 생성
        friend = Friend(user1=user, user2=friend_user)
        friend.save()

        response_serializer = FriendSerializer(friend)
        return JsonResponse(response_serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        request_body=FriendRequestSerializer,
        responses={204: "No Content"},
    )
    def delete(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # FIXME: JWT 검증 함수 필요
        payload = decode_jwt(token)
        user = get_object_or_404(User, pk=payload.get("id"))

        friend_user_id = request.data.get("user_id")
        friend_user = get_object_or_404(User, pk=friend_user_id)

        # 이미 존재하는 친구 관계 확인
        friend = Friend.objects.filter(user1=user, user2=friend_user)
        if not friend.exists():
            return Response({"error": "Friendship does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        friend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def get_user(request, pk):
    user = get_object_or_404(User, user_id=pk)
    user_serializer = UserSerializer(user)

    games_as_user1 = Game.objects.filter(user1=user)
    games_as_user2 = Game.objects.filter(user2=user)

    all_games = games_as_user1.union(games_as_user2)

    # 게임 정보 가공 및 직렬화
    games_data = []
    for game in all_games:
        if game.user1 == user and game.game_type == "PvP":
            op_user_id = game.user2.user_id
            my_score = game.score1
            op_score = game.score2
        elif game.user2 == user and game.game_type == "PvP":
            op_user_id = game.user1.user_id
            my_score = game.score2
            op_score = game.score1
        else:
            continue
        opponent = User.objects.get(user_id=op_user_id)
        games_data.append({
            "op_user": {
                "user_id": opponent.user_id,
                "nickname": opponent.nickname,
                "img_url": opponent.img_url,
            },
            "my_score": my_score,
            "op_score": op_score,
            "is_win": my_score > op_score,
            "start_timestamp": game.start_timestamp,
            "playtime": (game.end_timestamp - game.start_timestamp).total_seconds() // 60  # playtime in minutes
        })

    # 유저 정보와 게임 정보를 하나의 JSON으로 합치기
    response_data = {}
    response_data['user'] = user_serializer.data
    response_data['games'] = games_data

    return JsonResponse(response_data)


@api_view(["GET"])
def get_user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)
