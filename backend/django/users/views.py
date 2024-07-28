from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'img_url', 'is_2FA', 'is_online']


@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
