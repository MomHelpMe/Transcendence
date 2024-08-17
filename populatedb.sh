#!/bin/sh

cd backend
source venv/bin/activate
python manage.py populatedb
