#!/bin/bash

docker volume create db_data
docker build -t postgres db/
docker run -d -p 5432:5432 --name postgres --env-file .env -v db_data:/var/lib/postgresql/data postgres

sh backend/django/run-server.sh
