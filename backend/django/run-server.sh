#!/bin/bash

ENV_DIR="venv"
DOT_ENV_FILE=".env"

# 스크립트 파일의 디렉토리로 이동
cd "$(dirname "$0")"

if [ -f "$DOT_ENV_FILE" ]; then
    echo "$DOT_ENV_FILE already exists."
else
    cp ../../$DOT_ENV_FILE .
    echo "Copied $DOT_ENV_FILE."
    sed -i '' 's/^DB_HOST=.*$/DB_HOST=localhost/' .env
fi


if [ ! -d "$ENV_DIR" ]; then
    python3 -m venv $ENV_DIR
    echo "Virtual environment created at $ENV_DIR."
else
    echo "Virtual environment already exists at $ENV_DIR."
fi

source $ENV_DIR/bin/activate
echo "Virtual environment activated."

pip install --upgrade pip

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    echo "Installed packages from requirements.txt."
else
    echo "requirements.txt not found."
fi

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Starting development server..."
python manage.py runserver localhost:8000
