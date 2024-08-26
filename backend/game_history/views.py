from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework import status
import jwt

from login.views import decode_jwt
from utils.exceptions import InternalServerError
from .tournament_manager.tournament_manager import add_tournament, get_tournaments
from .serializers import TournamentSerializer
from .swagger_schemas import tournament_post_schema, tournament_get_schema


class TournamentAPIView(APIView):
    def authenticate_and_get_payload(self, request):
        try:
            payload = decode_jwt(request)
            if not payload:
                raise AuthenticationFailed('Invalid JWT token.')
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('JWT token has expired.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid JWT token.')

    @tournament_post_schema()
    def post(self, request):
        try:
            payload = self.authenticate_and_get_payload(request)
            serializer = TournamentSerializer(data=request.data)
            if not serializer.is_valid():
                raise ValidationError(serializer.errors)
            
            user_id = payload.get("id", None)
            if not user_id:
                raise ValidationError('Invalid user id.')
            
            game_info = serializer.validated_data['game_info']
            add_tournament(user_id, game_info)
            return Response({'message': 'Tournament added successfully.'}, status=status.HTTP_200_OK)

        except Exception as e:
            raise InternalServerError(detail=str(e))

    @tournament_get_schema()
    def get(self, request):
        try:
            payload = self.authenticate_and_get_payload(request)
            user_id = payload.get("id", None)
            tournaments = get_tournaments(user_id)
            return Response({'tournaments_list': tournaments}, status=status.HTTP_200_OK)

        except Exception as e:
            raise InternalServerError(detail=str(e))