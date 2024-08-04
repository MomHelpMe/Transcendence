from django.shortcuts import render
import requests
from django.shortcuts import redirect
from django.shortcuts import render
from django.conf import settings
from users.models import User

# feature01-42OAuth_Login 에서 추가됨
def login_view(request):
    return render(request, 'django/login.html')


def login(request):
    oauth_url = "https://api.intra.42.fr/oauth/authorize"
    client_id = "u-s4t2ud-9bd5c0e972b48a45c2d1d443e8f8a46e8224352693fd09c443212d15919f7521"  # 실제 클라이언트 ID로 변경
    redirect_uri = "http://localhost:8000/api/callback"
    state = "random_state_string"  # CSRF 방지용 랜덤 문자열

    return redirect(f"{oauth_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&state={state}")


def callback(request):
    code = request.GET.get('code')
    if not code:
        return redirect('/')  # 코드가 없으면 리디렉션

    token_url = "https://api.intra.42.fr/oauth/token"
    client_id = "u-s4t2ud-9bd5c0e972b48a45c2d1d443e8f8a46e8224352693fd09c443212d15919f7521"  # 실제 클라이언트 ID로 변경
    client_secret = "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"  # 실제 클라이언트 시크릿으로 변경
    redirect_uri = "http://localhost:8000/api/callback"

    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
    }

    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        return redirect('/')  # 오류 발생 시 리디렉션

    token_data = response.json()
    access_token = token_data.get('access_token')

    # Access Token을 사용하여 사용자 정보 가져오기
    user_info = requests.get("https://api.intra.42.fr/v2/me", headers={"Authorization": f"Bearer {access_token}"})
    if user_info.status_code != 200:
        return redirect('/')  # 사용자 정보 가져오기 실패 시 리디렉션

    user_data = user_info.json()

    # 사용자 정보 처리 (예: DB 저장)
    nickname = user_data.get('login')  # 42 API에서 사용자 로그인 이름
    img_url = user_data.get('image', {}).get('link')  # 42 API에서 사용자 이미지 URL
    is_2FA = user_data.get('is_2fa', False)  # 2FA 여부
    is_online = False  # 기본값으로 설정 (온라인 상태는 API에서 제공하지 않음)

    # 사용자 정보 저장 또는 업데이트
    user, created = User.objects.update_or_create(
        nickname=nickname,
        defaults={
            'img_url': img_url,
            'is_2FA': is_2FA,
            'is_online': is_online
        }
    )

    # 생성된 경우, 추가 로직 (예: 환영 메시지 등)
    if created:
        print(f"새 사용자 생성: {nickname}")
    else:
        print(f"기존 사용자 업데이트: {nickname}")

    return redirect('/')  # 로그인 후 리디렉션
