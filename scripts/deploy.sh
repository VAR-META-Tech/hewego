# !/bin/bash

set -eu

# copy env
cp $ENV_FILE .env
# deploy new containers in BACKUP_PORT
# docker stop "$IMAGE_NAME-backup" || true
# docker rm "$IMAGE_NAME-backup" || true
# - docker run -d --name "$IMAGE_NAME-backup" --env-file .env -p $BACKUP_PORT:3000 $REGISTRY:$CI_COMMIT_SHORT_SHA 
# # health check
# - sh ./health-check.sh
# # kill main process
# - echo "Backup deployment complete. Remove main containers"
echo "remove existing container and image"
docker stop $IMAGE_NAME || true
docker rm $IMAGE_NAME || true
docker rmi $(docker images | grep 'imagename') || true
echo "rebuilding new image"
docker run -d --name $IMAGE_NAME --env-file .env -p 3030:3030 $REGISTRY:$CI_COMMIT_SHORT_SHA 
docker ps -a | grep $IMAGE_NAME
docker logs $IMAGE_NAME || true
## remove backup process


###TO DO: change to workload-repo dev
