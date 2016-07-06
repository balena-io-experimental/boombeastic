#!/bin/bash

# Ensure mopidy folders are there
mkdir /data/mopidy > /dev/null 2>&1 || true
mkdir /data/mopidy/local > /dev/null 2>&1 || true
mkdir /data/mopidy/media > /dev/null 2>&1 || true
mkdir /data/mopidy/playlists > /dev/null 2>&1 || true

# Enable i2c
modprobe i2c-dev || true

while true; do
    node /app/index.js
done
