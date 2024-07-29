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

echo "Starting development server..."
python manage.py runserver
