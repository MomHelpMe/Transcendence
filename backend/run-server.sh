#!/bin/bash

ENV_DIR="venv"
DOT_ENV_FILE=".env"

# 스크립트 파일의 디렉토리로 이동
cd "$(dirname "$0")"

cp ../$DOT_ENV_FILE .
    echo "Copied $DOT_ENV_FILE."
    sed -i '' 's/^DB_HOST=.*$/DB_HOST=localhost/' .env

# TEST: .env 파일의 변수들을 환경 변수로 설정 (슈퍼 유저를 생성하기 위해 필요)
if [ -f "$DOT_ENV_FILE" ]; then
    export $(grep -v '^#' $DOT_ENV_FILE | xargs)
    echo "Exported .env variables to environment."
else
    echo ".env file not found."
    exit 1
fi

if [ ! -d "$ENV_DIR" ]; then
    python3 -m venv $ENV_DIR
    echo "Virtual environment created at $ENV_DIR."
else
    echo "Virtual environment already exists at $ENV_DIR."
fi

pip install --upgrade pip

source $ENV_DIR/bin/activate
echo "Virtual environment activated."

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "Installed packages from requirements.txt."
else
    echo "requirements.txt not found."
fi

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Create a superuser
echo "Creating superuser..."
DJANGO_SUPERUSER_USERNAME=$DJANGO_SUPERUSER_USERNAME
DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER_PASSWORD
DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER_EMAIL

python manage.py createsuperuser --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL --noinput || true

echo "Starting development server..."
python manage.py runserver localhost:8000
