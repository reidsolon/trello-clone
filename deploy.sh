#!/usr/bin/env sh

set -e

npm run build

cd dist

git init 
git add -A
git commit -m "Deployment"
git push -f git@github.com:reidsolon/trello-clone.git master:gh-pages

cd -