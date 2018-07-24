#!/usr/bin/env bash

# Babelify
#node $PWD/node_modules/babel-cli/bin/babel $PWD/src --out-dir $PWD/dist --copy-files --ignore node_modules,spec.js
#node $PWD/node_modules/babel-cli/bin/babel $PWD/src --out-file index.js --copy-files --ignore node_modules,spec.js
#node $PWD/node_modules/webpack/bin/webpack $PWD/src
node $PWD/node_modules/webpack/bin/webpack --progress --mode production