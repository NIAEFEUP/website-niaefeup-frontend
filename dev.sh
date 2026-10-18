#!/usr/bin/env bash

if ! docker compose version &> /dev/null; then
    echo "Docker (with the Compose plugin) is not installed"
    echo "Please read the README at https://github.com/NIAEFEUP/website-niaefeup-frontend"
    exit 1
fi

cleanup() {
    echo ""
    echo "Removing containers..."
    docker compose down
}

# Remove the containers however the script ends (Ctrl-C, error or normal exit)
trap cleanup EXIT
trap 'exit 130' INT TERM

echo "Starting the dev server at http://localhost:3000 (press Ctrl-C to stop)"

# --build rebuilds the image when package.json / package-lock.json change (cached otherwise)
docker compose up --build website-niaefeup-frontend-dev
