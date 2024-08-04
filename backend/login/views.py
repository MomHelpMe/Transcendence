from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.conf import settings
from users.models import User
from rest_framework.decorators import api_view
from datetime import datetime, timedelta
import requests
import jwt
import os


@api_view(["GET"])
def login(request):
    oauth_url = "https://api.intra.42.fr/oauth/authorize"
    redirect_uri = "http://localhost:8000/api/callback/"
    client_id = os.getenv("OAUTH_CLIENT_ID")
    state = os.getenv("OAUTH_STATE")  # CSRF 방지용 랜덤 문자열
    return redirect(f"{oauth_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&state={state}")


@api_view(["GET"])
def callback(request):
    code = request.GET.get("code")
    if not code:
        return redirect("http://localhost:5173")

    token_url = "https://api.intra.42.fr/oauth/token"
    redirect_uri = "http://localhost:8000/api/callback/"
    client_id = os.getenv("OAUTH_CLIENT_ID")
    client_secret = os.getenv("OAUTH_CLIENT_SECRET")

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
    }


    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        return redirect("http://localhost:5173")

    token_data = response.json()
    access_token = token_data.get("access_token")

    # Access Token을 사용하여 사용자 정보 가져오기
    user_info = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})
    if user_info.status_code != 200:
        return redirect("http://localhost:5173")

    user_data = user_info.json()

    # 사용자 정보 처리 (예: DB 저장)
    nickname = user_data.get("login")  # 42 API에서 사용자 로그인 이름
    img_url = user_data.get("image", {}).get("link")  # 42 API에서 사용자 이미지 URL
    is_2FA = user_data.get("is_2fa", False)  # 2FA 여부
    is_online = False  # 기본값으로 설정 (온라인 상태는 API에서 제공하지 않음)

    # 사용자 정보 저장 또는 업데이트
    user, created = User.objects.update_or_create(
        nickname=nickname, defaults={"img_url": img_url, "is_2FA": is_2FA, "is_online": is_online}
    )

    # 생성된 경우, 추가 로직 (예: 환영 메시지 등)
    if created:
        print(f"새 사용자 생성: {nickname}")
    else:
        print(f"기존 사용자 업데이트: {nickname}")

    # JWT 토큰 생성
    payload = {
        "id": user.user_id,
        "nickname": user.nickname,
        "exp": datetime.utcnow() + timedelta(hours=24),  # 토큰 유효 시간 설정
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    response = redirect("http://localhost:5173")
    response.set_cookie("jwt", token, httponly=True, secure=True, samesite='Lax')

    return response

@csrf_exempt
def validate_token(request):
    # CSRF 토큰 발급
    get_token(request)
    
    token = request.COOKIES.get('jwt')
    if not token:
        return JsonResponse({"isValid": False})

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return JsonResponse({"isValid": True, "user": payload})
    except jwt.ExpiredSignatureError:
        return JsonResponse({"isValid": False, "error": "Token has expired"})
    except jwt.InvalidTokenError:
        return JsonResponse({"isValid": False, "error": "Invalid token"})
