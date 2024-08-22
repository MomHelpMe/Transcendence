FROM nginx:1.27.0-bookworm

RUN apt-get update && apt-get install -y openssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/nginx.key -out /etc/ssl/nginx.crt -subj "/C=KR/ST=Seoul/L=Seoul/O=42Seoul/OU=Cadet/CN=localhost"

COPY ./default.conf /etc/nginx/conf.d/default.conf
