# !/bin/bash
set -eu

yarn build
zip -r artifacts.zip dist