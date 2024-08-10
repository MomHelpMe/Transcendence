from django.conf import settings
import os
from users.models import User
from rest_framework.decorators import api_view
from django.shortcuts import redirect
import requests
import jwt
from datetime import datetime, timedelta

from django.core.mail import EmailMultiAlternatives
import smtplib
import secrets
import string
from django.core.cache import cache
from rest_framework.response import Response

import pprint

@api_view(["GET"])
def login(request):
    oauth_url = "https://api.intra.42.fr/oauth/authorize"
    redirect_uri = "http://localhost:5173"
    client_id = os.getenv("OAUTH_CLIENT_ID")
    state = os.getenv("OAUTH_STATE")  # CSRF 방지용 랜덤 문자열
    return redirect(f"{oauth_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&state={state}")


@api_view(["POST"])
def callback(request):

    print("@@@ CALL BACK @@@")
    
    code = request.data.get("code")

    print("OAUTH CODE")
    print(code)
    
    if not code:
        print("******* !CODE *******")
        return Response(status=401)

    print("@@@@@ GET CODE @@@@@")
    access_token = get_acccess_token(code)
    if not access_token:
        print("******* !ACCESS_TOKEN *******")
        return Response(status=401)

    print("@@@@@@@ GET USER DATA @@@@@@@")
    user_data = get_user_info(access_token)

    print("USER DATA")

    if not user_data:
        print("******* !USER_DATA *******")
        return Response(status=401)

    user, is_new_user = save_or_update_user(user_data)

    # Test 위해서 True로 설정
    user.is_2FA = True

    if user.is_2FA:
        # is_2FA == True
        data = {
            "is_2FA": True,
        }
    else:
        # is_2FA == False
        data = {
            "is_2FA": False,
        }
    token = generate_jwt(user, data)

    # DRF 의 Response 객체 생성
    response = Response(data, status=200)
    response.set_cookie("jwt", token, httponly=False, secure=True, samesite='LAX')
    return response

def get_acccess_token(code):
    token_url = "https://api.intra.42.fr/oauth/token"
    redirect_uri = "http://localhost:5173"
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
    if response.status_code == 200:
        return response.json().get("access_token")
    return None

def get_user_info(access_token):
    user_info_response = requests.get(
        "https://api.intra.42.fr/v2/me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    if user_info_response.status_code == 200:
        return user_info_response.json()
    return None

def save_or_update_user(user_data):
    
    user_id = user_data.get("id")
    print("42 SERVER USER ID")
    print(user_id)

    nickname = user_data.get("login")
    email = user_data.get("email")
    img_url = user_data.get("image", {}).get("link")

    user, created = User.objects.update_or_create(
        user_id=user_id,
        defaults={
            "email": email,
            "img_url": img_url,
            "is_2FA": False,
            "is_online": False  # 기본값 설정
        }
    )

    print("&&&&&&&&&&&&&&&&&& NICK NAME &&&&&&&&&&&&&&&&&&")
    print(user.nickname)
    print("&&&&&&&&&&&&&&&&&& ID &&&&&&&&&&&&&&&&&&")
    print(user.user_id)

    return user, created

def generate_jwt(user, data):

    print("GET DATA_IS_2FA")
    print(data.get("is_2FA"))
    
    if data.get("is_2FA") == False:
        is_verified = True
    else:
        is_verified = False

    print("@@@@@@@JWT IS_VERIFIED@@@@@@@")
    print(is_verified)

    payload = {
        "id": user.user_id,
        "email": user.email,
        "is_verified": is_verified,
        "exp": datetime.utcnow() + timedelta(seconds=600),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")




# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ MAIL 관련 Method @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

@api_view(["GET"])
def send_2fa_email(request):

    if not validate_jwt(request):
        print("#########JWT NOT VALIDATE AT SEND_MAIL!!!###########")
    #    return Response(status=401)
    # 2FA 관련 코드를 생성하고 이메일 전송 로직 추가

    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user_id = payload.get("id")
    user_email = payload.get("email")

    subject = 'Your OTP Code for 2FA'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [user_email]
    otp_code = generate_otp()

    # otp_code 를 'user_id'를 key로 사용해서 cache에 저장
    # ttl=60 : 60초동안 cache에 저장
    cache_key = f"otp_code{user_id}"
    #cache_key = f"otp_code{1}"

    print("CACHE KEY AFTER GENERATE")
    print(cache_key)

    cache.set(cache_key, otp_code, timeout=60)
    html_content = f"""
    <html>
        <body>
            <h1>🎮 여기에 있다 2FA CODE 당신의! 🎉</h1>
            <p>당신의 OTP 코드는 <strong>{otp_code}</strong>입니다.</p>
            <p>이 코드는 1분 동안 유효합니다.</p>
            <p>감사합니다!</p>
        </body>
    </html>
    """
    
    # EmailMultiAlternatives 객체 생성
    message = EmailMultiAlternatives(subject, '', from_email, to)
    message.attach_alternative(html_content, "text/html")  # HTML 본문 추가

    # 이메일 전송
    message.send()

    return Response(status=200)


def validate_jwt(request):
    token = request.COOKIES.get('jwt')
    if not token:

        print("! TOKEN JWT")

        return False

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

        print("PAYLOAD")
        print(payload)

        return True
    except jwt.ExpiredSignatureError:
        # token has expired
        print("JWT EXPIRED")
        return False
    except jwt.InvalidTokenError:
        print("JWT INVALID")
        # Invalid token
        return False


def generate_otp(length=6):
    otp_code = ''.join(secrets.choice('0123456789') for _ in range(length))
    
    print("OTP_CODE")
    print(otp_code)
    
    return otp_code


@api_view(["POST"])
def verify_otp(request):
    if not validate_jwt(request):
        print("#########JWT NOT VALIDATE AT VERIFY OTP!!!###########")
        return Response(status=401)
    
    input_otp = request.data.get("otp_code")

    print("INPUT OTP")
    print(input_otp)

    token = request.COOKIES.get('jwt')
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user_id = payload.get("id")

    cache_key = f"otp_code{user_id}"
    #cache_key = f"otp_code{1}"

    print("CACHE KEY")
    print(cache_key)
    
    cached_otp = cache.get(cache_key)
    
    print("CACHED OTP")
    print(cached_otp)

    if cached_otp and str(cached_otp) == str(input_otp):
        data = {
            "success": True
        }
    else:
        data = {
            "success": False
        }
    return Response(data, status=200)