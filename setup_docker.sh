#!/bin/bash

# NOTE: 평가 시 필요없는 스크립트입니다.
sh clean.sh
sed -i '' 's/^DB_HOST=.*$/DB_HOST=postgres/' .env
sh nginx/make_config.sh
