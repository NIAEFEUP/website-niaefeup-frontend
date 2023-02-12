#!/bin/env bash

which docker-compose &> /dev/null
if [ $? -ne 0 ]; then
    echo "Docker compose not installed"
    echo "Please read the README at https://github.com/NIAEFEUP/website-niaefeup-frontend"
    exit
fi

docker-compose run --rm website-niaefeup-frontend-test
