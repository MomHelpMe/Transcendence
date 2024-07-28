#!/bin/bash

ENV_DIR="myenv"

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

deactivate
echo "Virtual environment deactivated."
