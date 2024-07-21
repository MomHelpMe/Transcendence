source myenv/bin/activate
echo "Virtual environment activated."

echo "Applying migrations..."
python manage.py migrate

echo "Starting development server..."
python manage.py runserver