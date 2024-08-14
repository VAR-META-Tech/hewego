# !/bin/bash
set -eu

ls -la

cp -r out/json apps/$BUILD_DIR
cp out/pnpm-lock.yaml apps/$BUILD_DIR
cp turbo.json apps/$BUILD_DIR
cp .gitignore apps/$BUILD_DIR
cp -r out/full apps/$BUILD_DIR

cd apps/$BUILD_DIR

ls -la

pnpm turbo build --filter=$BUILD_DIR...

ls -la

zip -r artifacts.zip dist