#!/bin/bash

IMAGE_NAME="website-image"

CONTAINER_NAME="website-container"

# Build Docker image
docker build -t $IMAGE_NAME -f apps/website/Dockerfile .

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME