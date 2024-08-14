# !/bin/bash

set -eu

# cd DOCKERFILE_DIR

# #unzip artifacts ---> dist
# unzip artifacts.zip

#add kaniko authenticaion
cp $REGISTRY_AUTH /kaniko/.docker/config.json

#use kaniko to build image
/kaniko/executor  \
    --context $CI_PROJECT_DIR   \
    --dockerfile $CI_PROJECT_DIR/$DOCKERFILE_DIR/Dockerfile    \
    --destination $REGISTRY:$CI_COMMIT_SHORT_SHA    