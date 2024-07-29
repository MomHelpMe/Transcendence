source venv/bin/activate
echo "Virtual environment activated."

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Starting development server..."
python manage.py runserver
