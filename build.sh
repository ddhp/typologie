#!/bin/bash
echo "compile js in src to ./dist"
./node_modules/babel-cli/bin/babel.js src -d dist
echo "webpack production build"
NODE_ENV=production ./node_modules/webpack/bin/webpack.js
