#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

LC_ALL=C find . -type f -name '*.html' -exec sed -i '' 's/\/static\//\/omega-experimental\/static\//g' {} +
LC_ALL=C find . -type f -name '*.js' -exec sed -i '' 's/\/static\//\/omega-experimental\/static\//g' {} +
LC_ALL=C find . -type f -name '*.css' -exec sed -i '' 's/\/static\//\/omega-experimental\/static\//g' {} +

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:emartech/omega-experimental.git master:gh-pages

cd -