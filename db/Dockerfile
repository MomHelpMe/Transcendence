FROM postgres:13

# 환경 변수 설정 (선택 사항)
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=superuser
ENV DB_NAME=transcendence
ENV DB_USER=ppadmin
ENV DB_PASSWORD=password123

COPY init-db.sh /docker-entrypoint-initdb.d/

EXPOSE 5432
