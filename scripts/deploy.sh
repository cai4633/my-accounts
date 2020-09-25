#!/user/bin/env bash

npm run build &&
cd build && 
git init &&
git add -A &&
git commit -m $1 || git commit -m "v1.x" &&
git remote add origin git@github.com:cai4633/my-accounts-demo.git &&
git push -u origin master -f &&
cd -