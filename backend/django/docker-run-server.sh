#!/bin/bash

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

# Create a superuser
echo "Creating superuser..."
DJANGO_SUPERUSER_USERNAME=$DJANGO_SUPERUSER_USERNAME
DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER_PASSWORD
DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER_EMAIL

python manage.py createsuperuser --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL --noinput || true

echo "Starting development server..."
python manage.py runserver 0.0.0.0:8000
