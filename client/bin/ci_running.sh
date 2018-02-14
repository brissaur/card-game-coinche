#!/usr/bin/env bash


yarn install

# copy build.properties file for CI
cp src/build.properties.ci.js src/build.properties.js