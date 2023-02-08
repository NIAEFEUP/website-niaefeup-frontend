#!/bin/env bash

which docker-compose &> /dev/null
if [ $? -ne 0 ]; then
    echo "Docker compose not installed"
    echo "Please read the README at https://github.com/NIAEFEUP/website-niaefeup-frontend"
    exit
fi

docker-compose up -d website-niaefeup-frontend-dev
docker-compose up -d website-niaefeup-frontend-storybook

trap_ctrl_c() {
    docker-compose down
    clear

    exit
}

trap "trap_ctrl_c" 2

clear
echo "Containers are up and running"
echo ""
echo "Press Ctrl-C to exit"

while true; do
    sleep 1
done
