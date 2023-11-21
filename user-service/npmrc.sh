#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
    # Load environment variables from .env file
    source .env

    # Delete .npmrc file
    rm .npmrc

    # Update .npmrc file
    echo "@ietienam:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=$GH_TOKEN" >> .npmrc
else
    # Delete .npmrc file
    rm .npmrc

    # Update .npmrc file
    echo "@ietienam:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=your-github-token" >> .npmrc
fi
