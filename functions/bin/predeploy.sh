#!/usr/bin/env bash

# Babelify
node $PWD/node_modules/\@babel/cli/bin/babel $PWD/src --out-dir $PWD/dist --copy-files --ignore node_modules