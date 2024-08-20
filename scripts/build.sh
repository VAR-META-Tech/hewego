# !/bin/bash
set -eu

npm i -g pnpm
yarn build
zip -r artifacts.zip dist
