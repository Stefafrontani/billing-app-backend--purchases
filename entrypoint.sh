#!/bin/bash

set -euo pipefail

echo ">> entrypoint called <<"

echo ">> migrations running <<"

npm run migrate-up

echo ">> server starting <<"

exec npm run start