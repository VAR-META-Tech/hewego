# !/bin/bash
set -eu

npm i -g pnpm
pnpm build
zip -r artifacts.zip dist
